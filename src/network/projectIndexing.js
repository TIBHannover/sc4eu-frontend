import { plainGetRequest, submitPostRequest } from './networkRequests';
import { URL_CREATE_PROJECT, URL_DELETE_PROJECT, URL_EDIT_PROJECT, URL_PROJECTINDEXING } from '../constants/services';

export const getAllProjects = () => {
    // we use parameters from env.
    return plainGetRequest(URL_PROJECTINDEXING, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_EXPRESS_BACKEND_URL}`
    });
};
export const deleteProject = project_id => {
    const postHeader = { 'Content-Type': 'application/json' };
    return submitPostRequest(URL_DELETE_PROJECT, postHeader, { projectIdToDelete: project_id });
};

export const createProject = project => {
    const postHeader = { 'Content-Type': 'application/json' };
    return submitPostRequest(URL_CREATE_PROJECT, postHeader, project);
};

export const editProject = project => {
    const patchHeader = { 'Content-Type': 'application/json' };
    return submitPostRequest(URL_EDIT_PROJECT, patchHeader, project);
};