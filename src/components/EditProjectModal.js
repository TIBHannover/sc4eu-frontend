import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { withRouter } from 'react-router-dom';
import { editProject } from '../network/projectIndexing';
import Select from 'react-select';

export default class EditProjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: '',
            projectDescription: '',
            accessType: '',
            allowedToEditProjects: false
        };
    }

    componentDidMount() {}

    componentDidUpdate = async prevProps => {
        if (prevProps.showDialog === false && this.props.showDialog === true) {
            // check if user is allowed to do uploads
            const allows = await userIsAllowdToUploadOntology();
            this.setState({ allowedToEditProjects: allows.result });
        }
    };

    handleOnChangeName = event => {
        this.setState({ projectName: event.target.value });
    };
    handleOnChangeDesc = event => {
        this.setState({ projectDescription: event.target.value });
    };
    handleOnChangeAccess = selectedOption => {
        this.setState({ accessType: selectedOption.value });
    };

    resetStateObject = () => {
        this.setState({
            projectName: '',
            projectDescription: ''
        });
    };

    removeEmptyField = object => {
        for (const stateName in object) {
            if (object[stateName] === null || object[stateName] === undefined || object[stateName] === '') {
                delete object[stateName];
            }
        }
        return object;
    };

    editProject = () => {
        if (!this.state.allowedToEditProjects && !this.props.unlock) {
            this.props.toggle();
            return;
        }

        const objToSent = {
            uuid: this.props.uuid,
            project_name: this.state.projectName,
            project_description: this.state.projectDescription,
            project_accesstype: this.state.accessType
        };

        editProject(this.removeEmptyField(objToSent)).then(res => {
            this.props.callback(res);
        });
    };

    render() {
        const AccessTypeOptions = [
            { value: 'Public', label: 'Public' },
            { value: 'Private', label: 'Private' }
        ];
        return (
            <Modal
                style={{ width: '80%', maxWidth: '50%' }}
                isOpen={this.props.showDialog}
                toggle={this.props.toggle}
                autoFocus={false}
                onOpened={() => {
                    this.resetStateObject();
                }}
            >
                <ModalHeader toggle={this.props.toggle} autoFocus={false}>
                    Edit Project
                </ModalHeader>
                <ModalBody id="createProjectBody">
                    {this.state.allowedToEditProjects && this.props.unlock ? (
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
                                <Select
                                    name="accessType"
                                    onChange={this.handleOnChangeAccess}
                                    placeholder="Select Access Type..."
                                    options={AccessTypeOptions}
                                />
                            </FormGroup>
                        </div>
                    ) : (
                        <p>
                            Sorry, you are not allowed to Edit projects
                            <br /> Only System Admin, Project Admin and Member are allowed to Edit projects
                        </p>
                    )}
                </ModalBody>
                <ModalFooter>
                    {this.state.allowedToEditProjects && this.props.unlock ? (
                        <Button
                            color="primary"
                            id="finishButton"
                            onClick={() => {
                                this.editProject();
                            }}
                            autoFocus={true}
                        >
                            Submit
                        </Button>
                    ) : (
                        <p />
                    )}
                </ModalFooter>
            </Modal>
        );
    }
}

EditProjectModal.propTypes = {
    showDialog: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired,
    uuid: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired,
    unlock: PropTypes.bool
};
