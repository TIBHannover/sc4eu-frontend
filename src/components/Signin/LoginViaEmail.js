import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { openAuthDialog, toggleAuthDialog, updateAuth, updateCookies } from '../../redux/actions/auth';
import { compose } from 'redux';
import { loginViaEmail, regsiterViaEmail } from '../../network/loginCalls';
import { Link } from 'react-router-dom';

class LoginViaEmail extends Component {
    //prevent the submitEvent of the Form

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            errors: null,
            signupModal: false,
            resetPasswordModel: false,
            emailError: '',
            passwordError: ''
        };
    }

    handleSubmit = event => {
        event.preventDefault();
    };

    handleRegister = async e => {
        console.log('Register Event Triggered');
        this.setState({ loading: false });
        const result = await this.registerUserWithEmail();
        console.log(result);
        this.props.callback();
        // TODO: handle errors depending on the success of the result
        this.setState({ loading: false });
    };
    handleLogin = async e => {
        console.log('Login Event Triggered');

        this.setState({ loading: false });
        await this.loginUser();
        this.setState({ loading: false });
        console.log('WANNT TO EXECUTE THE CALLBACK');
        this.props.callback();
        console.log('DONE');
    };

    loginUser = async () => {
        console.log(' We need email an  d pwd from user ');
        const pwd = document.getElementById('examplePassword').value;
        const email = document.getElementById('exampleEmail').value;
        const token = await loginViaEmail(email, pwd);
        console.log('result', token);
        if (token && token.jwt) {
            this.props.updateCookies({ token: token.jwt });
        }
    };

    registerUserWithEmail = async () => {
        console.log(' We need email and pwd from user ');
        const displayName = document.getElementById('displayName').value;
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const token = await regsiterViaEmail(displayName, username, email, password);
        console.log('result', token);
        if (token && token.jwt) {
            this.props.updateCookies({ token: token.jwt });
        }
    };

    toggleSignupModel = () => {
        this.setState({ signupModal: !this.state.signupModal });
    };

    toggleResetPasswordModel = () => {
        this.setState({ resetPasswordModel: !this.state.resetPasswordModel });
    };

    fieldValidation = () => {
        // don't remember from where i copied this code, but this works.
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const email = document.getElementById('signupemail').value;
        const pwd = document.getElementById('signuppassword').value;
        const confirmpassword = document.getElementById('confirm-Password').value;
        // eslint-disable-next-line no-unused-vars
        const minLengthRegExp = /.{5,}/;

        if (!email || regex.test(email) === false) {
            this.setState({
                emailError: 'Email is not a valid'
            });
            console.log('email is not valid');
            return false;
        } else if (pwd !== minLengthRegExp) {
            this.setState({
                passwordError: 'At least minumum 5 characters'
            });
        } else if (pwd !== confirmpassword) {
            this.setState({
                passwordError: 'Password and Confirm Password does not match.'
            });
        }
        return true;
    };

    render() {
        let disableRegisterAndGithub = false;
        if (process.env.REACT_APP_DISABLE_REGISTER_AND_OAUTH === 'True' || process.env.REACT_APP_DISABLE_REGISTER_AND_OAUTH === 'true') {
            disableRegisterAndGithub = true;
        }
        return (
            <div>
                {!this.state.loading ? (
                    <Form onSubmit={this.handleSubmit}>
                        <Label for="exampleEmail">Email</Label>
                        <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                        <Label for="examplePassword">Password</Label>
                        <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                        <div>
                            <p className="mt-3">
                                Don't have an account? <Link onClick={this.toggleSignupModel}>Sign Up</Link>
                            </p>
                            <Modal isOpen={this.state.signupModal} toggle={this.toggleSignupModel}>
                                <ModalHeader toggle={this.toggleSignupModel}>Sign Up</ModalHeader>
                                <ModalBody>
                                    <div className="container">
                                        <span className="text-danger">{this.state.emailError}</span>
                                        <span className="text-danger">{this.state.passwordError}</span>
                                        <Form>
                                            {/*   <Form>
                                                <FormGroup row>
                                                    <Label for="displayName" sm={2}>
                                                        Name
                                                    </Label>
                                                    <Col sm={10}>
                                                        <Input type="text" name="displayName" id="displayName" placeholder="Enter Name" />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="username" sm={2}>
                                                        User Name
                                                    </Label>
                                                    <Col sm={10}>
                                                        <Input type="text" name="username" id="username" placeholder="Enter username" />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="email" sm={2}>
                                                        Email
                                                    </Label>
                                                    <Col sm={10}>
                                                        <Input type="email" name="email" id="email" placeholder="Enter Email Address" />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="password" sm={2}>
                                                        Password
                                                    </Label>
                                                    <Col sm={10}>
                                                        <Input type="password" name="password" id="password" placeholder="Enter Password " />
                                                    </Col>
                                                </FormGroup>
                                                <FormGroup row>
                                                    <Label for="confirm-Password" sm={2}>
                                                        Confirm Password
                                                    </Label>
                                                    <Col sm={10}>
                                                        <Input
                                                            type="password"
                                                            name="confirm-Password"
                                                            id="confirm-Password"
                                                            placeholder="Re-Enter Password"
                                                        />
                                                    </Col>
                                                </FormGroup>
                                            </Form>*/}
                                            <Label for="text">Name</Label>
                                            <Input type="text" name="text" id="displayName" placeholder="e.g. John Doe" />
                                            <Label for="text">User Name</Label>
                                            <Input type="text" name="text" id="username" placeholder="e.g. John Doe" />
                                            <Label for="Email">Email</Label>
                                            <Input type="email" name="email" id="email" placeholder="with a placeholder" />
                                            <Label for="Password">Password</Label>
                                            <Input type="password" name="password" id="password" placeholder="password placeholder" />
                                            <Label for="confirm-Password">Confirm Password</Label>
                                            <Input type="password" name="confirm-password" id="confirm-Password" placeholder="Re-Enter Password" />
                                        </Form>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.handleRegister}>
                                        Register
                                    </Button>
                                    <Button color="primary" onClick={this.toggleSignupModel}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                        <div>
                            {/*  <p className="mt-3">
                                Forgot your Password? <Link onClick={this.toggleResetPasswordModel}>Reset Password</Link>
                            </p>*/}
                            <Modal isOpen={this.state.resetPasswordModel} toggle={this.toggleResetPasswordModel}>
                                <ModalHeader toggle={this.toggleResetPasswordModel}>Reset Password</ModalHeader>
                                <ModalBody>
                                    <div className="container">
                                        <Form>
                                            <Label for="exampleEmail">Email Address</Label>
                                            <Input type="email" name="email" id="email" placeholder="Enter Email Address" />
                                            <Label for="examplePassword">Password</Label>
                                            <Input type="password" name="password" id="password" placeholder="Enter Password " />
                                            <Label for="confirm-Password">Confirm Password</Label>
                                            <Input type="password" name="confirm-password" id="confirm-Password" placeholder="Re-Enter Password" />
                                        </Form>
                                    </div>
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="primary" onClick={this.toggleResetPasswordModel}>
                                        Reset
                                    </Button>
                                    <Button color="primary" onClick={this.toggleResetPasswordModel}>
                                        Cancel
                                    </Button>
                                </ModalFooter>
                            </Modal>
                        </div>
                        <Button color="primary" id="loginWithMail" style={{ float: 'right', marginTop: '12px' }} onClick={this.handleLogin}>
                            Login
                        </Button>
                    </Form>
                ) : (
                    <div>Processing...</div>
                )}
            </div>
        );
    }
}

LoginViaEmail.propTypes = {
    openAuthDialog: PropTypes.func.isRequired,
    updateAuth: PropTypes.func.isRequired,
    updateCookies: PropTypes.func.isRequired,
    toggleAuthDialog: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired,
    signInRequired: PropTypes.bool.isRequired,
    // history: PropTypes.object.isRequired,
    redirectRoute: PropTypes.string
};

const mapStateToProps = state => ({
    signInRequired: state.auth.signInRequired,
    redirectRoute: state.auth.redirectRoute
});

const mapDispatchToProps = dispatch => ({
    openAuthDialog: payload => dispatch(openAuthDialog(payload)),
    updateAuth: data => dispatch(updateAuth(data)),
    updateCookies: data => dispatch(updateCookies(data)),
    toggleAuthDialog: () => dispatch(toggleAuthDialog())
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
    // withRouter
)(LoginViaEmail);
