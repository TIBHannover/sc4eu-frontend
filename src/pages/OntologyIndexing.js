import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { getAllOntologies } from '../network/ontologyIndexing';
import OntologyIndexCards from '../components/OntologyIndexCards';
import OntologyIndexInteractions from '../components/OntologyIndexInteractions';

export default class OntologyIndexing extends Component {
    constructor(props) {
        super(props);

        this.state = { isLoading: true };
        this.headerValue = 'Browse Ontologies of the SemiConductor Domain';
    }

    componentDidMount() {
        // on mount we fetch all Ontologies
        this.getOntologiesFromBackend();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    getOntologiesFromBackend = () => {
        console.log('fetching ontologies from backend');
        // TODO : this component will need a connection to the redux state for the users;

        getAllOntologies().then(res => {
            console.log('hasResults:', res);
            this.setState({ isLoading: false, results: res });
        });
    };

    reloadAfterUpdate = () => {
        this.setState({ isLoading: false, results: true });
        this.getOntologiesFromBackend();
    };

    render() {
        return (
            <Container className="box pt-2 pb-2 pl-0 pr-0" style={{ backgroundColor: 'white', border: '1px solid black', borderTop: 'none' }}>
                <h1
                    className="noSelect pl-3 pr-3"
                    style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', textAlign: 'center' }}
                    title={this.headerValue}
                >
                    {this.headerValue}
                </h1>
                <hr className="mt-0 mb-2" />
                <div className="pl-1 pr-1">
                    {this.state.isLoading ? (
                        <div className="text-center text-primary mt-4 mb-4">
                            {/*using a manual fixed scale value for the spinner scale! */}

                            <h2 className="h5">
                                <span>
                                    <Icon icon={faSpinner} spin />
                                </span>{' '}
                                Loading
                            </h2>
                        </div>
                    ) : (
                        <div>
                            <OntologyIndexInteractions
                                reloadAfterUpdate={() => {
                                    this.reloadAfterUpdate();
                                }}
                            />
                            <hr className="mt-0 mb-2" />
                            <OntologyIndexCards ontologies={this.state.results} />
                        </div>
                    )}
                </div>
            </Container>
        );
    }
}
