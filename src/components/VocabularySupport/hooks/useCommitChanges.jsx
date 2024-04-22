import { useMutation, useQueryClient } from '@tanstack/react-query';
import { writeRDF } from '../../../network/parseRDFCalls';

const gitHubFileUrl = 'https://raw.githubusercontent.com/tib-ts/vocabulary_development/main/testexample.ttl';
async function saveAllTerms(newData, commitMessage) {
    console.log('new data to save', newData);
    //return await saveNewContent('https://github.com/tib-ts/vocabulary_development/blob/main/vocabulary.json', newData);

    return await writeRDF(gitHubFileUrl, newData, commitMessage);
}

function dataHasChanged(newData, queryClient) {
    const currentData = queryClient.getQueryData(['terms']);

    // Compare the new data with the current data
    // This is a simple comparison that checks if the lengths are different
    // You might need to adjust this to suit your specific data structure
    if (newData.length !== currentData.length) {
        return true;
    }

    // If the lengths are the same, check each item in the new data
    // to see if it exists in the current data
    for (let i = 0; i < newData.length; i++) {
        const newItem = newData[i];
        const existsInCurrentData = currentData.some(currentItem => currentItem.id === newItem.id);

        // If an item in the new data doesn't exist in the current data, return true
        if (!existsInCurrentData) {
            return true;
        }
    }

    // If all items in the new data exist in the current data, return false
    return false;
}

/**
 * Custom React hook to commit changes to the server.
 * This hook uses the `useMutation` hook from `react-query` to handle the mutation.
 * The mutation function fetches the current terms from the query client's cache,
 * then saves these terms to the server.
 *
 * @returns {MutationObserver} The mutation observer returned by `useMutation`.
 * This observer can be used to execute the mutation (by calling `mutate` or `mutateAsync`),
 * and to access information about the mutation's current status.
 */
export function useCommitChanges(refetch, commitMessage) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async () => {
            const dataToCommit = queryClient.getQueryData(['terms']);
            await saveAllTerms(dataToCommit, commitMessage);
            return Promise.resolve();
        },
        onMutate: () => {
            console.log('nothing is happening here');
        },
        onSettled: async () => {
            queryClient.invalidateQueries({ queryKey: ['terms'] }).then(r => console.log('data' + ' invalidatedsuccessfully'));
            //await refetch();

            // Below here is a trial to implement polling
            let attempts = 0;
            const poll = () => {
                return refetch().then(async data => {
                    if (attempts < 10) {
                        console.log('another attempt');
                        // Data hasn't updated, increment attempts and poll again after the interval
                        attempts++;
                        setTimeout(poll, 60000); // Poll every minute
                    } else {
                        console.log('Data has not changed after 12 attempts');
                    }
                });
            };

            // Start the polling process
            poll();
        }
    });
}
