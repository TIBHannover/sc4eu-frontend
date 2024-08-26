import { useQuery } from '@tanstack/react-query';
import { parseJSON } from '../../../network/parseJSONCalls';

const gitHubJsonFileUrl = process.env.REACT_APP_VOCABULARY_SERVICE_DISCUSSION_URL;

async function fetchAllTermsFromGitHubJSON() {
    try {
        return await parseJSON(gitHubJsonFileUrl);
    } catch (e) {
        console.log('Error in fetching data from GitHub ' + e);
        return null;
    }
}
export function useGetDiscussion() {
    return useQuery({
        queryKey: ['discussions'],
        queryFn: fetchAllTermsFromGitHubJSON,
        //refetchOnWindowFocus: true,
        staleTime: Infinity,
        refetchOnReconnect: true
    });
}
