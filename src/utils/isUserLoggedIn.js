import { store } from '../store'; // Adjust the import path as necessary

// Utility function to check if the user is logged in
export const isUserLoggedIn = () => {
    const state = store.getState(); // Get the current Redux state
    return Boolean(state.auth.user && state.auth.user !== 0); // Check if the user exists and is not 0
};