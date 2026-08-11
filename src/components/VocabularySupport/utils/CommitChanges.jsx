import { writeRDF } from '../../../network/parseRDFCalls';
import { getFileDataFromGitHub } from '../../../network/GitAPICalls';
import { writeJSON } from '../../../network/parseJSONCalls';

//const gitHubFileUrl = 'https://raw.githubusercontent.com/tib-ts/vocabulary_development/main/testexample.ttl';
const gitHubFileUrl = process.env.REACT_APP_VOCABULARY_SERVICE_URL;
async function saveAllTerms(newData, commitMessage) {
    return await writeRDF(gitHubFileUrl, newData, commitMessage);
}

const gitHubDiscussionUrl = process.env.REACT_APP_VOCABULARY_SERVICE_DISCUSSION_URL;
async function saveAllDiscussion(newData, commitMessage) {
    return await writeJSON(gitHubDiscussionUrl, newData, commitMessage);
}

// Commits only the discussion data
export async function commitDiscussionOnly(queryClient) {
    const commitMessage = 'Update discussion'; // Hardcoded for now
    const jsonDataToCommit = queryClient.getQueryData(['discussions']);
    const saveDiscussionResponse = await saveAllDiscussion(jsonDataToCommit, commitMessage);

    let attempts = 0;
    const maxAttempts = 10;
    const pollInterval = 60000; // Poll every minute

    // Get the SHA from the response if available
    const currentSha = saveDiscussionResponse?.content?.sha;

    const poll = () => {
        getFileDataFromGitHub(gitHubDiscussionUrl).then(latestData => {
            if (currentSha && currentSha === latestData.sha) {
                queryClient.invalidateQueries({ queryKey: ['discussions'] });
                return;
            }
            if (attempts < maxAttempts) {
                attempts++;
                setTimeout(poll, pollInterval);
            }
        });
    };
    poll();
}

export async function commitChanges(queryClient, commitMessage) {
    const dataToCommit = queryClient.getQueryData(['terms']);
    const saveResponse = await saveAllTerms(dataToCommit, commitMessage);
    const currentSha = saveResponse.content.sha;

    let attempts = 0;
    const maxAttempts = 10;
    const pollInterval = 60000; // Poll every minute

    const poll = () => {
        getFileDataFromGitHub(gitHubFileUrl).then(latestData => {
            if (currentSha === latestData.sha) {
                queryClient.invalidateQueries({ queryKey: ['terms'] });
                return;
            }
            if (attempts < maxAttempts) {
                attempts++;
                setTimeout(poll, pollInterval);
            }
        });
    };
    poll();
}
