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
    console.log('Discussion response: ' + saveDiscussionResponse);

    let attempts = 0;
    const maxAttempts = 10;
    const pollInterval = 60000; // Poll every minute

    // Get the SHA from the response if available
    const currentSha = saveDiscussionResponse?.content?.sha;

    const poll = () => {
        getFileDataFromGitHub(gitHubDiscussionUrl).then(latestData => {
            if (currentSha && currentSha === latestData.sha) {
                queryClient.invalidateQueries({ queryKey: ['discussions'] }).then(r => console.log('discussion data invalidated successfully'));
                return;
            }
            if (attempts < maxAttempts) {
                console.log('polling for the latest discussion data');
                attempts++;
                setTimeout(poll, pollInterval);
            } else {
                console.log('Discussion data has not changed after maximum attempts');
            }
        });
    };
    poll();
}

export async function commitChanges(queryClient, commitMessage) {
    const dataToCommit = queryClient.getQueryData(['terms']);
    const saveResponse = await saveAllTerms(dataToCommit, commitMessage);
    const currentSha = saveResponse.content.sha;

    const jsonDataToCommit = queryClient.getQueryData(['discussions']);
    const saveDiscussionResponse = await saveAllDiscussion(jsonDataToCommit, commitMessage);
    console.log('Discussion response: ' + saveDiscussionResponse);

    let attempts = 0;
    const maxAttempts = 10;
    const pollInterval = 60000; // Poll every minute

    const poll = () => {
        getFileDataFromGitHub(gitHubFileUrl).then(latestData => {
            if (currentSha === latestData.sha) {
                queryClient.invalidateQueries({ queryKey: ['terms'] }).then(r => console.log('data invalidated' + ' successfully: '));
                return;
            }
            if (attempts < maxAttempts) {
                console.log('polling for the latest data');
                attempts++;
                setTimeout(poll, pollInterval);
            } else {
                console.log('Data has not changed after maximum attempts');
            }
        });
    };
    poll();
}
