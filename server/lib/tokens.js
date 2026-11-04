// All JWTs issued by this server. Each token carries a `purpose`, so a token issued for one
// purpose (e.g. password reset) can never be used for another (e.g. login).
import { randomUUID } from 'node:crypto';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

const ALGORITHM = 'HS256';

export const PURPOSE = Object.freeze({
    LOGIN: 'login',
    EMAIL_VERIFY: 'email-verify',
    PASSWORD_RESET: 'password-reset'
});

const sign = (payload, expiresIn) => jwt.sign(payload, JWT_SECRET, { expiresIn, algorithm: ALGORITHM });

/** Verifies signature, expiry and purpose. Returns the payload, or null if invalid. */
function verify(token, purpose) {
    try {
        const payload = jwt.verify(token, JWT_SECRET, { algorithms: [ALGORITHM] });
        return payload.purpose === purpose ? payload : null;
    } catch {
        return null;
    }
}

// ------------------------------------------------------------------ login

/** Login token. bToken is the backend's per-user token and is forwarded to backend calls. */
export const signLoginToken = ({ user_id, bToken }) => sign({ purpose: PURPOSE.LOGIN, userId: user_id, bToken }, '1h');

/**
 * @returns {{userId: string, bToken: string} | null}
 * Tokens issued before this version have no `purpose` but the same shape; they are accepted
 * so that users stay logged in across the deployment (they expire within 1 hour anyway).
 */
export function verifyLoginToken(token) {
    try {
        const payload = jwt.verify(token, JWT_SECRET, { algorithms: [ALGORITHM] });
        const isLogin = payload.purpose === PURPOSE.LOGIN || payload.purpose === undefined;
        return isLogin && payload.userId && payload.bToken ? { userId: payload.userId, bToken: payload.bToken } : null;
    } catch {
        return null;
    }
}

// ------------------------------------------------------------------ e-mail verification

export const signEmailVerifyToken = (userId, expiresIn = '1h') => sign({ purpose: PURPOSE.EMAIL_VERIFY, userId }, expiresIn);

/** True if the token was issued to verify exactly this user's e-mail address. */
export const verifyEmailVerifyToken = (token, userId) => verify(token, PURPOSE.EMAIL_VERIFY)?.userId === userId;

// ------------------------------------------------------------------ password reset

const usedResetTokens = new Map(); // jti -> expiry (seconds since epoch)

export const signPasswordResetToken = userId => sign({ purpose: PURPOSE.PASSWORD_RESET, userId, jti: randomUUID() }, '1h');

/** @returns {{userId: string, jti: string, exp: number} | null} valid and not used yet */
export function verifyPasswordResetToken(token) {
    const payload = verify(token, PURPOSE.PASSWORD_RESET);
    return payload?.userId && !usedResetTokens.has(payload.jti) ? payload : null;
}

/** Marks a reset token as used so the e-mail link works only once. */
export function consumePasswordResetToken({ jti, exp }) {
    const now = Date.now() / 1000;
    for (const [id, expiry] of usedResetTokens) {
        if (expiry < now) {
            usedResetTokens.delete(id);
        }
    }
    usedResetTokens.set(jti, exp);
}
