import * as type from './types';
// import { getUserInformation } from "services/backend/users";
// import { Cookies } from 'react-cookie';

export const initializeResourceRelationModel = payload => dispatch => {
    const wrappedPayload = {
        originalModel: JSON.parse(JSON.stringify(payload)), // TODO make deep copy using lodash copy
        ...payload
    };
    const thing = {
        annotations: {},
        axioms: {},
        identifier: 'http://www.w3.org/2002/07/owl#Thing',
        resourceURI: 'http://www.w3.org/2002/07/owl#Thing',
        type: ['owl:Class']
    };
    wrappedPayload.resources.push(thing);
    console.log(wrappedPayload);
    dispatch({
        type: type.INITIALIZE_RESOURCE_RELATION_MODEL,
        payload: wrappedPayload
    });
};

export const redux_addResource = payload => dispatch => {
    dispatch({
        type: type.ADD_NEW_RESOURCE,
        payload: payload
    });
};

export const redux_removeResource = payload => dispatch => {
    dispatch({
        type: type.DELETE_RESOURCE,
        payload: payload
    });
};

export const redux_editResource = payload => dispatch => {
    dispatch({
        type: type.EDIT_RESOURCE,
        payload: payload
    });
};

export const redux_addRelation = payload => dispatch => {
    dispatch({
        type: type.ADD_NEW_RELATION,
        payload: payload
    });
};

export const redux_removeRelation = payload => dispatch => {
    dispatch({
        type: type.DELETE_RELATION,
        payload: payload
    });
};

export const redux_editRelation = payload => dispatch => {
    dispatch({
        type: type.EDIT_RELATION,
        payload: payload
    });
};

export const redux_editMetaInfo = payload => dispatch => {
    dispatch({
        type: type.EDIT_METAINFO,
        payload: payload
    });
};

export const redux_addProject = payload => dispatch => {
    dispatch({
        type: type.ADD_PROJECT,
        payload: payload
    });
};

export const redux_removeProject = () => {
    return dispatch => {
        dispatch({
            type: type.DELETE_PROJECT
        });
    };
};

export const redux_addOntology = payload => dispatch => {
    dispatch({
        type: type.ADD_ONTOLOGY,
        payload: payload
    });
};

export const redux_removeOntology = () => {
    return dispatch => {
        dispatch({
            type: type.DELETE_ONTOLOGY
        });
    };
};

export const redux_alreadyLoadedOntology = payload => dispatch => {
    dispatch({
        type: type.ALREADY_LOADED_ONTOLOGY,
        payload: payload
    });
};

export const redux_removeAlreadyLoadedOntology = () => {
    return dispatch => {
        dispatch({
            type: type.DELETE_ALREADY_LOADED_ONTOLOGY
        });
    };
};
