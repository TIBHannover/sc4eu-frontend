const jwt = require('jsonwebtoken');
const GitHubStrategy = require('passport-github2').Strategy;
const GitLabStrategy = require('passport-gitlab2').Strategy;
require('dotenv').config();
const request = require('request');
const sendEmail = require('./sendEmail');
const emailVerificationHtml = require('./emailVerificationHTML');
const session = require('express-session');
// configuring some url and ports before the app;
const APPLICATION_PORT = process.env.APPLICATION_PORT ? process.env.APPLICATION_PORT : '9000';
const APPLICATION_URL = process.env.APPLICATION_URL ? process.env.APPLICATION_URL : 'http://localhost';
const url = require('url');
const verifyToken = require('./veryfyToken');

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

        try {
            passport.use(
                new GitLabStrategy(
                    {
                        clientID: process.env.GITLAB_CLIENT_ID,
                        clientSecret: process.env.GITLAB_CLIENT_SECRET,
                        callbackURL: '/sc3/auth/gitlab/callback'
                    },
                    async function(accessToken, __refreshToken, profile, cb) {
                        const options = {
                            headers: {
                                'User-Agent': 'JavaScript',
                                Authorization: 'Bearer ' + accessToken
                            },
                            json: true,
                            url: 'https://gitlab.com/api/v4/user/emails'
                        };

                        // this is where we need to fetch the email address and the display name
                        // get emails using oauth token
                        await request(options, function(error, response, body) {
                            if (error || response.statusCode !== 200) {
                                console.log(error);
                                console.log(body);
                                return null;
                            }
                            let email = '';
                            Object.keys(body).forEach(function(key) {
                                email = body[key].email;
                            });
                            if (!email.length) {
                                return { error: 'Could not access your email  address ' };
                                // >> CRITICAL ERROR
                            }

                            const loginRequestOptions = {
                                uri: `${process.env.BACKEND_SERVER_URL}/users/login/`,
                                body: JSON.stringify({
                                    displayName: profile.displayName,
                                    email: email,
                                    auth_type: 'AUTH_GITLAB',
                                    token: 'undefined'
                                }),
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            };
                            request(loginRequestOptions, function(error, response) {
                                if (response && response.body) {
                                    try {
                                        const result = JSON.parse(response.body);
                                        const local_accessToken = jwt.sign(
                                            {
                                                userId: result.user_id,
                                                bToken: result.bToken
                                            },
                                            process.env.JWT_SECRET,
                                            {
                                                expiresIn: '8h'
                                            }
                                        );
                                        cb(null, { jwt: local_accessToken }); // sends the local access token to the call back routine;
                                    } catch (e) {
                                        console.log(e);
                                    }
                                } else {
                                    cb(null, { error: 'Could not login via GitLab' }); // sends the local access token to the call back routine;
                                }
                            });
                        });
                    }
                )
            );
        } catch (e) {
            console.log(e);
        }

        try {
            passport.use(
                new GitHubStrategy(
                    {
                        clientID: process.env.GITHUB_CLIENT_ID,
                        clientSecret: process.env.GITHUB_CLIENT_SECRET,
                        callbackURL: '/sc3/auth/github/callback'
                    },
                    async function(accessToken, __refreshToken, profile, cb) {
                        const displayName = profile.displayName;
                        // this is where we try to get the email for the user
                        console.log('USER NAME:', displayName);

                        const options = {
                            headers: {
                                'User-Agent': 'JavaScript',
                                Authorization: 'token ' + accessToken
                            },
                            json: true,
                            url: 'https://api.github.com/user/emails'
                        };

                        // this is where we need to fetch the email address and the display name
                        // get emails using oauth token
                        await request(options, function(error, response, body) {
                            if (error || response.statusCode !== 200) {
                                console.log(error);
                                console.log(body);
                                return null;
                            }
                            const emails = body.filter(function(email) {
                                return email.verified;
                            });
                            if (!emails.length) {
                                return { error: 'Could not access your email  address ' };
                                // >> CRITICAL ERROR
                            }
                            const userMail = emails[0].email;
                            console.log('UserMail ', userMail);

                            // now this is goint to call find or create user

                            const loginRequestOptions = {
                                uri: `${process.env.BACKEND_SERVER_URL}/users/login/`,
                                body: JSON.stringify({
                                    displayName: displayName,
                                    email: userMail,
                                    auth_type: 'AUTH_GITHUB',
                                    token: 'undefined'
                                }),
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                }
                            };
                            request(loginRequestOptions, function(error, response) {
                                if (response && response.body) {
                                    try {
                                        const result = JSON.parse(response.body);
                                        const local_accessToken = jwt.sign(
                                            {
                                                userId: result.user_id,
                                                bToken: result.bToken
                                            },
                                            process.env.JWT_SECRET,
                                            {
                                                expiresIn: '8h'
                                            }
                                        );
                                        cb(null, { jwt: local_accessToken }); // sends the local access token to the call back routine;
                                    } catch (e) {
                                        console.log(e);
                                    }
                                } else {
                                    cb(null, { error: 'Could not login via GitHub' }); // sends the local access token to the call back routine;
                                }
                            });
                        });
                    }
                )
            );
        } catch (e) {
            console.log(e);
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
                        { expiresIn: '8h' }
                    );
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
                        subject: 'SC3 Email Verification',
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
                            subject: 'SC3 Email Verification',
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
                            { expiresIn: '8h' }
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
            console.log('Body', req.body);
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
                                    res.json(response);
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
    }
};
