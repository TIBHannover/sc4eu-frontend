import { URL_PLAYGROUND_JSON_TRANSFORM, URL_PLAYGROUND_TTL_TRANSFORM } from 'constants/services';
import { submitPostRequest } from './networkRequests';

export const playground_uploadFile = (type, data) => {
    // check for type
    const postHeader = { 'Content-Type': 'application/json' };
    if (type === 'VOWLJSON') {
        return submitPostRequest(URL_PLAYGROUND_JSON_TRANSFORM, postHeader, JSON.parse(data));
    }
    if (type === 'TTL') {
        return submitPostRequest(URL_PLAYGROUND_TTL_TRANSFORM, postHeader, { ontologyData: data });
    }
};
