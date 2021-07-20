import * as type from './types';

export const expandAllBodies = payload => dispatch => {
    dispatch({
        type: type.EXPAND_ALL_RESOURCE_BODIES,
        payload: payload
    });
};

export const redux_preserveFilterSearch = payload => dispatch => {
    dispatch({
        type: type.PRESERVE_FILTER_SEARCH,
        payload: payload
    });
};
