import axios from 'axios';
import * as N3 from 'n3';
import { getFileDataFromGitHub, saveNewContent } from './GitAPICalls';
import { Buffer } from 'buffer';

/**
 * Parses RDF data from a given URL and returns an array of quads.
 * Each quad is an object with 'subject', 'predicate', and 'object' properties.
 *
 * @param {string} rdfGitHubURL - The URL of the RDF data to parse.
 * @returns {Promise<Array>} A promise that resolves to an array of quads.
 */
export const parseRDF = async rdfGitHubURL => {
    const rdfDataGithub = await getFileDataFromGitHub(rdfGitHubURL);
    const rdfDecodedDataGithub = Buffer.from(rdfDataGithub['content'], 'base64').toString('utf8');

    const parser = new N3.Parser({ format: 'Turtle' });
    const quads = [];
    const result = {};

    await new Promise((resolve, reject) => {
        parser.parse(rdfDecodedDataGithub, (error, quad, prefixes) => {
            //console.log('parseRDF quad', quad);
            if (error) {
                reject(error);
            } else if (quad) {
                if(quad.predicate.value.split('#')[1] !== 'type') {
                    quads.push({
                        subject: quad.subject.value.split('#')[1],
                        predicate: quad.predicate.value.split('#')[1],
                        object: quad.object.value,
                        datatype: quad.object.datatype ? quad.object.datatype.value : null
                    });
                }
            } else {
                resolve();
            }
        });
    });

    quads.forEach(quad => {
        if (!result[quad.subject]) {
            result[quad.subject] = {};
        }
        if (quad.predicate === 'altLabel') {
            if (result[quad.subject][quad.predicate]) {
                result[quad.subject][quad.predicate] += `, ${quad.object}`;
            } else {
                result[quad.subject][quad.predicate] = quad.object;
            }
        }
        /*else if (quad.predicate === 'created' && quad.datatype === 'http://www.w3.org/2001/XMLSchema#date') {
            result[quad.subject]['dcterms:created'] = quad.object;
        }*/else {
            result[quad.subject][quad.predicate] = quad.object;
        }
    });
    console.log('parseRDF result', result);
    return Object.entries(result).map(([identifier, value]) => ({ identifier, ...value }));
};


const createSubject = (id) => `https://example.com#${id}`;
const addQuad = (writer, subject, predicate, object, isLiteral = true, datatype = null) => {
    writer.addQuad(
        N3.DataFactory.quad(
            N3.DataFactory.namedNode(subject),
            N3.DataFactory.namedNode(predicate),
            isLiteral ? N3.DataFactory.literal(object, datatype) : N3.DataFactory.namedNode(object)
        )
    );
};

const addQuadsForItem = (writer, item) => {
    const subject = createSubject(item.identifier);
    addQuad(writer, subject, 'rdf:type', 'rdfs:Resource', false);
    addQuad(writer, subject, 'dcterms:identifier', item.identifier);

    if (item.label) {
        addQuad(writer, subject, 'rdfs:label', item.label);
    }

    if (item.altLabel) {
        const altArray = item.altLabel.split(',').map(label => label.trim());
        altArray.forEach(label => {
            addQuad(writer, subject, 'skos:altLabel', label);
        });
    }

    if (item.description) {
        addQuad(writer, subject, 'dcterms:description', item.description);
    }

    if (item.seeAlso) {
        addQuad(writer, subject, 'rdfs:seeAlso', item.seeAlso);
    }

    if (item.status) {
        addQuad(writer, subject, 'ex:status', item.status);
    }

    addQuad(writer, subject, 'dcterms:created', item.created, true, N3.DataFactory.namedNode('http://www.w3.org/2001/XMLSchema#date'));
    // date
};

export const writeRDF = async (rdfGitHubURL, newTerms, commitMessage) => {
    const writer = new N3.Writer({
        format: 'Turtle',
        prefixes: {
            rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
            rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
            skos: 'http://www.w3.org/2004/02/skos/core#',
            dcterms: 'http://purl.org/dc/terms/#',
            ex: 'https://example.com/ns#',
            xsd: 'http://www.w3.org/2001/XMLSchema#'
        }
    });

    newTerms.forEach(item => addQuadsForItem(writer, item));

    const rdfData = await new Promise((resolve, reject) => {
        writer.end((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });

    return await saveNewContent(rdfGitHubURL, rdfData, commitMessage);
};
/**
 // * Writes an array of JavaScript objects into RDF format and commits the changes to the given URL.
 // *
 // * @param {string} rdfGitHubURL - The URL to commit the changes to.
 // * @param {Array} newTerms - The data to write into RDF format.
 // * @param commitMessage
 // * @returns {Promise} A promise that resolves when the data has been written and the changes have been committed.
 */
/*export const writeRDF = async (rdfGitHubURL, newTerms, commitMessage) => {
    const writer = new N3.Writer({
        format: 'Turtle',
        prefixes: {
            rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
            rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
            skos: 'http://www.w3.org/2004/02/skos/core#',
            dcterms: 'http://purl.org/dc/terms/',
            ex: 'https://example.com/ns#'
        }
    });

    newTerms.forEach(item => {
        const subject = `https://example.com#${item.id}`;
        writer.addQuad(
            N3.DataFactory.quad(N3.DataFactory.namedNode(subject), N3.DataFactory.namedNode(`rdf:type`), N3.DataFactory.namedNode(`rdfs:Resource`))
        );
        //delete item.id;

        for (const predicate in item) {
            if (predicate === 'altLabel') {
                if(item[predicate]) {
                    const altArray = item[predicate]?.split(',').map(label => label.trim());
                    altArray.forEach(label => {
                        writer.addQuad(
                            N3.DataFactory.quad(
                                N3.DataFactory.namedNode(subject),
                                N3.DataFactory.namedNode('skos:altLabel'),
                                N3.DataFactory.literal(label)
                            )
                        );
                    });
                }
            } else{
                writer.addQuad(
                    N3.DataFactory.quad(
                        N3.DataFactory.namedNode(subject),
                        N3.DataFactory.namedNode(`rdfs:${predicate}`),
                        N3.DataFactory.literal(item[predicate])
                    )
                );
            }
        }
    });

    const rdfData = await new Promise((resolve, reject) => {
        writer.end((error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
    return await saveNewContent(rdfGitHubURL, rdfData, commitMessage);
};*/
