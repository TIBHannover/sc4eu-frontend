import { transformItemTTL_TextView, extractAnnotations, extractAxioms, extractAnnotations_TTLView, extractAxioms_TTLView } from './helperFunctions';

export const transformResourceToTTL_TextView = (context, prefixList) => {
    return transformItemTTL_TextView(context, prefixList, __extractBody);
};

export const transformResourceToTTL = (context, prefixList) => {
    // create a ttl representation
    const anCount = Object.keys(context.annotations).length;
    const axCount = Object.keys(context.axioms).length;
    if (anCount === 0 && axCount === 0) {
        return '';
    } else {
        // do the mapping

        let ttl_representation = '';

        if (anCount > 0) {
            ttl_representation += '# --- Annotations --- \n';
            // extract annotations;
            ttl_representation += extractAnnotations(context.annotations);
        }

        if (axCount > 0) {
            ttl_representation += '# --- Axioms --- \n';
            // extract annotations;
            ttl_representation += extractAxioms(context.axioms, prefixList);
        }
        //adjust stuff;
        ttl_representation = ttl_representation.slice(0, -3);
        return ttl_representation + ' .';
    }
};

const __extractBody = (context, prefixList) => {
    // create a ttl representation
    const anCount = Object.keys(context.annotations).length;
    const axCount = Object.keys(context.axioms).length;
    if (anCount === 0 && axCount === 0) {
        return '';
    } else {
        // do the mapping

        let ttl_representation = '';

        if (anCount > 0) {
            // extract annotations;
            ttl_representation += extractAnnotations_TTLView(context.annotations);
        }

        if (axCount > 0) {
            // extract annotations;
            ttl_representation += extractAxioms_TTLView(context.axioms, prefixList);
        }
        //adjust stuff;
        ttl_representation = ttl_representation.slice(0, -3);
        return ttl_representation + ' .';
    }
};

export const calculateBodyRows = inputString => {
    const numR = (inputString.match(/\n/g) || []).length;
    if (numR === 0) {
        return 0;
    }
    return numR + 1;
};
