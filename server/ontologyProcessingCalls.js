const jwt = require('jsonwebtoken');
require('dotenv').config();
const request = require('request');
const verifyToken = require('./veryfyToken');

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

    getJSONModelForOntologyID: function(app) {
        // TODO : this should only work when we have verified the token

        app.get('/getJsonModelForId', (req, res) => {
            const query = req.query;
            const ontology_indexOptions = {
                uri: `${process.env.BACKEND_SERVER_URL}/ontologyIndex/?ontology_id=${query['ontology_id']}`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            };
            // two nested requests, one fetches the data from backend, the other fetches the json model from processing
            console.log('REQUESTING DATA FROM BACKEND:', ontology_indexOptions.uri);

            request(ontology_indexOptions, function(error, response) {
                if (response && response.body) {
                    try {
                        const result = JSON.parse(response.body);
                        console.log('GOT SOME DATA FOR ID:', query['ontology_id']);
                        const ontologyProcessing_options = {
                            uri: `${process.env.PROCESSING_SERVER_URL}/getJsonModelVOWL`,
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ ontologyData: result.ontology_data })
                        };
                        console.log('Requesting some data from processing service', ontologyProcessing_options.uri);

                        request(ontologyProcessing_options, function(error, response) {
                            try {
                                const jsonModel = JSON.parse(response.body);
                                const resultingData = { ontology_data: jsonModel };
                                res.json(resultingData);
                            } catch (e) {
                                res.json({ error: 'Something went wrong in request' + response.body });
                            }
                        });
                    } catch (e) {
                        res.json({ error: 'Something went wrong in try' });
                    }
                } else {
                    res.json({ error: 'Something went wrong in response' });
                }
            });
        });
    }
};
