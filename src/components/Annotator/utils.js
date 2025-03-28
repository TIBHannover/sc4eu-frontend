/**
 * Generates a light background color for highlighting
 * @returns {string} - RGB color string
 */
export const generateLightColor = () => {
    const r = Math.floor(Math.random() * 156 + 150);
    const g = Math.floor(Math.random() * 156 + 150);
    const b = Math.floor(Math.random() * 156 + 150);
    return `rgb(${r}, ${g}, ${b})`;
};

/**
 * Generates a link to the ontology term
 * @param {string} iri - The IRI of the term
 * @param {string} ontologyId - The ID of the ontology
 * @returns {string} - The generated URL
 */
export const generateLink = (iri, ontologyId) =>
    `${process.env.REACT_APP_TS_ONTOLOGIES_URL}${ontologyId}/terms?iri=${encodeURIComponent(iri)}&obsoletes=false`;

/**
 * Gets the context around a matched term
 * @param {string} text - The full text
 * @param {number} start - Start position of the match
 * @param {number} end - End position of the match
 * @returns {Object} - Object containing before, term, and after context
 */
export const getContext = (text, start, end) => {
    const words = text.split(/\s+/); // Split by spaces
    let charCount = 0;
    let wordIndexStart = 0;
    let wordIndexEnd = 0;

    for (let i = 0; i < words.length; i++) {
        const wordLength = words[i].length;
        if (charCount + wordLength >= start && wordIndexStart === 0) {
            wordIndexStart = i;
        }
        if (charCount + wordLength >= end) {
            wordIndexEnd = i;
            break;
        }
        charCount += wordLength + 1;
    }

    const beforeWords = words.slice(Math.max(0, wordIndexStart - 2), wordIndexStart).join(' ');
    const afterWords = words.slice(wordIndexEnd + 1, wordIndexEnd + 3).join(' ');

    const beforeEllipsis = wordIndexStart > 2 ? '...' : '';
    const afterEllipsis = wordIndexEnd + 3 < words.length ? '...' : '';

    return {
        before: beforeWords ? `${beforeEllipsis} ${beforeWords}`.trim() : '',
        term: text.slice(start, end),
        after: afterWords ? `${afterWords} ${afterEllipsis}`.trim() : ''
    };
};
