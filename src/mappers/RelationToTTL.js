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
            ttl_representation += '# --- Domain Range Pairs --- \n';
            ttl_representation += extractDomainRangePairs(context.domainRangePairs);
        }
        //adjust stuff;
        ttl_representation = ttl_representation.slice(0, -1);
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

// some local helper functions;
const extractAnnotations = annotationsOBJ => {
    // get keys;
    const keysArray = Object.keys(annotationsOBJ);
    const annotationsDef = keysArray.map(item => {
        const qStr = item;
        const values = annotationsOBJ[item];
        if (typeof values === 'object') {
            // nested call;
            const nestedKeys = Object.keys(values);
            const mapped = nestedKeys.map(item => {
                const __qStr = item;
                const __values = values[item];
                let resultingDefaultStr = ' ';
                if (__qStr === 'default') {
                    for (let i = 0; i < __values.length - 1; i++) {
                        resultingDefaultStr += __values[i] + ', ';
                    }
                    resultingDefaultStr += __values[__values.length - 1] + '';
                } else {
                    for (let i = 0; i < __values.length - 1; i++) {
                        resultingDefaultStr += '"' + __values[i] + '"@' + __qStr + ',';
                    }
                    resultingDefaultStr += '"' + __values[__values.length - 1] + '"@' + __qStr + '';
                }
                return resultingDefaultStr;
            });
            const unrolled = mapped.join('');
            return qStr + ' ' + unrolled + '; \n';
        } else {
            const csvThing = values.map(v => {
                return v + ',';
            });
            // as inline result;
            let statement = csvThing.toString();
            statement = statement.slice(0, -1);
            // append ";"
            statement += ' ; \n';
            return qStr + ' ' + statement;
        }
    });

    return annotationsDef.join('');
};

const extractAxioms = axiomsOBJ => {
    // get keys;
    let axiomsDef = '';
    const keysArray = Object.keys(axiomsOBJ);
    keysArray.forEach(item => {
        const qStr = item;
        const values = axiomsOBJ[item];
        let csvThing = '';
        values.forEach(v => {
            csvThing += v + ', ';
        });
        csvThing = csvThing.slice(0, -2);
        csvThing += ' ; \n';
        axiomsDef += qStr + ' ' + csvThing;
    });
    // axiomsDef = axiomsDef.slice(0, -3); // remove the last ; \n

    return axiomsDef;
};

const extractDomainRangePairs = domainRangePairsOBJ => {
    let domainRangePairsDef = '';
    domainRangePairsOBJ.forEach(item => {
        domainRangePairsDef += 'rdfs:domain ' + item.domain + ' rdfs:range ' + item.range + '\n';
    });
    return domainRangePairsDef;
};
