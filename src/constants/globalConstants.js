export const minLengthPassword = 5;
export const SELECTED_PROJECT_SESSION = 'selectedProjectSession';
export const SELECTED_ONTOLOGY_SESSION = 'selectedOntologySession';
export const ALREADY_LOADED_ONTOLOGY = 'alreadyLoadedOntology';

export const CLEAR_SESSION = function() {
    sessionStorage.removeItem(SELECTED_PROJECT_SESSION);
    sessionStorage.removeItem(SELECTED_ONTOLOGY_SESSION);
    sessionStorage.removeItem(ALREADY_LOADED_ONTOLOGY);
};
