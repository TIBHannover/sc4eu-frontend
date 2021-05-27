// import env from '@beam-australia/react-env';

export const URL_ONTOLOGYINDEXING = `${process.env.REACT_APP_FLASK_BACKEND_URL}ontologyIndex/`;
export const URL_INITIALIZE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}uploadOntology`;
export const URL_PRE_INIT = `${process.env.REACT_APP_ONTOLOGY_SERVICE_BACKEND_URL}initializeOntology/`;
export const URL_GET_JSON_MODEL = `${process.env.REACT_APP_ONTOLOGY_SERVICE_BACKEND_URL}getJsonModel`;

export const URL_LOGIN_VIA_GITHUB = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}auth/github`;
export const URL_LOGIN_VIA_EMAIL = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}auth/email`;
export const URL_REGISTER_VIA_EMAIL = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}users/register`;

export const URL_EXPRESS_SERVER = 'http://localhost:9000';

// export const URL_GET_USER_PROFILE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}/users/viewProfile`;
export const URL_GET_USER_PROFILE = 'http://localhost:9000/user/viewProfile';
export const URL_GET_USER_SETTINGS = 'http://localhost:9000/user/settings/';
export const URL_UPDATE_USER_SETTING = 'http://localhost:9000/user/updateSettings';

export const URL_ADMIN_DASHBOARD = 'http://localhost:9000/dashboard';
export const URL_CHECK_IF_ABLE_TO_UPLOAD_ONTOLOGY = 'http://localhost:9000/allowed_upload_of_ontologies';
