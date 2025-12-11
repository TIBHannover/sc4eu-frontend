import { Button, Form, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { doesUserExist } from '../../network/UserProfileCalls';
import { fontStyled } from '../../styledComponents/styledFont';
import { colorStyled } from '../../styledComponents/styledColor';

export default class AddProjectUserModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showWarning: false,
            email: '',
            emailWarning: 'User with this email does not exists'
        };
        this.emailRegexp = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }

    render() {
        return (
            <Form onSubmit={this.handleSubmit}>
                <Modal
                    style={{ width: '50%', maxWidth: '30%', height: '100%', maxHeight: '50%', fontFamily: fontStyled.fontFamily }}
                    isOpen={this.props.showDialog}
                    toggle={this.props.toggleAddUserPopup}
                    autoFocus={false}
                >
                    <ModalHeader style={{ display: 'block', backgroundColor: colorStyled.PRIMARY.dark }} autoFocus={false}>
                        <span style={{ color: '#000000' }}>Add User to Project</span>
                        <Button
                            style={{
                                float: 'right',
                                background: 'none',
                                border: 'none',
                                color: '#000000',
                                cursor: 'pointer',
                                fontWeight: 500,
                                fontSize: 18
                            }}
                            onClick={this.props.toggleAddUserPopup}
                        >
                            X
                        </Button>
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
                                type="email"
                                name="email"
                                placeholder="Enter member Email"
                                onChange={event => this.setState({ email: event.target.value })}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter style={{ backgroundColor: 'lightgray' }}>
                        <label style={{ color: 'red', alignContent: 'right', display: this.state.showWarning ? 'block' : 'none' }}>
                            {this.state.emailWarning}
                        </label>
                        <Button
                            id="finishButton"
                            style={{ background: colorStyled.SECONDARY.dark }}
                            onClick={() => {
                                if (!this.state.email) {
                                    this.setState({ emailWarning: 'Email can not be Empty ', showWarning: 'true' });
                                    return;
                                }

                                if (this.emailRegexp.test(this.state.email)) {
                                    doesUserExist(this.state.email).then(res => {
                                        if (res.success) {
                                            this.props.callback(this.state.email, res.user_id);
                                        } else {
                                            this.setState({ emailWarning: 'User with this email does not exists', showWarning: 'true' });
                                        }
                                    });
                                } else {
                                    this.setState({ emailWarning: 'Please enter a valid email', showWarning: 'true' });
                                }
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
