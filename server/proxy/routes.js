// Route table for the generic proxy: every route through which the browser can reach the
// backend services. Anything not listed here is not reachable (the backend has no auth itself).
// Routes that need more than forwarding live in ../routes/*.js.
//
//   method, path    Express route (mounted under PUBLIC_PATH, e.g. /ocp)
//   target          'backend' (Flask) | 'fastapi' | 'processing'
//   to              upstream path, or (req) => path
//   upstreamMethod  only if different from `method`
//   query           (req) => upstream query params from the client request; anything else is dropped
//   identity        added to the upstream query from the verified login JWT:
//                     'userId+token' -> userId & token (= bToken)   'userId' -> userId   'token' -> token
//   body            'json' (whole request body; default for POST/PUT) | (req) => object
//   auth            'public' | 'login' | [roles] | { selfOr: [roles] }   (see lib/auth.js)
//   response        'json' (default) | 'envelope' ({ statusCode, body: <raw text> }) | 'text' (raw text as JSON string)
//                   | { pick: [fields] }
//   errors          bodies sent with HTTP 200 (existing API contract), merged over DEFAULT_ERRORS:
//                     upstream: unreachable/timeout/empty body   parse: body is not JSON
//                     denied: bad token or missing role          empty: upstream returned null/false
import { ROLES } from '../lib/auth.js';

const { SYSTEM_ADMIN, PROJECT_ADMIN } = ROLES;
const ADMINS = [SYSTEM_ADMIN, PROJECT_ADMIN];
const enc = encodeURIComponent;

export const DEFAULT_ERRORS = {
    upstream: { error: 'Something went wrong' },
    parse: { error: 'Something went wrong' },
    denied: { error: 'You dont have access to view this page' }
};

const NETWORK_ERROR = { error: 'Network Error' };
const NETWORK_ERROR_OCCURRED = { error: 'Network error occurred' };
const networkErrors = body => ({ upstream: body, parse: body });

