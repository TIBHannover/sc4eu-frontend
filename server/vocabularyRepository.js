const fs = require('node:fs');
const path = require('node:path');
const { execFile } = require('node:child_process');
const { promisify } = require('node:util');

const { parseFileUrl } = require('./eventsCalls');

/*
 * How to run programs from Node:
 *
 * - exec('git clone ' + url)        -> runs the WHOLE string in a shell (/bin/sh). Easy, but every argument
 *                                      that comes from outside (term id, url, ...) could inject shell commands.
 * - execFile('git', ['clone', url]) -> starts the `git` program directly, arguments are passed as an array,
 *                                      no shell involved -> nothing can be injected. Prefer this one.
 *
 * Both are callback based: execFile(file, args, options, (error, stdout, stderr) => {...}).
 * promisify() turns them into functions returning a Promise of { stdout, stderr }, so they can be awaited.
 * If the program exits with a non-zero code, the Promise rejects (error.code = exit code, error.stderr = git's message).
 */
const execFileAsync = promisify(execFile);

// frontend/vocabulary — outside of server/, so nodemon does not restart on every fetch.
const REPOSITORY_DIR = path.resolve(__dirname, '..', 'vocabulary');

const runGit = async (args, options = {}) => {
    const { stdout } = await execFileAsync('git', args, {
        maxBuffer: 50 * 1024 * 1024, // stdout bigger than this rejects the Promise; default (1 MB) is too small for `git show` of a big file
        ...options
    });
    return stdout.trim();
};

// Runs git against our clone, regardless of the current working directory of the server process.
const runGitInRepository = args => runGit(['--git-dir', REPOSITORY_DIR, ...args]);

const getRepositoryInfo = () => {
    const file = parseFileUrl(process.env.VOCABULARY_SERVICE_TERM_URL);
    if (!file) {
        return null;
    }
    return { ...file, cloneUrl: `https://github.com/${file.repository}.git` };
};

/**
 * Makes sure frontend/vocabulary contains an up-to-date copy of the vocabulary repository.
 * - First start: `git clone --mirror` (bare copy, no working files; `fetch` keeps all branches in sync).
 * - Every next start: `git fetch --prune` (only downloads new commits).
 */
const syncRepository = async () => {
    const repository = getRepositoryInfo();
    if (!repository) {
        console.warn('[vocabulary] VOCABULARY_SERVICE_TERM_URL is not set, skipping repository sync');
        return;
    }

    if (fs.existsSync(REPOSITORY_DIR)) {
        console.info(`[vocabulary] Fetching ${repository.repository} into ${REPOSITORY_DIR}`);
        await runGitInRepository(['fetch', '--prune']);
    } else {
        console.info(`[vocabulary] Cloning ${repository.cloneUrl} into ${REPOSITORY_DIR}`);
        await runGit(['clone', '--mirror', repository.cloneUrl, REPOSITORY_DIR]);
    }

    // Example of reading git's output: last commit that touched the vocabulary file.
    // %x1f is the "unit separator" character, safe to split on because it never appears in commit messages.
    const lastCommit = await runGitInRepository(['log', '-1', '--format=%H%x1f%an%x1f%aI%x1f%s', repository.branch, '--', repository.path]);
    const [sha, author, date, subject] = lastCommit.split('\x1f');
    console.info(`[vocabulary] Ready. Last change of ${repository.path}: ${sha?.slice(0, 7)} by ${author} at ${date} — "${subject}"`);
};

const getTermVersionsByUUID = app => {
    app.get('/versions', async (req, res) => {
        try {
            const query = req.query;
            const versions = await runGitInRepository(['log', '--format=%H%x1f%an%x1f%aI%x1f%s', `--grep=${query['term_uuid']}`]);

            res.json(versions);
        } catch (e) {
            console.error(e);
            res.json({ error: 'Something went wrong' });
        }
    });
};

module.exports = {
    REPOSITORY_DIR,
    runGitInRepository,
    syncRepository,
    getTermVersionsByUUID
};
