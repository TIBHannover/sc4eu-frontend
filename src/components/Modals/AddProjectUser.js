import { Button, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { Component } from 'react';
import { PRIMARY, SECONDARY } from '../../styledComponents/styledComponents';
import PropTypes from 'prop-types';
import { sendProjectAccessEmail } from '../../network/emailCalls';
import projectAccessEmailHTML from '../../html/projectAccessEmailHTML';

export default class AddProjectUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showWarning: false,
            email: ''
        };
    }
    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Modal
                    style={{ width: '50%', maxWidth: '30%', height: '100%', maxHeight: '50%' }}
                    isOpen={this.props.showDialog}
                    toggle={this.props.toggleAddUserPopup}
                    autoFocus={false}
                >
                    <ModalHeader style={{ backgroundColor: PRIMARY.dark }} autoFocus={false}>
                        Add User to Project
                    </ModalHeader>
                    <ModalBody id="createProjectBody" style={{ backgroundColor: 'whitesmoke', maxHeight: 'calc(100vh - 210px)', overflowY: 'auto' }}>
                        <div style={{ display: 'auto', flexDirection: 'column', alignItems: 'left', marginTop: '10px' }}>
                            <Label
                                for={'email'}
                                style={{ fontWeight: 'bold', textAlign: 'start', float: 'left', display: 'inline-block', width: '100px' }}
                            >
                                Email:
                            </Label>
                            <Input
                                style={{ width: '70%', backgroundColor: 'lightgray' }}
                                type="text"
                                name="email"
                                placeholder="Enter member Email"
                                onChange={event => this.setState({ email: event.target.value })}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter style={{ backgroundColor: 'lightgray' }}>
                        <label style={{ color: 'red', alignContent: 'right', display: this.state.showWarning ? 'block' : 'none' }}>
                            User with this email does not exists
                        </label>
                        <Button
                            id="finishButton"
                            style={{ background: SECONDARY.dark }}
                            onClick={() => {
                                if (!this.state.email) {
                                    this.setState({ showWarning: 'true' });
                                    console.log('email does not exists');
                                    return;
                                }
                                this.props.callback(this.state.email);
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

AddProjectUserModal.propTypes = {
    toggleAddUserPopup: PropTypes.func.isRequired,
    showDialog: PropTypes.bool.isRequired,
    callback: PropTypes.func.isRequired
};
