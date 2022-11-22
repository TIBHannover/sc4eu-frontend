import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import { connect } from 'react-redux';
import CreateProjectModal from './CreateProjectModal';
import { getAllProjects } from '../network/projectIndexing';
import ProjectCard from './ProjectCard';
import { getUserProjects } from '../network/UserProfileCalls';
import { SECONDARY } from '../styledComponents/styledComponents';
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
            isEditing: { description: false, title: false, version: false, iri: false }
        };
    }

    componentDidMount() {
        //Get the current User from Redux State
        //TODO Retrive all the project for the current User
        //this.getProjectsFromBackend();
        this.getProjectsFromBackend();
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.expanded !== this.state.expanded) {
            this.setState({ initialRendering: false });
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
            this.reloadAfterUpdate();
        }
    };

    reloadAfterUpdate = () => {
        this.setState({ isLoading: false });
        this.getProjectsFromBackend();
    };

    render() {
        return (
            <div>
                <h1 style={{ textAlign: 'center' }}>{this.state.title}</h1>
                <hr className="mt-0 mb-2" />
                <Button
                    style={{ margin: '0px 0px 10px 10px', backgroundColor: SECONDARY.dark }}
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
                <hr className="mt-0 mb-2" />
                <Scrollbars style={{ height: '78vh' }}>
                    <div style={{ textAlign: 'left' }}>
                        {this.state.results
                            ? this.state.results.map(item => {
                                  return (
                                      <ProjectCard
                                          key={'ProjectCard_' + item.name}
                                          inputData={item}
                                          callback={param => {
                                              this.reloadAfterUpdate(param);
                                          }}
                                      />
                                  );
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
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);
