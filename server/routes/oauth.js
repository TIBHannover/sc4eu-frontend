// OAuth login (GitHub, GitLab, Google, SAP, LinkedIn).
// After the provider callback the user is redirected to the SPA page "loggedIn" with a login JWT.
// No server-side session is needed: the JWT is the only login state.
import { Router } from 'express';
import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as GitLabStrategy } from 'passport-gitlab2';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import OAuth2Strategy from 'passport-oauth2';
import { PUBLIC_PATH, CALLBACK_URL, REDIRECT_URL } from '../config.js';
import { signLoginToken } from '../lib/tokens.js';
import { callUpstreamJson } from '../lib/upstream.js';

const env = process.env;
const callbackUrl = provider => `${CALLBACK_URL}${PUBLIC_PATH}/oauth/${provider}/callback`;

/** Reads a JSON resource from a provider API with the user's access token. */
async function fetchProviderJson(url, { method = 'GET', headers = {}, body } = {}) {
    const response = await fetch(url, { method, headers, body, signal: AbortSignal.timeout(10_000) });
    if (!response.ok) {
        throw new Error(`${method} ${url} -> HTTP ${response.status}`);
    }
    return response.json();
}

/**
 * Each provider lists the environment variables it needs (`requiredEnv`) and maps its profile
 * to { displayName, email }. The user is then found or created in the backend by e-mail.
 */
const PROVIDERS = {
    github: {
        Strategy: GitHubStrategy,
        requiredEnv: ['GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET'],
        options: { clientID: env.GITHUB_CLIENT_ID, clientSecret: env.GITHUB_CLIENT_SECRET },
        scope: ['profile', 'user:email'],
        // historically GitHub redirects with CALLBACK_URL, the others with REDIRECT_URL
        redirectTo: CALLBACK_URL,
        async profile(accessToken, profile) {
            const emails = await fetchProviderJson('https://api.github.com/user/emails', {
                headers: { 'User-Agent': 'JavaScript', Authorization: `token ${accessToken}` }
            });
            return { displayName: profile.displayName?.trim() || profile.username, email: emails.filter(email => email.verified)[0].email };
        }
    },
    gitlab: {
        Strategy: GitLabStrategy,
        requiredEnv: ['GITLAB_CLIENT_ID', 'GITLAB_CLIENT_SECRET'],
        options: { clientID: env.GITLAB_CLIENT_ID, clientSecret: env.GITLAB_CLIENT_SECRET },
        scope: ['read_user'],
        redirectTo: REDIRECT_URL,
        async profile(accessToken, profile) {
            const emails = await fetchProviderJson('https://gitlab.com/api/v4/user/emails', { headers: { Authorization: `Bearer ${accessToken}` } });
            return { displayName: profile.displayName?.trim() || profile.username, email: emails[0].email };
        }
    },
    google: {
        Strategy: GoogleStrategy,
        requiredEnv: ['GOOGLE_CLIENT_ID_FOR_LOGIN', 'GOOGLE_CLIENT_SECRET_FOR_LOGIN'],
        options: { clientID: env.GOOGLE_CLIENT_ID_FOR_LOGIN, clientSecret: env.GOOGLE_CLIENT_SECRET_FOR_LOGIN, scope: ['profile', 'email'] },
        scope: ['profile', 'email'],
        redirectTo: REDIRECT_URL,
        profile: async (accessToken, profile) => ({ displayName: profile.displayName?.trim() || profile.username, email: profile.emails[0].value })
    },
    sap: {
        Strategy: OAuth2Strategy,
        requiredEnv: [
            'SAP_AUTHORIZATION_URL_FOR_LOGIN',
            'SAP_TOKEN_URL_FOR_LOGIN',
            'SAP_CLIENT_ID_FOR_LOGIN',
            'SAP_CLIENT_SECRET_FOR_LOGIN',
            'SAP_USER_INFO_URL'
        ],
        options: {
            authorizationURL: env.SAP_AUTHORIZATION_URL_FOR_LOGIN,
            tokenURL: env.SAP_TOKEN_URL_FOR_LOGIN,
            clientID: env.SAP_CLIENT_ID_FOR_LOGIN,
            clientSecret: env.SAP_CLIENT_SECRET_FOR_LOGIN,
            scope: ['openid', 'email', 'profile']
        },
        scope: ['profile', 'email'],
        redirectTo: REDIRECT_URL,
        async profile(accessToken) {
            const info = await fetchProviderJson(env.SAP_USER_INFO_URL, {
                method: 'POST',
                headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' },
                body: JSON.stringify({ auth_type: 'AUTH_SAP', token: accessToken })
            });
            return { displayName: `${info.first_name} ${info.last_name}`, email: info.email };
        }
    },
    linkedin: {
        Strategy: OAuth2Strategy,
        requiredEnv: ['LINKEDIN_CLIENT_ID', 'LINKEDIN_CLIENT_SECRET', 'LINKEDIN_API_V2_USERINFO'],
        options: {
            authorizationURL: 'https://www.linkedin.com/oauth/v2/authorization',
            tokenURL: 'https://www.linkedin.com/oauth/v2/accessToken',
            clientID: env.LINKEDIN_CLIENT_ID,
            clientSecret: env.LINKEDIN_CLIENT_SECRET,
            scope: ['openid', 'email', 'profile']
        },
        scope: ['openid', 'profile', 'email'],
        redirectTo: REDIRECT_URL,
        async profile(accessToken) {
            const info = await fetchProviderJson(env.LINKEDIN_API_V2_USERINFO, { headers: { Authorization: `Bearer ${accessToken}` } });
            return { displayName: info.name || `${info.given_name} ${info.family_name}`.trim(), email: info.email };
        }
    }
};

