// Authentication / authorisation middleware.
// The Python backend trusts whatever userId it receives, so Express is the only place where
// identity and roles are enforced. Error bodies keep the existing format (HTTP 200 + JSON).
import { callUpstreamJson } from './upstream.js';
import { verifyLoginToken } from './tokens.js';

export const ROLES = Object.freeze({
    SYSTEM_ADMIN: 'System Admin',
    PROJECT_ADMIN: 'Project Admin',
    MEMBER: 'Member',
    PUBLIC_USER: 'Public User'
});

export const NO_TOKEN = { error: 'No Token Provided' };
export const DENIED = { error: 'You dont have access to view this page' };

/** Reads "Authorization: Bearer <jwt>". */
function readLogin(req) {
    const header = req.get('authorization');
    if (!header) {
        return { status: 'missing' };
    }
    const login = verifyLoginToken(header.split(' ')[1]);
    return login ? { status: 'ok', ...login } : { status: 'invalid' };
}

/** Role name of a user, e.g. "System Admin"; null if unknown. */
export async function fetchUserRole(userId) {
    const { status, data } = await callUpstreamJson('backend', { path: '/user/role/', query: { userId }, timeout: 5000 });
    return status === 200 && typeof data === 'string' ? data : null;
}

/** Login JWT required. Sets req.auth = { userId, bToken }. */
export function requireLogin({ denied = DENIED } = {}) {
    return (req, res, next) => {
        const login = readLogin(req);
        if (login.status === 'missing') {
            return res.send(JSON.stringify(NO_TOKEN)); // same body/content type as before
        }
        if (login.status === 'invalid') {
            return res.json(denied);
        }
        req.auth = { userId: login.userId, bToken: login.bToken };
        return next();
    };
}

async function hasRole(req, allowedRoles) {
    try {
        req.auth.role ??= await fetchUserRole(req.auth.userId);
    } catch (error) {
        console.error('Role lookup failed:', error.message);
        return false;
    }
    return allowedRoles.includes(req.auth.role);
}

/** Login JWT and one of the roles required. Sets req.auth.role. */
export function requireRole(allowedRoles, { denied = DENIED } = {}) {
    const login = requireLogin({ denied });
    return [login, async (req, res, next) => ((await hasRole(req, allowedRoles)) ? next() : res.json(denied))];
}

/** Login required; `?userId=` must be the caller's own id unless the caller has one of the roles. */
export function requireSelfOrRole(allowedRoles, { denied = DENIED } = {}) {
    const login = requireLogin({ denied });
    return [
        login,
        async (req, res, next) => (req.query.userId === req.auth.userId || (await hasRole(req, allowedRoles)) ? next() : res.json(denied))
    ];
}

/**
 * Middleware for an auth level from the route table:
 * 'public' | 'login' | [roles] | { selfOr: [roles] }
 */
export function authMiddleware(auth, options) {
    if (auth === 'public') {
        return [];
    }
    if (auth === 'login') {
        return [requireLogin(options)];
    }
    if (Array.isArray(auth)) {
        return requireRole(auth, options);
    }
    if (auth?.selfOr) {
        return requireSelfOrRole(auth.selfOr, options);
    }
    throw new Error(`Unknown auth level: ${JSON.stringify(auth)}`);
}
