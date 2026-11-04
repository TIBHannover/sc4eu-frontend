// Minimal HTTP client for the internal upstream services.
// node:http is used instead of fetch() because some backend endpoints expect a JSON body on GET.
import http from 'node:http';
import https from 'node:https';
import { UPSTREAMS } from '../config.js';

const DEFAULT_TIMEOUT_MS = {
    backend: 120_000,
    fastapi: 120_000,
    processing: 300_000 // runs Java tools
};

/**
 * Calls an upstream service.
 *
 * @param {'backend'|'fastapi'|'processing'} target
 * @param {object} options
 * @param {string} [options.method='GET']
 * @param {string} options.path      path starting with "/"
 * @param {object} [options.query]   undefined/null values are skipped
 * @param {*}      [options.json]    request body, sent as JSON (allowed for any method)
 * @param {number} [options.timeout] milliseconds
 * @returns {Promise<{status: number, text: string}>} rejects on network errors and timeouts
 */
export function callUpstream(target, { method = 'GET', path, query, json, timeout = DEFAULT_TIMEOUT_MS[target] }) {
    const base = UPSTREAMS[target];
    if (!base) {
        return Promise.reject(new Error(`Upstream "${target}" is not configured`));
    }
    const url = new URL(base.replace(/\/+$/, '') + path);
    for (const [key, value] of Object.entries(query ?? {})) {
        if (value !== undefined && value !== null) {
            url.searchParams.set(key, value);
        }
    }
    const body = json === undefined ? undefined : JSON.stringify(json);
    const headers = { 'Content-Type': 'application/json', Accept: 'application/json' };
    if (body !== undefined) {
        headers['Content-Length'] = Buffer.byteLength(body);
    }

    const client = url.protocol === 'https:' ? https : http;
    return new Promise((resolve, reject) => {
        const request = client.request(url, { method, headers, timeout }, response => {
            const chunks = [];
            response.on('data', chunk => chunks.push(chunk));
            response.on('end', () => resolve({ status: response.statusCode, text: Buffer.concat(chunks).toString('utf8') }));
            response.on('error', reject);
        });
        request.on('timeout', () => request.destroy(new Error(`${target} ${method} ${path} timed out after ${timeout} ms`)));
        request.on('error', reject);
        request.end(body);
    });
}

/**
 * Like callUpstream, but parses the JSON response.
 * @returns {Promise<{status: number, text: string, data: *}>} data is undefined if the body is not JSON
 */
export async function callUpstreamJson(target, options) {
    const response = await callUpstream(target, options);
    let data;
    try {
        data = JSON.parse(response.text);
    } catch {
        data = undefined;
    }
    return { ...response, data };
}
