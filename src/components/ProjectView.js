import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'reactstrap';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import CreateProjectModal from './CreateProjectModal';
import { getAllProjects } from '../network/projectIndexing';
import ProjectCard from './ProjectCard';
import { getUserProjects } from '../network/UserProfileCalls';
import { SECONDARY } from '../styledComponents/styledComponents';

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
            this.setState({ results: allProjects });
        });
    };

    /*    collapseLeftSideBar = () => {
this.props.updateEvent(!this.state.expanded);
this.setState({ expanded: !this.state.expanded });
};*/

    toggle = () => {
        this.setState({ collapse: !this.state.collapse });
    };

    toggleEditButton = itemToToggle => {
        this.setState({ isEditing: { ...this.state.isEditing, [itemToToggle]: !this.state.isEditing[itemToToggle] } });
    };

    projectCreated = param => {
        if (param.result === true) {
            this.setState({ showCreateProjectModal: false });
            this.reloadAfterUpdate();
        }
    };

    reloadAfterUpdate = () => {
        this.setState({ isLoading: false });
        this.props.updateHeaderValueCallback(false);
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
                <div style={{ textAlign: 'left', overflowY: 'auto', height: '90vh' }}>
                    {this.state.results
                        ? this.state.results.map(item => {
                              //return <div key={item.name}>{item.name}</div>;
                              return (
                                  <ProjectCard
                                      key={'ProjectCard_' + item.name}
                                      inputData={item}
                                      callback={param => {
                                          this.reloadAfterUpdate(param);
                                      }}
                                      updateHeaderValueCallback={param => {
                                          this.props.updateHeaderValueCallback(param);
                                      }}
                                  />
                              );
                          })
                        : 'Still Loading'}
                    {/*{this.state.results[0].name}*/}
                </div>
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
    //updateEvent: PropTypes.func.isRequired,
    updateHeaderValueCallback: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectView);

/** CREATE A GREEN LINE**/
/* gray */

const expandButtonAnimation = ({ expanded, initialRendering }) => {
    if (!initialRendering) {
        return keyframes`
  from {
    transform: rotate(${expanded ? 180 : 0}deg);
  }
  to {
    transform: rotate(${expanded ? 0 : -180}deg);
   
  }
`;
    } else {
        return keyframes``;
    }
};

const ButtonContainer = styled.div`
    animation-name: ${expandButtonAnimation};
    animation-duration: 1000ms;
    transform: rotate(${props => (props.expanded ? 0 : 180)}deg);
    cursor: pointer;
`;

const expandContentContainerAnimation = ({ expanded, width, initialRendering }) => {
    if (initialRendering) {
        return keyframes``;
    } else {
        return keyframes`
  from {
    left: ${expanded ? -width : 0}px;
  }
  to {
    left: ${expanded ? 0 : -width}px;
   
  }
`;
    }
};

const ContentContainer = styled.div`
    animation-name: ${expandContentContainerAnimation};
    animation-duration: 400ms;
    // opacity: 0.5;
    left: ${props => (props.expanded ? 0 : -props.width)}px;
`;
