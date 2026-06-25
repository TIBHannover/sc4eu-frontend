import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OntologyCard from './OntologyCard';
import { withCookies } from 'react-cookie';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { StyledProjectsGrid, StyledScrollbarDiv } from 'styledComponents/styledComponents';
class OntologyIndexCards extends Component {
    renderOntologyCards() {
        const { ontologies, currentUser, reloadAfterUpdate } = this.props;

        if (ontologies.length === 0) {
            return (
                <div style={{ textAlign: 'center' }}>There are no ontologies in the database. You can upload ontologies using the menu above.</div>
            );
        }

        const sortedOntologies = ontologies.slice().sort((a, b) => a.name.localeCompare(b.name));

        return sortedOntologies.map((ontology, index) => (
            <OntologyCard
                key={`OntologyCard_${index}`}
                ontology={ontology}
                currentUser={currentUser}
                inputData={ontology}
                callback={reloadAfterUpdate}
                autoRefresh={this.props.project_name === 'Digital Reference'}
                //     /*
                //      * this is hardcoded for now, it needs to be changed.we need to add an entry to ontology Index about version
                //      * */
                ontologyVersion="Main"
            />
        ));
    }

    render() {
        return (
            <StyledScrollbarDiv>
                <Scrollbars style={{ width: '100%', height: '100%' }} autoHide universal={true}>
                    <StyledProjectsGrid>{this.renderOntologyCards()}</StyledProjectsGrid>
                </Scrollbars>
            </StyledScrollbarDiv>
        );
    }
}

OntologyIndexCards.propTypes = {
    ontologies: PropTypes.array.isRequired,
    currentUser: PropTypes.oneOfType([PropTypes.object, PropTypes.number]).isRequired,
    project_name: PropTypes.string.isRequired,
    reloadAfterUpdate: PropTypes.func.isRequired
};

export default withCookies(OntologyIndexCards);

