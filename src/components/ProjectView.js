import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, CardFooter } from 'reactstrap';
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
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Breadcrumbs, CardActionArea, CardMedia } from '@mui/material';
import microchip from '../assets/images/cpu.png';
import sc4euLogo from '../assets/images/logo.png';
import sandboxIcon from '../assets/images/sandbox.png';
import public_collection from '../assets/images/public_collection.png';
import private_collection from '../assets/images/private_collection.png';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import theme from '../theme';
import BreadcrumbBar from './ReusableComponents/BreadcrumbBar';
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
            showEmailModal: false,
            selectedCollection: null,
            viewMode: 'collections'
        };
        this.setViewMode = this.setViewMode.bind(this);
    }

    componentDidMount() {
        //Get the current User from Redux State
        //TODO Retrive all the project for the current User
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

    setViewMode(mode) {
        this.setState({ viewMode: mode });
    }

    getProjectsFromBackend = () => {
        try {
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
        } catch (e) {
            console.log('Error in getting projects from backend, docker might be down', e);
        }
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

    ProjectSection = ({ project }) => {
        const selectedCollection = this.state.selectedCollection;
        const user = this.props.user;
        const filteredProject = project.filter(item => {
            const isSC3 =
                item.name.toLowerCase().includes('sc3') ||
                item.name.toLowerCase().includes('sc3') ||
                item.name.toLowerCase().includes('semantically connected semiconductor supply chains');
            const isSandbox = item.name.toLowerCase().includes('sandbox');
            const isPublicOrPrivate = item.unlock && item.access_type === selectedCollection.collectionId;

            if (selectedCollection.collectionId === 'sc4eu') {
                return isSC3;
            }
            if (selectedCollection.collectionId === 'Sandbox') {
                return isSandbox;
            }
            return isPublicOrPrivate && !isSC3 && !isSandbox;
        });

        return (
            <>
                {filteredProject.length > 0 ? (
                    filteredProject.map(item => (
                        <ProjectCard key={'ProjectCard_' + item.name} inputData={item} currentUser={user} callback={this.props.reloadAfterUpdate} />
                    ))
                ) : (
                    <div style={{ paddingLeft: '3.5%' }}>
                        <StyledInfoSpan>{user ? 'You do not have project' : 'Please log in to see your own projects'}</StyledInfoSpan>
                    </div>
                )}
            </>
        );
    };

    handleCardClick = collection => {
        this.setState({ selectedCollection: collection, collapsePublicProject: false, viewMode: 'projects' });
    };

    render() {
        const collections = [
            {
                id: 1,
                title: 'Semantically Connected Semiconductor Supply Chains',
                collectionId: 'sc4eu',
                description: 'This is collection of all project related to Semantically Connected Semiconductor' + ' Supply Chains',
                image: sc4euLogo
            },
            {
                id: 2,
                title: 'Sandbox Collection',
                collectionId: 'Sandbox',
                description: 'Sandbox Collection is a collection of projects that are available to all registered' + ' users',
                image: sandboxIcon
            },
            {
                id: 3,
                title: 'My Collection',
                collectionId: 'Private',
                description: 'My Collection is a collection of projects that are available to you',
                image: private_collection
            },
            {
                id: 4,
                title: 'Public Collection',
                collectionId: 'Public',
                description: 'Public Collection is a collection of projects that are available to all users',
                image: public_collection
            }
        ];
        // const BreadcrumbBar = collection => {
        //     const classes = useStyles();
        //     return (
        //         <div className={classes.breadcrumbContainer}>
        //             <Breadcrumbs aria-label="breadcrumb" separator=">">
        //                 <Link
        //                     className={classes.link}
        //                     onClick={event => {
        //                         event.preventDefault();
        //                         this.setState({ viewMode: 'collections' });
        //                     }}
        //                 >
        //                     Collections
        //                 </Link>
        //                 <Link
        //                     className={classes.current}
        //                     color="textPrimary"
        //                     onClick={event => {
        //                         event.preventDefault();
        //                         this.setState({ viewMode: 'projects' });
        //                     }}
        //                 >
        //                     Projects
        //                 </Link>
        //             </Breadcrumbs>
        //         </div>
        //     );
        // };
        return (
            <StyledRootDiv>
                {/*<StyledHeadingDiv>*/}
                {/*    <h4 style={{ width: '100%', margin: '0 auto' }}>{this.state.title}</h4>*/}
                {/*</StyledHeadingDiv>*/}
                {this.state.viewMode === 'projects' && (
                    <BreadcrumbBar setViewMode={this.setViewMode} isOntologyView={false} currentViewMode={this.state.viewMode} />
                )}
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
                        {this.state.viewMode === 'collections' && (
                            <StyledCollectionGrid>
                                {collections.map(collection => (
                                    <StyledCard>
                                        <CardActionArea onClick={() => this.handleCardClick(collection)} style={{ height: '100%' }}>
                                            <CardMedia
                                                component="img"
                                                height="100"
                                                image={collection.image}
                                                style={{ objectFit: 'contain' }}
                                                alt="semiconductor image"
                                            />
                                            <CardContent>
                                                <Typography gutterBottom component="div" fontWeight={'bold'} marginBottom={theme.spacing(1)}>
                                                    {collection.title}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {collection.description}
                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                    </StyledCard>
                                ))}
                            </StyledCollectionGrid>
                        )}
                        {this.state.viewMode === 'projects' && this.state.selectedCollection && (
                            <>{this.state.results ? <this.ProjectSection project={this.state.results} /> : 'Still Loading'}</>
                        )}
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

// const useStyles = makeStyles(theme => ({
//     breadcrumbContainer: {
//         backgroundColor: colorStyled.CONTAINER_BACKGROUND_COLOR,
//         borderRadius: '12px',
//         padding: '8px 16px',
//         display: 'inline-block',
//         width: '100%'
//     },
//     link: {
//         color: '#4285f4',
//         textDecoration: 'none',
//         '&:hover': {
//             textDecoration: 'underline'
//         }
//     },
//     current: {
//         color: '#000000',
//         textDecoration: 'none',
//         cursor: 'default'
//     },
//     separator: {
//         color: '#000000',
//         fontWeight: 'bold'
//     }
// }));

const StyledCollectionGrid = styled.div`
    display: flex;
    justify-content: space-evenly;
    margin: 2px;
    flex-wrap: wrap;
    gap: 20px;
`;

const StyledCard = styled(Card)`
    && {
        background-color: ${colorStyled.PRIMARY.light};
        padding: 3px;
        border-radius: 20px;
        transition: transform 0.2s;
        width: 300px; // Set the width
        height: 300px; // Set the height
        &:hover {
            transform: scale(1.05);
        }
    }
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
    text-align: left;
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
