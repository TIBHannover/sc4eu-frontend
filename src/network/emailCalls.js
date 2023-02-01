import { submitPostRequest } from './networkRequests';
import { URL_PROJECT_ACCESS_EMAIL } from '../constants/services';

export const sendProjectAccessEmail = emailHtml => {
    const headers = {
        'Content-Type': 'application/json'
    };
    return submitPostRequest(URL_PROJECT_ACCESS_EMAIL, headers, emailHtml);
};
