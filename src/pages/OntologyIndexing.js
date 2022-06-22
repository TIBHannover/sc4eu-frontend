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
            //headerValue: 'You are current viewing Index of Ontologies for Default Project',
            headerValue: 'Please select a project to view its ontologies',
            selectedProject: false //Maybe get the uuid for the Default Project here.
        };
    }

    componentDidMount() {
        // on mount we fetch all Ontologies
        this.getOntologiesFromBackend();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.selectedProject !== this.state.selectedProject) {
            this.getOntologiesFromBackend();
        }
    }

    getOntologiesFromBackend = () => {
        console.log('fetching ontologies from backend', this.state.selectedProject);
        // TODO : this component will need a connection to the redux state for the users;
        // TODO: check if the current user is allowed to view ontologies for this project
        getAllOntologies(this.state.selectedProject.uuid).then(res => {
            //There is a chance that the project do not have any ontologies.
            if (res.ontologyIndex === 'Undefined') {
                res = false;
            }
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

    updateHeaderValue = projectSelected => {
        console.log(projectSelected.uuid);
        this.setState({ selectedProject: projectSelected });
        if (projectSelected) {
            const headerTitle = 'You are currently viewing index of ontologies for ' + projectSelected.name + ' project';
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
                    updateHeaderValueCallback={params => {
                        this.updateHeaderValue(params);
                    }}
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
                        ) : this.state.selectedProject ? (
                            <div>
                                <OntologyIndexInteractions
                                    project_id={this.state.selectedProject.uuid}
                                    reloadAfterUpdate={() => {
                                        this.reloadAfterUpdate();
                                    }}
                                />
                                <hr className="mt-0 mb-2" />
                                {this.state.results ? (
                                    <OntologyIndexCards
                                        ontologies={this.state.results}
                                        reloadAfterDelete={() => {
                                            this.reloadAfterDelete();
                                        }}
                                    />
                                ) : (
                                    <div> No ontologies found in this project </div>
                                )}
                            </div>
                        ) : (
                            <div />
                        )}
                    </div>
                </Container>
            </>
        );
    }
}
