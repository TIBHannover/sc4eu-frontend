import * as type from '../actions/types';

const initialState = {
    originalModel: null, // this is the json we get from backend
    resources: null,
    relations: null,
    metaInformation: null,
    project: null,
    ontology: null,
    ontologyID: null
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

        case type.EDIT_METAINFO: {
            return {
                ...state,
                metaInformation: { ...state.metaInformation, ...action.payload }
            };
        }

        case type.ADD_PROJECT: {
            return {
                ...state,
                project: { ...state.project, ...action.payload }
            };
        }

        case type.DELETE_PROJECT: {
            return {
                ...state,
                project: null
            };
        }

        case type.ADD_ONTOLOGY: {
            return {
                ...state,
                ontology: { ...state.ontology, ...action.payload }
            };
        }

        case type.DELETE_ONTOLOGY: {
            return {
                ...state,
                ontology: null
            };
        }

        case type.ALREADY_LOADED_ONTOLOGY: {
            if (state.ontologyID === action.payload) {
                // If the new OntologyID is the same as the current one, return the current state
                return state;
            } else {
                // If the new OntologyID is different, update the state with the new OntologyID
                return { ...state, ontologyID: action.payload };
            }
        }

        case type.DELETE_ALREADY_LOADED_ONTOLOGY: {
            return {
                ...state,
                ontologyID: null
            };
        }

        default: {
            return state;
        }
    }
};
