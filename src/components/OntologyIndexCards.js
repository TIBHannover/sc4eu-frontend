import React, { Component } from 'react';
import PropTypes from 'prop-types';

import OntologyCard from './OntologyCard';
import { withCookies } from 'react-cookie';
import ViewOntology from '../pages/ViewOntology';

class OntologyIndexCards extends Component {
    constructor(props) {
        super(props);

        this.state = {
            shown: false,
            ontologyUUID: ''
        };
    }
    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    getSelectedOntology = param => {
        this.setState({ shown: param.shown });
        this.setState({ ontologyUUID: param.ontologyId });
    };

    renderOntologyCards() {
        console.log('rendering Cards?');
        console.log(this.props.ontologies);

        if (this.props.ontologies.length === 0) {
            return (
                <div style={{ textAlign: 'center' }}> There are no ontologies in the data base. You can upload ontologies using the menu above </div>
            );
        } else if (this.props.ontologies.length > 0) {
            //  render the cards;
            return (
                <div>
                    {this.state.shown === false ? (
                        this.props.ontologies.map((item, index) => (
                            <div>
                                <OntologyCard
                                    project={this.props.project}
                                    key={'OntologyCard_' + index}
                                    inputData={item}
                                    getSelectedOntology={param => {
                                        this.getSelectedOntology(param);
                                    }}
                                    callback={param => {
                                        this.props.reloadAfterDelete(param);
                                    }}
                                />
                            </div>
                        ))
                    ) : (
                        <ViewOntology ontologyId={this.state.ontologyUUID} />
                    )}
                </div>
            );
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
