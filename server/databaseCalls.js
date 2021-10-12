const jwt = require('jsonwebtoken');
require('dotenv').config();
const request = require('request');
const verifyToken = require('./veryfyToken');

module.exports = {
    getOntologyIndex: function(app) {
        app.get('/ontologyIndex', (req, res) => {
            console.log('Requesting Ontology Index', `${process.env.BACKEND_SERVER_URL}/ontologyIndex`);
            const ontology_indexOptions = {
                uri: `${process.env.BACKEND_SERVER_URL}/ontologyIndex`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            request(ontology_indexOptions, function(error, response) {
                if (response && response.body) {
                    try {
                        const result = JSON.parse(response.body);
                        res.json(result);
                    } catch (e) {
                        res.json({ error: 'Something went wrong' });
                    }
                } else {
                    res.json({ error: 'Something went wrong' });
                }
            });
        });
    },

    // this returns the ttl file content with some meta information Could be used for downloads, KEEP FOR NOW
    getOntologyByID: function(app) {
        app.get('/getOntologyById', (req, res) => {
            const query = req.query;
            const ontology_indexOptions = {
                uri: `${process.env.BACKEND_SERVER_URL}/ontologyIndex/?ontology_id=${query['ontology_id']}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            request(ontology_indexOptions, function(error, response) {
                if (response && response.body) {
                    try {
                        const result = JSON.parse(response.body);
                        res.json(result);
                    } catch (e) {
                        res.json({ error: 'Something went wrong' });
                    }
                } else {
                    res.json({ error: 'Something went wrong' });
                }
            });
        });
    },

    deleteOntology: function(app) {
        app.post('/deleteOntology', verifyToken, (req, res) => {
            console.log('Deleting Ontology as POST ');
            const token = jwt.verify(req.token, process.env.JWT_SECRET);
            const userId = token.userId;
            const data = JSON.stringify(req.body);
            console.log(userId);
            console.log(data);
            const delete_options = {
                uri: `${process.env.BACKEND_SERVER_URL}/delete_ontology/?userId=${userId}&token=${token.bToken}`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            };

            console.log('about to send request to the backend to delete', delete_options);
            try {
                request(delete_options, function(error, response) {
                    if (response && response.body) {
                        console.log('has response', response.body);
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
            } catch (e) {
                console.log(e);
            }
            // 1) send to backend url
            // 2) backedn impletementation
            // 3) return the result of it
            // console.log('DOE WE BREAK HERE????');
            // res.json({ delete_successful: 'unknown' });
        });
    },

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
