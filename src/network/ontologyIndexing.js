import { plainGetRequest, submitGetRequest, submitPostRequest } from './networkRequests';
import { URL_ADMIN_DASHBOARD, URL_ONTOLOGYINDEXING, URL_CHECK_IF_ABLE_TO_UPLOAD_ONTOLOGY } from 'constants/services';
import { URL_PRE_INIT } from 'constants/services';
import { URL_INITIALIZE } from 'constants/services';

export const getAllOntologies = () => {
    // we use parameters from env.

    console.log('IN network we want this page', URL_ONTOLOGYINDEXING);

    // todo: make flexible based on the env.file
    // return plainGetRequest(URL_ONTOLOGYINDEXING, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:5000' });
    return plainGetRequest(URL_ONTOLOGYINDEXING, { 'Content-Type': 'application/json' });
};

export const uploadOntology = data => {
    const postHeader = { 'Content-Type': 'application/json' };
    console.log('UPLOADING THE DATA ', data);
    return submitPostRequest(URL_INITIALIZE, postHeader, data);
};

export const preInitializeOntologyUpload = data => {
    // content is the ontology file content.

    // const postHeader = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': 'http://localhost:12463' };
    const postHeader = { 'Content-Type': 'application/json' };

    console.log('this is the data', data);

    return new Promise((resolve, reject) => {
        fetch(URL_PRE_INIT, { method: 'POST', headers: postHeader, body: JSON.stringify(data) })
            .then(response => {
                console.log('response', response);
                if (!response.ok) {
                    console.log(' something is wrong here, ', !response.ok);
                    // reject(new Error(`Error response. (${response.status}) ${response.statusText}`));
                    // const json = response.json();
                    // if (json.then) {
                    //     json.then(reject);
                    // } else {
                    //     reject(new Error(`Error response. (${response.status}) ${response.statusText}`));
                    // }
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

export const userIsAllowdToUploadOntology = () => {
    const header = { 'Content-Type': 'application/json' };

    return submitGetRequest(URL_CHECK_IF_ABLE_TO_UPLOAD_ONTOLOGY, header, true);
};
