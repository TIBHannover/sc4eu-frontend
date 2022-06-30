// import env from '@beam-australia/react-env';

export const URL_PROJECTINDEXING = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}projectIndex/`;
export const URL_CREATE_PROJECT = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}createProject`;
export const URL_DELETE_PROJECT = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}deleteProject`;

export const URL_ONTOLOGYINDEXING = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}ontologyIndex/`;
export const URL_VIEWONTOLOGY = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}getJsonModelForId/`;
export const URL_INITIALIZE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}uploadOntology`;
export const URL_DELETEONTOLOGY = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}deleteOntology`;
export const URL_PRE_INIT = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}initializeOntology/`;
export const URL_GET_JSON_MODEL = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}getJsonModelVOWL`;

export const URL_LOGIN_VIA_GITHUB = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}auth/github`;
export const URL_LOGIN_VIA_EMAIL = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}auth/email`;
export const URL_REGISTER_VIA_EMAIL = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}users/register`;

export const URL_EXPRESS_SERVER = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}`;

// export const URL_GET_USER_PROFILE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}/users/viewProfile`;
export const URL_GET_USER_PROFILE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/viewProfile`;
export const URL_GET_USER_SETTINGS = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/settings/`;
export const URL_UPDATE_USER_SETTING = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/updateSettings`;
export const URL_UPDATE_USER_ROLE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/updateUserRole`;
export const URL_UPDATE_USER_PROJECTS = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/updateUserProjects`;
export const URL_DELETE_USER = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/deleteUser`;
export const URL_GET_ALL_ROLES = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}roles/all`;
export const URL_GET_USER_ROLE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/role`;
export const URL_GET_USER_PROJECT = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/projects`;

export const URL_ADMIN_DASHBOARD = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}admin/dashboard`;
export const URL_CHECK_IF_ABLE_TO_UPLOAD_ONTOLOGY = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}allowed_upload_of_ontologies`;

// playground

export const URL_PLAYGROUND_JSON_TRANSFORM = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}playground/transformVOWL_JSON`;
export const URL_PLAYGROUND_TTL_TRANSFORM = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}/playground/transformTTL`;
// export const URL_PLAYGROUND_JSON_TRANSFORM = `http://localhost:9000/sc3/playground/transformVOWL_JSON`;
// export const URL_PLAYGROUND_TTL_TRANSFORM = `http://localhost:9000/sc3/playground/transformTTL`;