/** Finds or creates the user in the backend; resolves to { user_id, bToken, ... }. */
async function findOrCreateUser({ displayName, email }, provider) {
    const { status, data } = await callUpstreamJson('backend', {
        method: 'POST',
        path: '/users/login/',
        json: { displayName, email, auth_type: `AUTH_${provider.toUpperCase()}`, token: 'undefined' }
    });
    if (status !== 200 || !data) {
        throw new Error(`Backend login failed (HTTP ${status})`);
    }
    return data;
}

const isConfigured = ({ requiredEnv }) => requiredEnv.every(variable => Boolean(env[variable]));

/** Which login providers are configured on this instance, e.g. { github: true, gitlab: false, ... } */
export const getOAuthProviderStatus = () => Object.fromEntries(Object.entries(PROVIDERS).map(([name, provider]) => [name, isConfigured(provider)]));

function registerStrategy(name, { Strategy, options, profile }) {
    const verify = async (accessToken, _refreshToken, providerProfile, done) => {
        try {
            const user = await findOrCreateUser(await profile(accessToken, providerProfile), name);
            done(null, { jwt: signLoginToken(user) });
        } catch (error) {
            console.error(`OAuth login with ${name} failed:`, error.message);
            done(error);
        }
    };
    passport.use(name, new Strategy({ ...options, callbackURL: callbackUrl(name) }, verify));
}

export const oauthRouter = Router();

for (const [name, provider] of Object.entries(PROVIDERS)) {
    if (!isConfigured(provider)) {
        console.warn(`OAuth login with ${name} is disabled: set ${provider.requiredEnv.join(', ')}`);
        continue;
    }
    registerStrategy(name, provider);
    const appPage = page => `${provider.redirectTo}${PUBLIC_PATH}/${page}`;
    oauthRouter.get(`/oauth/${name}`, passport.authenticate(name, { scope: provider.scope, session: false }));
    oauthRouter.get(
        `/oauth/${name}/callback`,
        passport.authenticate(name, { session: false, failureRedirect: appPage('LoginFailedRedirect') }),
        (req, res) => res.redirect(`${appPage('loggedIn')}?success=true&token=${encodeURIComponent(req.user.jwt)}`)
    );
}

export const initializePassport = () => passport.initialize();
