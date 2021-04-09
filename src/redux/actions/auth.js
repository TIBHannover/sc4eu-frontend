import * as type from './types';
import { getUserInformation } from '../../services/Users';
import { Cookies } from 'react-cookie';
// import env from '@beam-australia/react-env';
export const updateCookies = payload => dispatch => {
    console.log('WE HAVE A PAYLOAD', payload);

    console.log('THIS NOW CREATES AN EMPTY USER FOR THE SATE THINGY, WE WILL THEN FILL IT WITH VALUES FROM BACKEND');
    const PUBLIC_URL = 'http://localhost:9000';
    console.log('path: ', PUBLIC_URL);
    const cookies = new Cookies();
    const expiresIn = 8 * 60 * 60;
    cookies.set('token', payload.token, { path: PUBLIC_URL, maxAge: expiresIn });
    const token_expires_in = new Date(Date.now() + expiresIn * 1000);
    cookies.set('token_expires_in', token_expires_in.toUTCString(), { path: PUBLIC_URL, maxAge: expiresIn });

    dispatch({
        type: type.UPDATE_AUTH,
        payload: { user: { name: 'hello' } }
    });
};

export const updateAuth = payload => dispatch => {
    // create a user object;

    dispatch({
        type: type.UPDATE_AUTH,
        payload
    });
};

export const resetAuth = () => dispatch => {
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
                console.log('We have some user Data from backend', userData);
                dispatch(
                    updateAuth({
                        user: {
                            displayName: userData.display_name,
                            id: userData.id,
                            token: token,
                            tokenExpire: token_expires_in
                        }
                    })
                );
                return Promise.resolve();
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
