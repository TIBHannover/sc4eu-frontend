import * as type from '../actions/types';

const initialState = {
    originalModel: null, // this is the json we get from backend
    resources: null,
    relations: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.INITIALIZE_RESOURCE_RELATION_MODEL:
            return {
                ...state,
                ...action.payload
            };

        default: {
            return state;
        }
    }
};
