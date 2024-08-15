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
    // const response = await axios.get(rdfGitHubURL);
    // const data = response.data;
    const rdfDataGithub = await getFileDataFromGitHub(rdfGitHubURL);
    const rdfDecodedDataGithub = Buffer.from(rdfDataGithub['content'], 'base64').toString('utf8');

    const parser = new N3.Parser({ format: 'Turtle' });
    const quads = [];
    const result = {};

    // Wrap parser.parse in a Promise to ensure it completes before processing quads
    await new Promise((resolve, reject) => {
        parser.parse(rdfDecodedDataGithub, (error, quad, prefixes) => {
            // if (prefixes) {
            //     console.log('prefixes', prefixes);
            // }
            if (error) {
                reject(error);
            } else if (quad) {
                if(quad.predicate.value.split('#')[1] !== 'type') {
                    quads.push({
                        subject: quad.subject.value.split('#')[1],
                        predicate: quad.predicate.value.split('#')[1],
                        object: quad.object.value
                    });
                }
            } else {
                // parser.parse is done when it calls the callback with null for the quad
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
        } else {
            result[quad.subject][quad.predicate] = quad.object;
        }
        //result[quad.subject][quad.predicate] = quad.object;
    });

    return Object.entries(result).map(([id, value]) => ({ id, ...value }));
};

/**
 * Writes an array of JavaScript objects into RDF format and commits the changes to the given URL.
 *
 * @param {string} rdfGitHubURL - The URL to commit the changes to.
 * @param {Array} newTerms - The data to write into RDF format.
 * @param commitMessage
 * @returns {Promise} A promise that resolves when the data has been written and the changes have been committed.
 */
export const writeRDF = async (rdfGitHubURL, newTerms, commitMessage) => {
    const writer = new N3.Writer({
        format: 'Turtle',
        prefixes: {
            owl: 'http://www.w3.org/2002/07/owl#',
            rdfs: 'http://www.w3.org/2000/01/rdf-schema#',
            rdf: 'http://www.w3.org/1999/02/22-rdf-syntax-ns#',
            skos: 'http://www.w3.org/2004/02/skos/core#'
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
};
