import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { updateCookies } from '../redux/actions/auth';

class LoggedIn extends Component {
    componentDidMount() {
        const urlParams = new URLSearchParams(this.props.location.search);
        const response = Object.fromEntries(urlParams);
        console.log(response.token);
        if (this.props.user === 0) {
            const token = response.token;
            this.props.updateCookies({ token });
        }
    }
    render() {
        return <Redirect to="/" />;
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        redirectRoute: state.auth.redirectRoute
    };
};

LoggedIn.propTypes = {
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    location: PropTypes.object.isRequired,
    updateCookies: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    updateCookies: payload => dispatch(updateCookies(payload))
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(LoggedIn);
