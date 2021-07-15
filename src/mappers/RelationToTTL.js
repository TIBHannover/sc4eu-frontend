// TODO: refactor code duplications

import {
    extractAnnotations_TTLView,
    transformItemTTL_TextView,
    extractDomainRangePairs_TTLView,
    extractAxioms,
    extractAnnotations,
    extractAxioms_TTLView,
    getAutoPrefix
} from './helperFunctions';

export const transformRelationToTTL_TextView = (context, prefixList) => {
    return transformItemTTL_TextView(context, prefixList, __extractBody);
};

export const transformIdentifierToPrefixed = (identifier, prefixList) => {
    return getAutoPrefix(identifier, prefixList);
};

export const transformRelationToTTL = (context, prefixList) => {
    // create a ttl representation
    const anCount = Object.keys(context.annotations).length;
    const axCount = Object.keys(context.axioms).length;
    const domainRangeCount = Object.keys(context.domainRangePairs).length;

    if (anCount === 0 && axCount === 0 && domainRangeCount === 0) {
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

        if (domainRangeCount > 0) {
            ttl_representation += '# --- Property Restrictions --- \n';
            ttl_representation += extractDomainRangePairs(context.domainRangePairs, prefixList);
        }
        //adjust stuff;
        ttl_representation = ttl_representation.slice(0, -3);
        return ttl_representation + '.';
    }
};

const __extractBody = (context, prefixList) => {
    const anCount = Object.keys(context.annotations).length;
    const axCount = Object.keys(context.axioms).length;
    const domainRangeCount = Object.keys(context.domainRangePairs).length;

    if (anCount === 0 && axCount === 0 && domainRangeCount === 0) {
        return '';
    } else {
        // do the mapping

        let ttl_representation = '';

        if (anCount > 0) {
            // extract annotations;
            ttl_representation += extractAnnotations_TTLView(context.annotations, prefixList);
        }

        if (axCount > 0) {
            // extract annotations;
            ttl_representation += extractAxioms_TTLView(context.axioms, prefixList);
        }

        if (domainRangeCount > 0) {
            ttl_representation += extractDomainRangePairs_TTLView(context.domainRangePairs, prefixList);
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

const extractDomainRangePairs = (domainRangePairsOBJ, prefixList) => {
    let domainRangePairsDef = '';
    let domainValue = '';
    let rangeValue = '';
    domainRangePairsOBJ.forEach(item => {
        if (item.domain !== undefined) {
            //domainValue += '<' + item.domain + '>, ';
            domainValue += getAutoPrefix(item.domain, prefixList) + ', ';
        }
        if (item.range !== undefined) {
            //rangeValue += '<' + item.range + '>, ';
            rangeValue += getAutoPrefix(item.range, prefixList) + ', ';
        }
    });
    if (domainValue !== '') {
        domainValue = domainValue.slice(0, -2);
        domainValue += ' ; \n';
        domainRangePairsDef += 'rdfs:domain ' + domainValue;
    }
    if (rangeValue !== '') {
        rangeValue = rangeValue.slice(0, -2);
        rangeValue += ' ; \n';
        domainRangePairsDef += 'rdfs:range ' + rangeValue;
    }

    return domainRangePairsDef;
};
