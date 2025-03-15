import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';
import { MIN_WIDTH_FOR_MONITOR } from '../styledComponents/styledComponents';
import ProjectCard2 from './ProjectCard2';
import CreateProjectModal from './CreateProjectModal';
import EditProjectModal from './EditProjectModal';
import ProjectPermissionModal from './Modals/ProjectPermissionModal';
import CheckboxDropdown from '../utils/CheckboxDropdown';
import DeleteConfirmationDialog from '../utils/DeleteConfirmationDialog';
import { getAllProjects, deleteProject } from '../network/projectIndexing';
import { getUserProjects } from '../network/UserProfileCalls';
import { userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { redux_addProject, redux_removeProject, redux_removeOntology, redux_removeAlreadyLoadedOntology } from '../redux/actions/rrm_actions';

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
            allProjects: '',
            unlockedProjects: '',
            isLoading: true,
            flipflop: false,
            isEditing: { description: false, title: false, version: false, iri: false },
            canNotAddProject: true,
            collapsePrivateProject: false,
            collapsePublicProject: false,
            collapseSC3Project: false,
            collapseSandBoxProject: false,
            showEmailModal: false,
            selectedProject: null,
            showEditProjectModal: false,
            selectedCollections: [],
            deleteDialogOpen: false,
            projectToDelete: null
        };
    }

    async componentDidMount() {
        console.log('ProjectView componentDidMount');
        if (
            this.props.user &&
            (this.props.user.role.toLowerCase() === 'Project Admin'.toLowerCase() ||
                this.props.user.role.toLowerCase() === 'System Admin'.toLowerCase())
        ) {
            this.setState({ canNotAddProject: false });
        }
        await this.getProjectsFromBackend();
    }

    componentDidUpdate = async prevProps => {
        if (prevProps.updateFlipFlop !== this.props.updateFlipFlop) {
            await this.getProjectsFromBackend();
        }
        if (prevProps.user !== this.props.user && this.props.user) {
            await this.getProjectsFromBackend();
            if (
                this.props.user.role.toLowerCase() === 'Project Admin'.toLowerCase() ||
                this.props.user.role.toLowerCase() === 'System Admin'.toLowerCase()
            ) {
                this.setState({ canNotAddProject: false });
            }
        }
    };

    getProjectsFromBackend = async () => {
        try {
            console.log('Fetching projects from backend');
            // Set loading state
            this.setState({ isLoading: true, error: null });

            // Get all projects
            const response = await getAllProjects();
            console.log('response:', response);

            // Validate response
            if (!response || !Array.isArray(response)) {
                throw new Error('Invalid response from server: Expected an array of projects');
            }

            // Create a new array and reverse it
            const allProjects = [...response];

            // Process projects in parallel
            const processedProjects = await Promise.all(
                allProjects.map(async project => {
                    const unlock = this.determineProjectAccess(project);
                    const allows = await userIsAllowdToUploadOntology();
                    return {
                        ...project,
                        unlock,
                        canDelete: allows.result && unlock
                    };
                })
            );

            // If user is logged in, get and process user projects
            if (this.props.user) {
                try {
                    const userProjectsUUID = await getUserProjects(this.props.user.userId);
                    if (Array.isArray(userProjectsUUID)) {
                        processedProjects.forEach(project => {
                            if (userProjectsUUID.includes(project.uuid)) {
                                project.unlock = true;
                            }
                        });
                    }
                    this.setState({ flipflop: !this.state.flipflop });
                } catch (userError) {
                    console.error('Error fetching user projects:', userError);
                }
            }

            // Sort projects by name case-insensitive
            const sortedProjects = processedProjects.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));
            const unlockedProjects = sortedProjects.filter(item => item.unlock);

            this.setState({
                allProjects: sortedProjects,
                unlockedProjects: unlockedProjects,
                isLoading: false,
                error: null
            });
        } catch (error) {
            console.error('Failed to fetch projects:', error);
            this.setState({
                error: 'Failed to load projects. Please try again later.',
                allProjects: [],
                unlockedProjects: [],
                isLoading: false
            });
        }
    };

    // Helper method to determine project access
    determineProjectAccess = project => {
        // Project is public
        if (project.access_type.toLowerCase() === 'public') {
            return true;
        }

        // User is system admin
        if (this.props.user?.role?.toLowerCase() === 'system admin') {
            return true;
        }

        return false;
    };

    projectCreated = param => {
        if (param.result === true) {
            this.setState({ showCreateProjectModal: false });
            this.props.reloadAfterUpdate();
        }
    };

    emailSent = () => {
        this.setState({ showEmailModal: false });
    };

    handleEdit = project => {
        console.log('Edit project:', project);
        // Implement the logic to edit the project here
        // For example, you can open a modal to edit the project details
        this.setState({ showEditProjectModal: true, selectedProject: project });
    };

    closeEditProjectModal = () => {
        this.setState({ showEditProjectModal: false, selectedProject: null });
    };

    updateProject = updatedProject => {
        this.setState(
            prevState => {
                const allProjects = prevState.allProjects.map(project => (project.uuid === updatedProject.uuid ? updatedProject : project));
                const unlockedProjects = allProjects.filter(project => project.unlock);
                return {
                    allProjects,
                    unlockedProjects,
                    selectedProject: null // Close modal after update
                };
            },
            () => {
                this.projectEdited({ result: true });
            }
        );
    };

    projectEdited = param => {
        if (param.result === true) {
            this.setState({ showEditProjectModal: false, editingProject: null });
            this.getProjectsFromBackend(); // Call getProjectsFromBackend directly
        }
    };

    handleDelete = project => {
        this.setState({
            deleteDialogOpen: true,
            projectToDelete: project
        });
    };

    handleDeleteConfirm = () => {
        const { projectToDelete } = this.state;
        if (projectToDelete) {
            this.deleteProject(projectToDelete.uuid);
        }
        this.setState({
            deleteDialogOpen: false,
            projectToDelete: null
        });
    };

    handleDeleteCancel = () => {
        this.setState({
            deleteDialogOpen: false,
            projectToDelete: null
        });
    };

    deleteProject = async projectId => {
        try {
            // Set loading state
            this.setState({ isLoading: true, error: null });

            // Call the delete project API
            await deleteProject(projectId);

            // Remove the deleted project from the state
            const updatedProjects = this.state.allProjects.filter(project => project.uuid !== projectId);
            const updatedUnlockedProjects = updatedProjects.filter(project => project.unlock);

            this.setState({
                allProjects: updatedProjects,
                unlockedProjects: updatedUnlockedProjects,
                isLoading: false
            });
        } catch (error) {
            console.error('Failed to delete project:', error);
            this.setState({
                error: 'Failed to delete project. Please try again later.',
                isLoading: false
            });
        }
    };

    handleCollectionSelectionChange = selectedItems => {
        this.setState({ selectedCollections: selectedItems });
        console.log('Selected items:', selectedItems);
        // Do something with the selected items
    };

    projectsInSelectedCollections = () => {
        const { selectedCollections, unlockedProjects } = this.state;

        // If no collections are selected, return all unlocked projects
        if (selectedCollections.length === 0) {
            return unlockedProjects;
        }

        console.log('Selected collections:', selectedCollections);
        console.log('Unlocked projects:', unlockedProjects);

        // Filter projects based on selected collections and specific rules
        return unlockedProjects.filter(project => {
            // Check if the project matches any of the selected collections
            return selectedCollections.some(collectionId => {
                const isSC3 =
                    project.name.toLowerCase().includes('sc3') ||
                    project.name.toLowerCase().includes('sc4eu') ||
                    project.name.toLowerCase().includes('semantically connected semiconductor supply chains');
                const isSandbox = project.name.toLowerCase().includes('sandbox');

                const isPublic = project.access_type === 'Public';

                // Apply specific filtering rules based on collection ID
                if (collectionId === 'SC4EU Collection' && isSC3) {
                    return true;
                }
                if (collectionId === 'Sandbox Collection' && isSandbox) {
                    return true;
                }
                if (collectionId === 'Public Collection' && isPublic) {
                    return true;
                }
                if (collectionId === 'My Collection') {
                    return !isSC3 && !isSandbox && !isPublic;
                }

                return false;
            });
        });
    };

    render() {
        const collectionOptions = ['SC4EU Collection', 'Sandbox Collection', 'Public Collection', 'My Collection'];
        const defaultOptions = collectionOptions.slice(0, 2);

        return (
            <StyledRootDiv>
                <StyledSubHeadingDiv>
                    <CheckboxDropdown
                        defaultOptions={defaultOptions}
                        options={collectionOptions}
                        title="Collections"
                        onChange={this.handleCollectionSelectionChange}
                    />
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
                    {this.state.selectedProject && (
                        <EditProjectModal project={this.state.selectedProject} onUpdate={this.updateProject} onClose={this.closeEditProjectModal} />
                    )}
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
                        <StyledProjectsGrid>
                            {this.state.allProjects ? (
                                this.state.unlockedProjects.length > 0 ? (
                                    this.projectsInSelectedCollections().map((project, index) => (
                                        <ProjectCard2 key={index} project={project} onEdit={this.handleEdit} onDelete={this.handleDelete} />
                                    ))
                                ) : (
                                    <div style={{ paddingLeft: '3.5%' }}>
                                        <StyledInfoSpan>
                                            {this.props.user ? 'You do not have project' : 'Please log in to see your own projects'}
                                        </StyledInfoSpan>
                                    </div>
                                )
                            ) : (
                                'Still Loading'
                            )}
                        </StyledProjectsGrid>
                    </Scrollbars>
                </StyledScrollbarDiv>
                <DeleteConfirmationDialog
                    open={this.state.deleteDialogOpen}
                    onClose={this.handleDeleteCancel}
                    onConfirm={this.handleDeleteConfirm}
                    title="Delete Project"
                    contentText={`Are you sure you want to delete project "${this.state.projectToDelete?.name}"? This action cannot be undone.`}
                />
            </StyledRootDiv>
        );
    }
}

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    redux_addProject: data => dispatch(redux_addProject(data)),
    redux_removeProject: () => dispatch(redux_removeProject()),
    redux_removeOntology: () => dispatch(redux_removeOntology()),
    redux_removeAlreadyLoadedOntology: () => dispatch(redux_removeAlreadyLoadedOntology())
});

ProjectView.propTypes = {
    title: PropTypes.string,
    reloadAfterUpdate: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    updateFlipFlop: PropTypes.bool.isRequired,
    redux_addProject: PropTypes.func.isRequired,
    redux_removeProject: PropTypes.func.isRequired,
    redux_removeOntology: PropTypes.func.isRequired,
    redux_removeAlreadyLoadedOntology: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);

const StyledProjectsGrid = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 2px;
    flex-wrap: wrap;
    gap: 20px;
`;

const StyledRootDiv = styled.div`
    width: 65%;
    margin-left: auto;
    background-color: ${colorStyled.PRIMARY.lighter};
    margin-top: 0.5%;
    height: 95%;
    margin-right: 2%;
    font-family: ${fontStyled.fontFamily};
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
    margin: 10px 15px 15px 0px;
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
