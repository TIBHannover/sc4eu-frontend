const nodemailer = require('nodemailer');

module.exports = async EmailFields => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            secureConnection: process.env.MAIL_SECURE,
            port: process.env.MAIL_PORT
        });

        await transporter.sendMail({
            from: process.env.MAIL_USER_NAME,
            to: EmailFields.email,
            subject: EmailFields.subject,
            html: EmailFields.body
        });
        return { success: true, message: 'email sent successfully' };
    } catch (error) {
        return error;
    }
};
