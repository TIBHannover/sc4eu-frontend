import { parseRDF, writeRDF } from '../../../network/parseRDFCalls';
import { writeJSON } from '../../../network/parseJSONCalls';
import { isEmpty, isEqual, omit, union } from 'lodash';

//const gitHubFileUrl = 'https://raw.githubusercontent.com/tib-ts/vocabulary_development/main/testexample.ttl';
const gitHubFileUrl = process.env.REACT_APP_VOCABULARY_SERVICE_URL;
async function saveAllTerms(newData, commitMessage) {
    return await writeRDF(gitHubFileUrl, newData, commitMessage);
}

const gitHubDiscussionUrl = process.env.REACT_APP_VOCABULARY_SERVICE_DISCUSSION_URL;
async function saveAllDiscussion(newData, commitMessage) {
    return await writeJSON(gitHubDiscussionUrl, newData, commitMessage);
}

let discussionWritesInFlight = 0;
let idleResolvers = [];

/**
 * Runs a discussion change (update of the local cache + commit) and remembers that it is in progress.
 * Live updates must not replace the discussions cache meanwhile, or the not yet committed comment would be lost.
 */
export async function trackDiscussionWrite(write) {
    discussionWritesInFlight++;
    try {
        return await write();
    } finally {
        discussionWritesInFlight--;
        if (discussionWritesInFlight === 0) {
            idleResolvers.forEach(resolve => resolve());
            idleResolvers = [];
        }
    }
}

export const waitForDiscussionWritesIdle = () =>
    discussionWritesInFlight === 0 ? Promise.resolve() : new Promise(resolve => idleResolvers.push(resolve));

// Commits only the discussion data
export async function commitDiscussionOnly(queryClient) {
    await trackDiscussionWrite(async () => {
        const commitMessage = 'Update discussion'; // Hardcoded for now
        const jsonDataToCommit = queryClient.getQueryData(['discussions']);
        await saveAllDiscussion(jsonDataToCommit, commitMessage);
        await queryClient.invalidateQueries({ queryKey: ['discussions'] });
    });
}

export const commitTermChanges = async (queryClient, payload) => {
    const commitMessage = isEmpty(payload.body) ? `${payload.header}` : `${payload.header}\n\n${JSON.stringify(payload.body)}`;
    const dataToCommit = queryClient.getQueryData(['terms']);
    await saveAllTerms(dataToCommit, commitMessage);
    await queryClient.invalidateQueries({ queryKey: ['terms'] });
};

/**
 * Returns the terms to push.
 * - Remote did not change since we loaded it: our local terms are the truth (edits and deletions included).
 * - Remote changed (someone committed): take the remote terms and add the terms the user created locally.
 *   Local edits/deletions of existing terms are dropped in this case.
 */
export function applyLocalChanges(remote, local, baseline) {
    if (JSON.stringify(remote) === JSON.stringify(baseline)) {
        return local;
    }
    const knownIds = new Set(baseline.map(term => term.identifier));
    const remoteIds = new Set(remote.map(term => term.identifier));
    const added = local.filter(term => !knownIds.has(term.identifier) && !remoteIds.has(term.identifier));
    return [...remote, ...added];
}

const MAX_ATTEMPTS = 5;
const RETRY_DELAY_MS = 1000;
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Commits the local terms without overwriting what other users committed.
 * Always: fetch the latest remote terms -> apply the user's changes on top -> push.
 * If somebody commits between our fetch and push (409), the whole cycle is repeated.
 *
 * @param queryClient
 * @param {string} commitMessage
 * @param {Array} baselineTerms - terms as they were before the user's local changes.
 */
export async function commitChanges(queryClient, commitMessage, baselineTerms) {
    let baseline = baselineTerms;
    for (let attempt = 1; ; attempt++) {
        const localTerms = queryClient.getQueryData(['terms']);
        let termsToCommit = localTerms;
        if (baseline) {
            const remoteTerms = await parseRDF(gitHubFileUrl);
            termsToCommit = applyLocalChanges(remoteTerms, localTerms, baseline);
            queryClient.setQueryData(['terms'], termsToCommit);
            baseline = remoteTerms;
        }
        try {
            await saveAllTerms(termsToCommit, commitMessage);
            break;
        } catch (e) {
            if (e?.status !== 409 || !baseline || attempt >= MAX_ATTEMPTS) {
                throw e;
            }
            await sleep(RETRY_DELAY_MS);
        }
    }
    await queryClient.invalidateQueries({ queryKey: ['terms'] });
}

export const generateChangedValues = (termBeforeChange, termAfterChange) => {
    const IGNORED_KEYS = ['modified'];
    const before = omit(termBeforeChange, IGNORED_KEYS);
    const after = omit(termAfterChange, IGNORED_KEYS);

    let result = {};
    union(Object.keys(before), Object.keys(after)).forEach(key => {
        console.log(key)
        if (!isEqual(before[key], after[key])) {
            result[key] = {
                from: before[key] ?? null,
                to: after[key] ?? null
            };
        }
    });
    return result;
};
