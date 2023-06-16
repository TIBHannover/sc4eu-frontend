import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import CreateProjectModal from './CreateProjectModal';
import { getAllProjects } from '../network/projectIndexing';
import ProjectCard from './ProjectCard';
import { getUserProjects } from '../network/UserProfileCalls';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretLeft, faCaretRight, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import ProjectPermissionModal from './Modals/ProjectPermissionModal';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';
import { MIN_WIDTH_FOR_MONITOR } from '../styledComponents/styledComponents';

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
            collapsePrivateProject: false,
            collapsePublicProject: false,
            collapseSC3Project: false,
            collapseSandBoxProject: false,
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

    toggleSC3Project = () => {
        this.setState({ collapseSC3Project: !this.state.collapseSC3Project });
    };

    toggleSandBoxProject = () => {
        this.setState({ collapseSandBoxProject: !this.state.collapseSandBoxProject });
    };

    emailSent = () => {
        this.setState({ showEmailModal: false });
    };

    ProjectSection = ({ project, AccessType }) => {
        let isProjectAvailable = false;
        // SC3ProjectName have that project which project name contain SC3 word  and this project is visible in the SC3 Project Section in List of project view  page
        const SC3ProjectName = project.filter(item => item.name.toLowerCase().includes('sc 3') || item.name.toLowerCase().includes('sc3'));
        const SandboxProject = project.filter(item => item.name.toLowerCase().includes('sandbox'));
        const PublicAndPrivateProject = project.filter(
            item => item.unlock && item.access_type === AccessType && !SC3ProjectName.includes(item) && !SandboxProject.includes(item)
        );

        let filteredProject;

        if (AccessType === 'SC3') {
            filteredProject = SC3ProjectName;
        } else if (AccessType === 'Sandbox') {
            filteredProject = SandboxProject;
        } else {
            filteredProject = PublicAndPrivateProject;
        }
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
                            currentUser={this.props.user}
                            callback={param => {
                                this.props.reloadAfterUpdate(param);
                            }}
                        />
                    ))
                ) : (
                    <div style={{ paddingLeft: '3.5%' }}>
                        {this.props.user === 0 || this.props.user === null ? (
                            <StyledInfoSpan>Please log in to see your own projects</StyledInfoSpan>
                        ) : (
                            <StyledInfoSpan>You do not have project</StyledInfoSpan>
                        )}
                    </div>
                )}
            </>
        );
    };

    render() {
        return (
            <StyledRootDiv>
                <StyledHeadingDiv>
                    <h4 style={{ width: '100%', margin: '0 auto' }}>{this.state.title}</h4>
                </StyledHeadingDiv>
                <StyledSubHeadingDiv>
                    <StyledInfoSpan style={{ margin: '15px 15px 15px 15px', float: 'left' }}>
                        Click on one of the projects below to view its ontologies
                    </StyledInfoSpan>
                    <StyledButtonToAddProject
                        disabled={this.state.canNotAddProject}
                        title={this.state.canNotAddProject ? 'Only Project Admin and System Admin can add projects' : 'Click to add new Project'}
                        onClick={() => {
                            this.setState({ showCreateProjectModal: true });
                        }}
                    >
                        Add New Project
                    </StyledButtonToAddProject>
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
                    <div style={{ float: 'left', width: '70%', marginLeft: '15px' }}>
                        {this.props.user?.role === 'System Admin' || this.props.user?.role === 'Project Admin' ? (
                            <></>
                        ) : this.props.user ? (
                            <>
                                <StyledInfoSpan>
                                    You are "{this.props.user?.role}" and you have limited access to SC3 portal, become project admin please send mail
                                </StyledInfoSpan>
                                <span style={{ marginLeft: '10px' }}>
                                    <StyledIcon
                                        icon={faEnvelope}
                                        color={colorStyled.SECONDARY.darker}
                                        onClick={() => {
                                            this.setState({ showEmailModal: true });
                                        }}
                                    />
                                </span>
                            </>
                        ) : (
                            <StyledInfoSpan>Please sign in to request for change a role</StyledInfoSpan>
                        )}
                    </div>
                </StyledSubHeadingDiv>
                <StyledScrollbarDiv>
                    <Scrollbars>
                        <StyledButton onClick={this.toggleSC3Project}>
                            <FontAwesomeIcon
                                style={{
                                    width: '3%',
                                    margin: '4px 0px 0px 0px'
                                }}
                                color={colorStyled.PRIMARY.dark}
                                icon={!this.state.collapseSC3Project ? faCaretRight : faCaretDown}
                            />
                            <StyledH4>
                                <span style={{ background: colorStyled.CONTAINER_BACKGROUND_COLOR, padding: '0 10px' }}>SC3 Collection</span>
                            </StyledH4>
                            <FontAwesomeIcon
                                color={colorStyled.PRIMARY.dark}
                                style={{ width: '3%', margin: '4px 0px 0px 0px' }}
                                icon={!this.state.collapseSC3Project ? faCaretLeft : faCaretDown}
                            />
                        </StyledButton>
                        <StyledCollapseDiv collapse={this.state.collapseSC3Project}>
                            {this.state.results ? <this.ProjectSection project={this.state.results} AccessType="SC3" /> : 'Still Loading'}
                        </StyledCollapseDiv>
                        <StyledButton onClick={this.toggleSandBoxProject}>
                            <FontAwesomeIcon
                                style={{
                                    width: '3%',
                                    margin: '4px 0px 0px 0px'
                                }}
                                color={colorStyled.PRIMARY.dark}
                                icon={!this.state.collapseSandBoxProject ? faCaretRight : faCaretDown}
                            />
                            <StyledH4>
                                <span style={{ background: colorStyled.CONTAINER_BACKGROUND_COLOR, padding: '0 10px' }}>Sandbox Collection</span>
                            </StyledH4>
                            <FontAwesomeIcon
                                color={colorStyled.PRIMARY.dark}
                                style={{ width: '3%', margin: '4px 0px 0px 0px' }}
                                icon={!this.state.collapseSandBoxProject ? faCaretLeft : faCaretDown}
                            />
                        </StyledButton>
                        <StyledCollapseDiv collapse={this.state.collapseSandBoxProject}>
                            {this.state.results ? <this.ProjectSection project={this.state.results} AccessType="Sandbox" /> : 'Still Loading'}
                        </StyledCollapseDiv>
                        <StyledButton style={{ marginTop: '1%' }} onClick={this.togglePrivateProject}>
                            <FontAwesomeIcon
                                style={{
                                    width: '3%',
                                    margin: '4px 0px 0px 0px'
                                }}
                                color={colorStyled.PRIMARY.dark}
                                icon={!this.state.collapsePrivateProject ? faCaretRight : faCaretDown}
                            />
                            <StyledH4>
                                <span style={{ background: colorStyled.CONTAINER_BACKGROUND_COLOR, padding: '0 10px' }}>My Collection</span>
                            </StyledH4>
                            <FontAwesomeIcon
                                color={colorStyled.PRIMARY.dark}
                                style={{ width: '3%', margin: '4px 0px 0px 0px' }}
                                icon={!this.state.collapsePrivateProject ? faCaretLeft : faCaretDown}
                            />
                        </StyledButton>
                        <StyledCollapseDiv collapse={this.state.collapsePrivateProject}>
                            {this.state.results ? <this.ProjectSection project={this.state.results} AccessType="Private" /> : 'Still Loading'}
                        </StyledCollapseDiv>
                        <StyledButton style={{ marginTop: '1%' }} onClick={this.togglePublicProject}>
                            <FontAwesomeIcon
                                color={colorStyled.PRIMARY.dark}
                                style={{ width: '3%', margin: '4px 0px 0px 0px' }}
                                icon={!this.state.collapsePublicProject ? faCaretRight : faCaretDown}
                            />
                            <StyledH4>
                                <span style={{ background: colorStyled.CONTAINER_BACKGROUND_COLOR, padding: '0 10px' }}>Public Collection</span>
                            </StyledH4>
                            <FontAwesomeIcon
                                color={colorStyled.PRIMARY.dark}
                                style={{ width: '3%', margin: '4px 0px 0px 0px' }}
                                icon={!this.state.collapsePublicProject ? faCaretLeft : faCaretDown}
                            />
                        </StyledButton>
                        <StyledCollapseDiv collapse={this.state.collapsePublicProject}>
                            {this.state.results ? <this.ProjectSection project={this.state.results} AccessType="Public" /> : 'Still Loading'}
                        </StyledCollapseDiv>
                    </Scrollbars>
                </StyledScrollbarDiv>
            </StyledRootDiv>
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

const StyledRootDiv = styled.div`
    width: 65%;
    margin-left: auto;
    background-color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    margin-top: 0.5%;
    height: 95%;
    margin-right: 2%;
    font-family: ${fontStyled.fontFamily};
`;

const StyledHeadingDiv = styled.div`
    border-radius: 10px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    background-color: ${colorStyled.PRIMARY.dark};
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
`;

const StyledButton = styled.button`
    width: 100%;
    border: none;
    background: none;
    display: flex;
    padding-top: 10px;
    transition: 0.9s;
`;

const StyledSubHeadingDiv = styled.div`
    height: 100px;
`;

const StyledInfoSpan = styled.span`
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledButtonToAddProject = styled(Button)`
    margin: 15px 15px 15px 0px;
    background-color: ${colorStyled.SECONDARY.dark};
    float: right;
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledIcon = styled(FontAwesomeIcon)`
    cursor: pointer;
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const StyledScrollbarDiv = styled.div`
    height: calc(100% - 160px);
    border-top: 0.01rem solid ${colorStyled.SCROLLBAR_BORDER_COLOR};
`;

const StyledH4 = styled.h4`
    width: 98%;
    text-align: center;
    color: ${colorStyled.PRIMARY.dark};
    border-bottom: 2px solid ${colorStyled.BORDER_COLOR};
    line-height: 0.1em;
    margin: 10px 0px 20px 0px;
    font-size: ${fontStyled.fontSize.subHeading};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.Heading};
    }
`;

const StyledCollapseDiv = styled.div`
    overflow: hidden;
    transition: max-height 0.9s ease-out;
    max-height: ${props => (props.collapse ? 'auto' : '0')};

    & > * {
        transition: opacity 0.9s;
        opacity: ${props => (props.collapse ? '1' : '0')};
    }
`;
