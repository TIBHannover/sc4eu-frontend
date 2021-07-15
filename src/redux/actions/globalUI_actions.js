import * as type from './types';

export const expandAllBodies = payload => dispatch => {
    dispatch({
        type: type.EXPAND_ALL_RESOURCE_BODIES,
        payload: payload
    });
};
