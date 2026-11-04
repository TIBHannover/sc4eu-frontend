// Generic proxy: registers every route of the table in ./routes.js on an Express router.
import { authMiddleware } from '../lib/auth.js';
import { callUpstream } from '../lib/upstream.js';
import { DEFAULT_ERRORS, proxyRoutes } from './routes.js';

const IDENTITY_PARAMS = {
    'userId+token': auth => ({ userId: auth.userId, token: auth.bToken }),
    userId: auth => ({ userId: auth.userId }),
    token: auth => ({ token: auth.bToken })
};

const resolve = (value, req) => (typeof value === 'function' ? value(req) : value);

function upstreamRequest(route, req) {
    const method = route.upstreamMethod ?? route.method;
    const bodyMode = route.body ?? (['POST', 'PUT'].includes(route.method) ? 'json' : undefined);
    return {
        method,
        path: resolve(route.to, req),
        query: { ...route.query?.(req), ...IDENTITY_PARAMS[route.identity]?.(req.auth) },
        json: bodyMode === 'json' ? req.body ?? {} : resolve(bodyMode, req)
    };
}

/** Builds the client response body from the upstream response. */
function shapeResponse(route, { status, text }, errors) {
    if (route.response === 'text') {
        return text;
    }
    if (!text) {
        return errors.upstream;
    }
    let data;
    try {
        data = JSON.parse(text);
    } catch {
        return errors.parse;
    }
    if (errors.empty && !data) {
        return errors.empty;
    }
    if (route.response === 'envelope') {
        return { statusCode: status, body: text };
    }
    if (route.response?.pick && !data.error) {
        return Object.fromEntries(route.response.pick.map(field => [field, data[field]]));
    }
    return data;
}

function proxyHandler(route) {
    const errors = { ...DEFAULT_ERRORS, ...route.errors };
    return async (req, res) => {
        let upstream;
        try {
            upstream = await callUpstream(route.target, upstreamRequest(route, req));
        } catch (error) {
            console.error(`${route.method} ${route.path} -> ${route.target}:`, error.message);
            return res.json(errors.upstream);
        }
        return res.json(shapeResponse(route, upstream, errors));
    };
}

/** Registers all proxy routes on the router. */
export function registerProxyRoutes(router, routes = proxyRoutes) {
    for (const route of routes) {
        const errors = { ...DEFAULT_ERRORS, ...route.errors };
        router[route.method.toLowerCase()](route.path, ...authMiddleware(route.auth, { denied: errors.denied }), proxyHandler(route));
    }
}
