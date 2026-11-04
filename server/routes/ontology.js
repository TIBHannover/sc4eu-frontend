// Ontology routes that are more than a plain pass-through: visualisation models and Widoco documentation.
import { existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import express, { Router } from 'express';
import multer from 'multer';
import { UPSTREAMS } from '../config.js';
import { callUpstreamJson } from '../lib/upstream.js';

const NOT_AVAILABLE = 'Page is not available in this moment!';
// Widoco output is shared with the processing service through a volume.
// Locally it lies next to the repositories, in Docker it is mounted at server/Widoco_Document.
const WIDOCO_DIRS = ['../../../Widoco_Document/doc', '../../../Widoco_Document', 'Widoco_Document/doc', 'Widoco_Document'].map(dir =>
    path.join(import.meta.dirname, '..', dir)
);

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 8_000_000 } });

export const ontologyRouter = Router();

// Visualisation model of a stored ontology: ontology from the backend -> model from the processing service
ontologyRouter.get('/getJsonModelForId', async (req, res) => {
    const ontologyId = req.query.ontology_id;
    if (!ontologyId) {
        return res.status(400).json({ error: 'Missing ontology_id parameter' });
    }

    let backend;
    try {
        backend = await callUpstreamJson('backend', { path: '/ontologyIndex/', query: { ontology_id: ontologyId }, timeout: 5000 });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to fetch from backend', details: error.message });
    }
    if (backend.status !== 200) {
        return res.status(backend.status || 500).json({ error: 'Backend server error', details: backend.text });
    }
    const invalidBackendResponse = details => res.status(500).json({ error: 'Failed to process backend response', details });
    if (!backend.text) {
        return invalidBackendResponse('Empty response from backend');
    }
    if (backend.data === undefined) {
        return invalidBackendResponse('Backend response is not valid JSON');
    }
    if (!backend.data?.ontology_data) {
        return invalidBackendResponse('No ontology data in response');
    }

    let model;
    try {
        model = await callUpstreamJson('processing', {
            method: 'POST',
            path: '/getJsonModelVOWL',
            json: { ontologyData: backend.data.ontology_data },
            timeout: 10_000
        });
    } catch (error) {
        return res.status(500).json({ error: 'Processing service failed', details: error.message });
    }
    if (model.data === undefined) {
        return res.status(500).json({ error: 'Invalid response from processing service', details: model.text });
    }
    return res.json({ ontology_data: model.data });
});

// Visualisation model for a SPARQL query
ontologyRouter.post('/getJsonModelVOWLWithQuery', async (req, res) => {
    const sparqlQuery = req.body?.sparql_query;
    if (!sparqlQuery) {
        return res.status(400).json({ error: 'Missing sparql_query in request body' });
    }
    try {
        const { text, data } = await callUpstreamJson('processing', {
            method: 'POST',
            path: '/getJsonModelVOWLWithQuery',
            json: { sparql_query: sparqlQuery },
            timeout: 15_000
        });
        return text ? res.json(data ?? text) : res.json();
    } catch (error) {
        return res.status(500).json({ error: 'Processing service failed', details: error.message });
    }
});

// Generates Widoco documentation for an uploaded ontology file (result is served by /getHtmlForWidoco)
ontologyRouter.post('/getWidoco', upload.single('file'), async (req, res) => {
    const { file } = req;
    if (!file) {
        return res.send('No file provided');
    }
    const form = new FormData();
    form.append('file', new Blob([file.buffer], { type: file.mimetype }), file.originalname);
    try {
        const response = await fetch(`${UPSTREAMS.processing}/getWidocoDocumentation`, {
            method: 'POST',
            body: form,
            signal: AbortSignal.timeout(300_000)
        });
        return res.json(await response.text());
    } catch (error) {
        console.error('getWidoco:', error.message);
        return res.send('Something went wrong, Please try again after some time');
    }
});

// Serves the generated Widoco documentation
const staticHandlers = new Map();
ontologyRouter.use('/getHtmlForWidoco', (req, res) => {
    const dir = WIDOCO_DIRS.find(candidate => existsSync(candidate) && statSync(candidate).isDirectory() && readdirSync(candidate).length > 0);
    if (!dir) {
        return res.status(404).send(NOT_AVAILABLE);
    }
    if (!staticHandlers.has(dir)) {
        staticHandlers.set(dir, express.static(dir));
    }
    return staticHandlers.get(dir)(req, res, () => res.status(404).send(NOT_AVAILABLE));
});
