import { extractAnnotations_TTLView, transformItemTTL_TextView, extractAxioms, extractAnnotations, extractAxioms_TTLView } from './helperFunctions';

export const transformRelationToTTL_TextView = (context, prefixList) => {
    return transformItemTTL_TextView(context, prefixList, __extractBody);
};

export const transformRelationToTTL = context => {
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
            ttl_representation += extractAxioms(context.axioms);
        }

        if (domainRangeCount > 0) {
            ttl_representation += '# --- Property Restrictions --- \n';
            ttl_representation += extractDomainRangePairs(context.domainRangePairs);
        }
        //adjust stuff;
        ttl_representation = ttl_representation.slice(0, -3);
        return ttl_representation + ' .';
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
            ttl_representation += extractAnnotations_TTLView(context.annotations);
        }

        if (axCount > 0) {
            // extract annotations;
            ttl_representation += extractAxioms_TTLView(context.axioms);
        }

        if (domainRangeCount > 0) {
            ttl_representation += extractDomainRangePairs(context.domainRangePairs);
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

const extractDomainRangePairs = domainRangePairsOBJ => {
    let domainRangePairsDef = '';
    let domainValue = '';
    let rangeValue = '';
    domainRangePairsOBJ.forEach(item => {
        if (item.domain !== undefined) {
            domainValue += '<' + item.domain + '>, ';
        }
        if (item.range !== undefined) {
            rangeValue += '<' + item.range + '>, ';
        }
    });
    if (domainValue !== '') {
        domainValue = domainValue.slice(0, -2);
        domainValue += ' ; \n';
        console.log(domainValue);
        domainRangePairsDef += '\trdfs:domain ' + domainValue;
    }
    if (rangeValue !== '') {
        rangeValue = rangeValue.slice(0, -2);
        rangeValue += ' ; \n';
        domainRangePairsDef += '\trdfs:range ' + rangeValue;
    }
    console.log(domainRangePairsDef);

    return domainRangePairsDef;
};
