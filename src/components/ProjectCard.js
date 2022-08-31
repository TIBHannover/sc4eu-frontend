import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faLock, faPen, faTrash, faUnlockAlt, faChevronCircleRight, faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { Button, Collapse } from 'reactstrap';
import { userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { deleteProject } from '../network/projectIndexing';
import { reverse } from 'named-urls';
import ROUTES from '../constants/routes';
import EditProjectModal from './EditProjectModal';
import { CLEAR_SESSION, SELECTED_ONTOLOGY_SESSION, SELECTED_PROJECT_SESSION } from '../constants/globalConstants';

export default class ProjectIndexCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditProjectModal: false,
            collapseDescription: true
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    deleteProject = async event => {
        //delete Project...
        event.preventDefault();
        event.stopPropagation();

        const isConfirmed = window.confirm('Are you sure you want to Delete this ontology?');
        if (!isConfirmed) {
            return;
        }

        try {
            const allows = await userIsAllowdToUploadOntology();
            if (allows.result === true) {
                if (this.props.inputData.unlock === true) {
                    deleteProject(this.props.inputData.uuid).then(res => {
                        if (res.success === true) {
                            this.props.callback(res.result);
                        }
                    });
                } else {
                    alert('You are not authorized to delete this project');
                }
            } else {
                alert('You are not authorized to delete this project');
            }
        } catch (rejectedValue) {
            console.log(rejectedValue);
        }
    };

    projectEdited = param => {
        if (param.result === true) {
            this.setState({ showEditProjectModal: false });
            this.props.callback();
        }
    };

    showOntologies = () => {
        //TODO Get all ontologies related Only to this Project
        if (this.props.inputData.unlock === true) {
            const project = this.props.inputData;
            //change color of select card
            //StyledCardHeader.backgroundColor = 'black';
            this.props.updateHeaderValueCallback(project);
        } else {
            alert('This is Private Project You can not open it');
        }
        const selectedProjectSession = JSON.parse(sessionStorage.getItem(SELECTED_PROJECT_SESSION));
        const selectedOntologySession = JSON.parse(sessionStorage.getItem(SELECTED_ONTOLOGY_SESSION));

        if (selectedProjectSession && selectedOntologySession) {
            CLEAR_SESSION();
        }
    };

    toggleProjectBody = event => {
        event.preventDefault();
        this.setState({ collapseDescription: !this.state.collapseDescription });
    };

    helloMouse = event => {
        event.target.style.background = 'red';
        console.log(event.target);
    };

    render() {
        return (
            <div>
                <StyledCard className="pl-1 pr-1" onDragStart={this.preventDraggingOfItem}>
                    <StyledCardHeader>
                        <StyledButton
                            color="none"
                            title="Expand/Collapse Description"
                            onClick={this.toggleProjectBody}
                            style={{ float: 'left', padding: '0px', paddingRight: '10px', marginLeft: '1px' }}
                        >
                            <Icon icon={this.state.collapseDescription ? faChevronCircleRight : faChevronCircleDown} style={{ marginRight: '0px' }} />
                        </StyledButton>
                        <StyledButton
                            color="none"
                            size="sm"
                            title="Delete Project"
                            onClick={this.deleteProject}
                            style={{ float: 'right', padding: '0px', paddingLeft: '5px', marginLeft: 'auto' }}
                        >
                            <Icon icon={faTrash} />
                        </StyledButton>
                        <StyledButton
                            color="white"
                            size="sm"
                            title="Edit Project"
                            onClick={() => {
                                this.setState({ showEditProjectModal: true });
                            }}
                            style={{
                                float: 'right',
                                padding: '0px',
                                paddingLeft: '5px',
                                marginLeft: 'auto',
                                marginRight: '5px'
                            }}
                        >
                            <Icon icon={faPen} />
                        </StyledButton>
                        <EditProjectModal
                            showDialog={this.state.showEditProjectModal}
                            projectData={this.props.inputData}
                            callback={param => {
                                this.projectEdited(param);
                            }}
                            toggle={() => {
                                this.setState({ showEditProjectModal: !this.state.showEditProjectModal });
                            }}
                        />
                        <div color="white" style={{ float: 'right', padding: '0px', paddingLeft: '5px', marginLeft: 'auto' }}>
                            {this.props.inputData.unlock === true ? (
                                <div>
                                    <Icon className="ml-2 mr-1" icon={faUnlockAlt} color="black" />
                                </div>
                            ) : (
                                <div>
                                    <Icon className="ml-2 mr-1" icon={faLock} color="black" />
                                </div>
                            )}
                        </div>
                        <StyledLink
                            to={reverse(ROUTES.ONTOLOGY)}
                            onClick={this.showOntologies}
                            className="p-0 noSelect"
                            onDragStart={this.preventDraggingOfItem}
                        >
                            <div style={{ display: 'flex', paddingRight: '5px' }}>
                                <div style={{ overflowWrap: 'break-word' }}> {this.props.inputData.name} </div>
                            </div>
                        </StyledLink>
                    </StyledCardHeader>
                    <Collapse isOpen={!this.state.collapseDescription}>
                        <StyledCardBody>
                            {this.props.inputData.description ? this.props.inputData.description : 'No description available'}
                        </StyledCardBody>
                    </Collapse>
                </StyledCard>
            </div>
        );
    }
}

ProjectIndexCards.propTypes = {
    inputData: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    updateHeaderValueCallback: PropTypes.func.isRequired
};

const StyledButton = styled(Button)`
    :hover {
        color: #ffffff;
    }
`;

const StyledCard = styled.div`
    margin: 5px;
    padding: 0 !important;

    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;

const StyledLink = styled(Link)`
    padding: 10px;
    color: black;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }

    :hover {
        color: #ffffff;
    }
`;

const StyledCardHeader = styled.div`
    border-radius: 10px 10px 0 0;
    border: 1px solid black;
    padding: 5px;
    color: white;
    // background: #4388cc;
    //background: #6f6f6f;
    background: #e5e5e9;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }

    :hover {
        background: #6f6f6f; //00b4cc
    }
`;

const StyledCardBody = styled.div`
    padding: 5px;
    border: 1px solid black;
    border-top: none;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;
