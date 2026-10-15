
const KEEP_ALIVE_INTERVAL = 15000;
const GITHUB_MAX_COMMITS_IN_PAYLOAD = 20;

const clients = new Set();

const broadcast = type => {
    clients.forEach(res => res.write(`event: ${type}\ndata: {}\n\n`));
};

setInterval(() => clients.forEach(res => res.write(': ping\n\n')), KEEP_ALIVE_INTERVAL).unref();

const parseFileUrl = fileUrl => {
    if (!fileUrl) {
        return null;
    }
    const url = new URL(fileUrl);
    const parts = url.pathname.split('/').filter(Boolean);
    const [owner, repo] = parts;
    const rest = url.hostname.includes('raw.githubusercontent') ? parts.slice(2) : parts.slice(3);
    const [branch, ...filePath] = rest;
    return { repository: `${owner}/${repo}`.toLowerCase(), branch, path: filePath.join('/') };
};

const getWatchedFiles = () => ({
    terms_changed: parseFileUrl(process.env.VOCABULARY_SERVICE_URL),
    discussions_changed: parseFileUrl(process.env.VOCABULARY_SERVICE_DISCUSSION_URL)
});

/**
 * Finds out which watched files were touched by a push.
 *
 * @param {object} payload - GitHub "push" event payload.
 * @param {object} watchedFiles - event type -> {repository, branch, path}.
 * @returns {string[]} event types to broadcast.
 */
const detectChanges = (payload, watchedFiles) => {
    const commits = Array.isArray(payload.commits) ? payload.commits : [];
    const cannotTell = commits.length === 0 || commits.length >= GITHUB_MAX_COMMITS_IN_PAYLOAD;

    return Object.entries(watchedFiles)
        .filter(([, file]) => {
            if (!file) {
                return false;
            }
            if (payload.ref !== `refs/heads/${file.branch}`) {
                return false;
            }
            if (payload.repository?.full_name?.toLowerCase() !== file.repository) {
                return false;
            }
            if (cannotTell) {
                return true;
            }
            return commits.some(commit => [...(commit.added || []), ...(commit.modified || []), ...(commit.removed || [])].includes(file.path));
        })
        .map(([type]) => type);
};

let webhooks;
const getWebhooks = async () => {
    if (!webhooks) {
        const { Webhooks } = await import('@octokit/webhooks');
        webhooks = new Webhooks({ secret: process.env.GITHUB_WEBHOOK_SECRET });
    }
    return webhooks;
};

const isValidSignature = async (rawBody, signatureHeader) => {
    if (!rawBody || !signatureHeader) {
        return false;
    }
    try {
        return await (await getWebhooks()).verify(rawBody.toString('utf8'), signatureHeader);
    } catch (e) {
        return false;
    }
};

module.exports = {
    parseFileUrl,
    detectChanges,
    isValidSignature,

    subscribe: function(app) {
        app.get('/events', (req, res) => {
            res.writeHead(200, {
                'Content-Type': 'text/event-stream',
                'Cache-Control': 'no-cache',
                'Connection': 'keep-alive',
                'X-Accel-Buffering': 'no'
            });
            res.write('retry: 5000\n\n');
            clients.add(res);
            req.on('close', () => clients.delete(res));
        });
    },

    githubWebhook: function(app) {
        app.post('/github-webhook', async (req, res) => {
            const secret = process.env.GITHUB_WEBHOOK_SECRET;
            if (!secret) {
                return res.status(503).send('GITHUB_WEBHOOK_SECRET is not configured');
            }
            if (!(await isValidSignature(req.rawBody, req.get('X-Hub-Signature-256')))) {
                return res.status(401).send('Invalid signature');
            }

            if (req.get('X-GitHub-Event') === 'push') {
                const changes = detectChanges(req.body, getWatchedFiles());
                changes.forEach(broadcast);
            }
            return res.status(204).end();
        });
    }
};
