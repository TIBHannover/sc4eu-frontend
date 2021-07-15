import { URL_LOGIN_VIA_GITHUB, URL_LOGIN_VIA_EMAIL, URL_REGISTER_VIA_EMAIL, URL_ADMIN_DASHBOARD } from 'constants/services';

import { plainGetRequest, submitGetRequest, submitPostRequest } from './networkRequests';

export const loginViaGithub = () => {
    // we use parameters from env.

    console.log('IN network we want this page', URL_LOGIN_VIA_GITHUB);
    // todo: make flexible based on the env.file
    return plainGetRequest(URL_LOGIN_VIA_GITHUB, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });
};

export const loginViaEmail = (email, password) => {
    // we use parameters from env.
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const data = {
        username: email,
        password
    };

    const formBody = Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');

    return submitPostRequest(URL_LOGIN_VIA_EMAIL, headers, formBody, false, false);
};

export const regsiterViaEmail = (email, password) => {
    // we use parameters from env.
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const data = {
        username: email,
        password
    };

    const formBody = Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');

    return submitPostRequest(URL_REGISTER_VIA_EMAIL, headers, formBody, false, false);
};

export const requestDashboard = () => {
    const headers = {
        'Content-Type': 'application/json'
    };
    console.log('>>>>> REQUESTING ADMIN DASHBOARD');

    return submitGetRequest(URL_ADMIN_DASHBOARD, headers, true);
};
