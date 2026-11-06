import path from 'node:path';
import cors from 'cors';
import express, { Router } from 'express';
import { CORS_ORIGINS, PUBLIC_PATH } from './config.js';
import { registerProxyRoutes } from './proxy/proxy.js';
import { accountRouter } from './routes/account.js';
import { eventsRouter } from './routes/events.js';
import { initializePassport, oauthRouter } from './routes/oauth.js';
import { ontologyRouter } from './routes/ontology.js';
import { statusRouter } from './routes/status.js';

const BUILD_DIR = path.join(import.meta.dirname, '..', 'build');

function errorHandler(error, req, res, next) {
    console.error(`${req.method} ${req.originalUrl}:`, error);
    if (res.headersSent) {
        return next(error);
    }
    return res.status(error.status ?? 500).json({ error: 'Something went wrong' });
}

export function createApp() {
    const app = express();
    app.disable('x-powered-by');

    // only needed when the React dev server (localhost:3000) talks to this server
    app.use(cors({ origin: CORS_ORIGINS, methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', credentials: true }));
    app.use(
        express.json({
            limit: '10mb',
            verify: (req, _res, buffer) => {
                req.rawBody = buffer; // for the GitHub webhook signature
            }
        })
    );
    app.use(express.urlencoded({ limit: '10mb', extended: false, parameterLimit: 50_000 }));
    app.use((req, _res, next) => {
        req.body ??= {}; // Express 5 leaves req.body undefined when there is no body
        next();
    });
    app.use(initializePassport());

    const routes = Router();
    routes.use(statusRouter, accountRouter, oauthRouter, ontologyRouter, eventsRouter);
    registerProxyRoutes(routes);
    // React app: static files, and index.html for all other paths (client-side routing)
    routes.use(express.static(BUILD_DIR));
    routes.use((req, res) =>
        req.method === 'GET' || req.method === 'HEAD' ? res.sendFile(path.join(BUILD_DIR, 'index.html')) : res.status(404).json({ error: 'Not found' })
    );

    app.use(PUBLIC_PATH, routes);
    app.use(errorHandler);
    return app;
}
