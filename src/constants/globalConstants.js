export const minLengthPassword = 5;
export const MODE_OF_OPERATIONS = 'modeOfOperations';

/** Auth modals must cover the fixed footer (StyledBodyDiv, zIndex 1300); Bootstrap modals default to 1050. */
export const AUTH_MODAL_Z_INDEX = 1400;

/** Every instance except the Ontology Curation Portal (/ocp/) is a vocabulary tool: its main page is the vocabulary. */
export const IS_VOCABULARY_INSTANCE = process.env.REACT_APP_PUBLIC_URL !== '/ocp/';
