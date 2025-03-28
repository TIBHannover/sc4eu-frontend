/**
 * Service for handling annotation-related API calls
 */

/**
 * Annotates the given text using the NFDI4ENERGY annotator service
 * @param {string} text - The text to annotate
 * @returns {Promise<Object>} - The annotation results
 */
export const annotateText = async text => {
    const response = await fetch(`${process.env.REACT_APP_NFDI4ENERGY_ANNOTATOR_URL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, ontology_ids: ['dr'] })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return response.json();
};
