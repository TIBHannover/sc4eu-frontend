import { useQuery } from '@tanstack/react-query';
import { parseRDF } from '../../../network/parseRDFCalls';
import { parseJSON } from '../../../network/parseJSONCalls';

//const gitHubFileUrl = 'https://raw.githubusercontent.com/tib-ts/vocabulary_development/main/testexample.ttl';
const gitHubFileUrl = process.env.REACT_APP_VOCABULARY_SERVICE_URL;
const jsonGitHubFileUrl = process.env.REACT_APP_VOCABULARY_SERVICE_DISCUSSION_URL;

async function fetchAllTermsFromGitHubRDF() {
    try {
        return await parseRDF(gitHubFileUrl);
    } catch (e) {
        console.log('Error in fetching data from GitHub ' + e);
        return null;
    }
}
export function useGetTerms() {
    return useQuery({
        queryKey: ['terms'],
        queryFn: fetchAllTermsFromGitHubRDF,
        //refetchOnWindowFocus: true,
        staleTime: Infinity,
        refetchOnReconnect: true
    });
}
