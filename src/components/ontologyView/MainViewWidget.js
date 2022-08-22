import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import ProjectsSideBar from '../ProjectsSideBar';
import { getAllOntologies } from '../../network/ontologyIndexing';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import OntologyIndexInteractions from '../OntologyIndexInteractions';
import OntologyIndexCards from '../OntologyIndexCards';

export default class MainViewWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            minWidth: 300,

            title: props.title,
            initialRendering: true,
            updateFlipFlop: false,
            isLoading: true,
            leftSidebarWidth: 450,
            headerValue: 'Please select a project to view its ontologies',
            selectedProject: false,
            ontologyUploadIsShown: false
        };
    }

    componentDidMount() {
        this.setState({ initialRendering: false });
        // if (this.props.location.project) {
        //     this.updateHeaderValue(this.props.location.project);
        //     this.setState({ selectedProject: this.props.location.project });
        // }
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
        console.log('selected projects');
        console.log(projectSelected);
        this.setState({ selectedProject: projectSelected });
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

    ontologyUploadIsShown = param => {
        console.log(param);
        this.setState({ ontologyUploadIsShown: param });
        console.log('thi is pram from the ontology cardsssssssssssssssssssssssssssssssss');
    };

    render() {
        return (
            <ContentContainer
                id="MainWidget"
                expandedLeft={this.props.leftSideBarExpanded}
                expandedRight={this.props.rightSideBarExpanded}
                oldWidth={this.props.oldWidth}
                newWidth={this.props.newWidth}
                leftWidth={this.props.leftSidebarWidth}
                rightWidth={this.props.rightSidebarWidth}
                oldLeftExpanded={this.props.oldLeftSidebarState}
                initialRendering={this.state.initialRendering}
                fullWidth={this.props.fullWidth}
                style={{
                    height: this.props.height + 'px',
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        width: '90%',
                        height: '100%',
                        border: '1px solid black',
                        position: 'relative',
                        left: '5%',
                        backgroundColor: '#f2f2f2'
                    }}
                >
                    {!this.state.selectedProject ? (
                        <ProjectsSideBar
                            title="Projects"
                            updateHeaderValueCallback={params => {
                                this.updateHeaderValue(params);
                            }}
                        />
                    ) : this.state.isLoading ? (
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
                                    project={this.state.selectedProject}
                                    ontologies={this.state.results}
                                    reloadAfterDelete={() => {
                                        this.reloadAfterDelete();
                                    }}
                                    ontologyUploadIsShownCallback={param => {
                                        this.ontologyUploadIsShown(param);
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
            </ContentContainer>
        );
    }
}

MainViewWidget.propTypes = {
    title: PropTypes.string,
    oldWidth: PropTypes.number,
    newWidth: PropTypes.number,
    height: PropTypes.number,
    fullWidth: PropTypes.number,
    leftSidebarWidth: PropTypes.number.isRequired,
    rightSidebarWidth: PropTypes.number.isRequired,
    oldLeftSidebarState: PropTypes.bool.isRequired,
    leftSideBarExpanded: PropTypes.bool.isRequired,
    rightSideBarExpanded: PropTypes.bool.isRequired,
    experimentalLayout: PropTypes.bool.isRequired,
    location: PropTypes.object.isRequired
};

const expandContentContainerAnimation = ({ expandedLeft, oldLeftExpanded, newWidth, oldWidth, leftWidth, initialRendering, fullWidth }) => {
    // Handing initial rendering
    if (initialRendering) {
        // create await call
        return keyframes`
          from {
            left: ${0}px;
            width:${fullWidth}px;
          }
          to {
            left: ${leftWidth}px;
            width:${newWidth}px;
          }
        `;
    }

    // the other cases need to be simplified
    if (!initialRendering) {
        // Handing right sidebar collapse expand when left is open
        if (expandedLeft && oldLeftExpanded === true) {
            return keyframes`
              from {
                left: ${leftWidth}px;
                width:${oldWidth}px;
              }
              to {
                left: ${leftWidth}px;
                width:${newWidth}px;
              }
        `;
        }

        if (!expandedLeft && oldLeftExpanded === true) {
            return keyframes`
              from {
                left: ${leftWidth}px;
                width:${oldWidth}px;
              }
              to {
                left:  ${0}px;
                width:${newWidth}px;
              }
            `;
        }

        if (!expandedLeft && oldLeftExpanded === false) {
            return keyframes`
              from {
                left: ${0}px;
                width:${oldWidth}px
              }
              to {
                left: ${leftWidth}px
                width:${newWidth}px;
              }
            `;
        }

        if (expandedLeft && oldLeftExpanded === false) {
            return keyframes`
              from {
                left: ${0}px;
                width:${oldWidth}px
              }
              to {
                left: ${leftWidth};
                width:${newWidth}
            `;
        }
    }
};

const ContentContainer = styled.div`
    animation-name: ${expandContentContainerAnimation};
    animation-duration: 400ms;
    position: relative;

    width: ${props => props.newWidth}px;
    left: ${props => (props.expandedLeft ? props.leftWidth : 0)}px;
`;
