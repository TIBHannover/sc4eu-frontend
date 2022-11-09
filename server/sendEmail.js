const nodemailer = require('nodemailer');

module.exports = async (email, subject, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            secureConnection: process.env.MAIL_SECURE,
            port: process.env.MAIL_PORT
        });

        await transporter.sendMail({
            from: process.env.MAIL_USER_NAME,
            to: email,
            subject: subject,
            html: body
        });
        return { success: true, message: 'email sent successfully' };
    } catch (error) {
        return error;
    }
};
