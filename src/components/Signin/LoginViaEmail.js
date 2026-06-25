import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Form, FormGroup, Label, Input, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { openAuthDialog, toggleAuthDialog, updateAuth, updateCookies } from '../../redux/actions/auth';
import { compose } from 'redux';
import { loginViaEmail, regsiterViaEmail, forgotPassword } from '../../network/loginCalls';
import { Link } from 'react-router-dom';
import { minLengthPassword } from '../../constants/globalConstants';
import success from '../../assets/images/success.png';
import error from '../../assets/images/error.png';
import PopUp from '../PopUp';
import github from '../../assets/images/github.svg';
import gitlab from '../../assets/images/gitlab.svg';
import sapLogo from '../../assets/images/sap-logo.png';
import { URL_LOGIN_VIA_GITHUB, URL_LOGIN_VIA_GITLAB, URL_LOGIN_VIA_SAP } from '../../constants/services';
import { fontStyled } from '../../styledComponents/styledFont';
import { withTheme } from '@emotion/react';
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
            openPopUp: false,
            image: '',
            popUpMessage: '',
            signInModal: true,
            nameError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: ''
        };
    }

    handleSubmit = event => {
        event.preventDefault();
    };

    handleRegister = async e => {
        if (this.isfieldValid()) {
            this.setState({ loading: false });
            const registerToken = await regsiterViaEmail(this.state.displayName, this.state.email.toLowerCase(), this.state.password);
            if (registerToken.error) {
                this.setState({
                    openPopUp: true,
                    popUpMessage: registerToken.error,
                    image: error
                });
            } else {
                this.setState({ openPopUp: true, popUpMessage: registerToken.message, image: success });
                // this.props.callback();
            }
            if (registerToken && registerToken.jwt) {
                this.props.updateCookies({ token: registerToken.jwt });
            }
            this.setState({ loading: false });
            return true;
        }
    };
    handleLogin = async e => {
        this.setState({ loading: false });
        const token = await loginViaEmail(this.state.email.toLowerCase(), this.state.password);
        if (token.error) {
            this.setState({
                openPopUp: true,
                popUpMessage: token.error,
                image: error
            });
        } else {
            this.props.callback();
        }
        if (token && token.jwt) {
            this.props.updateCookies({ token: token.jwt });
        }
        this.setState({ loading: false });
        return true;
    };
    handleForgotPassword = async e => {
        const response = await forgotPassword(this.state.email.toLowerCase());
        if (response.success === false) {
            this.setState({
                openPopUp: true,
                popUpMessage: response.message,
                image: error
            });
        } else {
            this.setState({ openPopUp: true, popUpMessage: response.message, image: success });
        }
        this.setState({ loading: false });
        return true;
    };
    toggleSignupModel = () => {
        this.setState(prevState => ({
            signupModal: !prevState.signupModal,
            signInModal: false
        }));
    };

    toggleResetPasswordModel = () => {
        this.setState(prevState => ({
            resetPasswordModel: !prevState.resetPasswordModel,
            signInModal: false
        }));
    };

    isfieldValid = () => {
        const regexEmailValidation = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

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
                confirmPasswordError: 'Password and Confirm Password does not match.'
            });
            return false;
        }
        return true;
    };

    popUpClose = () => {
        this.setState({ openPopUp: false });
        this.props.callback();
    };

    render() {
        // let disableRegisterAndGithub = false;
        if (process.env.REACT_APP_DISABLE_REGISTER_AND_OAUTH === 'True' || process.env.REACT_APP_DISABLE_REGISTER_AND_OAUTH === 'true') {
            // disableRegisterAndGithub = true;
        }
        const { theme } = this.props;
        return (
            <div>
                {this.state.openPopUp ? (
                    <PopUp open={this.state.openPopUp} onClose={this.popUpClose} image={this.state.image} message={this.state.popUpMessage} />
                ) : (
                    <div style={{ fontFamily: fontStyled.fontFamily }}>
                        {!this.state.loading ? (
                            <Form onSubmit={this.handleSubmit}>
                                {this.state.signInModal ? (
                                    <div style={{ margin: '20px 20px 30px 20px' }}>
                                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                                            <h2 style={{ marginBottom: '20px' }}>Sign In</h2>
                                            <p className="mt-3" style={{ color: theme.palette.text.primary }}>
                                                Don't have an account? &nbsp;
                                                <Link to="" style={{ color: theme.palette.primary.main }} onClick={this.toggleSignupModel}>
                                                    Sign Up
                                                </Link>
                                            </p>
                                        </div>
                                        <hr className="mt-0 mb-2" />
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between',
                                                height: '130px',
                                                alignItems: 'center',
                                                marginTop: '20px'
                                            }}
                                        >
                                            <a
                                                href={URL_LOGIN_VIA_GITHUB}
                                                target="_self"
                                                className="btn btn-primary"
                                                style={{ width: '90%', backgroundColor: 'black', border: 'none' }}
                                                rel="noreferrer"
                                            >
                                                <img src={github} style={{ height: '30px', width: '25px', float: 'left' }} alt={''} />
                                                <span
                                                    style={{
                                                        border: '1px solid white',
                                                        float: 'left',
                                                        height: '100%',
                                                        marginLeft: '10px'
                                                    }}
                                                />{' '}
                                                Sign in with GitHub
                                            </a>
                                            <a
                                                href={URL_LOGIN_VIA_GITLAB}
                                                target="_self"
                                                className="btn btn-primary"
                                                style={{ width: '90%', backgroundColor: '#ec672a', border: 'none' }}
                                                rel="noreferrer"
                                            >
                                                <img src={gitlab} style={{ height: '30px', width: '25px', float: 'left' }} alt={''} />
                                                <span
                                                    style={{
                                                        border: '1px solid white',
                                                        float: 'left',
                                                        height: '100%',
                                                        marginLeft: '10px'
                                                    }}
                                                />{' '}
                                                Sign in with GitLab
                                            </a>
                                            {/* <a
                                                href={URL_LOGIN_VIA_GOOGLE}
                                                target="_self"
                                                className="btn btn-primary"
                                                style={{ width: '90%', backgroundColor: '#4285F4', border: 'none' }}
                                                rel="noreferrer"
                                            >
                                                <img src={google} style={{ height: '30px', width: '25px', float: 'left' }} alt={''} />
                                                <span style={{ border: '1px solid white', float: 'left', height: '100%', marginLeft: '10px' }} />
                                                Sign in with Google
                                            </a> */}
                                            <a
                                                href={URL_LOGIN_VIA_SAP}
                                                target="_self"
                                                className="btn btn-primary"
                                                style={{ width: '90%', backgroundColor: '#0f6d9c', border: 'none' }}
                                                rel="noreferrer"
                                            >
                                                <img src={sapLogo} style={{ height: '30px', width: '25px', float: 'left' }} alt={''} />
                                                <span
                                                    style={{
                                                        border: '1px solid white',
                                                        float: 'left',
                                                        height: '100%',
                                                        marginLeft: '10px'
                                                    }}
                                                />{' '}
                                                Sign in with SAP
                                            </a>
                                        </div>
                                        <div style={{ textAlign: 'center', marginTop: '20px', color: theme.palette.text.primary }}>
                                            <hr
                                                style={{
                                                    float: 'left',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    width: '45%'
                                                }}
                                            />
                                            OR
                                            <hr
                                                style={{
                                                    float: 'right',
                                                    marginLeft: 'auto',
                                                    marginRight: 'auto',
                                                    width: '45%'
                                                }}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                marginTop: '10px'
                                            }}
                                        >
                                            <Label style={{ width: '90%', textAlign: 'start', color: theme.palette.text.primary }}>Email</Label>
                                            <Input
                                                style={{
                                                    width: '90%',
                                                    backgroundColor: theme.palette.background.paper,
                                                    color: theme.palette.text.primary
                                                }}
                                                type="email"
                                                name="email"
                                                placeholder="Enter email"
                                                value={this.state.email}
                                                onChange={event => this.setState({ email: event.target.value })}
                                            />
                                        </div>
                                        <div
                                            style={{
                                                display: 'flex',
                                                flexDirection: 'column',
                                                alignItems: 'center',
                                                marginTop: '10px'
                                            }}
                                        >
                                            <Label style={{ width: '90%', textAlign: 'start', color: theme.palette.text.primary }}>Password</Label>
                                            <Input
                                                style={{
                                                    width: '90%',
                                                    backgroundColor: theme.palette.background.paper,
                                                    color: theme.palette.text.primary
                                                }}
                                                type="password"
                                                name="password"
                                                placeholder="Enter password"
                                                value={this.state.password}
                                                onChange={event => this.setState({ password: event.target.value })}
                                            />
                                        </div>
                                        <div style={{ textAlign: 'center', marginBottom: '10px' }}>
                                            <Button
                                                id="loginWithMail"
                                                style={{
                                                    width: '90%',
                                                    marginTop: '15px',
                                                    backgroundColor: theme.palette.secondary.main,
                                                    color: theme.palette.secondary.contrastText
                                                }}
                                                onClick={this.handleLogin}
                                            >
                                                Login
                                            </Button>
                                        </div>
                                        <p style={{ textAlign: 'center' }}>
                                            <Link to="" onClick={this.toggleResetPasswordModel} style={{ color: theme.palette.primary.main }}>
                                                Forgot Password ?
                                            </Link>
                                        </p>
                                    </div>
                                ) : this.state.signupModal ? (
                                    // sign up model start from here
                                    <Modal
                                        style={{ maxWidth: '700px', width: '100%', fontFamily: fontStyled.fontFamily }}
                                        isOpen={this.state.signupModal}
                                        toggle={this.props.toggleAuthDialog}
                                    >
                                        <ModalHeader toggle={this.props.toggleAuthDialog}>Sign Up</ModalHeader>
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
                                                                onChange={event => this.setState({ displayName: event.target.value })}
                                                            />
                                                            <span className="text-danger">{this.state.nameError}</span>
                                                        </Col>
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
                                                                onChange={event => this.setState({ email: event.target.value })}
                                                            />
                                                            <span className="text-danger">{this.state.emailError}</span>
                                                        </Col>
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
                                                                onChange={event => this.setState({ password: event.target.value })}
                                                            />
                                                            <span className="text-danger">{this.state.passwordError}</span>
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
                                                                onChange={event => this.setState({ confirmPassword: event.target.value })}
                                                            />
                                                            <span className="text-danger">{this.state.confirmPasswordError}</span>
                                                        </Col>
                                                    </FormGroup>
                                                </Form>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter>
                                            <Button
                                                style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}
                                                onClick={this.handleRegister}
                                            >
                                                Register
                                            </Button>
                                            <Button
                                                style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}
                                                onClick={this.props.toggleAuthDialog}
                                            >
                                                Cancel
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                ) : (
                                    // forgot password model start from here
                                    <Modal
                                        style={{ fontFamily: fontStyled.fontFamily }}
                                        isOpen={this.state.resetPasswordModel}
                                        toggle={this.props.toggleAuthDialog}
                                    >
                                        <ModalHeader
                                            toggle={this.props.toggleAuthDialog}
                                            style={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}
                                        >
                                            Reset Password
                                        </ModalHeader>
                                        <ModalBody style={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}>
                                            <div className="container">
                                                <Form onSubmit={this.handleSubmit}>
                                                    <FormGroup row>
                                                        <Label for="exampleEmail" sm={2} style={{ color: theme.palette.text.primary }}>
                                                            Email
                                                        </Label>
                                                        <Col sm={10}>
                                                            <Input
                                                                type="email"
                                                                name="email"
                                                                placeholder="Enter Email Address"
                                                                value={this.state.email}
                                                                onChange={event => this.setState({ email: event.target.value })}
                                                                style={{
                                                                    backgroundColor: theme.palette.background.paper,
                                                                    color: theme.palette.text.primary
                                                                }}
                                                            />
                                                        </Col>
                                                    </FormGroup>
                                                </Form>
                                            </div>
                                        </ModalBody>
                                        <ModalFooter style={{ backgroundColor: theme.palette.background.paper, color: theme.palette.text.primary }}>
                                            <Button
                                                style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}
                                                onClick={this.handleForgotPassword}
                                            >
                                                Reset
                                            </Button>
                                            <Button
                                                style={{ backgroundColor: theme.palette.secondary.main, color: theme.palette.secondary.contrastText }}
                                                onClick={this.props.toggleAuthDialog}
                                            >
                                                Cancel
                                            </Button>
                                        </ModalFooter>
                                    </Modal>
                                )}
                            </Form>
                        ) : (
                            <div>Processing...</div>
                        )}
                    </div>
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(withTheme(LoginViaEmail));
