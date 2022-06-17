import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { getAllOntologies } from '../network/ontologyIndexing';
import OntologyIndexCards from '../components/OntologyIndexCards';
import OntologyIndexInteractions from '../components/OntologyIndexInteractions';
import { ProjectsSideBar } from '../components/ProjectsSideBar';

export default class OntologyIndexing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            leftSidebarWidth: 450,
            headerValue: 'You are current viewing Index of Ontologies for Default Project'
        };
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
        this.setState({ isLoading: false });
        this.getOntologiesFromBackend();
    };

    reloadAfterDelete = () => {
        this.setState({ isLoading: false });
        this.getOntologiesFromBackend();
    };

    updateHeaderValue = headerValue => {
        if (headerValue) {
            const headerTitle = 'You are current viewing Index of Ontologies for ' + headerValue + ' Project';
            this.setState({ headerValue: headerTitle });
        }
    };

    render() {
        return (
            <>
                <ProjectsSideBar
                    width={this.state.leftSidebarWidth}
                    initialState={true}
                    height={this.state.containerHeight - 40}
                    title="Projects"
                    updateHeaderValueCallback={this.updateHeaderValue}
                    // loading={this.props.loading}
                    //updateEvent={this.leftSideBarUpdateEvent}
                />
                <Container
                    className="box pt-2 pb-2 pl-0 pr-0"
                    style={{
                        backgroundColor: 'white',
                        border: '1px solid black',
                        borderTop: 'none',
                        overflow: 'auto',
                        float: 'left',
                        position: 'relative'
                    }}
                >
                    <h2
                        className="noSelect pl-3 pr-3 pb-3"
                        style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis', textAlign: 'center' }}
                        title={this.state.headerValue}
                    >
                        {this.state.headerValue}
                    </h2>
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
                                <OntologyIndexCards
                                    ontologies={this.state.results}
                                    reloadAfterDelete={() => {
                                        this.reloadAfterDelete();
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </Container>
            </>
        );
    }
}
