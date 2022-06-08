import { URL_GET_USER_PROFILE, URL_GET_USER_SETTINGS, URL_UPDATE_USER_SETTING } from 'constants/services';

import { submitGetRequest, submitPutRequest } from './networkRequests';
import { URL_DELETE_USER, URL_GET_ALL_ROLES, URL_UPDATE_USER_ROLE } from '../constants/services';

export const getUserProfile = payload => {
    return submitGetRequest(`${URL_GET_USER_PROFILE}/?id=${payload.user}`, {}, false);
};

export const getUserSettings = () => {
    return submitGetRequest(`${URL_GET_USER_SETTINGS}`, {}, true);
};

export const deleteUser = userId => {
    console.log('deleting user.....................', userId);
    return submitGetRequest(`${URL_DELETE_USER}/?userId=${userId}`, {}, false);
};

export const getAllRoles = () => {
    const headers = {
        'Content-Type': 'application/json'
    };
    console.log('>>>>> REQUESTING All Roles');

    return submitGetRequest(`${URL_GET_ALL_ROLES}`, headers, true);
};

export const updateUserSettings = payload => {
    // we a put request on the backend
    // currently our data can only update the user name
    // TODO allow this function to update anything about user that can be updated.

    const data = {
        username: payload.name
    };

    const headers = { 'Content-Type': 'application/json' };
    return submitPutRequest(URL_UPDATE_USER_SETTING, headers, data);
};

export const updateUserRole = payload => {
    //send a put request to backend
    const data = {
        userId: payload.user_id,
        userRole: payload.user_role
    };
    const headers = { 'Content-Type': 'application/json' };
    return submitPutRequest(URL_UPDATE_USER_ROLE, headers, data);
};
