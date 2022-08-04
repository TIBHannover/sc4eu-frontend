import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OntologyCard from './OntologyCard';
import { withCookies } from 'react-cookie';

class OntologyIndexCards extends Component {
    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    renderOntologyCards() {
        console.log('rendering Cards?');
        console.log(this.props.ontologies);

        if (this.props.ontologies.length === 0) {
            return (
                <div style={{ textAlign: 'center' }}> There are no ontologies in the data base. You can upload ontologies using the menu above </div>
            );
        } else if (this.props.ontologies.length > 0) {
            //  render the cards;
            return this.props.ontologies.map((item, index) => {
                return (
                    <OntologyCard
                        project={this.props.project}
                        key={'OntologyCard_' + index}
                        inputData={item}
                        callback={param => {
                            this.props.reloadAfterDelete(param);
                        }}
                    />
                );
            });
        }
    }

    render() {
        return (
            <div className="pl-1 pr-1" style={{ overflow: 'auto' }}>
                {this.renderOntologyCards()}
            </div>
        );
    }
}

OntologyIndexCards.propTypes = {
    project: PropTypes.object.isRequired,
    ontologies: PropTypes.array.isRequired,
    reloadAfterDelete: PropTypes.func.isRequired
};

export default withCookies(OntologyIndexCards);
