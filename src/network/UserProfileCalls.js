import { URL_GET_USER_PROFILE, URL_GET_USER_SETTINGS, URL_UPDATE_USER_SETTING, URL_GET_EMAIL_VERIFY } from 'constants/services';

import { submitGetRequest, submitPostRequest, submitPutRequest } from './networkRequests';
import {
    URL_DELETE_USER,
    URL_EDIT_USER_MODAL,
    URL_GET_ALL_ROLES,
    URL_GET_USER_PROJECT,
    URL_GET_USER_ROLE,
    URL_UPDATE_USER_PROJECTS,
    URL_UPDATE_USER_ROLE
} from '../constants/services';

export const getUserProfile = payload => {
    return submitGetRequest(`${URL_GET_USER_PROFILE}/?id=${payload.user}`, {}, false);
};

export const getUserSettings = () => {
    return submitGetRequest(`${URL_GET_USER_SETTINGS}`, {}, true);
};

export const getEmailVerify = (user_id, token) => {
    return submitGetRequest(`${URL_GET_EMAIL_VERIFY}/${user_id}/${token}`, {}, false);
};

export const editUserModal = EditEmailValid => {
    const postHeader = { 'Content-Type': 'application/json' };
    console.log('Edit the User Modal ', EditEmailValid);
    return submitPostRequest(URL_EDIT_USER_MODAL, postHeader, EditEmailValid);
};

export const deleteUser = userId => {
    console.log('deleting user.....................', userId);
    return submitGetRequest(`${URL_DELETE_USER}/?userId=${userId}`, {}, false);
};

export const getAllRoles = () => {
    const headers = {
        'Content-Type': 'application/json'
    };

    return submitGetRequest(`${URL_GET_ALL_ROLES}`, headers, true);
};

export const getUserRole = userId => {
    return submitGetRequest(`${URL_GET_USER_ROLE}/?userId=${userId}`, {}, false);
};

export const getUserProjects = userId => {
    return submitGetRequest(`${URL_GET_USER_PROJECT}/?userId=${userId}`, {}, false);
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
        userRole: payload.role_id
    };

    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_EXPRESS_BACKEND_URL}`
    };
    return submitPutRequest(URL_UPDATE_USER_ROLE, headers, data);
};

export const updateUserProjects = payload => {
    //Send a put request to backend
    const data = {
        userId: payload.user_id,
        projectsId: payload.projects_id
    };
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_EXPRESS_BACKEND_URL}`
    };
    return submitPutRequest(URL_UPDATE_USER_PROJECTS, headers, data);
};
