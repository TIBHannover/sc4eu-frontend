import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { openAuthDialog, toggleAuthDialog, updateAuth, updateCookies } from '../../redux/actions/auth';
import { compose } from 'redux';
import { loginViaEmail, regsiterViaEmail } from '../../network/loginCalls';
import { Link } from 'react-router-dom';
import { minLengthPassword } from '../../constants/globalConstants';

class LoginViaEmail extends Component {
    //prevent the submitEvent of the Form

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            errors: null,
            signupModal: false,
            resetPasswordModel: false,
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '',
            nameError: '',
            emailError: '',
            passwordError: '',
            passwordMatchError: '',
            emailtakenError: '',
            emailNotFoundError: ''
        };
    }

    handleSubmit = event => {
        event.preventDefault();
    };

    handleRegister = async e => {
        if (this.isfieldValid()) {
            this.setState({ loading: false });
            const registerToken = await regsiterViaEmail(this.state.displayName, this.state.email, this.state.password);
            if (registerToken.error) {
                this.setState({
                    emailtakenError: registerToken.error
                });
            } else {
                this.props.callback();
            }
            console.log('result', registerToken);
            if (registerToken && registerToken.jwt) {
                this.props.updateCookies({ token: registerToken.jwt });
            }
            this.setState({ loading: false });
            return true;
        }
    };
    handleLogin = async e => {
        this.setState({ loading: false });
        const token = await loginViaEmail(this.state.email, this.state.password);
        if (token.error) {
            this.setState({
                emailNotFoundError: token.error
            });
        } else {
            this.props.callback();
        }
        console.log('result', token);
        if (token && token.jwt) {
            this.props.updateCookies({ token: token.jwt });
        }
        this.setState({ loading: false });
        return true;
    };

    toggleSignupModel = () => {
        this.setState({ signupModal: !this.state.signupModal });
    };

    toggleResetPasswordModel = () => {
        this.setState({ resetPasswordModel: !this.state.resetPasswordModel });
    };

    isfieldValid = () => {
        const regexEmailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!this.state.displayName) {
            this.setState({
                nameError: 'Name can not be empty'
            });
            return false;
        } else if (!this.state.email || regexEmailValidation.test(this.state.email) === false) {
            this.setState({
                emailError: 'Email is not a valid'
            });
            return false;
        } else if (this.state.password.length < minLengthPassword) {
            this.setState({
                passwordError: 'Password cannot be less than 5 characters'
            });
            return false;
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                passwordMatchError: 'Password and Confirm Password does not match.'
            });
            return false;
        }
        return true;
    };

    inputValueChanged = event => {
        const field = this.state;
        field[event.target.name] = event.target.value;
        this.setState({ field: field });
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
                        <FormGroup row>
                            <Label for="exampleEmail" sm={2}>
                                Email
                            </Label>
                            <Col sm={10}>
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={this.state.email}
                                    onChange={this.inputValueChanged}
                                />
                            </Col>
                            <span style={{ marginLeft: '100px' }} className="text-danger">
                                {this.state.emailNotFoundError}
                            </span>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="examplePassword" sm={2}>
                                Password
                            </Label>
                            <Col sm={10}>
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="Enter password"
                                    value={this.state.password}
                                    onChange={this.inputValueChanged}
                                />
                            </Col>
                        </FormGroup>
                        <div>
                            <p className="mt-3">
                                Don't have an account? &nbsp;
                                <Link to="" onClick={this.toggleSignupModel}>
                                    Sign Up
                                </Link>
                            </p>
                            <Modal style={{ maxWidth: '700px', width: '100%' }} isOpen={this.state.signupModal} toggle={this.toggleSignupModel}>
                                <ModalHeader toggle={this.toggleSignupModel}>Sign Up</ModalHeader>
                                <ModalBody>
                                    <div className="container">
                                        <Form onSubmit={this.handleSubmit}>
                                            <FormGroup row>
                                                <Label for="displayName" sm={2}>
                                                    Name
                                                </Label>
                                                <Col sm={10}>
                                                    <Input
                                                        type="text"
                                                        name="displayName"
                                                        placeholder="Enter Name"
                                                        value={this.state.displayName}
                                                        onChange={this.inputValueChanged}
                                                    />
                                                </Col>
                                                <span style={{ marginLeft: '130px' }} className="text-danger">
                                                    {this.state.nameError}
                                                </span>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="email" sm={2}>
                                                    Email
                                                </Label>
                                                <Col sm={10}>
                                                    <Input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter Email Address"
                                                        value={this.state.email}
                                                        onChange={this.inputValueChanged}
                                                    />
                                                </Col>
                                                <span style={{ marginLeft: '130px' }} className="text-danger">
                                                    {this.state.emailError}
                                                </span>
                                                <span className="text-danger">{this.state.emailtakenError}</span>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="password" sm={2}>
                                                    Password
                                                </Label>
                                                <Col sm={10}>
                                                    <Input
                                                        type="password"
                                                        name="password"
                                                        placeholder="Enter Password "
                                                        value={this.state.password}
                                                        onChange={this.inputValueChanged}
                                                    />
                                                </Col>
                                                <span style={{ marginLeft: '130px' }} className="text-danger">
                                                    {this.state.passwordError}
                                                </span>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="confirm-Password" sm={2}>
                                                    Confirm Password
                                                </Label>
                                                <Col sm={10}>
                                                    <Input
                                                        type="password"
                                                        name="confirmPassword"
                                                        placeholder="Re-Enter Password"
                                                        value={this.state.confirmPassword}
                                                        onChange={this.inputValueChanged}
                                                    />
                                                </Col>
                                                <span style={{ marginLeft: '130px', marginTop: '-20px' }} className="text-danger">
                                                    {this.state.passwordMatchError}
                                                </span>
                                            </FormGroup>
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
                            {/*<p className="mt-3">
                                Forgot your Password? <Link to="" onClick={this.toggleResetPasswordModel}>Reset Password</Link>
                            </p>*/}
                            <Modal isOpen={this.state.resetPasswordModel} toggle={this.toggleResetPasswordModel}>
                                <ModalHeader toggle={this.toggleResetPasswordModel}>Reset Password</ModalHeader>
                                <ModalBody>
                                    <div className="container">
                                        <Form onSubmit={this.handleSubmit}>
                                            <FormGroup row>
                                                <Label for="exampleEmail" sm={2}>
                                                    Email
                                                </Label>
                                                <Col sm={10}>
                                                    <Input
                                                        type="email"
                                                        name="email"
                                                        placeholder="Enter Email Address"
                                                        value={this.state.email}
                                                        onChange={this.inputValueChanged}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="examplePassword" sm={2}>
                                                    Password
                                                </Label>
                                                <Col sm={10}>
                                                    <Input
                                                        type="password"
                                                        name="password"
                                                        placeholder="Enter Password "
                                                        value={this.state.password}
                                                        onChange={this.inputValueChanged}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label for="confirm-Password" sm={2}>
                                                    Confirm Password
                                                </Label>
                                                <Col sm={10}>
                                                    <Input
                                                        type="password"
                                                        name="confirmPassword"
                                                        placeholder="Re-Enter Password"
                                                        value={this.state.confirmPassword}
                                                        onChange={this.inputValueChanged}
                                                    />
                                                </Col>
                                            </FormGroup>
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
