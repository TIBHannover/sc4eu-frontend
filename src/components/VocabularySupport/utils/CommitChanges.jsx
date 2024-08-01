import { parseRDF, writeRDF } from '../../../network/parseRDFCalls';
import { getFileDataFromGitHub } from '../../../network/GitAPICalls';

const gitHubFileUrl = 'https://raw.githubusercontent.com/tib-ts/vocabulary_development/main/testexample.ttl';
async function saveAllTerms(newData, commitMessage) {
    return await writeRDF(gitHubFileUrl, newData, commitMessage);
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
                queryClient.invalidateQueries({ queryKey: ['terms'] }).then(r => console.log('data invalidated' +
                    ' successfully: '));
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
