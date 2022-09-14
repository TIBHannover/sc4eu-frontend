import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Input } from 'reactstrap';
import { transformResourceToTTL_TextView } from '../../mappers/ResToTTL';
import { transformRelationToTTL_TextView } from '../../mappers/RelationToTTL';

class OntologyViewAsTTL extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ontologyAsTTL: 'This is some text here a'
        };
    }

    componentDidMount() {
        const prefixList = this.props.metaInformation.prefixList.shortToLong;

        let prefixDefinition = '';
        for (const name in prefixList) {
            if (prefixList.hasOwnProperty(name)) {
                prefixDefinition += '@prefix ' + name + ': \t <' + prefixList[name] + '> . \n';
            }
        }
        // TODO : extract the meta information form the meta object in a function
        let ontologyPreamble =
            '#################################################################\n' +
            '#   Ontology \n' +
            '#################################################################\n';
        ontologyPreamble += '<' + this.props.metaInformation.metaDescriptions.iri + '> rdf:type owl:Ontology ; \n';
        if (this.props.metaInformation.metaDescriptions.description) {
            ontologyPreamble += '\t\t\t dc:description "' + this.props.metaInformation.metaDescriptions.description.en + '" .\n';
        }

        // TODO ^^^^ the above is just a testing example. not fully working yet, termination tokens and values need to be extracted

        // extract annotation Properties (yet missing in the transformation model TODO

        // extract classes
        let classDefinitions =
            '#################################################################\n' +
            '#    Classes\n' +
            '#################################################################\n\n';

        const resources = this.props.resources;
        const relations = this.props.relations;

        resources.forEach(resource => {
            if (resource.resourceURI === 'http://www.w3.org/2000/01/rdf-schema#Literal') {
            } else {
                classDefinitions += transformResourceToTTL_TextView(resource, this.props.metaInformation.prefixList.longToShort) + '\n\n';
            }
        });

        //extract datatypeProperties
        let datatypePropertyDefinitions =
            '#################################################################\n' +
            '#     Datatype properties\n' +
            '#################################################################\n\n';

        const datatypeProperties = relations.filter(item => item.type[0] === 'owl:DatatypeProperty');
        datatypeProperties.forEach(relation => {
            datatypePropertyDefinitions += transformRelationToTTL_TextView(relation, this.props.metaInformation.prefixList.longToShort) + '\n\n';
        });

        // extract objectProperties
        let objectPropertyDefinitions =
            '#################################################################\n' +
            '#    Object Properties\n' +
            '#################################################################\n\n';

        const objectProperties = relations.filter(item => item.type[0] === 'owl:ObjectProperty');
        objectProperties.forEach(relation => {
            objectPropertyDefinitions += transformRelationToTTL_TextView(relation, this.props.metaInformation.prefixList.longToShort) + '\n\n';
        });

        const fullData =
            prefixDefinition +
            '\n' +
            ontologyPreamble +
            '\n' +
            classDefinitions +
            '\n' +
            datatypePropertyDefinitions +
            '\n' +
            objectPropertyDefinitions;

        this.setState({ ontologyAsTTL: fullData });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        return (
            <Container>
                <Input
                    style={{ height: 'calc(100vh - 80px)', resize: 'none', marginTop: '20px' }}
                    type="textarea"
                    value={this.state.ontologyAsTTL}
                    readOnly
                />
            </Container>
        );
    }
}

const mapStateToProps = state => {
    return {
        resources: state.ResourceRelationModelReducer.resources,
        relations: state.ResourceRelationModelReducer.relations,
        metaInformation: state.ResourceRelationModelReducer.metaInformation
    };
};

OntologyViewAsTTL.propTypes = {
    resources: PropTypes.array.isRequired,
    relations: PropTypes.array.isRequired,
    metaInformation: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OntologyViewAsTTL);
