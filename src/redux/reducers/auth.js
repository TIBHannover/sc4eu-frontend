import * as type from '../actions/types';

const initialState = {
    dialogIsOpen: false,
    action: 'signin',
    user: 0, // possible values: 0 (to differentiate first load from non-signedin but stay falsy), null (non signedin), or object (signedin)
    signInRequired: null,
    redirectRoute: null
};

// Selector function to check if user is authenticated
export const selectIsAuthenticated = state => Boolean(state.auth.user && state.auth.user !== 0);

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case type.UPDATE_USER_SETTINGS:
            return {
                ...state,
                user: state.user ? { ...state.user, ...action.payload.user } : action.payload.user
            };

        case type.UPDATE_AUTH:
            return {
                ...state,
                ...action.payload
            };

        case type.RESET_AUTH:
            return {
                ...state,
                user: null // ensure user is null (signedout) not 0 (first load)
            };

        case type.OPEN_AUTHENTICATION_DIALOG: {
            return {
                ...state,
                dialogIsOpen: true,
                ...action.payload
            };
        }

        case type.TOGGLE_AUTHENTICATION_DIALOG: {
            return {
                ...state,
                dialogIsOpen: !state.dialogIsOpen,
                redirectRoute: !state.dialogIsOpen ? state.redirectRoute : null // reset redirectRoute on close
            };
        }

        case type.CLOSE_AUTHENTICATION_DIALOG: {
            return {
                ...state,
                dialogIsOpen: false
            };
        }

        default: {
            return state;
        }
    }
}
