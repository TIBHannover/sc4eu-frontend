require('dotenv').config();
const request = require('request');
const jwt = require('jsonwebtoken');

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

module.exports = {
    servicesStatus: function(app) {
        app.get('/oauthStatus', (req, res) => {
            const github_client_id = process.env.GITHUB_CLIENT_ID;
            const github_client_secret = process.env.GITHUB_CLIENT_SECRET;

            if (github_client_id && github_client_id.length > 1 && github_client_secret && github_client_secret.length > 1) {
                res.json({ oauth: true });
            } else {
                res.json({ oauth: false });
            }
        });
    },

    testConnection: function(app) {
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
    },

    adminDashBoard: function(app) {
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
    },

    allowUploads: function(app) {
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
    },
    getUserHeader: function(app) {
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
    }
};
