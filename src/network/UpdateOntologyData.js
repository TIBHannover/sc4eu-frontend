import { getLatestCommit, getLatestContent } from './GithubAPICalls';
import { updateOntology } from './ontologyIndexing';

/**
 * @typedef {Object} OntologyUpdateResponse
 * @property {boolean} success - Whether the update was successful
 * @property {string} message - A message describing the result
 * @property {Object} [data] - The response data if successful
 * @property {Error} [error] - The error object if unsuccessful
 */

/**
 * Executes the ontology upload with the latest content
 * @param {Object} ontology - The ontology to update
 * @param {string} latestContent - The latest content from the repository
 * @param {string} gitCommitSha - The latest commit SHA
 * @returns {Promise<OntologyUpdateResponse>}
 */
const executeUpdate = async (ontology, latestContent, gitCommitSha) => {
    try {
        if (!ontology || !latestContent || !gitCommitSha) {
            throw new Error('Missing required data for upload');
        }

        const updateData = {
            name: ontology.name,
            description: ontology.description,
            lookup_type: ontology.lookup_type,
            access_type: ontology.access_type,
            lookup_path: ontology.lookup_path,
            ontology_content: latestContent,
            project_id: ontology.project_id,
            ontology_id: ontology.uuid,
            ontology_git_data: gitCommitSha
        };

        const result = await updateOntology(updateData);

        if (!result?.success) {
            throw new Error(result?.message || 'Failed to upload ontology');
        }

        return {
            success: true,
            message: 'Successfully updated ontology',
            data: result
        };
    } catch (error) {
        console.error('Error in executeUpload:', error);
        return {
            success: false,
            message: error.message || 'An error occurred while uploading the ontology',
            error
        };
    }
};

/**
 * Updates an ontology with the latest content from its repository
 * @param {Object} ontology - The ontology object to update
 * @returns {Promise<OntologyUpdateResponse>}
 */
export const updateOntologyData = async ontology => {
    try {
        if (!ontology?.lookup_path) {
            throw new Error('Invalid ontology: missing lookup path');
        }

        let latestContent = null;
        let gitCommitSha = null;

        if (ontology.lookup_type === 'online-gitlab') {
            //TODO: implement gitlab API calls
        } else {
            // Fetch latest content and commit SHA in parallel
            [latestContent, gitCommitSha] = await Promise.all([getLatestContent(ontology.lookup_path), getLatestCommit(ontology.lookup_path)]);
        }

        if (latestContent?.success === false) {
            alert(latestContent.message || 'Failed to fetch latest content from GitHub. Github API limit exceeded. please try again later');
            throw new Error(latestContent.message || 'Failed to fetch latest content from GitHub');
        }
        if (!latestContent) {
            throw new Error('Failed to fetch latest content');
        }

        if (!gitCommitSha) {
            throw new Error('Failed to fetch latest commit information');
        }

        return await executeUpdate(ontology, latestContent, gitCommitSha);
    } catch (error) {
        console.error('Error in updateOntologyData:', error);
        return {
            success: false,
            message: error.message || 'Failed to update ontology',
            error
        };
    }
};
