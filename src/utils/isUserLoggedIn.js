import { store } from '../store'; // Adjust the import path as necessary

// Utility function to check if the user is logged in
export const isUserLoggedIn = () => {
    const state = store.getState(); // Get the current Redux state
    return Boolean(state.auth.user && state.auth.user !== 0); // Check if the user exists and is not 0
};

export const selectIsUserLoggedIn = state => Boolean(state.auth.user && state.auth.user !== 0);

export const selectIsAuthenticated = state => Boolean(state.auth.user && state.auth.user !== 0);

export const selectUser = state => state.auth.user;

export const selectIsAdmin = state => state.auth.user && state.auth.user.role === 'admin';

export const selectIsUser = state => state.auth.user && state.auth.user.role === 'user';

export const selectIsGuest = state => !state.auth.user || state.auth.user === 0;
