import { URL_GET_USER_PROFILE, URL_GET_USER_SETTINGS, URL_UPDATE_USER_SETTING } from 'constants/services';

import { submitGetRequest, submitPutRequest } from './networkRequests';

export const getUserProfile = payload => {
    return submitGetRequest(`${URL_GET_USER_PROFILE}/?id=${payload.user}`, {}, false);
};

export const getUserSettings = () => {
    return submitGetRequest(`${URL_GET_USER_SETTINGS}`, {}, true);
};

export const updateUserSettings = payload => {
    // we a put request on the backend
    // currently our data can only update the user name

    const data = {
        username: payload.name
    };

    const headers = { 'Content-Type': 'application/json' };
    return submitPutRequest(URL_UPDATE_USER_SETTING, headers, data);
};
