require('dotenv').config();
const request = require('request');
const jwt = require('jsonwebtoken');
const verifyToken = require('./veryfyToken');
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

    allRoles: function(app) {
        app.get('/roles/all', verifyToken, (req, res) => {
            if (req.token === null) {
                res.json({ error: 'You need to be logged in to view this page' });
            } else {
                try {
                    const token = jwt.verify(req.token, process.env.JWT_SECRET);
                    console.log(token);
                    if (token) {
                        const userId = token.userId;
                        const options = {
                            uri: `${process.env.BACKEND_SERVER_URL}/roles/all/?userId=${userId}&token=${token.bToken}`,
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        };

                        request(options, function(error, response) {
                            if (response && response.body) {
                                try {
                                    const result = JSON.parse(response.body);
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

    userRole: function(app) {
        app.get('/user/role', (req, res) => {
            const query = req.query;

            if (req.token === null) {
                res.json({ error: 'You need to be logged in to view this page' });
            } else {
                try {
                    const userId = query['userId'];
                    const options = {
                        uri: `${process.env.BACKEND_SERVER_URL}/user/role/?userId=${userId}`,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };

                    request(options, function(error, response) {
                        if (response && response.body) {
                            try {
                                const result = JSON.parse(response.body);
                                res.json(result);
                            } catch (e) {
                                res.json({ error: 'Network error occurred' });
                            }
                        }
                    });
                } catch (e) {
                    res.json({ error: 'Getting User Role: You dont have access to view this page' });
                }
            }
        });
    },

    userProject: function(app) {
        app.get('/user/projects', (req, res) => {
            const query = req.query;
            if (req.token === null) {
                res.json({ error: 'You need to be logged in to view this page' });
            } else {
                try {
                    const userId = query['userId'];
                    const options = {
                        uri: `${process.env.BACKEND_SERVER_URL}/user/projects/?userId=${userId}`,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };

                    request(options, function(error, response) {
                        if (response && response.body) {
                            try {
                                const result = JSON.parse(response.body);
                                res.json(result);
                            } catch (e) {
                                res.json({ error: 'Network error occurred' });
                            }
                        }
                    });
                } catch (e) {
                    res.json({ error: 'Getting User Role: You dont have access to view this page' });
                }
            }
        });
    },

    userProjectsDetail: function(app) {
        app.get('/user/projectsDetail', (req, res) => {
            const query = req.query;
            if (req.token === null) {
                res.json({ error: 'You need to be logged in to view this page' });
            } else {
                try {
                    const userId = query['userId'];
                    const options = {
                        uri: `${process.env.BACKEND_SERVER_URL}/user/projectsDetail/?userId=${userId}`,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };

                    request(options, function(error, response) {
                        if (response && response.body) {
                            try {
                                const result = JSON.parse(response.body);
                                res.json(result);
                            } catch (e) {
                                res.json({ error: 'Network error occurred in userProjectDetail' });
                            }
                        }
                    });
                } catch (e) {
                    res.json({ error: 'Getting User Role: You dont have access to view this page' });
                }
            }
        });
    },

    projectUsersDetail: function(app) {
        app.get('/project/usersDetail', (req, res) => {
            const query = req.query;
            if (req.token === null) {
                res.json({ error: 'You need to be logged in to view this page' });
            } else {
                try {
                    const projectId = query['projectId'];
                    const options = {
                        uri: `${process.env.BACKEND_SERVER_URL}/project/usersDetail/?projectId=${projectId}`,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };

                    request(options, function(error, response) {
                        if (response && response.body) {
                            try {
                                const result = JSON.parse(response.body);
                                res.json(result);
                            } catch (e) {
                                res.json({ error: 'Network error occurred in projectUsersDetail' });
                            }
                        }
                    });
                } catch (e) {
                    res.json({ error: 'Getting Project Users Details: You dont have access to view this page' });
                }
            }
        });
    },

    adminDashBoard: function(app) {
        app.get('/admin/dashboard', verifyToken, (req, res) => {
            if (req.token === null) {
                res.json({ error: 'You need to be logged in to view this page' });
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

    deleteUser: function(app) {
        app.get('/user/deleteUser', (req, res) => {
            const query = req.query;

            if (req.token === null) {
                console.log('No token');
                res.send(JSON.stringify({ result: 'empty' }));
            } else {
                const userId = query['userId'];
                const options = {
                    uri: `${process.env.BACKEND_SERVER_URL}/users/delete/?userId=${userId}`,
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };
                try {
                    request(options, function(error, response) {
                        if (response && response.body) {
                            const result = JSON.parse(response.body);
                            console.log('results from backend', result);
                            if (result) {
                                if (result.error) {
                                    return res.json(result);
                                } else {
                                    return res.json(result);
                                }
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
                                    res.json({
                                        displayName: result.displayName,
                                        userEmail: result.userEmail,
                                        gravatarId: result.gravatarId,
                                        userId: result.userId,
                                        role: result.role
                                    });
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
    },

    //TODO:  THESE FUNCTIONS NEED ADDITIONAL BACKEND COMMUNICATION FOR ONTOLOGY PROCESSING
    transformVOWL_JSON: function(app) {
        app.post('/playground/transformVOWL_JSON', (req, res) => {
            const result = req.body;
            const ontologyProcessing_options = {
                uri: `${process.env.PROCESSING_SERVER_URL}/getModelFromJsonVOWL`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ontologyData: result })
            };
            // call processing service;
            try {
                request(ontologyProcessing_options, function(error, response) {
                    try {
                        const jsonModel = JSON.parse(response.body);
                        const resultingData = { ontology_data: jsonModel };
                        res.json(resultingData);
                    } catch (e) {
                        res.json({ error: 'Something went wrong' });
                    }
                });
            } catch (e) {
                res.json({ error: 'Something went wrong' });
                console.log(e);
            }
        });
    },
    transformTTL: function(app) {
        app.post('/playground/transformTTL', (req, res) => {
            const ontologyData = req.body;
            const dataToSend = ontologyData.ontologyData;
            const ontologyProcessing_options = {
                uri: `${process.env.PROCESSING_SERVER_URL}/getModelFromTTL`,
                method: 'POST',
                headers: {
                    'Content-Type': 'text/html'
                },
                body: dataToSend
            };
            request(ontologyProcessing_options, function(error, response) {
                try {
                    const jsonModel = JSON.parse(response.body);
                    const resultingData = { ontology_data: jsonModel };
                    res.json(resultingData);
                } catch (e) {
                    res.json({ error: 'Something went wrong' });
                }
            });
        });
    },

    checkUserExists: function(app) {
        app.get('/user/doesUserExist', (req, res) => {
            const query = req.query;
            if (req.token === null) {
                res.json({ error: 'You need to be logged in to view this page' });
            } else {
                try {
                    const emailId = query['email'];
                    const options = {
                        uri: `${process.env.BACKEND_SERVER_URL}/user/doesUserExist/?emailId=${emailId}`,
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    };

                    request(options, function(error, response) {
                        if (response && response.body) {
                            try {
                                const result = JSON.parse(response.body);
                                res.json(result);
                            } catch (e) {
                                res.json({ error: 'Network error occurred' });
                            }
                        }
                    });
                } catch (e) {
                    res.json({ error: 'Checking if User exists: You dont have access to view this page' });
                }
            }
        });
    }
};
