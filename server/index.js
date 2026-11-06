import './lib/loadEnv.js'; // must stay the first import
import { createApp } from './app.js';
import { APPLICATION_URL, PUBLIC_PATH, PORT } from './config.js';

process.on('unhandledRejection', error => console.error('Unhandled promise rejection:', error));

const server = createApp().listen(PORT, () => {
    console.info(`Server started on port ${PORT}`);
    console.info(`You can access it via ${APPLICATION_URL}:${PORT}${PUBLIC_PATH}/`);
});

// Stop quickly on "docker stop" (open SSE connections would otherwise keep the server alive)
const shutdown = () => {
    server.close(() => process.exit(0));
    server.closeAllConnections();
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
