import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { updateCookies } from '../redux/actions/auth';
// this needs to connect to the redux

class LoggedIn extends Component {
    componentDidMount() {
        if (this.props.user === 0) {
            const token = this.props.match.params.accessToken;
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
    redirectRoute: PropTypes.string.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    match: PropTypes.shape({
        params: PropTypes.shape({
            accessToken: PropTypes.string,
            redirectTo: PropTypes.string
        }).isRequired
    }).isRequired,

    updateCookies: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    updateCookies: payload => dispatch(updateCookies(payload))
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(LoggedIn);
