import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

import { getAllOntologies } from '../network/ontologyIndexing';
import OntologyIndexCards from '../components/OntologyIndexCards';
import OntologyIndexInteractions from '../components/OntologyIndexInteractions';
import ProjectsSideBar from '../components/ProjectsSideBar';
import PropTypes from 'prop-types';
import { SELECTED_PROJECT_LIST_TAB_SESSION, SELECTED_PROJECT_SESSION } from '../constants/globalConstants';
import { PRIMARY } from '../styledComponents/styledComponents';

export default class OntologyIndexing extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            leftSidebarWidth: 450,
            //headerValue: 'You are current viewing Index of Ontologies for Default Project',
            headerValue: 'Please select a project to view its ontologies',
            selectedProject: false, //Maybe get the uuid for the Default Project here.
            ProjectListShown: 'true'
        };
    }

    componentDidMount() {
        // on mount we fetch all Ontologies
        if (this.props.location.project) {
            this.updateHeaderValue(this.props.location.project);
            this.setState({ selectedProject: this.props.location.project });
        }
        this.getOntologiesFromBackend();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const projectListTabSession = sessionStorage.getItem(SELECTED_PROJECT_LIST_TAB_SESSION);
        const selectedProjectSession = JSON.parse(sessionStorage.getItem(SELECTED_PROJECT_SESSION));
        if (projectListTabSession !== null && this.state.ProjectListShown !== projectListTabSession) {
            this.setState({ ProjectListShown: projectListTabSession });
            this.setState({ selectedProject: selectedProjectSession });
            sessionStorage.removeItem(SELECTED_PROJECT_LIST_TAB_SESSION);
        }
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
        this.setState({ selectedProject: projectSelected });
        console.log(projectSelected.name);
        let headerTitle = 'Please select a project to view its ontologies';
        if (projectSelected) {
            headerTitle = (
                <p>
                    You are currently viewing index of ontologies for <b> {projectSelected.name} </b> project
                </p>
            );
        }
        this.setState({ headerValue: headerTitle });
    };

    render() {
        return (
            <div style={{ height: '100vh', backgroundColor: PRIMARY.lighter }}>
                <Container
                    style={{
                        // border: '1px solid black',
                        borderTop: 'none',
                        overflow: 'auto',
                        position: 'relative',
                        backgroundColor: '#ffffff'
                    }}
                >
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
                    ) : this.state.ProjectListShown === 'true' || !this.state.selectedProject ? (
                        <ProjectsSideBar
                            title="Select Project"
                            updateHeaderValueCallback={params => {
                                this.updateHeaderValue(params);
                            }}
                        />
                    ) : this.state.ProjectListShown === 'false' || this.state.selectedProject ? (
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
                    ) : null}
                </Container>
            </div>
        );
    }
}

OntologyIndexing.propTypes = {
    location: PropTypes.object.isRequired
};
