import * as type from './types';
// import { getUserInformation } from "services/backend/users";
import { Cookies } from 'react-cookie';

export const initializeResourceRelationModel = payload => dispatch => {
    const wrappedPayload = {
        originalModel: { ...payload }, // make a hard copy >> TODO Validate if this is correct assumption
        ...payload
    };
    console.log(wrappedPayload);
    dispatch({
        type: type.INITIALIZE_RESOURCE_RELATION_MODEL,
        payload: wrappedPayload
    });
};
