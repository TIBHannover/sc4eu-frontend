import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openAuthDialog, toggleAuthDialog, updateAuth } from '../../redux/actions/auth';
import { compose } from 'redux';

class SignIn extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            errors: null
        };
    }

    render() {
        const githubAuthURL = '/auth/github';
        return (
            <>
                <div>
                    We do not provide any local users, we use OAuth2 to allow you to login (and if not yet register, create an internal account)
                </div>
                <hr />
                <div>We do not store any e-mail or password credentials. We will investigate further sign in methods like Google and twitter.</div>
                <hr />
                <div>However, we will create an account internally to ensure your access rights to the data stored in this project.</div>
                {/*<Form className="pl-3 pr-3 pt-2" onSubmit={this.signIn}>*/}
                {/*    <Button type="submit" color="primary" className="mt-4 mb-2" block disabled={this.state.loading}>*/}
                {/*        {!this.state.loading ? (*/}
                {/*            'Sign in with GitHub'*/}
                {/*        ) : (*/}
                {/*            <span>*/}
                {/*                <Icon icon={faSpinner} spin /> Loading*/}
                {/*            </span>*/}
                {/*        )}*/}
                {/*    </Button>*/}
                {/*</Form>*/}
                {/*/!*TODO MAKE A BUTTON OUT OF IT*!/*/}
                {/*<a href={URL_LOGIN_VIA_GITHUB}>Sign in with GitHub </a>*/}

                {/*TODO: TEST IF WE CAN USE A BUTTON REDIRECT HERE */}
                <a href={githubAuthURL} className="btn btn-primary">
                    Sign in
                </a>
            </>
        );
    }
}

SignIn.propTypes = {
    openAuthDialog: PropTypes.func.isRequired,
    updateAuth: PropTypes.func.isRequired,
    toggleAuthDialog: PropTypes.func.isRequired,
    signInRequired: PropTypes.bool.isRequired,
    // history: PropTypes.object.isRequired,
    redirectRoute: PropTypes.string
};

SignIn.defaultProps = {
    redirectRoute: null
};

const mapStateToProps = state => ({
    signInRequired: state.auth.signInRequired,
    redirectRoute: state.auth.redirectRoute
});

const mapDispatchToProps = dispatch => ({
    openAuthDialog: payload => dispatch(openAuthDialog(payload)),
    updateAuth: data => dispatch(updateAuth(data)),
    toggleAuthDialog: () => dispatch(toggleAuthDialog())
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
    // withRouter
)(SignIn);
