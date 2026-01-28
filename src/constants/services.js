// import env from '@beam-australia/react-env';

export const URL_PROJECTINDEXING = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}projectIndex/`;
export const URL_CREATE_PROJECT = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}createProject`;
export const URL_DELETE_PROJECT = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}deleteProject`;
export const URL_EDIT_PROJECT = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}editProject`;

export const URL_ONTOLOGYINDEXING = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}ontologyIndex/`;
export const URL_GET_ONTOLOGY_GIT_DATA = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}getOntologyGitdata/`;
export const URL_ONTOLOGYBYID = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}getOntologyById/`;
export const URL_VIEWONTOLOGY = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}getJsonModelForId/`;
export const URL_VIEWONTOLOGY_WITH_QUERY = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}getResourceRelationModelForQuery/`;
export const URL_COMPARE_ONTOLOGY = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}getComparisonResult`;
export const URL_GET_WIDOCO_DOCUMENTATION = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}getWidoco`;
export const URL_GET_HTML_FILE_WIDOCO = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}getHtmlForWidoco/index-en.html`;
export const URL_INITIALIZE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}uploadOntology`;
export const URL_UPDATEONTOLOGY = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}updateOntology`;
export const URL_DELETEONTOLOGY = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}deleteOntology`;
export const URL_PRE_INIT = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}initializeOntology/`;
export const URL_GET_JSON_MODEL = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}getJsonModelVOWL`;
export const URL_GET_JSON_MODEL_WITH_QUERY = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}getJsonModelVOWLWithQuery`;

export const URL_LOGIN_VIA_GITHUB = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}auth/github`;
export const URL_LOGIN_VIA_GITLAB = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}auth/gitlab`;
export const URL_LOGIN_VIA_GOOGLE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}auth/google`;
export const URL_LOGIN_VIA_SAP = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}auth/sap`;
export const URL_LOGIN_VIA_EMAIL = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}auth/email`;
export const URL_PROJECT_ACCESS_EMAIL = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}auth/projectAccessEmail`;
export const URL_REGISTER_VIA_EMAIL = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}users/register`;
export const URL_FORGOT_PASSWORD = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/forgotPassword`;
export const URL_SET_NEW_PASSWORD = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/setNewPassword`;
export const URL_EXPRESS_SERVER = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}`;

// export const URL_GET_USER_PROFILE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}/users/viewProfile`;
export const URL_GET_USER_PROFILE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/viewProfile`;
export const URL_GET_USER_SETTINGS = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/settings`;
export const URL_UPDATE_USER_SETTING = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/updateSettings`;
export const URL_UPDATE_USER_ROLE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/updateUserRole`;
export const URL_UPDATE_USER_PROJECTS = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/updateUserProjects`;
export const URL_DELETE_USER = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/deleteUser`;
export const URL_GET_ALL_ROLES = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}roles/all`;
export const URL_GET_USER_ROLE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/role`;
export const URL_GET_USER_PROJECT = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/projects`;
export const URL_GET_USER_PROJECTS_Detail = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/projectsDetail`;
export const URL_GET_PROJECT_USERS_Detail = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}project/usersDetail`;
export const URL_UNREGISTER_USER_FROM_PROJECT = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}project/unregisterUser`;
export const URL_ADD_USER_TO_PROJECT = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}project/addUser`;
export const URL_CHECK_USER_EXIST_BY_EMAIL = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/doesUserExist`;

export const URL_ADMIN_DASHBOARD = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}admin/dashboard`;
export const URL_CHECK_IF_ABLE_TO_UPLOAD_ONTOLOGY = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}allowed_upload_of_ontologies`;
export const URL_GET_ALL_USERS = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}users/all`;
export const URL_GET_ALL_SYSTEM_ADMIN = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}user/getAllSystemAdmin`;

// term vote URLs group
export const URL_CREATE_NEW_TERM_VOTE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}newVote`;
export const URL_UPDATE_EXPERT_VOTE_DECISION = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}updateVoteDecision`;
export const URL_POST_NEW_COMMENT = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}postComment`;
export const URL_GET_TERM_VOTE = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}getTermVote`;
export const URL_GET_TERM_LAST_CONSENSUS = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}getTermLastConsensus`;
export const URL_GET_TERM_VOTES = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}getTermVotes`
export const URL_MANUAL_CLOSE_CONSENSUS = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}closeConsensus`;
// playground

export const URL_PLAYGROUND_JSON_TRANSFORM = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}playground/transformVOWL_JSON`;
export const URL_PLAYGROUND_TTL_TRANSFORM = `${process.env.REACT_APP_EXPRESS_BACKEND_URL}playground/transformTTL`;
// export const URL_PLAYGROUND_JSON_TRANSFORM = `http://localhost:9000/sc3/playground/transformVOWL_JSON`;
// export const URL_PLAYGROUND_TTL_TRANSFORM = `http://localhost:9000/sc3/playground/transformTTL`;