export const proxyRoutes = [
    // ------------------------------------------------------------------ current user
    {
        method: 'GET', path: '/user/header', target: 'backend', to: '/users/header/', identity: 'userId+token', auth: 'login',
        response: { pick: ['displayName', 'userEmail', 'gravatarId', 'userId', 'role'] },
        errors: { ...networkErrors(NETWORK_ERROR), denied: { error: 'Invalid Token' }, empty: { error: 'Could not find user' } }
    },
    {
        method: 'GET', path: '/user/settings/', target: 'backend', to: '/users/viewProfile/', identity: 'userId+token', auth: 'login',
        response: 'envelope',
        errors: { ...networkErrors(NETWORK_ERROR), denied: { error: 'Invalid Token' }, empty: { error: 'Could not find user' } }
    },
    {
        method: 'PUT', path: '/user/updateSettings', target: 'backend', to: '/users/viewProfile/', upstreamMethod: 'POST',
        identity: 'userId+token', body: req => ({ username: req.body.username, linkedin_publication_consent: req.body.linkedin_publication_consent }), auth: 'login', response: 'envelope',
        errors: { ...networkErrors(NETWORK_ERROR), denied: { error: 'Could not update ' }, empty: { error: 'error while updating user settings' } }
    },
    {
        // profile of any user; the backend adds private fields only if the token belongs to that user
        method: 'GET', path: '/user/viewProfile/', target: 'backend', to: '/users/viewProfile/',
        query: req => ({ userId: req.query.id }), identity: 'token', auth: 'login', response: 'envelope',
        errors: { ...networkErrors(NETWORK_ERROR), denied: NETWORK_ERROR, empty: { error: 'Could not find user' } }
    },
    {
        method: 'GET', path: '/user/projects', target: 'backend', to: '/user/projects/',
        query: req => ({ userId: req.query.userId }), auth: { selfOr: ADMINS }, errors: networkErrors(NETWORK_ERROR_OCCURRED)
    },
    {
        method: 'GET', path: '/user/projectsDetail', target: 'backend', to: '/user/projectsDetail/', identity: 'userId', auth: 'login',
        errors: networkErrors({ error: 'Network error occurred in userProjectDetail' })
    },
    {
        method: 'GET', path: '/allowed_upload_of_ontologies', target: 'backend', to: '/allows_upload/', identity: 'userId+token', auth: 'login',
        errors: { ...networkErrors({ result: false }), denied: { result: false } }
    },

    // ------------------------------------------------------------------ admin dashboard / user management
    {
        // backend checks the role (requires_role) using the userId from the JWT
        method: 'GET', path: '/admin/dashboard', target: 'backend', to: '/admin/dashboard/', identity: 'userId+token', auth: 'login',
        errors: networkErrors(NETWORK_ERROR_OCCURRED)
    },
    {
        method: 'GET', path: '/roles/all', target: 'backend', to: '/roles/all/', identity: 'userId+token', auth: 'login',
        errors: networkErrors(NETWORK_ERROR_OCCURRED)
    },
    {
        method: 'GET', path: '/user/role', target: 'backend', to: '/user/role/',
        query: req => ({ userId: req.query.userId }), auth: ADMINS, errors: networkErrors(NETWORK_ERROR_OCCURRED)
    },
    {
        method: 'GET', path: '/project/usersDetail', target: 'backend', to: '/project/usersDetail/',
        query: req => ({ projectId: req.query.projectId }), auth: ADMINS,
        errors: networkErrors({ error: 'Network error occurred in projectUsersDetail' })
    },
    {
        method: 'GET', path: '/user/doesUserExist', target: 'backend', to: '/user/doesUserExist/',
        query: req => ({ emailId: req.query.email }), auth: ADMINS, errors: networkErrors(NETWORK_ERROR_OCCURRED)
    },
    {
        method: 'GET', path: '/user/deleteUser', target: 'backend', to: '/users/delete/',
        query: req => ({ userId: req.query.userId }), auth: [SYSTEM_ADMIN],
        errors: { ...networkErrors(NETWORK_ERROR), empty: { error: 'Could not find user' } }
    },
    {
        method: 'PUT', path: '/user/updateUserRole', target: 'backend', to: '/users/updateUserRole/', upstreamMethod: 'POST',
        identity: 'userId+token', body: req => ({ userId: req.body.userId, userRole: req.body.userRole }), auth: [SYSTEM_ADMIN],
        errors: { ...networkErrors(NETWORK_ERROR), denied: { error: 'Could not update ' }, empty: { error: 'error while updating user role' } }
    },
    {
        // @mention list in the vocabulary
        method: 'GET', path: '/users/all', target: 'backend', to: '/users/all/', auth: 'login', errors: networkErrors(NETWORK_ERROR_OCCURRED)
    },
    {
        // recipients for "request Project Admin" e-mails
        method: 'GET', path: '/user/getAllSystemAdmin', target: 'backend', to: '/users/getAllSystemAdmin/', auth: 'login',
        errors: { ...networkErrors(NETWORK_ERROR), empty: { error: 'Could not find system admin' } }
    },
    {
        // backend quirk: GET with a JSON body
        method: 'PUT', path: '/project/addUser/', target: 'backend', to: '/project/addUser/', upstreamMethod: 'GET',
        identity: 'userId', auth: ADMINS,
        errors: { upstream: { error: 'Something went wrong in request' }, parse: { error: 'Something went wrong in response' } }
    },
    {
        method: 'PUT', path: '/project/unregisterUser/', target: 'backend', to: '/project/unregisterUser/', upstreamMethod: 'GET',
        identity: 'userId', auth: ADMINS,
        errors: { upstream: { error: 'Something went wrong in request' }, parse: { error: 'Something went wrong in response' } }
    },

    // ------------------------------------------------------------------ projects
    { method: 'GET', path: '/projectIndex', target: 'backend', to: '/projectIndex/', auth: 'public' },
    { method: 'POST', path: '/createProject', target: 'backend', to: '/create_new_project/', identity: 'userId+token', auth: ADMINS },
    { method: 'POST', path: '/editProject', target: 'backend', to: '/edit_project/', identity: 'userId+token', auth: ADMINS },
    { method: 'POST', path: '/deleteProject', target: 'backend', to: '/delete_project/', identity: 'userId+token', auth: ADMINS },

    // ------------------------------------------------------------------ ontologies
    {
        method: 'GET', path: '/ontologyIndex', target: 'backend', to: '/ontologyIndex/',
        query: req => ({ project_id: req.query.project_id }), auth: 'public'
    },
    {
        method: 'GET', path: '/getOntologyById', target: 'backend', to: '/ontologyIndex/',
        query: req => ({ ontology_id: req.query.ontology_id }), auth: 'public'
    },
    {
        method: 'GET', path: '/getOntologyGitdata', target: 'backend', to: '/get_ontology_gitdata/',
        query: req => ({ ontology_id: req.query.ontology_id }), auth: 'public'
    },
    // any logged-in user may upload into Public projects
    { method: 'POST', path: '/uploadOntology', target: 'backend', to: '/upload_ontology/', identity: 'userId+token', auth: 'login' },
    { method: 'POST', path: '/updateOntology', target: 'backend', to: '/update_ontology/', identity: 'userId+token', auth: ADMINS },
    { method: 'POST', path: '/deleteOntology', target: 'backend', to: '/delete_ontology/', identity: 'userId+token', auth: ADMINS },
    { method: 'POST', path: '/initializeOntology', target: 'processing', to: '/initializeOntology/', auth: 'login', response: 'text' },

    // ------------------------------------------------------------------ vocabulary votes (FastAPI)
    { method: 'GET', path: '/getVotes', target: 'fastapi', to: '/votes', query: req => ({ status: req.query.status || undefined }), auth: 'login' },
    {
        method: 'GET', path: '/getTermVotes', target: 'fastapi', to: req => `/terms/${enc(req.query.term_uuid)}/votes`,
        query: req => ({ status: req.query.status || undefined }), auth: 'login'
    },
    { method: 'GET', path: '/getTermLastConsensus', target: 'fastapi', to: req => `/terms/consensus/${enc(req.query.term_uuid)}`, auth: 'login' },
    { method: 'GET', path: '/getTermOfTheWeek', target: 'fastapi', to: '/terms/ofTheWeek', auth: 'login' },
    { method: 'POST', path: '/newVote', target: 'fastapi', to: req => `/terms/${enc(req.body.term_uuid)}/votes`, auth: [SYSTEM_ADMIN] },
    {
        // TODO: user_name is chosen by the client (anyone can vote as someone else); set it from the logged-in user
        method: 'POST', path: '/updateVoteDecision', target: 'fastapi', upstreamMethod: 'PUT',
        to: req => `/terms/${enc(req.body.term_uuid)}/votes/${enc(req.body.vote_uuid)}`, auth: 'login'
    },
    {
        method: 'POST', path: '/closeConsensus', target: 'fastapi', upstreamMethod: 'PUT',
        to: req => `/terms/${enc(req.body.term_uuid)}/votes/${enc(req.body.vote_uuid)}/close`, auth: [SYSTEM_ADMIN]
    },

    // ------------------------------------------------------------------ push notifications (FastAPI)
    // TODO: subscribe's `username` is chosen by the client; set it from the logged-in user
    { method: 'POST', path: '/subscriber', target: 'fastapi', to: '/api/push/subscribe', auth: 'login' },
    { method: 'POST', path: '/unsubscriber', target: 'fastapi', to: '/api/push/unsubscribe', auth: 'login' },
    { method: 'POST', path: '/notifyNewComment', target: 'fastapi', to: '/api/push/notifyComments', auth: 'login' },
    { method: 'POST', path: '/notifyTermUpdate', target: 'fastapi', to: '/api/push/notifyTerms', auth: 'login' }
];
