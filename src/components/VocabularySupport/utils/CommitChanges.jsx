import { parseRDF, writeRDF } from '../../../network/parseRDFCalls';

const gitHubFileUrl = 'https://raw.githubusercontent.com/tib-ts/vocabulary_development/main/testexample.ttl';
async function saveAllTerms(newData, commitMessage) {
    return await writeRDF(gitHubFileUrl, newData, commitMessage);
}

export async function commitChanges(queryClient, commitMessage) {
    const dataToCommit = queryClient.getQueryData(['terms']);
    await saveAllTerms(dataToCommit, commitMessage);

    let attempts = 0;
    const maxAttempts = 10;
    const pollInterval = 60000; // Poll every minute

    const poll = () => {
        parseRDF(gitHubFileUrl).then(latestData => {
            if (JSON.stringify(latestData) === JSON.stringify(dataToCommit)) {
                queryClient.invalidateQueries({ queryKey: ['terms'] }).then(r => console.log('data invalidated' +
                    ' successfully: ' + r));
            }
            if (attempts < maxAttempts) {
                console.log('another attempt');
                attempts++;
                setTimeout(poll, pollInterval);
            } else {
                console.log('Data has not changed after maximum attempts');
            }
        });
    };
    poll();
}
