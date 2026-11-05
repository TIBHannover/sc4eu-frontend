// Live updates: GitHub pushes to the vocabulary repository are broadcast to browsers via Server-Sent Events.
import { Webhooks } from '@octokit/webhooks';
import { Router } from 'express';

const KEEP_ALIVE_INTERVAL = 15_000;
const GITHUB_MAX_COMMITS_IN_PAYLOAD = 20;

const clients = new Set();

const broadcast = type => clients.forEach(res => res.write(`event: ${type}\ndata: {}\n\n`));

setInterval(() => clients.forEach(res => res.write(': ping\n\n')), KEEP_ALIVE_INTERVAL).unref();

/** "https://raw.githubusercontent.com/owner/repo/branch/path" or ".../owner/repo/blob/branch/path" -> parts */
export function parseFileUrl(fileUrl) {
    if (!fileUrl) {
        return null;
    }
    const url = new URL(fileUrl);
    const parts = url.pathname.split('/').filter(Boolean);
    const [owner, repo] = parts;
    const [branch, ...filePath] = url.hostname.includes('raw.githubusercontent') ? parts.slice(2) : parts.slice(3);
    return { repository: `${owner}/${repo}`.toLowerCase(), branch, path: filePath.join('/') };
}

const getWatchedFiles = () => ({
    terms_changed: parseFileUrl(process.env.VOCABULARY_SERVICE_URL),
    discussions_changed: parseFileUrl(process.env.VOCABULARY_SERVICE_DISCUSSION_URL)
});

/**
 * Finds out which watched files were touched by a push.
 * @param {object} payload - GitHub "push" event payload.
 * @param {object} watchedFiles - event type -> {repository, branch, path}.
 * @returns {string[]} event types to broadcast.
 */
export function detectChanges(payload, watchedFiles) {
    const commits = Array.isArray(payload.commits) ? payload.commits : [];
    const cannotTell = commits.length === 0 || commits.length >= GITHUB_MAX_COMMITS_IN_PAYLOAD;
    const touches = file => commits.some(({ added = [], modified = [], removed = [] }) => [...added, ...modified, ...removed].includes(file.path));

    return Object.entries(watchedFiles)
        .filter(
            ([, file]) =>
                file &&
                payload.ref === `refs/heads/${file.branch}` &&
                payload.repository?.full_name?.toLowerCase() === file.repository &&
                (cannotTell || touches(file))
        )
        .map(([type]) => type);
}

let webhooks;
export async function isValidSignature(rawBody, signatureHeader) {
    if (!rawBody || !signatureHeader) {
        return false;
    }
    webhooks ??= new Webhooks({ secret: process.env.GITHUB_WEBHOOK_SECRET });
    try {
        return await webhooks.verify(rawBody.toString('utf8'), signatureHeader);
    } catch {
        return false;
    }
}

export const eventsRouter = Router();

eventsRouter.get('/events', (req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
        'X-Accel-Buffering': 'no'
    });
    res.write('retry: 5000\n\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
});

// req.rawBody is set by the JSON body parser (see app.js)
eventsRouter.post('/github-webhook', async (req, res) => {
    if (!process.env.GITHUB_WEBHOOK_SECRET) {
        return res.status(503).send('GITHUB_WEBHOOK_SECRET is not configured');
    }
    if (!(await isValidSignature(req.rawBody, req.get('X-Hub-Signature-256')))) {
        return res.status(401).send('Invalid signature');
    }
    if (req.get('X-GitHub-Event') === 'push') {
        detectChanges(req.body, getWatchedFiles()).forEach(broadcast);
    }
    return res.status(204).end();
});
