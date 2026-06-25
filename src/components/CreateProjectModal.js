import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createProject } from '../network/projectIndexing';
import { fontStyled } from '../styledComponents/styledFont';
import { withTheme } from '@emotion/react';
class CreateProject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            projectDescription: '',
            accessType: '',
            allowedToCreateProjects: false,
            showWarning: '',
            isDropdownDisabled: false
        };
    }

    componentDidMount() {
        // TODO Check the user if allowed to Create
    }

    componentDidUpdate = async prevProps => {
        if (prevProps.showDialog === false && this.props.showDialog === true) {
            // check if user is allowed to do uploads
            const allows = await userIsAllowdToUploadOntology();
            this.setState({ allowedToCreateProjects: allows.result });
        }
    };

    handleOnChangeName = event => {
        this.setState({ projectName: event.target.value });

        // Check if the entered value contains 'sc3' or 'sc 3' (case-insensitive).
        if (event.target.value.toLowerCase().includes('sc3') || event.target.value.toLowerCase().includes('sc 3')) {
            // If it does, set the accessType to 'Public' and disable the dropdown because SC3 project will be always public projects.
            this.setState({ accessType: 'Public', isDropdownDisabled: true });
        } else {
            // If it doesn't, clear the accessType and enable the dropdown.
            this.setState({ accessType: '', isDropdownDisabled: false });
        }
    };
    handleOnChangeDesc = event => {
        this.setState({ projectDescription: event.target.value });
    };

    handleOnChangeAccess = event => {
        this.setState({ accessType: event.target.value });
    };

    resetStateObject = () => {
        this.setState({
            projectName: '',
            projectDescription: '',
            accessType: '',
            showWarning: ''
        });
    };
    createProject = () => {
        if (!this.state.allowedToCreateProjects) {
            this.props.toggle();
            return;
        }

        if (!this.state.projectName && !this.state.projectDescription) {
            this.setState({ showWarning: 'Please provide name and description for the project' });
            return;
        }
        if (!this.state.projectName) {
            this.setState({ showWarning: 'Please provide name for the project' });
            return;
        }
        if (!this.state.projectDescription) {
            this.setState({ showWarning: 'Please provide description for the project' });
            return;
        }

        if (!this.state.accessType) {
            this.setState({ showWarning: 'Please select access type for the project' });
            return;
        }

        const objToSent = {
            name: this.state.projectName,
            description: this.state.projectDescription,
            accessType: this.state.accessType,
            //Get currently Logged in User Name
            createdBy: this.props.user.displayName,
            creationDate: new Date().toLocaleString()
        };

        createProject(objToSent).then(res => {
            if (res.result === false) {
                this.setState({ showWarning: res.message });
            }
            this.props.callback(res);
        });
        //this.props.callback({ result: true });
    };

    render() {
        const { theme } = this.props;
        
        return (
            <Modal
                style={{ width: '80%', maxWidth: '50%', fontFamily: fontStyled.fontFamily }}
                isOpen={this.props.showDialog}
                toggle={this.props.toggle}
                autoFocus={false}
                onOpened={() => {
                    this.resetStateObject();
                }}
            >
                <ModalHeader toggle={this.props.toggle} autoFocus={false}>
                    Create New Project
                </ModalHeader>
                {this.state.showWarning ? <span className="text-center text-danger">{this.state.showWarning}</span> : <></>}
                <ModalBody id="createProjectBody">
                    {this.state.allowedToCreateProjects ? (
                        <div>
                            <FormGroup>
                                <Label for="projectName">Name</Label>
                                <Input
                                    type="text"
                                    name="projectName"
                                    id="projectNameName"
                                    placeholder="Project Name"
                                    value={this.state.projectName}
                                    onChange={this.handleOnChangeName}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="projectDescription">Description</Label>
                                <Input
                                    type="textarea"
                                    name="projectDescription"
                                    id="projectDescription"
                                    width="100%"
                                    placeholder="Project Description"
                                    value={this.state.projectDescription}
                                    onChange={this.handleOnChangeDesc}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="accessType">Access Type</Label>
                                <Input
                                    type="select"
                                    name="select"
                                    id="exampleSelect"
                                    value={this.state.accessType}
                                    onChange={this.handleOnChangeAccess}
                                    disabled={this.state.isDropdownDisabled}
                                >
                                    <option>Select Access Type....</option>
                                    <option>Public</option>
                                    <option>Private</option>
                                </Input>
                                {this.state.isDropdownDisabled && (
                                    <p className="text-info mt-2">
                                        You have the word "SC3" in the Name field. So it's by default access type is Public{' '}
                                    </p>
                                )}
                            </FormGroup>
                        </div>
                    ) : (
                        <p>
                            Sorry, you are not allowed to create projects
                            <br /> Only System Admin, Project Admin and Member are allowed to create projects
                        </p>
                    )}
                </ModalBody>
                <ModalFooter>
                    <Button
                        id="finishButton"
                        style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}
                        onClick={() => {
                            this.createProject();
                        }}
                        autoFocus={true}
                    >
                        Finish
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

CreateProject.propTypes = {
    showDialog: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

const mapStateToProps = state => ({
    user: state.auth.user
});

export default compose(connect(mapStateToProps), withRouter)(withTheme(CreateProject));
