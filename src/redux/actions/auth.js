import * as type from './types';
import { getUserInformation } from '../../services/Users';
import { Cookies } from 'react-cookie';
// import env from '@beam-australia/react-env';
const cookies = new Cookies();
export const updateCookies = payload => dispatch => {
    const PUBLIC_URL = `${process.env.REACT_APP_PUBLIC_URL}`;

    const expiresIn = 8 * 60 * 60;
    cookies.set('token', payload.token, { path: PUBLIC_URL, maxAge: expiresIn });
    const token_expires_in = new Date(Date.now() + expiresIn * 1000);
    cookies.set('token_expires_in', token_expires_in.toUTCString(), { path: PUBLIC_URL, maxAge: expiresIn });

    // TODO: make that easier

    return getUserInformation()
        .then(userData => {
            if (userData && userData.result !== 'empty' && userData.error === undefined) {
                dispatch(
                    updateAuth({
                        user: {
                            displayName: userData.displayName,
                            userEmail: userData.userEmail,
                            gravatarId: userData.gravatarId,
                            userId: userData.userId,
                            role: userData.role,
                            token: payload.token,
                            tokenExpire: token_expires_in
                        }
                    })
                );
                return Promise.resolve();
            }
        })
        .catch(() => {
            cookies.remove('token', { path: PUBLIC_URL });
            cookies.remove('token_expires_in', { path: PUBLIC_URL });
            dispatch({
                type: type.RESET_AUTH
            });
        })
        .then(() => Promise.resolve());
};

export const updateAuth = payload => dispatch => {
    // create a user object;

    dispatch({
        type: type.UPDATE_AUTH,
        payload
    });
};

export const redux_updateUserSettings = payload => dispatch => {
    // create a user object;

    dispatch({
        type: type.UPDATE_USER_SETTINGS,
        payload
    });
};

export const resetAuth = () => dispatch => {
    cookies.remove('token', { path: '/sc3/' });
    cookies.remove('token_expires_in', { path: '/sc3/' });
    dispatch({
        type: type.RESET_AUTH
    });
};

export function firstLoad() {
    return dispatch => {
        const cookies = new Cookies();
        const token = cookies.get('token') ? cookies.get('token') : null;
        const token_expires_in = cookies.get('token_expires_in') ? cookies.get('token_expires_in') : null;

        return getUserInformation()
            .then(userData => {
                if (userData && userData.result !== 'empty' && userData.error === undefined) {
                    dispatch(
                        updateAuth({
                            user: {
                                displayName: userData.displayName,
                                userEmail: userData.userEmail,
                                gravatarId: userData.gravatarId,
                                userId: userData.userId,
                                role: userData.role,
                                token: token,
                                tokenExpire: token_expires_in
                            }
                        })
                    );
                    return Promise.resolve();
                }
            })
            .catch(() => {
                cookies.remove('token');
                cookies.remove('token_expires_in');
                dispatch({
                    type: type.RESET_AUTH
                });
            })
            .then(() => Promise.resolve());
    };
}

export const openAuthDialog = ({ action, redirectRoute = null, signInRequired = false }) => dispatch => {
    dispatch({
        type: type.OPEN_AUTHENTICATION_DIALOG,
        payload: {
            action,
            signInRequired,
            redirectRoute
        }
    });
};

export const toggleAuthDialog = () => dispatch => {
    dispatch({
        type: type.TOGGLE_AUTHENTICATION_DIALOG
    });
};

export const closeAuthDialog = () => dispatch => {
    dispatch({
        type: type.CLOSE_AUTHENTICATION_DIALOG
    });
};

export const hello = () => dispatch => {
    dispatch({
        type: type.TOGGLE_AUTHENTICATION_DIALOG
    });
};
