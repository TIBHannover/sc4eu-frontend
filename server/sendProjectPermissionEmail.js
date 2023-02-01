const nodemailer = require('nodemailer');

module.exports = async EmailFields => {
    try {
        console.log(EmailFields);
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            secureConnection: process.env.MAIL_SECURE,
            port: process.env.MAIL_PORT
        });

        const mailOptions = {
            from: EmailFields.userEmail,
            to: EmailFields.projectAdminEmail,
            subject: EmailFields.subject.toString(),
            html: EmailFields.body
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: 'email sent successfully' };
    } catch (error) {
        return error;
    }
};
