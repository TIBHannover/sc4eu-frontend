import { useQuery } from '@tanstack/react-query';
import { parseRDF } from '../../../network/parseRDFCalls';

const gitHubFileUrl = process.env.REACT_APP_VOCABULARY_SERVICE_URL;

async function fetchAllTermsFromGitHubRDF() {
    try {
        return await parseRDF(gitHubFileUrl);
    } catch (e) {
        console.error('Error in fetching data from GitHub ' + e);
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
