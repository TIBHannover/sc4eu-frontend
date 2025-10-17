const jwt = require('jsonwebtoken');
const GitHubStrategy = require('passport-github2').Strategy;
const GitLabStrategy = require('passport-gitlab2').Strategy;
const OAuth2Strategy = require('passport-oauth2').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const request = require('request');
const sendEmail = require('./sendEmail');
const sendProjectPermissionEmail = require('./sendProjectPermissionEmail');
const emailVerificationHtml = require('./emailVerificationHTML');
const passwordResetEmailHtml = require('./passwordResetEmailHTML');
const session = require('express-session');
// configuring some url and ports before the app;
const APPLICATION_PORT = process.env.APPLICATION_PORT ? process.env.APPLICATION_PORT : '9000';
const APPLICATION_URL = process.env.APPLICATION_URL ? process.env.APPLICATION_URL : 'http://localhost';
const url = require('url');
const verifyToken = require('./veryfyToken');
const oauthConfig = require('./config/oauth.config');
const { access } = require('fs');

/**
 * Find or create a user in the backend.
 * @param {Object} userData - User details (e.g., email, display_name, auth_type).
 * @returns {Promise<Object>} - User data from the backend.
 */
function findOrCreateUser(userData) {
    return new Promise((resolve, reject) => {
        const options = {
            uri: `${process.env.BACKEND_SERVER_URL}/users/login/`,
            body: JSON.stringify(userData),
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        request(options, (error, response, body) => {
            if (error) {
                console.error('Error finding or creating user:', error);
                reject({ error: 'Network error while contacting the backend' });
                return;
            }

            if (response.statusCode !== 200) {
                console.error('Backend returned an error:', body);
                reject({ error: 'Backend error', details: body });
                return;
            }

            try {
                const result = JSON.parse(body);
                resolve(result); // Resolve with user data
            } catch (e) {
                console.error('Error parsing backend response:', e);
                reject({ error: 'Invalid backend response' });
            }
        });
    });
}

async function fetchOAuth2UserInfo(accessToken, userInfoUrl) {
    const options = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        url: userInfoUrl,
        method: 'POST',
        body: JSON.stringify({
            auth_type: 'AUTH_SAP',
            token: accessToken
        })
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                reject(error || body);
                return;
            }
            resolve(body);
        });
    });
}

async function fetchGitLabEmails(accessToken) {
    const options = {
        headers: {
            Authorization: 'Bearer ' + accessToken
        },
        json: true,
        url: 'https://gitlab.com/api/v4/user/emails'
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                reject(error || body);
                return;
            }
            resolve(body[0]);
        });
    });
}

async function fetchGitHubEmails(accessToken) {
    const options = {
        headers: {
            'User-Agent': 'JavaScript',
            Authorization: 'token ' + accessToken
        },
        json: true,
        url: 'https://api.github.com/user/emails'
    };

    return new Promise((resolve, reject) => {
        request(options, (error, response, body) => {
            if (error || response.statusCode !== 200) {
                reject(error || body);
                return;
            }
            resolve(body.filter(email => email.verified));
        });
    });
}

const handleAuthError = (error, provider) => {
    console.error(`Authentication error with ${provider}:`, {
        message: error.message,
        stack: error.stack,
        timestamp: new Date().toISOString()
    });
    return error;
};

const generateJWT = user => {
    return jwt.sign(
        {
            userId: user.user_id,
            bToken: user.bToken
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1h',
            algorithm: 'HS256'
        }
    );
};

