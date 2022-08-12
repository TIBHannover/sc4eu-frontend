import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { editProject } from '../network/projectIndexing';

export default class EditProjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectItems: {
                uuid: '',
                projectName: '',
                projectDescription: '',
                accessType: ''
            },
            allowedToEditProjects: false
        };
    }

    componentDidMount() {
        const projectData = this.props.projectData;
        this.setState({
            projectItems: {
                uuid: projectData.uuid,
                projectName: projectData.name,
                projectDescription: projectData.description,
                accessType: projectData.access_type
            }
        });
    }

    componentDidUpdate = async prevProps => {
        if (prevProps.showDialog === false && this.props.showDialog === true) {
            const allows = await userIsAllowdToUploadOntology();
            this.setState({ allowedToEditProjects: allows.result });
        }
    };

    handelOnChange = event => {
        const newProjectItems = { ...this.state.projectItems };
        newProjectItems[event.target.name] = event.target.value;
        this.setState({
            projectItems: newProjectItems
        });
    };

    editProject = () => {
        if (!this.state.allowedToEditProjects && !this.props.projectData.unlock) {
            this.props.toggle();
            return;
        }

        editProject(this.state.projectItems).then(res => {
            this.props.callback(res);
        });
    };

    render() {
        return (
            <Modal style={{ width: '80%', maxWidth: '50%' }} isOpen={this.props.showDialog} toggle={this.props.toggle} autoFocus={false}>
                <ModalHeader toggle={this.props.toggle} autoFocus={false}>
                    Edit Project
                </ModalHeader>
                <ModalBody id="createProjectBody">
                    {this.state.allowedToEditProjects && this.props.projectData.unlock ? (
                        <div>
                            <FormGroup>
                                <Label for="projectName">Name</Label>
                                <Input
                                    type="text"
                                    name="projectName"
                                    id="projectName"
                                    defaultValue={this.state.projectItems.projectName}
                                    onChange={this.handelOnChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="projectDescription">Description</Label>
                                <Input
                                    type="textarea"
                                    name="projectDescription"
                                    id="projectDescription"
                                    defaultValue={this.state.projectItems.projectDescription}
                                    onChange={this.handelOnChange}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="accessType">Access Type</Label>
                                <Input
                                    type="select"
                                    name="accessType"
                                    id="accessType"
                                    defaultValue={this.state.projectItems.accessType || 'Select Access Type...'}
                                    onChange={this.handelOnChange}
                                >
                                    <option defaultValue={this.state.projectItems.accessType || 'Select Access Type...'} disabled>
                                        {this.state.projectItems.accessType || 'Select Access Type...'}
                                    </option>
                                    <option>Public</option>
                                    <option>Private</option>
                                </Input>
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
                    {this.state.allowedToEditProjects && this.props.projectData.unlock ? (
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
    callback: PropTypes.func.isRequired,
    projectData: PropTypes.object.isRequired
};
