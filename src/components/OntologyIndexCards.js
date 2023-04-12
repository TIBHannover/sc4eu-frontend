import React, { Component } from 'react';
import PropTypes from 'prop-types';
import OntologyCard from './OntologyCard';
import { withCookies } from 'react-cookie';
import { Scrollbars } from 'react-custom-scrollbars-2';

class OntologyIndexCards extends Component {
    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    renderOntologyCards() {
        if (this.props.ontologies.length === 0) {
            return (
                <div style={{ textAlign: 'center' }}> There are no ontologies in the data base. You can upload ontologies using the menu above </div>
            );
        } else if (this.props.ontologies.length > 0) {
            //  render the cards;
            return this.props.ontologies.map((item, index) => {
                return (
                    <OntologyCard
                        key={'OntologyCard_' + index}
                        inputData={item}
                        callback={param => {
                            this.props.reloadAfterUpdate(param);
                        }}
                        /*
                         * this is hardcoded for now, it needs to be changed.we need to add an entry to ontology Index about version
                         * */
                        ontologyVersion="Main"
                    />
                );
            });
        }
    }

    render() {
        return (
            <Scrollbars>
                <div className="pl-1 pr-1">{this.renderOntologyCards()}</div>
            </Scrollbars>
        );
    }
}

OntologyIndexCards.propTypes = {
    ontologies: PropTypes.array.isRequired,
    reloadAfterUpdate: PropTypes.func.isRequired
};

export default withCookies(OntologyIndexCards);
