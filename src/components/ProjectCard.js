import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTrash, faUnlockAlt, faLock, faPen } from '@fortawesome/free-solid-svg-icons';
import { Button, Container } from 'reactstrap';
import { userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { deleteProject } from '../network/projectIndexing';
import { reverse } from 'named-urls';
import ROUTES from '../constants/routes';
import EditProjectModal from './EditProjectModal';

export default class ProjectIndexCards extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showEditProjectModal: false
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
    };

    render() {
        return (
            <div>
                <StyledCard className="pl-1 pr-1" onDragStart={this.preventDraggingOfItem}>
                    <StyledCardHeader>
                        <StyledLink
                            to={reverse(ROUTES.ONTOLOGY)}
                            onClick={this.showOntologies}
                            className="p-0 noSelect"
                            onDragStart={this.preventDraggingOfItem}
                        >
                            <div style={{ display: 'flex', paddingRight: '5px' }}>
                                {this.props.inputData.unlock === true ? (
                                    <div>
                                        <Icon className="mr-1" icon={faUnlockAlt} />
                                    </div>
                                ) : (
                                    <div>
                                        <Icon className="mr-1" icon={faLock} />
                                    </div>
                                )}
                                <div> {this.props.inputData.name} </div>
                                <div style={{ float: 'right', marginLeft: 'auto' }}>
                                    <Button
                                        onClick={() => {
                                            this.setState({ showEditProjectModal: true });
                                        }}
                                        style={{ background: 'none', border: 'none', height: '25px' }}
                                    >
                                        <Icon icon={faPen} color="black" style={{ marginBottom: '20px' }} />
                                    </Button>
                                    <EditProjectModal
                                        showDialog={this.state.showEditProjectModal}
                                        unlock={this.props.inputData.unlock}
                                        uuid={this.props.inputData.uuid}
                                        callback={param => {
                                            this.projectEdited(param);
                                        }}
                                        toggle={() => {
                                            this.setState({ showEditProjectModal: !this.state.showEditProjectModal });
                                        }}
                                    />
                                    <Button color="white" size="sm" title="Delete Project" onClick={this.deleteProject}>
                                        <Icon icon={faTrash} color={'black'} />
                                    </Button>
                                </div>
                            </div>
                        </StyledLink>
                    </StyledCardHeader>

                    <StyledCardBody>
                        {this.props.inputData.description ? this.props.inputData.description : 'No description available'}
                    </StyledCardBody>
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
