import { submitGetRequest } from './networkRequests';

export const checkBuildType = () => {
    const url = process.env.REACT_APP_EXPRESS_BACKEND_URL;
    const myHeaders = {};
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: myHeaders
        })
            .then(response => {
                return resolve({ frontendBuild: 'Express' });
            })
            .catch(error => {
                // if we have an error
                return resolve({ frontendBuild: 'NodeJs -- Client only' });
            });
    });
};

export const checkOAuth = () => {
    const url = process.env.REACT_APP_EXPRESS_BACKEND_URL + 'oauthStatus';
    return submitGetRequest(url);
};

export const checkBackend = () => {
    const url = process.env.REACT_APP_FLASK_BACKEND_URL;

    const myHeaders = {};
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: myHeaders
        })
            .then(response => {
                return resolve({ backendService: true });
            })
            .catch(error => {
                // if we have an error
                return resolve({ backendService: false });
            });
    });
};

export const checkOntologyProcessing = () => {
    const url = process.env.REACT_APP_ONTOLOGY_SERVICE_BACKEND_URL;

    const myHeaders = {};
    return new Promise((resolve, reject) => {
        fetch(url, {
            method: 'GET',
            headers: myHeaders
        })
            .then(response => {
                return resolve({ ontologyProcessingService: true });
            })
            .catch(error => {
                // if we have an error
                return resolve({ ontologyProcessingService: false });
            });
    });
};
