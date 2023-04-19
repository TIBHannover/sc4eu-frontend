import { URL_LOGIN_VIA_GITHUB, URL_LOGIN_VIA_EMAIL, URL_REGISTER_VIA_EMAIL, URL_ADMIN_DASHBOARD, URL_SET_NEW_PASSWORD } from 'constants/services';

import { plainGetRequest, submitGetRequest, submitPostRequest } from './networkRequests';
import { URL_FORGOT_PASSWORD } from '../constants/services';

export const loginViaGithub = () => {
    // we use parameters from env.
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

export const regsiterViaEmail = (displayName, email, password) => {
    // we use parameters from env.
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const data = {
        displayName,
        username: email,
        password
    };

    const formBody = Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');

    return submitPostRequest(URL_REGISTER_VIA_EMAIL, headers, formBody, false, false);
};

export const forgotPassword = email_address => {
    // we use parameters from env.
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const data = {
        email_address
    };
    const formBody = Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');

    return submitPostRequest(URL_FORGOT_PASSWORD, headers, formBody, false, false);
};

export const setNewPassword = (user_id, password) => {
    // we use parameters from env.
    const headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };

    const data = {
        user_id,
        password
    };
    const formBody = Object.keys(data)
        .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
        .join('&');

    return submitPostRequest(URL_SET_NEW_PASSWORD, headers, formBody, false, false);
};

export const requestDashboard = () => {
    const headers = {
        'Content-Type': 'application/json'
    };

    return submitGetRequest(URL_ADMIN_DASHBOARD, headers, true);
};
