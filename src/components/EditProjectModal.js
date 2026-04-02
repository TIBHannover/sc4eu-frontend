import { Button, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { userIsAllowdToUploadOntology } from '../network/ontologyIndexing';
import { editProject } from '../network/projectIndexing';
import { colorStyled } from '../styledComponents/styledColor';
import { fontStyled } from '../styledComponents/styledFont';

export default class EditProjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectName: props.project.name,
            projectDescription: props.project.description,
            accessType: this.isSC3Project(props.project.name) ? 'Public' : props.project.access_type,
            isDropdownDisabled: this.isSC3Project(props.project.name)
        };
    }

    isSC3Project = name => name.toLowerCase().includes('sc3') || name.toLowerCase().includes('sc 3');

    handleSubmit = () => {
        const updatedProject = {
            uuid: this.props.project.uuid,
            name: this.state.projectName,
            description: this.state.projectDescription,
            access_type: this.state.accessType
        };
        console.log(updatedProject);
        const projectItems = {
            uuid: updatedProject.uuid,
            projectName: updatedProject.name,
            projectDescription: updatedProject.description,
            accessType: updatedProject.access_type,
            isDropdownDisabled: this.state.isDropdownDisabled
        };
        editProject(projectItems)
            .then(() => {
                this.props.onUpdate(updatedProject);
                this.props.onClose();
            })
            .catch(error => {
                console.error('Error updating project:', error);
            });
    };

    handleCancel = () => {
        this.props.onClose();
    };

    render() {
        const { onClose, project } = this.props;
        return (
            <Modal style={{ width: '80%', fontFamily: fontStyled.fontFamily }} isOpen={!!project} toggle={onClose}>
                <ModalHeader>Edit Project</ModalHeader>
                <ModalBody>
                    <FormGroup>
                        <Label for="projectName">Name</Label>
                        <Input
                            type="text"
                            name="projectName"
                            value={this.state.projectName}
                            onChange={e => this.setState({ projectName: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="projectDescription">Description</Label>
                        <Input
                            type="textarea"
                            name="projectDescription"
                            value={this.state.projectDescription}
                            onChange={e => this.setState({ projectDescription: e.target.value })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="accessType">Access Type</Label>
                        <Input
                            type="select"
                            name="accessType"
                            value={this.state.accessType}
                            onChange={e => this.setState({ accessType: e.target.value })}
                            disabled={this.state.isDropdownDisabled}
                        >
                            <option value="">Select Access Type...</option>
                            <option value="Public">Public</option>
                            <option value="Private">Private</option>
                        </Input>
                        {this.state.isDropdownDisabled && (
                            <p className="text-info mt-2">You have the word "SC3" in the Name field. So it's by default access type is Public </p>
                        )}
                    </FormGroup>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.handleSubmit} style={{ background: colorStyled.primary, color: colorStyled.onPrimary }}>
                        Submit
                    </Button>
                    <Button onClick={this.handleCancel} style={{ background: colorStyled.primary, color: colorStyled.onPrimary }}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        );
    }
}

EditProjectModal.propTypes = {
    project: PropTypes.object.isRequired,
    onUpdate: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired
};
