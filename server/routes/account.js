// Local accounts: registration, e-mail login, e-mail verification, password reset,
// and the "request project access" e-mail.
import { Router } from 'express';
import { PUBLIC_APP_URL } from '../config.js';
import { requireLogin } from '../lib/auth.js';
import { sendMail } from '../lib/mailer.js';
import {
    consumePasswordResetToken,
    signEmailVerifyToken,
    signLoginToken,
    signPasswordResetToken,
    verifyEmailVerifyToken,
    verifyPasswordResetToken
} from '../lib/tokens.js';
import { callUpstreamJson } from '../lib/upstream.js';
import emailVerificationHtml from '../templates/emailVerification.js';
import passwordResetHtml from '../templates/passwordReset.js';

const NETWORK_ERROR = { error: 'Network Error' };
const TRY_AGAIN = 'Something went wrong please try again after some time';
const REGISTERED_MESSAGE =
    'Please Click on the link that has just been sent your email account to verify your email and complete the registration process.';
const VERIFY_FAILED_MESSAGE =
    'Email verification failed,  possibly the link is invalid or expired. To verify your account just sign in and you will ' +
    'get again verification email.';

/** URL of an SPA page with query parameters, e.g. appUrl('EmailVerify', { success: true }). */
const appUrl = (page, params) =>
    `${PUBLIC_APP_URL}${page}?` + Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&');

/** POSTs JSON to the Flask backend; resolves to the parsed body, or undefined if unreachable / not JSON. */
async function backendPost(path, json) {
    try {
        return (await callUpstreamJson('backend', { method: 'POST', path, json })).data;
    } catch (error) {
        console.error(`POST ${path}:`, error.message);
        return undefined;
    }
}

function sendVerificationMail({ userId, email, displayName, expiresIn }) {
    const link = `${PUBLIC_APP_URL}EmailVerify/${userId}/${signEmailVerifyToken(userId, expiresIn)}`;
    return sendMail({ to: email, subject: 'SC4EU Email Verification', html: emailVerificationHtml(link, displayName).body });
}

export const accountRouter = Router();

accountRouter.post('/users/register', async (req, res) => {
    const { displayName, username, password } = req.body;
    const user = await backendPost('/users/register/', { displayName, username, password, auth_type: 'AUTH_LOCAL', token: 'undefined' });
    if (!user) {
        return res.json({ error: 'Could not register user' });
    }
    if (user.error) {
        return res.json(user);
    }
    const mailSent = await sendVerificationMail({ userId: user.user_id, email: username, displayName });
    return res.json(mailSent ? { jwt: signLoginToken(user), success: true, message: REGISTERED_MESSAGE } : { error: TRY_AGAIN });
});

accountRouter.post('/auth/email', async (req, res) => {
    const { username, password } = req.body;
    const user = await backendPost('/users/login/', { username, password, auth_type: 'AUTH_LOCAL', token: 'undefined' });
    if (!user) {
        return res.json(NETWORK_ERROR);
    }
    if (user.is_email_valid === false) {
        // e-mail not verified yet: send a new verification link
        const mailSent = await sendVerificationMail({ userId: user.user_id, email: username, displayName: user.displayName, expiresIn: '10h' });
        if (!mailSent && !user.success) {
            return res.json({ error: TRY_AGAIN });
        }
    }
    return res.json(user.success ? { jwt: signLoginToken(user) } : { error: user.error });
});

// Link from the verification e-mail
accountRouter.get('/EmailVerify/:user_id/:token', async (req, res) => {
    const { user_id: userId, token } = req.params;
    if (!verifyEmailVerifyToken(token, userId)) {
        return res.redirect(appUrl('EmailVerify', { success: false, message: VERIFY_FAILED_MESSAGE }));
    }
    const result = await backendPost('/users/edit_email_valid/', { uuid: userId });
    const verified = result?.result === true;
    return res.redirect(appUrl('EmailVerify', { success: verified, message: verified ? 'Email verified successfully' : 'Something went wrong' }));
});

accountRouter.post('/user/forgotPassword', async (req, res) => {
    const { email_address: email } = req.body;
    const user = await backendPost('/users/email_exists/', { email_address: email });
    if (!user) {
        return res.json({ success: false, message: TRY_AGAIN });
    }
    if (user.success !== true) {
        return res.json(user);
    }
    const link = `${PUBLIC_APP_URL}verifResetPassword/${user.user_id}/${signPasswordResetToken(user.user_id)}`;
    const mailSent = await sendMail({ to: email, subject: 'SC3 Password Reset', html: passwordResetHtml(link, user.display_name).body });
    return res.json(
        mailSent
            ? { success: true, message: 'Please Click on the link that has just been sent your email account to reset password.' }
            : { success: false, message: TRY_AGAIN }
    );
});

// Link from the password-reset e-mail: checks the link, then opens the reset page with the token
accountRouter.get('/verifResetPassword/:user_id/:token', (req, res) => {
    const { user_id: userId, token } = req.params;
    if (verifyPasswordResetToken(token)?.userId !== userId) {
        return res.json({ success: false, message: 'password verification failed' });
    }
    return res.redirect(appUrl('resetPassword', { success: true, token }));
});

// The user (taken from the reset token, not from the request) gets a new password; each link works once
accountRouter.post('/user/setNewPassword', async (req, res) => {
    const { token, password } = req.body;
    const reset = verifyPasswordResetToken(token);
    if (!reset) {
        return res.json({ success: false, message: 'The password reset link is invalid, expired or has already been used. Please request a new one.' });
    }
    const result = await backendPost('/users/set_new_password/', { user_id: reset.userId, password });
    if (!result) {
        return res.json({ success: false, message: 'something went wrong please try again after some time' });
    }
    if (result.success) {
        consumePasswordResetToken(reset);
    }
    return res.json(result);
});

// "Request to become Project Admin": e-mail from the logged-in user to System Admins only
accountRouter.post('/auth/projectAccessEmail', requireLogin(), async (req, res) => {
    const failed = { success: false, message: TRY_AGAIN };
    const { projectAdminEmail, emailSubject, emailContent } = req.body;
    try {
        const [{ data: admins }, { data: profile }] = await Promise.all([
            callUpstreamJson('backend', { path: '/users/getAllSystemAdmin/' }),
            callUpstreamJson('backend', { path: '/users/viewProfile/', query: { userId: req.auth.userId, token: req.auth.bToken } })
        ]);
        const adminEmails = new Set((Array.isArray(admins) ? admins : []).map(admin => admin.email_address));
        const to = [projectAdminEmail].flat().filter(email => adminEmails.has(email));
        if (to.length === 0 || !emailSubject) {
            return res.json(failed);
        }
        const senderEmail = profile?.user?.email;
        const mailSent = await sendMail({ to, subject: String(emailSubject), html: emailContent, from: senderEmail, replyTo: senderEmail });
        return res.json(mailSent ? { success: true, message: 'Email have been sent successfully' } : failed);
    } catch (error) {
        console.error('projectAccessEmail:', error.message);
        return res.json(failed);
    }
});
