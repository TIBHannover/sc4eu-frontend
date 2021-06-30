import * as type from '../actions/types';

const initialState = {
    originalModel: null, // this is the json we get from backend
    resources: null,
    relations: null,
    metaInformation: null
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

        case type.EDIT_RESOURCE: {
            const resourceToEdit = action.payload.updatedResource;
            const originalResourceIdentifier = action.payload.resourceIdentifier;

            return {
                ...state,
                resources: state.resources.map(resource => (resource.identifier === originalResourceIdentifier ? resourceToEdit : resource))
            };
        }

        case type.ADD_NEW_RELATION: {
            const relation = action.payload;
            return {
                ...state,
                relations: [relation, ...state.relations]
            };
        }
        case type.DELETE_RELATION: {
            const relationToDelete = action.payload;
            const currentRelation = [...state.relations];

            const index = currentRelation.findIndex(item => item.identifier === relationToDelete.identifier);
            currentRelation.splice(index, 1);

            return {
                ...state,
                relations: currentRelation
            };
        }

        case type.EDIT_RELATION: {
            const relationToEdit = action.payload.updatedRelation;
            const originalRelationIdentifier = action.payload.relationIdentifier;

            return {
                ...state,
                relations: state.relations.map(relation => (relation.identifier === originalRelationIdentifier ? relationToEdit : relation))
            };
        }

        default: {
            return state;
        }
    }
};
