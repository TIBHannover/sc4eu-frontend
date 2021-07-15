import * as type from '../actions/types';

const initialState = {
    ui_all_resource_bodies_expanded: false,
    ui_all_relation_bodies_expanded: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.EXPAND_ALL_RESOURCE_BODIES:
            return { ...state, ui_all_resource_bodies_expanded: action.payload };
        case type.EXPAND_ALL_RELATION_BODIES:
            return { ...state, ui_all_resource_bodies_expanded: action.payload };
        default: {
            return state;
        }
    }
};
