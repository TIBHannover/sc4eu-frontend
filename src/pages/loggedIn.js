import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { clearRedirectRoute, updateCookies } from '../redux/actions/auth';
import ROUTES from '../constants/routes';

class LoggedIn extends Component {
    // taken once: the route is cleared from the store right after mounting
    redirectRoute = this.props.redirectRoute || ROUTES.HOME;

    componentDidMount() {
        this.props.clearRedirectRoute();
        const urlParams = new URLSearchParams(this.props.location.search);
        const response = Object.fromEntries(urlParams);
        if (this.props.user === 0) {
            const token = response.token;
            this.props.updateCookies({ token });
        }
    }
    render() {
        return <Redirect to={this.redirectRoute} />;
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
    redirectRoute: PropTypes.string,
    updateCookies: PropTypes.func.isRequired,
    clearRedirectRoute: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    updateCookies: payload => dispatch(updateCookies(payload)),
    clearRedirectRoute: () => dispatch(clearRedirectRoute())
});

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(LoggedIn);
