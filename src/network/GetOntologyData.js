import { URL_GET_JSON_MODEL, URL_VIEWONTOLOGY, URL_GET_JSON_MODEL_WITH_QUERY } from 'constants/services';
import { plainGetRequest } from './networkRequests';
import { URL_COMPARE_ONTOLOGY, URL_GET_WIDOCO_DOCUMENTATION } from '../constants/services';

export const getOntologyBy = id => {
    // we use parameters from env.

    const reqURL = URL_VIEWONTOLOGY + '?ontology_id=' + id;
    // todo: make flexible based on the env.file
    return plainGetRequest(reqURL, {
        'Content-Type': 'application/json'
    });
};

export const getJSON_ModelForId = id => {
    const reqURL = URL_GET_JSON_MODEL + '?ontology_id=' + id;
    // todo: make flexible based on the env.file
    return plainGetRequest(reqURL, {
        'Content-Type': 'application/json'
    });
};

export const getOntologyComparison = (first, second) => {
    const postHeader = { 'Content-Type': 'application/json' };

    const twoCommits = {
        first_ontology: first,
        second_ontology: second
    };

    return new Promise((resolve, reject) => {
        fetch(URL_COMPARE_ONTOLOGY, { method: 'POST', headers: postHeader, body: JSON.stringify(twoCommits) })
            .then(response => {
                if (!response.ok) {
                    console.error('ERROR WHILE CREATING RESOURCE-RELATION MODEL, ', !response.ok);
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

export const getWidocoDocumentation = ontologyFile => {
    const data = new FormData();
    data.append('file', ontologyFile);
    return new Promise((resolve, reject) => {
        fetch(URL_GET_WIDOCO_DOCUMENTATION, { method: 'POST', body: data })
            .then(response => {
                if (!response.ok) {
                    return { message: 'something went wrong, Please try again after some time' };
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

export const getJSON_ModelForOntology = ontologyData => {
    // we use parameters from env.

    const postHeader = { 'Content-Type': 'application/json' };

    return new Promise((resolve, reject) => {
        fetch(URL_GET_JSON_MODEL, { method: 'POST', headers: postHeader, body: JSON.stringify(ontologyData) })
            .then(response => {
                if (!response.ok) {
                    console.error('ERROR WHILE CREATEING RESOURCE-RELATION MODEL, ', !response.ok);
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

export const getJSON_ModelForOntologyWithQuery = sparqlQuery => {
    // we use parameters from env.

    const postHeader = { 'Content-Type': 'application/json' };

    return new Promise((resolve, reject) => {
        fetch(URL_GET_JSON_MODEL_WITH_QUERY, { method: 'POST', headers: postHeader, body: JSON.stringify(sparqlQuery) })
            .then(response => {
                if (!response.ok) {
                    console.error('ERROR WHILE CREATEING RESOURCE-RELATION MODEL, ', !response.ok);
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
