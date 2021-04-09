import { URL_LOGIN_VIA_GITHUB } from 'constants/services';
import { plainGetRequest } from './networkRequests';
export const loginViaGithub = () => {
    // we use parameters from env.

    console.log('IN network we want this page', URL_LOGIN_VIA_GITHUB);
    // todo: make flexible based on the env.file
    return plainGetRequest(URL_LOGIN_VIA_GITHUB, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
};
