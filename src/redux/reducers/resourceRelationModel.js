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

        case type.ADD_NEW_RESOURCE: {
            const resource = action.payload;
            return {
                ...state,
                resources: [resource, ...state.resources]
            };
        }
        case type.DELETE_RESOURCE: {
            const resourceToDelete = action.payload;
            const currentResource = [...state.resources];

            const index = currentResource.findIndex(item => item.identifier === resourceToDelete.identifier);
            currentResource.splice(index, 1);

            return {
                ...state,
                resources: currentResource
            };
        }

        default: {
            return state;
        }
    }
};
