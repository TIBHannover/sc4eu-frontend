export const minLengthPassword = 5;
export let SELECTED_ONTOLOGY_ID_SESSION = 'selectedOntologyIdSession';
export let SELECTED_ONTOLOGY_NAME_SESSION = 'selectedOntologyNameSession';
export let SELECTED_PROJECT_SESSION = 'selectedProjectSession';

export const CLEAR_SESSION = function() {
    sessionStorage.removeItem(SELECTED_ONTOLOGY_ID_SESSION);
    sessionStorage.removeItem(SELECTED_ONTOLOGY_NAME_SESSION);
    sessionStorage.removeItem(SELECTED_PROJECT_SESSION);
};
