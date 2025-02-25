const jwt = require('jsonwebtoken');
require('dotenv').config();
const request = require('request');
const verifyToken = require('./veryfyToken');
const { stdout } = require('nodemon/lib/config/defaults');
const childProcess = require('child_process').exec;
const multer = require('multer');
const express = require('express');
const path = require('path');
const fs = require('fs');
const { time } = require('console');

module.exports = {
    preInitialization: function(app) {
        app.post('/preInitializeOntology', verifyToken, (req, res) => {
            // this communicates with the Processing service;
        });
    },

    initializeOntology: function(app) {
        app.post('/initializeOntology', (req, res) => {
            // this communicates with the Processing service;
            console.log('Wants to preInitialize ONtolog  y:');

            const preInitialize_ontology = {
                uri: `${process.env.PROCESSING_SERVER_URL}/initializeOntology/`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            };

            //console.log('PreInitialize_ontology', preInitialize_ontology);
            try {
                request(preInitialize_ontology, function(error, response) {
                    try {
                        console.log('Inside preInitialize_ontology ', response.body);
                        // const resultingData = { ontology_data: jsonModel };
                        res.json(response.body);
                    } catch (e) {
                        res.json({ error: 'Something went wrong' });
                    }
                });
            } catch (e) {
                res.json({ error: 'Something went wrong' });
            }

            //get preinit task from processing service
        });
    },

    compareTwoOntologies: function(app) {
        app.post('/getComparisonResult', (req, res) => {
            const body = req.body;
            //-------------------------------------------------------------------------------------------------

            const compare_ontology_header = {
                uri: `${process.env.PROCESSING_SERVER_URL}/getComparisonResult`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(req.body)
            };

            //console.log('PreInitialize_ontology', preInitialize_ontology);
            try {
                request(compare_ontology_header, function(error, response) {
                    try {
                        //console.log('Inside compareTwoontologies ', response.body);
                        // const resultingData = { ontology_data: jsonModel };
                        res.json(response.body);
                    } catch (e) {
                        res.json({ error: 'Something went wrong' });
                    }
                });
            } catch (e) {
                res.json({ error: 'Something went wrong' });
            }

            //---------------------------------------------------------------------------------------------------
            // const command =
            //     'java -jar robot.jar  diff --left-iri ' + body['first_ontology'] + ' --right-iri ' + body['second_ontology'] + '  --format html';
            //
            // childProcess(command, function(err, stdout, stderr) {
            //     if (err) {
            //         console.log(err);
            //     }
            //     res.json(stdout);
            // });
        });
    },

    getJSONModelForOntologyID: function(app) {
        // TODO : this should only work when we have verified the token

        app.get('/getJsonModelForId', (req, res) => {
            const query = req.query;

            if (!query.ontology_id) {
                return res.status(400).json({
                    error: 'Missing ontology_id parameter'
                });
            }

            const ontology_indexOptions = {
                uri: `${process.env.BACKEND_SERVER_URL}/ontologyIndex/?ontology_id=${query.ontology_id}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                // Add timeout to prevent hanging requests
                timeout: 5000
            };

            // two nested requests, one fetches the data from backend, the other fetches the json model from processing
            console.log('REQUESTING DATA FROM BACKEND:', ontology_indexOptions.uri);

            request(ontology_indexOptions, function(error, response) {
                // Handle request error
                if (error) {
                    console.error('Backend request failed:', error);
                    return res.status(500).json({
                        error: 'Failed to fetch from backend',
                        details: error.message
                    });
                }

                // Check response status
                if (!response || response.statusCode !== 200) {
                    console.error('Backend error:', {
                        statusCode: response?.statusCode,
                        body: response?.body
                    });
                    return res.status(response?.statusCode || 500).json({
                        error: 'Backend server error',
                        details: response?.body
                    });
                }

                try {
                    // Validate response body
                    if (!response.body) {
                        throw new Error('Empty response from backend');
                    }

                    const result = JSON.parse(response.body);

                    if (!result.ontology_data) {
                        throw new Error('No ontology data in response');
                    }

                    console.log('Got ontology data for ID:', query.ontology_id);

                    const ontologyProcessing_options = {
                        uri: `${process.env.PROCESSING_SERVER_URL}/getJsonModelVOWL`,
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json'
                        },
                        body: JSON.stringify({ ontologyData: result.ontology_data }),
                        timeout: 10000
                    };

                    console.log('Requesting some data from processing service', ontologyProcessing_options.uri);

                    request(ontologyProcessing_options, function(procError, procResponse) {
                        if (procError) {
                            console.error('Processing service error:', procError);
                            return res.status(500).json({
                                error: 'Processing service failed',
                                details: procError.message
                            });
                        }

                        try {
                            const jsonModel = JSON.parse(procResponse.body);
                            return res.json({ ontology_data: jsonModel });
                        } catch (parseError) {
                            console.error('Failed to parse processing response:', parseError);
                            return res.status(500).json({
                                error: 'Invalid response from processing service',
                                details: procResponse.body
                            });
                        }
                    });
                } catch (e) {
                    console.error('Error processing backend response:', e);
                    return res.status(500).json({
                        error: 'Failed to process backend response',
                        details: e.message
                    });
                }
            });
        });
    },

    getWidocoDocumentation: function(app) {
        const storage = multer.memoryStorage();
        const upload = multer({ storage: storage });
        app.post('/getWidoco', upload.single('file'), (req, res) => {
            const file = req.file;
            if (!file) {
                res.send('No file provided');
            }
            const fileContent = file.buffer;
            const formData = {
                file: {
                    value: fileContent,
                    options: {
                        filename: file.originalname,
                        contentType: file.mimetype
                    }
                }
            };
            const header = {
                uri: `${process.env.PROCESSING_SERVER_URL}/getWidocoDocumentation`,
                method: 'POST',
                formData: formData
            };
            request(header, (error, response) => {
                if (error) {
                    res.send('Something went wrong, Please try again after some time');
                }
                if (response.body === true) {
                    res.json({ success: true });
                } else {
                    res.send(response.body);
                }
            });
        });
    },

    getHtmlForWidoco: function(app) {
        app.use('/getHtmlForWidoco', (req, res) => {
            // Set the file paths for Widoco-generated documentation. These paths depend on whether the script is being run on a local machine or a server.

            // For local machines, the documentation is generated in the widoco_doc_directory and widoco_directory.
            const widoco_doc_directory = path.join(__dirname, '..', '..', '..', 'Widoco_Document/doc');
            const widoco_directory = path.join(__dirname, '..', '..', '..', 'Widoco_Document');

            // For servers, the documentation is generated in the document_doc and document_dir located in the same directory as the script.
            const document_doc = path.join(__dirname, 'Widoco_Document/doc');
            const document_dir = path.join(__dirname, 'Widoco_Document');

            let staticPath;

            if (fs.existsSync(widoco_doc_directory)) {
                staticPath = widoco_doc_directory;
            } else if (fs.existsSync(widoco_directory)) {
                staticPath = widoco_directory;
            } else if (fs.existsSync(document_doc)) {
                staticPath = document_doc;
            } else if (fs.existsSync(document_dir)) {
                staticPath = document_dir;
            } else {
                res.status(404).send('Page is not available in this moment!');
                return;
            }

            const files = fs.readdirSync(staticPath);
            if (files.length > 0) {
                express.static(staticPath)(req, res);
            } else {
                res.status(404).send('Page is not available in this moment!');
            }
        });
    }
};
