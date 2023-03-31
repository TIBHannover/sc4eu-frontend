//import { URL_GET_USER_PROFILE, URL_GET_USER_SETTINGS, URL_UPDATE_USER_SETTING } from 'constants/services';

import { submitGetRequest, submitPostRequest, submitPutRequest } from './networkRequests';
import {
    URL_DELETE_USER,
    URL_GET_ALL_ROLES,
    URL_GET_ALL_USERS,
    URL_GET_USER_PROJECT,
    URL_GET_USER_PROJECTS_Detail,
    URL_GET_USER_ROLE,
    URL_UPDATE_USER_PROJECTS,
    URL_UPDATE_USER_ROLE,
    URL_GET_PROJECT_USERS_Detail,
    URL_GET_USER_PROFILE,
    URL_GET_USER_SETTINGS,
    URL_UPDATE_USER_SETTING,
    URL_UNREGISTER_USER_FROM_PROJECT,
    URL_CHECK_USER_EXIST_BY_EMAIL,
    URL_ADD_USER_TO_PROJECT,
    URL_GET_ALL_SYSTEM_ADMIN
} from '../constants/services';

export const getUserProfile = payload => {
    return submitGetRequest(`${URL_GET_USER_PROFILE}/?id=${payload.user}`, {}, true);
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

    return submitGetRequest(`${URL_GET_ALL_ROLES}`, headers, true);
};

export const getUserRole = userId => {
    return submitGetRequest(`${URL_GET_USER_ROLE}/?userId=${userId}`, {}, false);
};

export const getUserProjects = userId => {
    return submitGetRequest(`${URL_GET_USER_PROJECT}/?userId=${userId}`, {}, false);
};

export const getUserProjectsDetail = userId => {
    return submitGetRequest(`${URL_GET_USER_PROJECTS_Detail}/?userId=${userId}`, {}, false);
};

export const getProjectUsersDetail = projectId => {
    return submitGetRequest(`${URL_GET_PROJECT_USERS_Detail}/?projectId=${projectId}`, {}, false);
};

export const doesUserExist = email => {
    return submitGetRequest(`${URL_CHECK_USER_EXIST_BY_EMAIL}/?email=${email}`, {}, false);
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

export const getAllUsers = () => {
    const headers = {
        'Content-Type': 'application/json'
    };

    return submitGetRequest(URL_GET_ALL_USERS, headers, true);
};

export const getAllSystemAdmin = () => {
    const headers = {
        'Content-Type': 'application/json'
    };

    return submitGetRequest(URL_GET_ALL_SYSTEM_ADMIN, headers, true);
};

export const unregisterUserFromProject = (projectUUID, userUUID) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_EXPRESS_BACKEND_URL}`
    };
    const data = {
        projectUUID: projectUUID,
        userUUID: userUUID
    };
    return submitPutRequest(URL_UNREGISTER_USER_FROM_PROJECT, headers, data);
};

export const addUserToProject = (projectUUID, userUUID) => {
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_EXPRESS_BACKEND_URL}`
    };
    const data = {
        projectUUID: projectUUID,
        userUUID: userUUID
    };
    return submitPutRequest(URL_ADD_USER_TO_PROJECT, headers, data);
};
