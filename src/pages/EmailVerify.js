import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PRIMARY } from '../styledComponents/styledComponents';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import success from '../assets/images/success.png';
import error from '../assets/images/error.png';
import PopUp from '../components/PopUp';
import { Redirect } from 'react-router-dom';

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
        return (
            <StyledDiv style={{ backgroundColor: PRIMARY.lighter, height: '100%' }}>
                <div>
                    <PopUp
                        open={this.state.openPopUp}
                        onClose={() => this.setState({ openPopUp: false })}
                        image={this.state.image}
                        message={this.state.message}
                    />
                    {!this.state.openPopUp ? <Redirect to="/" /> : <div />}
                </div>
            </StyledDiv>
        );
    }
}

EmailVerify.propTypes = {
    location: PropTypes.object.isRequired
};

export default withRouter(EmailVerify);

const StyledDiv = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`;
