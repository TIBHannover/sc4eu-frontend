const nodemailer = require('nodemailer');

module.exports = async (email, subject, body) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            secureConnection: process.env.MAIL_SECURE,
            port: process.env.MAIL_PORT
            // auth: {
            //     user: process.env.MAIL_USER_NAME,
            //     pass: process.env.MAIL_PASSWORD
            // }
        });

        await transporter.sendMail({
            from: process.env.MAIL_USER_NAME,
            to: email,
            subject: subject,
            html: body
        });
        console.log('email sent successfully');
        return { success: true, message: 'email sent successfully' };
    } catch (error) {
        console.log('email not sent!');
        console.log(error);
        return error;
    }
};
