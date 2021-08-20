const jwt = require('jsonwebtoken');
const GitHubStrategy = require('passport-github').Strategy;
require('dotenv').config();
const request = require('request');

// configuring some url and ports before the app;
const APPLICATION_PORT = process.env.APPLICATION_PORT ? process.env.APPLICATION_PORT : '9000';
const APPLICATION_URL = process.env.APPLICATION_URL ? process.env.APPLICATION_URL : 'http://localhost';

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

        app.use(passport.initialize());

        try {
            passport.use(
                new GitHubStrategy(
                    {
                        clientID: process.env.GITHUB_CLIENT_ID,
                        clientSecret: process.env.GITHUB_CLIENT_SECRET,
                        callbackURL: APPLICATION_URL + ':' + APPLICATION_PORT + '/auth/github/callback'
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
                    res.json({ jwt: local_accessToken });
                } else {
                    res.json({ error: 'Could not register user' });
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
                        res.json({ jwt: local_accessToken });
                    } else {
                        res.json({ error: 'Could not find user' });
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
