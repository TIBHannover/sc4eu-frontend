import * as type from './types';
// import { getUserInformation } from "services/backend/users";
// import { Cookies } from 'react-cookie';

export const initializeResourceRelationModel = payload => dispatch => {
    const wrappedPayload = {
        originalModel: JSON.parse(JSON.stringify(payload)), // TODO make deep copy using lodash copy
        ...payload
    };
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
