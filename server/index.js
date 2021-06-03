const path = require('path');
const express = require('express');
const request = require('request');
require('dotenv').config();

const cors = require('cors');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const GitHubStrategy = require('passport-github').Strategy;

// configuring some url and ports before the app;

const APPLICATION_PORT = process.env.APPLICATION_PORT ? process.env.APPLICATION_PORT : '9000';
const APPLICATION_URL = process.env.APPLICATION_URL ? process.env.APPLICATION_URL : 'http://localhost';

const app = express(); // create express app
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
require('dotenv').config();

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

// add middlewares
app.use(express.static(path.join(__dirname, '..', 'build')));
app.use(express.static('public'));

// start express server on port
app.listen(APPLICATION_PORT, () => {
    console.log('server started on port ' + APPLICATION_PORT);
    console.log('You can access it via ' + APPLICATION_URL + ':' + APPLICATION_PORT);
});

// TODO : make this configurable
// app.use(
//     cors({
//         origin: 'http://localhost:9000', // allow to server to accept request from different origin
//         methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//         credentials: true // allow session cookie from browser to pass through
//     })
// );

// THIS IS ONLY FOR DECOUPLED DEBUGING STUFF, means the react app runs on its own server e.g. localhost:3000
app.use(
    cors({
        origin: 'http://localhost:3000', // allow to server to accept request from different origin
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true // allow session cookie from browser to pass through
    })
);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/oauthStatus', (req, res) => {
    const github_client_id = process.env.GITHUB_CLIENT_ID;
    const github_client_secret = process.env.GITHUB_CLIENT_SECRET;

    if (github_client_id && github_client_id.length > 1 && github_client_secret && github_client_secret.length > 1) {
        res.json({ oauth: true });
    } else {
        res.json({ oauth: false });
    }
});

app.get('/testConnection', (req, res) => {
    const options = {
        uri: `${process.env.BACKEND_SERVER_URL}/ontologyIndex/`,
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    console.log('Requesting the following url', options.uri);
    request(options, function(error, response) {
        if (response && response.body) {
            console.log(response.body);
            res.json({ success: 'true' });
        } else {
            res.json({ error: 'network error' });
        }
    });
});

app.get('/dashboard', verifyToken, (req, res) => {
    console.log('Calling Admin dashBoard');
    if (req.token === null) {
        res.json({ error: 'You need to be logged i n to view this page' });
    } else {
        try {
            const token = jwt.verify(req.token, process.env.JWT_SECRET);
            console.log(token);
            if (token) {
                const userId = token.userId;
                const options = {
                    uri: `${process.env.BACKEND_SERVER_URL}/admin/dashboard/?userId=${userId}&token=${token.bToken}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                request(options, function(error, response) {
                    if (response && response.body) {
                        try {
                            const result = JSON.parse(response.body);
                            console.log('result', result);
                            res.json(result);
                        } catch (e) {
                            res.json({ error: 'Network error occurred' });
                        }
                    }
                });
            }
        } catch (e) {
            res.json({ error: 'You dont have access to view this page' });
        }
    }
});

app.post('/uploadOntology', verifyToken, (req, res) => {
    console.log('Wants to upload the ontology');
    if (req.token === null) {
        res.json({ result: false });
    } else {
        const token = jwt.verify(req.token, process.env.JWT_SECRET);
        console.log(token);
        if (token) {
            const userId = token.userId;
            const data = JSON.stringify(req.body);
            console.log(data);
            const upload_options = {
                uri: `${process.env.BACKEND_SERVER_URL}/upload_ontology/?userId=${userId}&token=${token.bToken}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            };

            request(upload_options, function(error, response) {
                if (response && response.body) {
                    try {
                        const result = JSON.parse(response.body);
                        console.log('result', result);
                        res.json(result);
                    } catch (e) {
                        res.json({ error: 'Something went wrong' });
                    }
                } else {
                    res.json({ error: 'Something went wrong' });
                }
            });
        }
    }
});

app.get('/allowed_upload_of_ontologies', verifyToken, (req, res) => {
    console.log('Calling Admin dashBoard');
    if (req.token === null) {
        res.json({ result: false });
    } else {
        try {
            const token = jwt.verify(req.token, process.env.JWT_SECRET);
            console.log(token);
            if (token) {
                const userId = token.userId;
                const options = {
                    uri: `${process.env.BACKEND_SERVER_URL}/allows_upload/?userId=${userId}&token=${token.bToken}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                request(options, function(error, response) {
                    if (response && response.body) {
                        try {
                            const result = JSON.parse(response.body);
                            console.log('result', result);
                            res.json(result);
                        } catch (e) {
                            res.json({ result: false });
                        }
                    }
                });
            }
        } catch (e) {
            res.json({ result: false });
        }
    }
});

app.get('/user/header', verifyToken, (req, res) => {
    if (req.token === null) {
        res.send(JSON.stringify({ result: 'empty' }));
    } else {
        try {
            const token = jwt.verify(req.token, process.env.JWT_SECRET);
            if (token) {
                const userId = token.userId;
                const options = {
                    uri: `${process.env.BACKEND_SERVER_URL}/users/header/?userId=${userId}&token=${token.bToken}`,
                    method: 'GET',
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
                            res.json({ displayName: result.displayName, gravatarId: result.gravatarId, userId: result.userId });
                        } else {
                            res.json({ error: 'Could not find user' });
                        }
                    } else {
                        res.json({ error: 'Network Error' });
                    }
                });
            } else {
                res.json({ error: 'Invalid Token' });
            }
        } catch (e) {
            res.json({ error: 'Invalid Token' });
        }
    }
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
        console.log('>>> WE HAVE A TOKEN  ');
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        next();
    } else {
        // Forbidden
        console.log('WE DONT HAVE A TOKEN HERE oO ');
        res.send(JSON.stringify({ error: 'No Token Provided' }));
    }
}

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

app.get('/user/viewProfile/', (req, res) => {
    try {
        console.log(req.query);
        const userId = req.query.id;
        const options = {
            uri: `${process.env.BACKEND_SERVER_URL}/users/viewProfile/?userId=${userId}`,
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
    } catch (e) {
        res.json({ error: 'Network Error' });
    }
});

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
                console.log('data:', data);

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
                        console.log('-----------------');
                        console.log(result);
                        console.log('-----------------');
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
                        console.log(result);
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

/** GITHUB OAUTH STUFF**/
app.get('/auth/github', passport.authenticate('github'));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), (req, res) => {
    // TODO: implement the /login page for failureRedirect
    // Successful authentication, redirect home.
    // >> THIS NEEDS TO BE UPDATED TO THE DEPLOYED URL IN THE END
    res.redirect(`http://localhost:9000/loggedIn/${req.user.jwt}`);
});

app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'build', 'index.html'));
});
