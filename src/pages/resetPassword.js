import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { minLengthPassword } from '../constants/globalConstants';
import { Redirect } from 'react-router-dom';
import PopUp from '../components/PopUp';
import { Button, Col, Form, FormGroup, Input, Label } from 'reactstrap';
import success from '../assets/images/success.png';
import error from '../assets/images/error.png';
import { setNewPassword } from '../network/loginCalls';
import { fontStyled } from '../styledComponents/styledFont';
class ResetPassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            message: '',
            openPopUp: false,
            redirectToHome: false,
            passwordError: false,
            confirmPasswordError: false,
            image: ''
        };
    }

    componentDidMount() {}

    isfieldValid = () => {
        if (this.state.password.length < minLengthPassword) {
            this.setState({ passwordError: 'Password cannot be less than 5 characters' });
            return false;
        } else if (this.state.password !== this.state.confirmPassword) {
            this.setState({ confirmPasswordError: 'Password and Confirm Password does not match.' });
            return false;
        }
        return true;
    };

    handleSetNewPassword = async () => {
        if (this.isfieldValid()) {
            if (this.props.location.search) {
                const urlParams = new URLSearchParams(this.props.location.search);
                const data = Object.fromEntries(urlParams);
                const response = await setNewPassword(data.user_id, this.state.password);
                if (response.success === false) {
                    this.setState({ message: response.message });
                    this.setState({ openPopUp: true });
                    this.setState({ image: error });
                } else {
                    this.setState({ message: response.message });
                    this.setState({ openPopUp: true });
                    this.setState({ image: success });
                }
                return true;
            }
        }
    };

    popUpClose = () => {
        this.setState({ openPopUp: false });
        this.setState({ redirectToHome: true });
    };

    render() {
         
        return (
            <div className="container" style={{ marginTop: '50px', fontFamily: fontStyled.fontFamily }}>
                {this.state.redirectToHome ? <Redirect to="/" /> : <div />}
                {this.state.openPopUp ? (
                    <PopUp open={this.state.openPopUp} onClose={this.popUpClose} image={this.state.image} message={this.state.message} />
                ) : (
                    <Form>
                        <h1 style={{ textAlign: 'center' }}>Reset Password</h1>
                        <FormGroup row>
                            <Label for="Password" sm={2}>
                                Password
                            </Label>
                            <Col sm={8}>
                                <Input
                                    type="password"
                                    name="Password"
                                    id="Password"
                                    placeholder="Password"
                                    value={this.state.password}
                                    onChange={event => this.setState({ password: event.target.value })}
                                />
                                <span className="text-danger">{this.state.passwordError}</span>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label for="ConfirmPassword" sm={2}>
                                Confirm Password
                            </Label>
                            <Col sm={8}>
                                <Input
                                    type="password"
                                    name="ConfirmPassword"
                                    id="ConfirmPassword"
                                    placeholder="Confirm Password"
                                    value={this.state.confirmPassword}
                                    onChange={event => this.setState({ confirmPassword: event.target.value })}
                                />
                                <span className="text-danger">{this.state.confirmPasswordError}</span>
                            </Col>
                        </FormGroup>
                        <FormGroup check row>
                            <Col sm={{ offset: 2 }}>
                                <Button onClick={this.handleSetNewPassword}>
                                    Submit
                                </Button>
                            </Col>
                        </FormGroup>
                    </Form>
                )}
            </div>
        );
    }
}

ResetPassword.propTypes = {
    location: PropTypes.object.isRequired
};

export default ResetPassword;
