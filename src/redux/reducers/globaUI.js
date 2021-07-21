import * as type from '../actions/types';

const initialState = {
    ui_all_resource_bodies_expanded: false,
    ui_all_relation_bodies_expanded: false,
    ui_relation_search_value_preserved: '',
    ui_relation_filter_value_preserved: '',
    ui_resource_search_value_preserved: '',
    ui_resource_filter_value_preserved: ''
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.EXPAND_ALL_RESOURCE_BODIES:
            return { ...state, ...action.payload };
        case type.EXPAND_ALL_RELATION_BODIES:
            return { ...state, ...action.payload };
        case type.PRESERVE_FILTER_SEARCH:
            return { ...state, ...action.payload };
        default: {
            return state;
        }
    }
};
