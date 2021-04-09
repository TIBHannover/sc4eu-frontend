export const transformResourceToTTL = context => {
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
            ttl_representation += extractAxioms(context.axioms);
        }

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
        const csvThing = values.map(v => {
            return v + ',';
        });
        // as inline result;
        let statement = csvThing.toString();
        statement = statement.slice(0, -1);
        // append ";"
        statement += ' ; \n';
        return qStr + ' ' + statement;
    });

    return annotationsDef;
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
    axiomsDef = axiomsDef.slice(0, -3); // remove the last ; \n

    return axiomsDef;
};
