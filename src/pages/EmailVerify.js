import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import success from '../assets/images/success.png';
import error from '../assets/images/error.png';
import PopUp from '../components/PopUp';
import { Redirect } from 'react-router-dom';
import { withTheme } from '@emotion/react';
import { StyledEmailVerifyDiv } from 'styledComponents/styledComponents';

class EmailVerify extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            openPopUp: true,
            image: ''
        };
    }

    componentDidMount() {
        this.getResponse();
    }

    getResponse = () => {
        // Get response from the URL string and convert in the JSON formate
        if (this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const response = Object.fromEntries(urlParams);
            if (response.success === 'true') {
                this.setState({ message: 'Email verified successfully' });
                this.setState({ image: success });
            } else {
                this.setState({ message: response });
                this.setState({ image: error });
            }
        }
    };

    render() {
        const { theme } = this.props;
        return (
            <StyledEmailVerifyDiv style={{ backgroundColor: theme.palette.background.default, height: '100%' }}>
                <div>
                    <PopUp
                        open={this.state.openPopUp}
                        onClose={() => this.setState({ openPopUp: false })}
                        image={this.state.image}
                        message={this.state.message}
                    />
                    {!this.state.openPopUp ? <Redirect to="/" /> : <div />}
                </div>
            </StyledEmailVerifyDiv>
        );
    }
}

EmailVerify.propTypes = {
    location: PropTypes.object.isRequired
};

export default withRouter(withTheme(EmailVerify));

