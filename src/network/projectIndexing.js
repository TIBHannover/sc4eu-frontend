import { plainGetRequest, submitPatchRequest, submitPostRequest } from './networkRequests';
import { URL_DELETE_PROJECT, URL_EDIT_PROJECT, URL_PROJECTINDEXING } from '../constants/services';
import { URL_CREATE_PROJECT } from '../constants/services';

export const getAllProjects = () => {
    // we use parameters from env.

    console.log('IN network we want this page', URL_PROJECTINDEXING);

    // todo: make flexible based on the env.file
    return plainGetRequest(URL_PROJECTINDEXING, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_EXPRESS_BACKEND_URL}`
    });
};
export const deleteProject = project_id => {
    const postHeader = { 'Content-Type': 'application/json' };
    console.log('Deleting Ontology: ', { projectIdToDelete: project_id });
    return submitPostRequest(URL_DELETE_PROJECT, postHeader, { projectIdToDelete: project_id });
};

export const createProject = project => {
    const postHeader = { 'Content-Type': 'application/json' };
    console.log('Creating the Project ', project);
    return submitPostRequest(URL_CREATE_PROJECT, postHeader, project);
};

export const editProject = project => {
    const patchHeader = { 'Content-Type': 'application/json' };
    console.log('Edit the Project ', project);
    return submitPatchRequest(URL_EDIT_PROJECT, patchHeader, project);
};

// TODO we will check who can create projects
/*export const userIsAllowdToCreateProject = () => {
    const header = { 'Content-Type': 'application/json' };
    return submitGetRequest(URL_CHECK_IF_ABLE_TO_CREATE_PROJECT, header, true);
};*/
