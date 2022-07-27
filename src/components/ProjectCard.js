import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faTrash, faUnlockAlt, faLock } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import { userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { deleteProject } from '../network/projectIndexing';
import { reverse } from 'named-urls';
import ROUTES from '../constants/routes';
import { connect } from 'react-redux';

class ProjectIndexCards extends Component {
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
            // system admin can delete all projects and project admin can delete only his own projects
            if (allows.result === true) {
                if (
                    Object.values(this.props.unlock).find(id => id.usersProjectUUID === this.props.inputData.uuid) ||
                    this.props.user.role.toLowerCase() === 'System ADMIN'.toLowerCase()
                ) {
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

    showOntologies = () => {
        //TODO Get all ontologies related Only to this Project
        if (!this.props.user) {
            if (this.props.inputData.access_type.toLowerCase() === 'Public'.toLowerCase()) {
                const project = this.props.inputData;
                this.props.updateHeaderValueCallback(project);
            } else {
                alert('This is Private Project You can not open it');
            }
        } else {
            if (
                this.props.inputData.access_type.toLowerCase() === 'Public'.toLowerCase() ||
                this.props.user.role.toLowerCase() === 'System ADMIN'.toLowerCase() ||
                Object.values(this.props.unlock).find(id => id.usersProjectUUID === this.props.inputData.uuid)
            ) {
                const project = this.props.inputData;
                this.props.updateHeaderValueCallback(project);
            } else {
                alert('This is Private Project You can not open it');
            }
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
                            <div style={{ display: 'flex', paddingRight: '10px' }}>
                                {!this.props.user ? (
                                    <>
                                        {this.props.inputData.access_type === 'Public' ? (
                                            <div>
                                                <Icon className="mr-1" icon={faUnlockAlt} />
                                            </div>
                                        ) : (
                                            <div>
                                                <Icon className="mr-1" icon={faLock} />
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {this.props.inputData.access_type.toLowerCase() === 'Public'.toLowerCase() ||
                                        this.props.user.role.toLowerCase() === 'System ADMIN'.toLowerCase() ||
                                        Object.values(this.props.unlock).find(id => id.usersProjectUUID === this.props.inputData.uuid) ? (
                                            <div>
                                                <Icon className="mr-1" icon={faUnlockAlt} />
                                            </div>
                                        ) : (
                                            <div>
                                                <Icon className="mr-1" icon={faLock} />
                                            </div>
                                        )}
                                    </>
                                )}
                                <div> {this.props.inputData.name} </div>
                                <Button
                                    color="white"
                                    size="sm"
                                    title="Delete Project"
                                    onClick={this.deleteProject}
                                    style={{ float: 'right', padding: '0px', paddingLeft: '5px', marginLeft: 'auto' }}
                                >
                                    <Icon icon={faTrash} color={'black'} />
                                </Button>
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

const mapStateToProps = state => ({
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({});

ProjectIndexCards.propTypes = {
    inputData: PropTypes.object.isRequired,
    unlock: PropTypes.array.isRequired,
    callback: PropTypes.func.isRequired,
    updateHeaderValueCallback: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectIndexCards);

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
