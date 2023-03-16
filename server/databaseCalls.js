const jwt = require('jsonwebtoken');
require('dotenv').config();
const request = require('request');
const verifyToken = require('./veryfyToken');

module.exports = {
    getProjectIndex: function(app) {
        app.get('/projectIndex', (req, res) => {
            const project_indexOptions = {
                uri: `${process.env.BACKEND_SERVER_URL}/projectIndex`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            request(project_indexOptions, function(error, response) {
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

    createProject: function(app) {
        app.post('/createProject', verifyToken, (req, res) => {
            console.log('Wants to create the Project');
            if (req.token === null) {
                res.json({ result: false });
            } else {
                const token = jwt.verify(req.token, process.env.JWT_SECRET);
                console.log(token);
                if (token) {
                    const userId = token.userId;
                    const projectData = JSON.stringify(req.body);
                    console.log(projectData);
                    const project_options = {
                        uri: `${process.env.BACKEND_SERVER_URL}/create_new_project/?userId=${userId}&token=${token.bToken}`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: projectData
                    };

                    request(project_options, function(error, response) {
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

    editProject: function(app) {
        app.post('/editProject', verifyToken, (req, res) => {
            if (req.token === null) {
                res.json({ result: false });
            } else {
                const token = jwt.verify(req.token, process.env.JWT_SECRET);
                if (token) {
                    const userId = token.userId;
                    const projectData = JSON.stringify(req.body);
                    const project_options = {
                        uri: `${process.env.BACKEND_SERVER_URL}/edit_project/?userId=${userId}&token=${token.bToken}`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: projectData
                    };

                    request(project_options, function(error, response) {
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
                }
            }
        });
    },

    deleteProject: function(app) {
        app.post('/deleteProject', verifyToken, (req, res) => {
            console.log('Deleting Project as POST ');
            const token = jwt.verify(req.token, process.env.JWT_SECRET);
            const userId = token.userId;
            const data = JSON.stringify(req.body);
            console.log(userId);
            console.log(data);
            const delete_options = {
                uri: `${process.env.BACKEND_SERVER_URL}/delete_project/?userId=${userId}&token=${token.bToken}`,
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
        });
    },

    getOntologyIndex: function(app) {
        app.get('/ontologyIndex', (req, res) => {
            const query = req.query;
            console.log('Requesting Ontology Index', `${process.env.BACKEND_SERVER_URL}/ontologyIndex?project_id=${query['project_id']}`);
            const ontology_indexOptions = {
                uri: `${process.env.BACKEND_SERVER_URL}/ontologyIndex/?project_id=${query['project_id']}`,
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

    getOntologyGitData: function(app) {
        app.get('/getOntologyGitdata', (req, res) => {
            const query = req.query;
            const ontology_id = query['ontology_id'];
            const ontology_indexOptions = {
                uri: `${process.env.BACKEND_SERVER_URL}/get_ontology_gitdata/?ontology_id=${ontology_id}`,
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
    },

    getAllUsers: function(app) {
        app.get('/users/all', (req, res) => {
            try {
                const options = {
                    uri: `${process.env.BACKEND_SERVER_URL}/users/all/`,
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
                res.json({ error: 'You dont have access to view this page' });
            }
        });
    },
    unregisterUserFromProject: function(app) {
        app.put('/project/unregisterUser/', verifyToken, (req, res) => {
            const token = jwt.verify(req.token, process.env.JWT_SECRET);
            const userId = token.userId;
            const data = JSON.stringify(req.body);
            const options = {
                uri: `${process.env.BACKEND_SERVER_URL}/project/unregisterUser/?userId=${userId}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            };

            try {
                request(options, function(error, response) {
                    if (response && response.body) {
                        try {
                            const result = JSON.parse(response.body);
                            res.json(result);
                        } catch (e) {
                            res.json({ error: 'Something went wrong in response' });
                        }
                    } else {
                        res.json({ error: 'Something went wrong in request' });
                    }
                });
            } catch (e) {
                console.log(e);
            }
        });
    },

    addUserToProject: function(app) {
        app.put('/project/addUser/', verifyToken, (req, res) => {
            const token = jwt.verify(req.token, process.env.JWT_SECRET);
            const userId = token.userId;
            const data = JSON.stringify(req.body);
            const options = {
                uri: `${process.env.BACKEND_SERVER_URL}/project/addUser/?userId=${userId}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
            };

            try {
                request(options, function(error, response) {
                    if (response && response.body) {
                        try {
                            const result = JSON.parse(response.body);
                            res.json(result);
                        } catch (e) {
                            res.json({ error: 'Something went wrong in response' });
                        }
                    } else {
                        res.json({ error: 'Something went wrong in request' });
                    }
                });
            } catch (e) {
                console.log(e);
            }
        });
    }
};
