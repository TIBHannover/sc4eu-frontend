export const validIRI = str => {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(str);
};

export const transformItemTTL_TextView = (context, prefixList, __extractBody) => {
    let result = '';
    result += '### ' + context.resourceURI + '\n';
    // we need now the header

    let header = '';
    if (validIRI(context.identifier)) {
        const prefixed = getPrefixedVersion(context.identifier, prefixList);
        header = prefixed + ' rdf:type ' + context.type + ' ';
    } else {
        header = context.identifier + ' rdf:type ' + context.type + ' ';
    }

    const body = __extractBody(context, prefixList);
    if (body.length === 0) {
        return result + header + ' . \n';
    } else {
        return result + header + ' ; \n' + body + ' \n';
    }
};

export const getPrefixedVersion = (long, prefixMap) => {
    if (!prefixMap) {
        return long;
    }
    const found = false;
    const lastHashPos = long.lastIndexOf('#');
    const lastSlashPos = long.lastIndexOf('/');
    const splitToken = Math.max(lastHashPos, lastSlashPos);
    const prefix = long.slice(0, splitToken + 1);
    const suffix = long.slice(splitToken + 1, long.length);
    if (prefixMap.hasOwnProperty(prefix)) {
        return prefixMap[prefix] + ':' + suffix;
    }

    if (!found) {
        return long;
    }
};

export const getAutoPrefix = (long, prefixList) => {
    if (prefixList === undefined) {
        return long;
    }
    if (validIRI(long)) {
        return getPrefixedVersion(long, prefixList);
    } else {
        return long;
    }
};

export const extractAnnotations_TTLView = annotationsOBJ => {
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
                        resultingDefaultStr += '"' + __values[i] + '", ';
                    }
                    resultingDefaultStr += '"' + __values[__values.length - 1] + '" ';
                } else {
                    for (let i = 0; i < __values.length - 1; i++) {
                        resultingDefaultStr += '"' + __values[i] + '"@' + __qStr + ',';
                    }
                    resultingDefaultStr += '"' + __values[__values.length - 1] + '"@' + __qStr + '';
                }
                return resultingDefaultStr;
            });
            const unrolled = mapped.join('');
            return '\t' + qStr + ' ' + unrolled + ' ; \n';
        } else {
            const csvThing = values.map(v => {
                return '\t' + v + ', ';
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

export const extractAxioms_TTLView = (axiomsOBJ, prefixMap) => {
    // get keys;
    let axiomsDef = '\t';
    const keysArray = Object.keys(axiomsOBJ);
    keysArray.forEach(item => {
        const qStr = item;
        const values = axiomsOBJ[item];
        let csvThing = '';
        values.forEach(v => {
            const prefixed = getAutoPrefix(v, prefixMap);
            csvThing += prefixed + ', ';
        });
        csvThing = csvThing.slice(0, -2);
        csvThing += ' ; \n';
        axiomsDef += qStr + ' ' + csvThing;
    });
    // axiomsDef = axiomsDef.slice(0, -3); // remove the last ; \n

    return axiomsDef;
};

export const extractDomainRangePairs_TTLView = (domainRangePairsOBJ, prefixList) => {
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
        domainRangePairsDef += '\trdfs:domain ' + domainValue;
    }
    if (rangeValue !== '') {
        rangeValue = rangeValue.slice(0, -2);
        rangeValue += ' ; \n';
        domainRangePairsDef += '\trdfs:range ' + rangeValue;
    }

    return domainRangePairsDef;
};

export const extractAxioms = (axiomsOBJ, prefixMap) => {
    // get keys;
    let axiomsDef = '';
    const keysArray = Object.keys(axiomsOBJ);
    keysArray.forEach(item => {
        const qStr = item;
        const values = axiomsOBJ[item];
        let csvThing = '';
        values.forEach(v => {
            const prefixed = getAutoPrefix(v, prefixMap);
            csvThing += prefixed + ', ';
        });
        csvThing = csvThing.slice(0, -2);
        csvThing += ' ; \n';
        axiomsDef += qStr + ' ' + csvThing;
    });
    // axiomsDef = axiomsDef.slice(0, -3); // remove the last ; \n

    return axiomsDef;
};

// some local helper functions;
export const extractAnnotations = annotationsOBJ => {
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
                        resultingDefaultStr += '"' + __values[i] + '", ';
                    }
                    resultingDefaultStr += '"' + __values[__values.length - 1] + '"';
                } else {
                    for (let i = 0; i < __values.length - 1; i++) {
                        resultingDefaultStr += '"' + __values[i] + '"@' + __qStr + ',';
                    }
                    resultingDefaultStr += '"' + __values[__values.length - 1] + '"@' + __qStr + '';
                }
                return resultingDefaultStr;
            });
            const unrolled = mapped.join('');
            return qStr + ' ' + unrolled + ' ; \n';
        } else {
            const csvThing = values.map(v => {
                return v + ', ';
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
