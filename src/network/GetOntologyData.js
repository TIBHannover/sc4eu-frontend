import { URL_VIEWONTOLOGY, URL_GET_JSON_MODEL } from 'constants/services';
import { plainGetRequest } from './networkRequests';
export const getOntologyBy = id => {
    // we use parameters from env.

    const reqURL = URL_VIEWONTOLOGY + '?ontology_id=' + id;
    console.log('IN network we want this page', reqURL);
    // todo: make flexible based on the env.file
    return plainGetRequest(reqURL, {
        'Content-Type': 'application/json'
    });
};

export const getJSON_ModelForId = id => {
    const reqURL = URL_GET_JSON_MODEL + '?ontology_id=' + id;
    console.log('IN network we want this page', reqURL);
    // todo: make flexible based on the env.file
    return plainGetRequest(reqURL, {
        'Content-Type': 'application/json'
    });
};

export const getJSON_ModelForOntology = ontologyData => {
    // we use parameters from env.

    const postHeader = { 'Content-Type': 'application/json' };

    console.log('this is the data', ontologyData);

    return new Promise((resolve, reject) => {
        fetch(URL_GET_JSON_MODEL, { method: 'POST', headers: postHeader, body: JSON.stringify(ontologyData) })
            .then(response => {
                console.log('response', response);
                if (!response.ok) {
                    console.log('ERROR WHILE CREATEING RESOURCE-RELATION MODEL, ', !response.ok);
                } else {
                    const json = response.json();
                    if (json.then) {
                        json.then(resolve).catch(reject);
                    } else {
                        return resolve(json);
                    }
                }
            })
            .catch(reject);
    });
};
