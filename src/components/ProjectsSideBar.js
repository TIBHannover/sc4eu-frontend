import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container } from 'reactstrap';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
import CreateProjectModal from './CreateProjectModal';
import { getAllProjects } from '../network/projectIndexing';
import ProjectCard from './ProjectCard';

export class ProjectsSideBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: this.props.initialState,
            minHeight: 200,
            title: props.title,
            initialRendering: true,
            collapse: true,
            collapseMetaInfo: true,
            showCreateProjectModal: false,
            results: '',
            isLoading: true,
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
    };

    getProjectsFromBackend = () => {
        console.log('fetching projects from backend');

        getAllProjects().then(res => {
            console.log('getAllProjects hasResults:', res);
            console.log('results ', res[0].name);
            this.setState({ results: res });
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
        this.getProjectsFromBackend();
    };

    render() {
        return (
            <ContentContainer
                id="ProjectLeftSidebarContainer"
                expanded={this.state.expanded}
                initialRendering={this.state.initialRendering}
                width={this.props.width}
                style={{
                    width: this.props.width,
                    height: this.props.height + 'px',
                    float: 'left',
                    position: 'relative',
                    marginRight: '6px'
                }}
            >
                <Container
                    className="pr-md-5 pt-sm-2 pb-sm-2 pl-sm-2 pr-sm-2 clearfix"
                    style={{
                        borderRadius: '10px',
                        borderWidth: '1px',
                        borderColor: 'rgb(219,221,229)',
                        borderStyle: 'solid',
                        borderBottomRightRadius: '0',
                        borderBottomLeftRadius: '0',
                        height: '40px',
                        marginLeft: '5px',
                        color: 'white',
                        backgroundColor: '#67a0d0'
                    }}
                >
                    <div style={{ width: this.props.width - 10, textAlign: 'center' }}>
                        {this.state.title}
                        <Button
                            variant="outline-primary"
                            style={{ float: 'right', marginTop: '-8px' }}
                            onClick={() => {
                                //TODO check if this user is allowed to create Projects
                                this.setState({ showCreateProjectModal: true });
                            }}
                        >
                            New Project
                        </Button>{' '}
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
                </Container>
                <Container
                    id="leftBodyContainer"
                    className="pr-md-5 pt-sm-2 pb-sm-2 pl-0 pr-sm-2 clearfix"
                    style={{
                        borderRadius: '10px',
                        borderWidth: '1px',
                        borderColor: 'rgb(219,221,229)',
                        borderStyle: 'solid',
                        borderTopRightRadius: '0',
                        borderTopLeftRadius: '0',
                        marginLeft: '5px',
                        color: 'black',
                        backgroundColor: '#ffffff',
                        marginTop: '-1px',
                        position: 'absolute',
                        height: this.props.height + 'px',
                        overflowY: 'auto',
                        overflowX: 'hidden'
                    }}
                >
                    <div style={{ width: this.props.width - 2, textAlign: 'left' }}>
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
                </Container>
            </ContentContainer>
        );
    }
}

ProjectsSideBar.propTypes = {
    title: PropTypes.string,
    //updateEvent: PropTypes.func.isRequired,
    initialState: PropTypes.bool.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    updateHeaderValueCallback: PropTypes.func.isRequired
};

const mapStateToProps = state => {};
const mapDispatchToProps = dispatch => ({});
export default connect(mapStateToProps, mapDispatchToProps)(ProjectsSideBar);

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
