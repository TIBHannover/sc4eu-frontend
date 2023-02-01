import { Button, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { Component } from 'react';
import { PRIMARY, SECONDARY } from '../../styledComponents/styledComponents';
import PropTypes from 'prop-types';
import { sendProjectAccessEmail } from '../../network/emailCalls';
import projectAccessEmailHTML from '../../html/projectAccessEmailHTML';

export default class ProjectPermissionModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            showWarning: false
        };
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Modal
                    style={{ width: '50%', maxWidth: '30%', height: '100%', maxHeight: '50%' }}
                    isOpen={this.props.showDialog}
                    toggle={this.props.toggle}
                    autoFocus={false}
                >
                    <ModalHeader style={{ backgroundColor: PRIMARY.dark }} autoFocus={false}>
                        Get Access to {this.props.projectDetails.name} Project
                    </ModalHeader>
                    <ModalBody id="createProjectBody" style={{ backgroundColor: 'whitesmoke', maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                        <div style={{ display: 'auto', flexDirection: 'column', alignItems: 'left', marginTop: '10px' }}>
                            <Label
                                for={'subject'}
                                style={{ fontWeight: 'bold', textAlign: 'start', float: 'left', display: 'inline-block', width: '100px' }}
                            >
                                Subject:
                            </Label>
                            <Input
                                style={{ width: '70%', backgroundColor: 'lightgray' }}
                                type="text"
                                name="subject"
                                placeholder="Enter Subject"
                                value={this.state.subject}
                                onChange={event => this.setState({ subject: event.target.value })}
                            />
                        </div>
                        <div style={{ display: 'auto', flexDirection: 'column', alignItems: 'left', marginTop: '10px' }}>
                            <Label
                                for={'message'}
                                style={{ fontWeight: 'bold', textAlign: 'start', float: 'left', display: 'inline-block', width: '100px' }}
                            >
                                Message:
                            </Label>
                            <Input
                                style={{ width: '70%', backgroundColor: 'lightgray' }}
                                type="textarea"
                                name="message"
                                placeholder="Enter Subject"
                                value={this.state.message}
                                onChange={event => this.setState({ message: event.target.value })}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter style={{ backgroundColor: 'lightgray' }}>
                        <label style={{ color: 'red', alignContent: 'right', display: this.state.showWarning ? 'block' : 'none' }}>
                            Subject and Message can not be empty
                        </label>
                        <Button
                            id="finishButton"
                            style={{ background: SECONDARY.dark }}
                            onClick={() => {
                                if (!this.state.message || !this.state.subject) {
                                    this.setState({ showWarning: 'true' });
                                    console.log('message or subject can not be empty');
                                    return;
                                }
                                const projectDetails = this.props.projectDetails;
                                const emailContent = projectAccessEmailHTML(projectDetails.name, this.state.message).body;
                                console.log(this.props.userEmail);
                                const emailToSend = {
                                    userEmail: this.props.userEmail,
                                    projectAdminEmail:
                                        projectDetails.projectAdmins.length > 0 ? projectDetails.projectAdmins[0].email : 'admin@example.com',
                                    emailSubject: this.state.subject,
                                    emailContent: emailContent
                                };
                                sendProjectAccessEmail(emailToSend).then(result => {
                                    this.setState({ name: null, email: null, subject: null, message: null, showWarning: null });
                                    this.props.callback();
                                });
                            }}
                            autoFocus={true}
                        >
                            Submit
                        </Button>
                    </ModalFooter>
                </Modal>
            </Form>
        );
    }
}

ProjectPermissionModal.propTypes = {
    toggle: PropTypes.func.isRequired,
    showDialog: PropTypes.bool.isRequired,
    projectDetails: PropTypes.object.isRequired,
    callback: PropTypes.func.isRequired,
    userEmail: PropTypes.string.isRequired
};