module.exports = {
    initializeAuth: function(app, passport) {
        // passport stuff
        passport.serializeUser(function(user, done) {
            done(null, user);
        });

        passport.deserializeUser(function(user, done) {
            done(null, user);
        });
        app.use(
            session({
                secret: process.env.JWT_SECRET,
                resave: true,
                saveUninitialized: true,
                cookie: {
                    maxAge: 30 * 24 * 60 * 60 * 1000
                }
            })
        );
        app.use(passport.initialize());
        app.use(passport.session());

        // try {
        //     passport.use(
        //         'oauth2',
        //         new OAuth2Strategy(oauthConfig.oauth2, async function(accessToken, refreshToken, profile, cb) {
        //             try {
        //                 // Fetch user info from the provider
        //                 const userInfoUrl = process.env.OAUTH2_USER_INFO_URL;
        //                 const userInfo = await fetchOAuth2UserInfo(accessToken, userInfoUrl);

        //                 // Find or create user in the backend
        //                 const user = await findOrCreateUser({
        //                     displayName: 'userInfo.name || userInfo.login',
        //                     email: userInfo.email,
        //                     auth_type: 'AUTH_OAUTH2',
        //                     token: 'undefined'
        //                 });

        //                 // Generate JWT token
        //                 const local_accessToken = generateJWT(user);

        //                 // Return user data
        //                 cb(null, { jwt: local_accessToken });
        //             } catch (error) {
        //                 cb(handleAuthError(error, 'OAuth2'), null);
        //             }
        //         })
        //     );
        // } catch (e) {
        //     handleAuthError(e, 'OAuth2 Strategy Setup');
        // }

        try {
            passport.use(
                'gitlab',
                new GitLabStrategy(oauthConfig.gitlab, async function(accessToken, __refreshToken, profile, cb) {
                    try {
                        // Fetch user emails from GitHub
                        const emails = await fetchGitLabEmails(accessToken);
                        const userMail = emails.email;

                        // Find or create user in the backend
                        const user = await findOrCreateUser({
                            displayName: profile.displayName,
                            email: userMail,
                            auth_type: 'AUTH_GITLAB',
                            token: 'undefined'
                        });

                        // Generate JWT token
                        const local_accessToken = generateJWT(user);

                        // Return user data
                        cb(null, { jwt: local_accessToken });
                    } catch (error) {
                        cb(handleAuthError(error, 'GitLab'), null);
                    }
                })
            );
        } catch (e) {
            handleAuthError(e, 'GitLab Strategy Setup');
        }

        try {
            passport.use(
                'github',
                new GitHubStrategy(
                    oauthConfig.github,

                    async function(accessToken, __refreshToken, profile, cb) {
                        try {
                            // Fetch user emails from GitHub
                            const emails = await fetchGitHubEmails(accessToken);
                            const userMail = emails[0].email;

                            // Find or create user in the backend
                            const user = await findOrCreateUser({
                                displayName: profile.displayName,
                                email: userMail,
                                auth_type: 'AUTH_GITHUB',
                                token: 'undefined'
                            });

                            // Generate JWT token
                            const local_accessToken = generateJWT(user);

                            // Return user data
                            cb(null, { jwt: local_accessToken });
                        } catch (error) {
                            cb(handleAuthError(error, 'GitHub'), null);
                        }
                    }
                )
            );
        } catch (e) {
            handleAuthError(e, 'GitHub Strategy Setup');
        }

        try {
            passport.use(
                'google',
                new GoogleStrategy(
                    oauthConfig.google,

                    async function(accessToken, __refreshToken, profile, cb) {
                        try {
                            // Extract user information from the profile
                            const userMail = profile.emails[0].value;

                            // Find or create user in the backend
                            const user = await findOrCreateUser({
                                displayName: profile.displayName,
                                email: userMail,
                                auth_type: 'AUTH_GOOGLE',
                                token: 'undefined'
                            });

                            // Generate JWT token
                            const local_accessToken = generateJWT(user);

                            // Return user data
                            cb(null, { jwt: local_accessToken });
                        } catch (error) {
                            cb(handleAuthError(error, 'Google'), null);
                        }
                    }
                )
            );
        } catch (e) {
            handleAuthError(e, 'Google Strategy Setup');
        }

        try {
            passport.use(
                'sap',
                new OAuth2Strategy(oauthConfig.sap, async function(accessToken, refreshToken, profile, cb) {
                    try {
                        // Fetch user info from SAP IDP
                        const userInfoUrl = process.env.SAP_USER_INFO_URL;
                        const userInfo = await fetchOAuth2UserInfo(accessToken, userInfoUrl);

                        const userInfoObj = JSON.parse(userInfo);

                        const fullName = `${userInfoObj.first_name} ${userInfoObj.last_name}`;
                        const email = userInfoObj.email;

                        // Find or create user in the backend
                        const user = await findOrCreateUser({
                            displayName: fullName,
                            email: email,
                            auth_type: 'AUTH_SAP',
                            token: 'undefined'
                        });

                        // Generate JWT token
                        const local_accessToken = generateJWT(user);

                        // Return user data
                        cb(null, { jwt: local_accessToken });
                    } catch (error) {
                        cb(handleAuthError(error, 'SAP IDP'), null);
                    }
                })
            );
        } catch (e) {
            handleAuthError(e, 'SAP IDP Strategy Setup');
        }
    },

    registerUser: function(app) {
        /** USER REGISTRATION VIA EMAIL and PWD**/
        app.post('/users/register', (req, res) => {
            const options = {
                uri: `${process.env.BACKEND_SERVER_URL}/users/register/`,
                body: JSON.stringify({
                    displayName: req.body.displayName,
                    username: req.body.username,
                    password: req.body.password,
                    auth_type: 'AUTH_LOCAL',
                    token: 'undefined'
                }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            request(options, function(error, response) {
                const result = JSON.parse(response.body);
                if (result) {
                    if (result.error) {
                        return res.json(result);
                    }
                    const local_accessToken = jwt.sign(
                        {
                            userId: result.user_id,
                            bToken: result.bToken
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );
                    const token = jwt.sign(
                        {
                            data: 'TokenData'
                        },
                        process.env.JWT_SECRET,
                        { expiresIn: '1h' }
                    );
                    const callbackURL = `${process.env.CALLBACK_URL}/vocab/EmailVerify/${result.user_id}/${token}`;
                    const EmailFields = {
                        email: req.body.username,
                        subject: 'VDST Email Verification',
                        body: emailVerificationHtml(callbackURL, req.body.displayName).body
                    };
                    sendEmail(EmailFields).then(response => {
                        if (response.success) {
                            res.json({
                                jwt: local_accessToken,
                                success: true,
                                message:
                                    'Please Click on the link that has just been sent your email account to verify your email and complete the registration process.'
                            });
                        } else {
                            res.json({
                                error: 'Something went wrong please try again after some time'
                            });
                        }
                    });
                } else {
                    res.json({ error: 'Could not register user' });
                }
            });
        });
    },

    verifyEmail: function(app) {
        const pathname = `${process.env.CALLBACK_URL}/sc3/EmailVerify`;
        app.get(`/EmailVerify/:user_id/:token`, (req, res) => {
            const { token } = req.params;
            // Verifying the JWT token
            jwt.verify(token, process.env.JWT_SECRET, function(error, decoded) {
                if (error) {
                    res.redirect(
                        url.format({
                            pathname: pathname,
                            query: {
                                success: false,
                                message:
                                    'Email verification failed,  possibly the link is invalid or expired. To verify your account just sign in and you will ' +
                                    'get again verification email.'
                            }
                        })
                    );
                } else {
                    const options = {
                        uri: `${process.env.BACKEND_SERVER_URL}/users/edit_email_valid/`,
                        body: JSON.stringify({
                            uuid: req.params.user_id
                        }),
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };
                    request(options, function(error, response) {
                        if (response && response.body) {
                            try {
                                const result = JSON.parse(response.body);
                                if (result.result === true) {
                                    res.redirect(
                                        url.format({
                                            pathname: pathname,
                                            query: {
                                                success: true,
                                                message: 'Email verified successfully'
                                            }
                                        })
                                    );
                                } else {
                                    res.redirect(
                                        url.format({
                                            pathname: pathname,
                                            query: {
                                                success: false,
                                                message: 'Something went wrong'
                                            }
                                        })
                                    );
                                }
                            } catch (e) {
                                res.redirect(
                                    url.format({
                                        pathname: pathname,
                                        query: {
                                            success: false,
                                            message: 'Something went wrong'
                                        }
                                    })
                                );
                            }
                        } else {
                            res.redirect(
                                url.format({
                                    pathname: pathname,
                                    query: {
                                        success: false,
                                        message: 'Something went wrong'
                                    }
                                })
                            );
                        }
                    });
                }
            });
        });
    },

    loginViaEmail: function(app) {
        /** TESTING EMAIL LOGIN **/
        app.post('/auth/email', (req, res) => {
            const options = {
                uri: `${process.env.BACKEND_SERVER_URL}/users/login/`,
                body: JSON.stringify({
                    username: req.body.username,
                    password: req.body.password,
                    auth_type: 'AUTH_LOCAL',
                    token: 'undefined'
                }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            request(options, function(error, response) {
                if (response && response.body) {
                    const result = JSON.parse(response.body);
                    // while login, we are checking the user is verified or not if it  is not verified than send again verification Email
                    if (result.is_email_valid === false) {
                        const token = jwt.sign(
                            {
                                data: 'TokenData'
                            },
                            process.env.JWT_SECRET,
                            { expiresIn: '10h' }
                        );
                        const callbackURL = `${process.env.CALLBACK_URL}/sc3/EmailVerify/${result.user_id}/${token}`;
                        const EmailFields = {
                            email: req.body.username,
                            subject: 'VDST Email Verification',
                            body: emailVerificationHtml(callbackURL, result.displayName).body
                        };
                        sendEmail(EmailFields).then(response => {
                            if (!response.success) {
                                res.json({
                                    error: 'Something went wrong please try again after some time'
                                });
                            }
                        });
                    }
                    if (result.success) {
                        // if (result.error) {
                        //     return res.json(result);
                        // }
                        const local_accessToken = jwt.sign(
                            {
                                userId: result.user_id,
                                bToken: result.bToken
                            },
                            process.env.JWT_SECRET,
                            { expiresIn: '1h' }
                        );
                        res.json({ jwt: local_accessToken });
                    } else {
                        res.json({ error: result.error });
                    }
                } else {
                    res.json({ error: 'Network Error' });
                }
            });
        });
    },
    userSettings: function(app) {
        app.put('/user/updateSettings', verifyToken, (req, res) => {
            console.log('Body', req.body);
            if (req.token === null || req.token === undefined) {
                res.send(JSON.stringify({ result: 'empty' }));
            } else {
                try {
                    const token = jwt.verify(req.token, process.env.JWT_SECRET);
                    if (token) {
                        const userId = token.userId;
                        const data = JSON.stringify({ username: req.body.username });

                        const options = {
                            uri: `${process.env.BACKEND_SERVER_URL}/users/viewProfile/?userId=${userId}&token=${token.bToken}`,
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: data
                        };
                        request(options, function(error, response) {
                            if (response && response.body) {
                                const result = JSON.parse(response.body);
                                if (result) {
                                    res.json(response);
                                } else {
                                    res.json({ error: 'error while updating user settings' });
                                }
                            } else {
                                res.json({ error: 'Network Error' });
                            }
                        });
                    }
                } catch (e) {
                    res.send(JSON.stringify({ error: 'Could not update ' }));
                }
            }
        });

        app.put('/user/updateUserRole', verifyToken, (req, res) => {
            if (req.token === null || req.token === undefined) {
                res.send(JSON.stringify({ result: 'empty' }));
            } else {
                try {
                    const token = jwt.verify(req.token, process.env.JWT_SECRET);
                    if (token) {
                        const userId = token.userId;
                        const data = JSON.stringify({ userId: req.body.userId, userRole: req.body.userRole });

                        const options = {
                            uri: `${process.env.BACKEND_SERVER_URL}/users/updateUserRole/?userId=${userId}&token=${token.bToken}`,
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: data
                        };
                        request(options, function(error, response) {
                            if (response && response.body) {
                                const result = JSON.parse(response.body);
                                if (result) {
                                    res.json(result);
                                } else {
                                    res.json({ error: 'error while updating user role' });
                                }
                            } else {
                                res.json({ error: 'Network Error' });
                            }
                        });
                    }
                } catch (e) {
                    res.send(JSON.stringify({ error: 'Could not update ' }));
                }
            }
        });

        app.put('/user/updateUserProjects', verifyToken, (req, res) => {
            console.log('Body', req.body);
            if (req.token === null || req.token === undefined) {
                res.send(JSON.stringify({ result: 'empty' }));
            } else {
                try {
                    const token = jwt.verify(req.token, process.env.JWT_SECRET);
                    if (token) {
                        const userId = token.userId;
                        const data = JSON.stringify({ userId: req.body.userId, projectsId: req.body.projectsId });

                        const options = {
                            uri: `${process.env.BACKEND_SERVER_URL}/users/updateUserProjects/?userId=${userId}&token=${token.bToken}`,
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: data
                        };
                        request(options, function(error, response) {
                            if (response && response.body) {
                                const result = JSON.parse(response.body);
                                if (result.success) {
                                    res.json(response);
                                } else {
                                    res.json({ error: 'error while updating user projects' });
                                }
                            } else {
                                res.json({ error: 'Network Error' });
                            }
                        });
                    }
                } catch (e) {
                    res.send(JSON.stringify({ error: 'Could not update user projects ' }));
                }
            }
        });
    },
    getUserSettings: function(app) {
        app.get('/user/settings/', verifyToken, (req, res) => {
            if (req.token === null) {
                res.send(JSON.stringify({ result: 'empty' }));
            } else {
                try {
                    const token = jwt.verify(req.token, process.env.JWT_SECRET);
                    if (token) {
                        const userId = token.userId;
                        const options = {
                            uri: `${process.env.BACKEND_SERVER_URL}/users/viewProfile/?userId=${userId}&token=${token.bToken}`,
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        };

                        request(options, function(error, response) {
                            if (response && response.body) {
                                const result = JSON.parse(response.body);
                                if (result) {
                                    res.json(response);
                                } else {
                                    res.json({ error: 'Could not find user' });
                                }
                            } else {
                                res.json({ error: 'Network Error' });
                            }
                        });
                    } else {
                        res.json({ error: 'Invalid  Token' });
                    }
                } catch (e) {
                    res.json({ error: 'Invalid Token' });
                }
            }
        });
    },
    forgotPassword: function(app) {
        app.post('/user/forgotPassword', (req, res) => {
            const options = {
                uri: `${process.env.BACKEND_SERVER_URL}/users/email_exists/`,
                body: JSON.stringify({
                    email_address: req.body.email_address
                }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            request(options, function(error, response) {
                const result = JSON.parse(response.body);
                if (result) {
                    if (result.success === true) {
                        const token = jwt.sign(
                            {
                                data: 'TokenData'
                            },
                            process.env.JWT_SECRET,
                            { expiresIn: '1h' }
                        );
                        const callbackURL = `${process.env.CALLBACK_URL}/vocab/verifResetPassword/${result.user_id}/${token}`;
                        const EmailFields = {
                            email: req.body.email_address,
                            subject: 'VDST Password Reset',
                            body: passwordResetEmailHtml(callbackURL, result.display_name).body
                        };
                        sendEmail(EmailFields).then(response => {
                            if (response.success) {
                                res.json({
                                    success: true,
                                    message: 'Please Click on the link that has just been sent your email account to reset password.'
                                });
                            } else {
                                res.json({
                                    success: false,
                                    message: 'Something went wrong please try again after some time'
                                });
                            }
                        });
                    } else {
                        res.json(result);
                    }
                } else {
                    res.json({ success: false, message: 'Something went wrong please try again after some time' });
                }
            });
        });
    },

    verifResetPassword: function(app) {
        const pathname = `${process.env.CALLBACK_URL}/vocab/ResetPassword`;
        app.get(`/verifResetPassword/:user_id/:token`, (req, res) => {
            const { token } = req.params;
            const { user_id } = req.params;
            jwt.verify(token, process.env.JWT_SECRET, function(error, decoded) {
                if (error) {
                    res.json({ error, success: false, message: 'password verification failed' });
                } else {
                    res.redirect(
                        url.format({
                            pathname: pathname,
                            query: {
                                success: true,
                                user_id: user_id
                            }
                        })
                    );
                }
            });
        });
    },

    setNewPassword: function(app) {
        app.post(`/user/setNewPassword`, (req, res) => {
            const options = {
                uri: `${process.env.BACKEND_SERVER_URL}/users/set_new_password/`,
                body: JSON.stringify({
                    user_id: req.body.user_id,
                    password: req.body.password
                }),
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            request(options, function(error, response) {
                const result = JSON.parse(response.body);
                if (result) {
                    return res.json(result);
                } else {
                    return res.json({ success: false, message: 'something went wrong please try again after some time' });
                }
            });
        });
    },

    projectAccessEmail: function(app) {
        app.post(`/auth/projectAccessEmail`, (req, res) => {
            const emailFields = {
                userEmail: req.body.userEmail,
                projectAdminEmail: req.body.projectAdminEmail,
                subject: req.body.emailSubject,
                body: req.body.emailContent
            };
            console.log(emailFields);
            sendProjectPermissionEmail(emailFields).then(response => {
                console.log(response);
                if (response.success) {
                    res.json({
                        success: true,
                        message: 'Email have been sent successfully'
                    });
                } else {
                    res.json({
                        success: false,
                        message: 'Something went wrong please try again after some time'
                    });
                }
            });
        });
    },
    getAllSystemAdmin: function(app) {
        app.get('/user/getAllSystemAdmin', verifyToken, (req, res) => {
            const token = jwt.verify(req.token, process.env.JWT_SECRET);
            if (token) {
                const options = {
                    uri: `${process.env.BACKEND_SERVER_URL}/users/getAllSystemAdmin/`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                request(options, function(error, response) {
                    if (response && response.body) {
                        const result = JSON.parse(response.body);
                        if (result) {
                            res.json(result);
                        } else {
                            res.json({ error: 'Could not find system admin' });
                        }
                    } else {
                        res.json({ error: 'Network Error' });
                    }
                });
            } else {
                res.json({ error: 'Invalid  Token' });
            }
        });
    }
};
