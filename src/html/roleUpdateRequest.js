module.exports = (emailContent, SenderName) => {
    return {
        body: `
       <!DOCTYPE html>
<html>
<head>

    <meta charSet="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <title>Email Confirmation</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css">
        /**
        * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
        */
        @media screen {
            @font - face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 400;
                src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }

            @font-face {
                font-family: 'Source Sans Pro';
                font-style: normal;
                font-weight: 700;
                src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
        }

        /**
        * Avoid browser level font resizing.
        * 1. Windows Mobile
        * 2. iOS / OSX
        */
        body,
        table,
        td,
        a {
            -ms - text - size - adjust: 100%;
            /* 1 */
            -webkit-text-size-adjust: 100%;
            /* 2 */
        }

        /**
        * Remove extra space added to tables and cells in Outlook.
        */
        table,
        td {
            mso - table - rspace: 0pt;
            mso-table-lspace: 0pt;
        }

        /**
        * Better fluid images in Internet Explorer.
        */
        img {
            -ms - interpolation - mode: bicubic;
        }

        /**
        * Remove blue links for iOS devices.
        */
        a[x-apple-data-detectors] {
            font - family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
        }

        /**
        * Fix centering issues in Android 4.4.
        */
        div[style*="margin: 16px 0;"] {
            margin: 0 !important;
        }

        body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
        }

        /**
        * Collapse table borders to avoid space between cells.
        */
        table {
            border - collapse: collapse !important;
        }

        a {
            color: #1a82e2;
        }

        img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
        }
    </style>

</head>
<body style="background-color: #e9ecef;">
<table border="0" cellPadding="0" cellSpacing="0" width="100%">
    <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellPadding="0" cellSpacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td align="left" bgcolor="#ffffff"
                        style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                        <h2 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">
                            Request to change user role of SC3 Portal</h2>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    <tr>
        <td align="center" bgcolor="#e9ecef">
            <table border="0" cellPadding="0" cellSpacing="0" width="100%" style="max-width: 600px;">
                <tr>
                    <td align="left" bgcolor="#ffffff"
                        style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                        <p style="margin: 0;">Hello System Admin of SC3 Portal,</p>
                        <p>${emailContent}</p>
                        <p style="margin: 0;">Best regards,<br> ${SenderName}</p>
                    </td>
                </tr>
                <tr>
                    <td align="left" bgcolor="#ffffff"
                        style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                        <p style="margin: 0;">Tips: </p>
                        <p style="margin: 0;">If you want to update Role of "${SenderName}" user, Please follow below steps:</p>
                        <ol>
                          <li>Log in to the <a href="https://service.tib.eu/sc3/">SC3</a> platform using your credentials.</li>
                          <li>Click on your avatar located in the top-right corner of the screen.</li>
                          <li>Select "Dashboard" from the dropdown menu.</li>
                          <li>Click on the "Users" tab located in the left sidebar menu.</li>
                          <li>Find the user you want to update role and click on the "Edit Icon" from action column.</li>
                          <li>Click on the role column dropdown and select "Project Admin".</li>
                          <li>Clcik on the "Save" button from the action column.</li>
                        </ol>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
    <tr>
        <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
            <table border="0" cellPadding="0" cellSpacing="0" width="100%" style="max-width: 600px;">

                <tr>
                    <td align="center" bgcolor="#e9ecef"
                        style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                        <p style="margin: 0;">You received this email because you are System Admin  of the SC3 Portal.
                            If you are not aware of it you can safely delete this email.</p>
                    </td>
                </tr>

            </table>
        </td>
    </tr>
</table>
</body>
</html>
        `
    };
};
