import { submitGetRequest, submitPostRequest } from './networkRequests';
import { URL_LOCAL_GIT_VERSIONS } from 'constants/services';

export const getTermVersions = term_uuid => {
    return submitGetRequest(`${URL_LOCAL_GIT_VERSIONS}/?term_uuid=${term_uuid}`, {}, false);
};