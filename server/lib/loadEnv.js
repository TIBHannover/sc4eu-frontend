// Loads server/.env before any other module reads process.env.
// Variables that are already set (e.g. by docker compose) take precedence.
import path from 'node:path';

try {
    process.loadEnvFile(path.join(import.meta.dirname, '..', '.env'));
} catch (error) {
    if (error.code !== 'ENOENT') {
        throw error;
    }
}
