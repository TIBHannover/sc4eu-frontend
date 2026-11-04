import nodemailer from 'nodemailer';
import { MAIL } from '../config.js';

const transport = nodemailer.createTransport({ host: MAIL.host, port: MAIL.port, secure: MAIL.secure });

/**
 * Sends an HTML e-mail. Never throws.
 * @param {object} mail
 * @param {string|string[]} mail.to
 * @param {string} mail.subject
 * @param {string} mail.html
 * @param {string} [mail.from]    defaults to MAIL_USER_NAME
 * @param {string} [mail.replyTo]
 * @returns {Promise<boolean>} true if the mail server accepted the message
 */
export async function sendMail({ to, subject, html, from = MAIL.from, replyTo }) {
    try {
        await transport.sendMail({ from, to, subject, html, replyTo });
        return true;
    } catch (error) {
        console.error(`Sending e-mail "${subject}" failed:`, error.message);
        return false;
    }
}
