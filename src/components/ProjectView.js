import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Collapse, Container } from 'reactstrap';
import { connect } from 'react-redux';
import CreateProjectModal from './CreateProjectModal';
import { getAllProjects } from '../network/projectIndexing';
import ProjectCard from './ProjectCard';
import { getUserProjects } from '../network/UserProfileCalls';
import { PRIMARY, SECONDARY } from '../styledComponents/styledComponents';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretLeft, faCaretRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import ProjectPermissionModal from './Modals/ProjectPermissionModal';

class ProjectView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minHeight: 200,
            title: props.title,
            initialRendering: true,
            collapse: true,
            collapseMetaInfo: true,
            showCreateProjectModal: false,
            results: '',
            isLoading: true,
            flipflop: false,
            isEditing: { description: false, title: false, version: false, iri: false },
            canNotAddProject: true,
            collapsePrivateProject: true,
            collapsePublicProject: true,
            showEmailModal: false
        };
    }

    componentDidMount() {
        //Get the current User from Redux State
        //TODO Retrive all the project for the current User
        //this.getProjectsFromBackend();
        if (
            this.props.user &&
            (this.props.user.role.toLowerCase() === 'Project Admin'.toLowerCase() ||
                this.props.user.role.toLowerCase() === 'System Admin'.toLowerCase())
        ) {
            this.setState({ canNotAddProject: false });
        }
        this.getProjectsFromBackend();
    }

    componentDidUpdate = prevProps => {
        if (prevProps.updateFlipFlop !== this.props.updateFlipFlop) {
            // this.setState({ initialRendering: false });
            this.getProjectsFromBackend();
        }
        if (prevProps.user !== this.props.user && this.props.user) {
            this.getProjectsFromBackend();
            if (
                this.props.user.role.toLowerCase() === 'Project Admin'.toLowerCase() ||
                this.props.user.role.toLowerCase() === 'System Admin'.toLowerCase()
            ) {
                this.setState({ canNotAddProject: false });
            }
        }
    };

    getProjectsFromBackend = () => {
        getAllProjects().then(allProjects => {
            allProjects.reverse().forEach(singleProject => {
                if (singleProject.access_type === 'Public' || singleProject.access_type === 'public') {
                    singleProject.unlock = true;
                }
                if (this.props.user) {
                    if (this.props.user.role === 'System Admin' || this.props.user.role === 'system admin') {
                        singleProject.unlock = true;
                    }
                    getUserProjects(this.props.user.userId).then(userProjectsUUID => {
                        userProjectsUUID.forEach(userProjectID => {
                            if (singleProject.uuid === userProjectID) {
                                singleProject.unlock = true;
                            }
                        });
                        this.setState({ flipflop: !this.state.flipflop });
                    });
                }
            });

            const sortProjects = [...allProjects].sort((p1, p2) => (p1.name.toLowerCase() > p2.name.toLowerCase() ? 1 : -1));
            this.setState({ results: sortProjects });
        });
    };

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    };

    projectCreated = param => {
        if (param.result === true) {
            this.setState({ showCreateProjectModal: false });
            this.props.reloadAfterUpdate();
        }
    };

    // reloadAfterUpdate = () => {
    //     this.setState({ isLoading: false });
    //     this.getProjectsFromBackend();
    // };

    togglePrivateProject = () => {
        this.setState({ collapsePrivateProject: !this.state.collapsePrivateProject });
    };

    togglePublicProject = () => {
        this.setState({ collapsePublicProject: !this.state.collapsePublicProject });
    };

    emailSent = () => {
        this.setState({ showEmailModal: false });
    };

    ProjectSection = ({ project, AccessType }) => {
        let isProjectAvailable = false;
        const filteredProject = project.filter(item => item.unlock && item.access_type === AccessType);
        if (filteredProject.length > 0) {
            isProjectAvailable = true;
        }
        return (
            <>
                {isProjectAvailable ? (
                    filteredProject.map(item => (
                        <ProjectCard
                            key={'ProjectCard_' + item.name}
                            inputData={item}
                            callback={param => {
                                this.props.reloadAfterUpdate(param);
                            }}
                        />
                    ))
                ) : (
                    <div style={{ paddingLeft: '3.5%', fontStyle: 'italic' }}>
                        {this.props.user === 0 || this.props.user === null ? (
                            <span>Please log in to see your own projects</span>
                        ) : (
                            <span>You do not have project</span>
                        )}
                    </div>
                )}
            </>
        );
    };

    render() {
        return (
            <div style={{ width: '60%', marginLeft: 'auto', backgroundColor: 'white', marginTop: '0.5%', height: '100%', marginRight: '2%' }}>
                <div
                    style={{
                        borderRadius: '10px',
                        borderBottomRightRadius: '0',
                        borderBottomLeftRadius: '0',
                        color: 'white',
                        backgroundColor: PRIMARY.dark,
                        height: '6%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center'
                    }}
                >
                    <h4 style={{ width: '100%', margin: '0 auto' }}>{this.state.title}</h4>
                </div>
                <div style={{ height: '10%' }}>
                    <div style={{ float: 'left' }}>
                        <p style={{ margin: '15px 15px 15px 15px', fontStyle: 'italic' }}>
                            Click on one of the projects below to view its ontologies
                        </p>
                        {this.props.user?.role === 'System Admin' || this.props.user?.role === 'Project Admin' ? (
                            <></>
                        ) : this.props.user ? (
                            <>
                                <span style={{ margin: '15px 15px 15px 15px', fontStyle: 'italic' }}>
                                    You are "{this.props.user?.role}" and you have limited access to SC3 portal, become project admin please send mail
                                </span>
                                <span>
                                    <FontAwesomeIcon
                                        icon={faEnvelope}
                                        size="1x"
                                        color={SECONDARY.darker}
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => {
                                            this.setState({ showEmailModal: true });
                                        }}
                                    />
                                </span>
                            </>
                        ) : (
                            <span style={{ margin: '15px 15px 15px 15px', fontStyle: 'italic' }}>Please sign in to request for change a role</span>
                        )}
                    </div>
                    <Button
                        style={{ margin: '15px 15px 15px 15px', backgroundColor: SECONDARY.dark, float: 'right' }}
                        disabled={this.state.canNotAddProject}
                        title={this.state.canNotAddProject ? 'Only Project Admin and System Admin can add projects' : 'Click to add new Project'}
                        onClick={() => {
                            this.setState({ showCreateProjectModal: true });
                        }}
                    >
                        Add New Project
                    </Button>
                    <CreateProjectModal
                        showDialog={this.state.showCreateProjectModal}
                        toggle={() => {
                            this.setState({ showCreateProjectModal: !this.state.showCreateProjectModal });
                        }}
                        callback={param => {
                            this.projectCreated(param);
                        }}
                    />
                    <ProjectPermissionModal
                        toggle={() => {
                            this.setState({ showEmailModal: !this.state.showEmailModal });
                        }}
                        showDialog={this.state.showEmailModal}
                        callback={() => {
                            this.emailSent();
                        }}
                        title="Request to Become Project Admin"
                        isRoleChanged={true}
                        userEmail={this.props.user ? this.props.user.userEmail : 'terminology-service@tib.eu'}
                        userName={this.props.user ? this.props.user.displayName : 'terminology-service@tib.eu'}
                    />
                </div>
                <Scrollbars style={{ height: '83%', borderTop: '0.01rem solid #e7e9eb' }}>
                    <StyledButton onClick={this.togglePrivateProject}>
                        <FontAwesomeIcon
                            style={{
                                width: '3%',
                                margin: '4px 0px 0px 0px'
                            }}
                            color={PRIMARY.dark}
                            icon={!this.state.collapsePrivateProject ? faCaretRight : faCaretDown}
                        />
                        <StyledH4>
                            <span style={{ background: '#fff', padding: '0 10px' }}>My Projects</span>
                        </StyledH4>
                        <FontAwesomeIcon
                            color={PRIMARY.dark}
                            style={{ width: '3%', margin: '4px 0px 0px 0px' }}
                            icon={!this.state.collapsePrivateProject ? faCaretLeft : faCaretDown}
                        />
                    </StyledButton>
                    <Collapse isOpen={this.state.collapsePrivateProject}>
                        {this.state.results ? <this.ProjectSection project={this.state.results} AccessType="Private" /> : 'Still Loading'}
                    </Collapse>
                    <StyledButton style={{ marginTop: '1%' }} onClick={this.togglePublicProject}>
                        <FontAwesomeIcon
                            color={PRIMARY.dark}
                            style={{ width: '3%', margin: '4px 0px 0px 0px' }}
                            icon={!this.state.collapsePublicProject ? faCaretRight : faCaretDown}
                        />
                        <StyledH4>
                            <span style={{ background: '#fff', padding: '0 10px' }}>Public Projects</span>
                        </StyledH4>
                        <FontAwesomeIcon
                            color={PRIMARY.dark}
                            style={{ width: '3%', margin: '4px 0px 0px 0px' }}
                            icon={!this.state.collapsePublicProject ? faCaretLeft : faCaretDown}
                        />
                    </StyledButton>
                    <Collapse isOpen={this.state.collapsePublicProject}>
                        {this.state.results ? <this.ProjectSection project={this.state.results} AccessType="Public" /> : 'Still Loading'}
                    </Collapse>
                </Scrollbars>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({});

ProjectView.propTypes = {
    title: PropTypes.string,
    reloadAfterUpdate: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    updateFlipFlop: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);

const StyledButton = styled.button`
    width: 100%;
    border: none;
    background: none;
    display: flex;
    padding-top: 10px;
`;

const StyledH4 = styled.h4`
    width: 98%;
    text-align: center;
    color: ${PRIMARY.dark};
    border-bottom: 2px solid #769fcd;
    line-height: 0.1em;
    margin: 10px 0px 20px 0px;
`;
