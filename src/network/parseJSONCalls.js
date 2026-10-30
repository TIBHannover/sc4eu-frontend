import { getFileDataFromGitHub, saveNewContent } from './GitAPICalls';
import { Buffer } from 'buffer';

/**
 * Parses RDF data from a given URL and returns an array of quads.
 * Each quad is an object with 'subject', 'predicate', and 'object' properties.
 *
 * @param {string} jsonGitHubURL - The URL of the RDF data to parse.
 * @returns {Promise<{content: string}>} A promise that resolves to an array of quads.
 */
export const parseJSON = async jsonGitHubURL => {
    const jsonDataGithub = await getFileDataFromGitHub(jsonGitHubURL);
    const jsonDecodedDataGithub = Buffer.from(jsonDataGithub['content'], 'base64').toString('utf8');
    return jsonDecodedDataGithub ? JSON.parse(jsonDecodedDataGithub) : [];
};

/**
 * Used when discussions file was edited by different user.
 * To save his and yours changes a local merge between local and remote versions is made
 *
 * @param {string} remoteJson - Discussion file fetched from GitHub.
 * @param {JSON} localJson - Local discussion file from cached sha.
 * @returns {string} - merged discussions file.
 */
function mergeDiscussions(remoteJson, localJson) {
    const merged = new Map(remoteJson.map(d => [d.resourceId, { ...d }]));

    for (const item of localJson) {
        if (!merged.has(item.resourceId)) {
            merged.set(item.resourceId, item);
        } else {
            const remoteEntry = merged.get(item.resourceId);
            const commentMap = new Map((remoteEntry.comments || []).map(c => [c.id, c]));
            for (const localComment of item.comments || []) {
                // local wins on duplicate id (e.g. updated vote)
                commentMap.set(localComment.id, localComment);
            }
            merged.set(item.resourceId, {
                ...remoteEntry,
                ...item,
                comments: [...commentMap.values()]
            });
        }
    }

    return [...merged.values()];
}

/**
 * Writes an array of JavaScript objects into RDF format and commits the changes to the given URL.
 *
 * @param {string} jsonGitHubURL - The URL to commit the changes to.
 * @param {JSON} newDiscussions - The data to write into RDF format.
 * @param commitMessage
 * @returns {Promise} A promise that resolves when the data has been written and the changes have been committed.
 */
export const writeJSON = async (jsonGitHubURL, newDiscussions, commitMessage) => {
    const jsonString = JSON.stringify(newDiscussions, null, 2);
    try {
        return await saveNewContent(jsonGitHubURL, jsonString, commitMessage);
    } catch (e) {
        if (e.status === 409 && e.remoteContent) {
            const remoteJson = JSON.parse(e.remoteContent);
            const merged = mergeDiscussions(remoteJson, newDiscussions);
            const mergedString = JSON.stringify(merged, null, 2);
            return await saveNewContent(jsonGitHubURL, mergedString, commitMessage);
        }
        throw e;
    }
};
