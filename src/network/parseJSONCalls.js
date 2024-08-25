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
    return JSON.parse(jsonDecodedDataGithub);
};

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
    return await saveNewContent(jsonGitHubURL, jsonString, commitMessage);
};
