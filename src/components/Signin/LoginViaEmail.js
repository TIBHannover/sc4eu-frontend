import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { connect } from 'react-redux';
import { openAuthDialog, toggleAuthDialog, updateAuth, updateCookies } from '../../redux/actions/auth';
import { compose } from 'redux';
import { loginViaEmail, regsiterViaEmail } from '../../network/loginCalls';

class LoginViaEmail extends Component {
    //prevent the submitEvent of the Form

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            errors: null
        };
    }

    handleSubmit = event => {
        event.preventDefault();
    };

    handleRegister = async e => {
        console.log('Register Event Triggered');
        this.setState({ loading: false });
        const result = await this.registerUserWithEmail();
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
        const pwd = document.getElementById('examplePassword').value;
        const email = document.getElementById('exampleEmail').value;
        const token = await regsiterViaEmail(email, pwd);
        console.log('result', token);
        if (token && token.jwt) {
            this.props.updateCookies({ token: token.jwt });
        }
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
                                <Input type="email" name="email" id="exampleEmail" placeholder="with a placeholder" />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="examplePassword" sm={2}>
                                Password
                            </Label>
                            <Col sm={10}>
                                <Input type="password" name="password" id="examplePassword" placeholder="password placeholder" />
                            </Col>
                        </FormGroup>
                        <div style={{ display: 'flow-root' }}>
                            {!disableRegisterAndGithub && (
                                <Button id="register" style={{ float: 'left' }} onClick={this.handleRegister}>
                                    Register
                                </Button>
                            )}
                            <Button id="loginWithMail" style={{ float: 'right' }} onClick={this.handleLogin}>
                                Login
                            </Button>
                        </div>
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
