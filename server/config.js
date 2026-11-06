// Central configuration, read once from the environment.
// server/.env is loaded in index.js; variables already set (e.g. by docker compose) take precedence.

const env = process.env;

/**
 * URL path the browser uses to reach the app, e.g. "/ocp" (REACT_APP_PUBLIC_URL without its trailing slash,
 * so that paths can be appended: `${PUBLIC_PATH}/oauth/github`). Empty string if the app is served at the root.
 */
export const PUBLIC_PATH = (env.REACT_APP_PUBLIC_URL || '/ocp/').replace(/\/+$/, '');

export const PORT = env.APPLICATION_PORT || '9000';
export const APPLICATION_URL = env.APPLICATION_URL || 'http://localhost';

/** Public origin used in OAuth callback URLs and e-mail links, e.g. "https://service.tib.eu". */
export const CALLBACK_URL = env.CALLBACK_URL;
/** Public origin the browser is redirected to after OAuth login. */
export const REDIRECT_URL = env.REDIRECT_URL;
/** Public URL of the SPA, e.g. "https://service.tib.eu/ocp/" (used in e-mail links). */
export const PUBLIC_APP_URL = `${env.CALLBACK_URL}${PUBLIC_PATH}/`;

export const JWT_SECRET = env.JWT_SECRET;

/** Name of the portal in e-mails sent by the server, e.g. "VDST". */
export const PORTAL_NAME = env.PORTAL_NAME || 'SC4EU';

/** Upstream services the proxy may talk to. */
export const UPSTREAMS = {
    backend: env.BACKEND_SERVER_URL,
    fastapi: env.BACKEND_FASTAPI_SERVER_URL,
    processing: env.PROCESSING_SERVER_URL
};

export const MAIL = {
    host: env.MAIL_HOST,
    port: Number(env.MAIL_PORT) || 25,
    secure: env.MAIL_SECURE === 'true',
    from: env.MAIL_USER_NAME
};

export const CORS_ORIGINS = ['http://localhost:3000', env.REDIRECT_URL].filter(Boolean);
