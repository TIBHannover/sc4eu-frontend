import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OntologyCard from './OntologyCard';
import { withCookies } from 'react-cookie';
import { Scrollbars } from 'react-custom-scrollbars-2';
import styled from 'styled-components';
import { colorStyled } from '../styledComponents/styledColor';

class OntologyIndexCards extends Component {
    renderOntologyCards() {
        const { ontologies, currentUser, reloadAfterUpdate } = this.props;

        if (ontologies.length === 0) {
            return (
                <div style={{ textAlign: 'center' }}>There are no ontologies in the database. You can upload ontologies using the menu above.</div>
            );
        }

        return ontologies.map((ontology, index) => (
            <OntologyCard
                key={`OntologyCard_${index}`}
                ontology={ontology}
                currentUser={currentUser}
                inputData={ontology}
                callback={reloadAfterUpdate}
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
    reloadAfterUpdate: PropTypes.func.isRequired
};

export default withCookies(OntologyIndexCards);

const StyledProjectsGrid = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 20px;
    padding: 20px;
    width: 100%;

    /* For screens that can fit 3 cards (min-width: 300px * 3 + gap * 2 + padding * 2) */
    @media (min-width: 980px) {
        justify-content: flex-start;
    }

    /* For screens that can fit 4 cards */
    @media (min-width: 1300px) {
        justify-content: flex-start;
    }

    /* For screens that can fit 5 cards */
    @media (min-width: 1620px) {
        justify-content: flex-start;
    }
`;

const StyledScrollbarDiv = styled.div`
    height: calc(100%);
    width: 100%;
    border-top: 0.01rem solid ${colorStyled.SCROLLBAR_BORDER_COLOR};
`;
