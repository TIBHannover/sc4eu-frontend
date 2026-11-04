// GET /status — what is configured and running on this instance (used by the "Services status" page).
// Public on purpose: it only returns booleans and state names, no addresses or settings.
import { Router } from 'express';
import { UPSTREAMS } from '../config.js';
import { callUpstream } from '../lib/upstream.js';
import { getOAuthProviderStatus } from './oauth.js';

const CHECK_TIMEOUT_MS = 3000;

const SERVICE_STATE = Object.freeze({
    UP: 'up',
    DOWN: 'down',
    NOT_CONFIGURED: 'not configured'
});

/**
 * A service counts as "up" if it answers an HTTP request at all, whatever the status code.
 * Services do not share a health-check path, and a 404 from "/" still proves the service is running.
 */
async function checkService(target) {
    if (!UPSTREAMS[target]) {
        return SERVICE_STATE.NOT_CONFIGURED;
    }
    try {
        await callUpstream(target, { path: '/', timeout: CHECK_TIMEOUT_MS });
        return SERVICE_STATE.UP;
    } catch {
        return SERVICE_STATE.DOWN;
    }
}

/** Checks all upstream services in parallel, e.g. { backend: 'up', fastapi: 'up', processing: 'down' } */
async function checkAllServices() {
    const names = Object.keys(UPSTREAMS);
    const states = await Promise.all(names.map(checkService));
    return Object.fromEntries(names.map((name, index) => [name, states[index]]));
}

export const statusRouter = Router();

statusRouter.get('/status', async (req, res) => {
    res.json({
        services: await checkAllServices(),
        oauth: getOAuthProviderStatus()
    });
});
