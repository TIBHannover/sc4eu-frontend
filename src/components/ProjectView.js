import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'reactstrap';
import { connect } from 'react-redux';
import CreateProjectModal from './CreateProjectModal';
import { getAllProjects } from '../network/projectIndexing';
import ProjectCard from './ProjectCard';
import { getUserProjects } from '../network/UserProfileCalls';
import { PRIMARY, SECONDARY } from '../styledComponents/styledComponents';
import { Scrollbars } from 'react-custom-scrollbars-2';

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
            canNotAddProject: true
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

    render() {
        return (
            <div style={{ width: '100%', marginLeft: '20%', backgroundColor: 'white', marginTop: '0.5%', height: '96%' }}>
                <Container
                    className="pt-sm-2 pb-sm-2 clearfix"
                    style={{
                        borderRadius: '10px 10px 0px 0px',
                        height: '50px',
                        color: 'white',
                        backgroundColor: PRIMARY.dark
                    }}
                >
                    <h4 style={{ width: '100%', textAlign: 'center' }}>{this.state.title}</h4>
                </Container>

                {/*<h2 style={{ textAlign: 'center' }}>{this.state.title}</h2>*/}
                {/*<hr className="mt-0 mb-2" />*/}
                <div>
                    <p style={{ float: 'left', margin: '15px 0px 0px 15px', textAlign: 'center' }}>
                        Click on one of the projects below to view its ontologies
                    </p>
                    <Button
                        style={{ margin: '10px 10px 10px 10px', backgroundColor: SECONDARY.dark, float: 'right' }}
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
                </div>
                {/*<hr className="mt-0 mb-2" />*/}
                <Scrollbars style={{ height: '90%' }}>
                    <div style={{ textAlign: 'left', borderTop: '0.01rem solid #e7e9eb' }}>
                        {this.state.results
                            ? this.state.results.map(item => {
                                  if (item.unlock) {
                                      return (
                                          <ProjectCard
                                              key={'ProjectCard_' + item.name}
                                              inputData={item}
                                              callback={param => {
                                                  this.props.reloadAfterUpdate(param);
                                              }}
                                          />
                                      );
                                  } else {
                                      return null;
                                  }
                              })
                            : 'Still Loading'}
                    </div>
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
