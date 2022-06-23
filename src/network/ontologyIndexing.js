import { plainGetRequest, submitGetRequest, submitPostRequest } from './networkRequests';
import { URL_CHECK_IF_ABLE_TO_UPLOAD_ONTOLOGY, URL_DELETEONTOLOGY, URL_INITIALIZE, URL_ONTOLOGYINDEXING, URL_PRE_INIT } from 'constants/services';
import { Cookies } from 'react-cookie';

export const getAllOntologies = project_id => {
    // we use parameters from env.
    console.log('IN network we want this page', URL_ONTOLOGYINDEXING + '?project_id=' + project_id);

    // todo: make flexible based on the env.file
    return plainGetRequest(URL_ONTOLOGYINDEXING + '?project_id=' + project_id, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_EXPRESS_BACKEND_URL}`
    });
};
export const deleteOntology = ontology_id => {
    const postHeader = { 'Content-Type': 'application/json' };
    console.log('Deleting Ontology: ', { ontologyIdToDelete: ontology_id });
    return submitPostRequest(URL_DELETEONTOLOGY, postHeader, { ontologyIdToDelete: ontology_id });
};

export const uploadOntology = data => {
    const postHeader = { 'Content-Type': 'application/json' };
    console.log('UPLOADING THE DATA ', data);
    return submitPostRequest(URL_INITIALIZE, postHeader, data);
};

export const preInitializeOntologyUpload = data => {
    // content is the ontology file content.

    // HAVE A CLOSER LOOK AT THAT , should be similar to uploadOntology , w.r.t access tokens stuff.

    // TODO: verify with the new network communications
    const postHeader = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': `${process.env.REACT_APP_ONTOLOGY_SERVICE_BACKEND_URL}`
    };
    console.log('this is the data', data);
    const send_token = false;
    if (send_token) {
        const cookies = new Cookies();
        const token = cookies.get('token') ? cookies.get('token') : null;
        if (token) {
            postHeader.append('Authorization', `Bearer ${token}`);
        }
    }

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
