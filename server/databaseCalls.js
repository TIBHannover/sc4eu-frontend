const jwt = require('jsonwebtoken');
const GitHubStrategy = require('passport-github').Strategy;
require('dotenv').config();
const request = require('request');

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
    uploadOntology: function(app) {
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
    },
    viewUserSettings: function(app) {
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
    }
};
