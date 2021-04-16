import React, { Component } from 'react';
// import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { updateCookies } from '../redux/actions/auth';
// this needs to connect to the redux

class LoggedIn extends Component {
    componentDidMount() {
        console.log('THAT THING HAS MOUNTED !!!');
        if (this.props.user === 0) {
            console.log('WE SHALL CREATE COOKIES');
            const token = this.props.match.params.accessToken;
            // we want to emit an redux update
            this.props.updateCookies({ token });
        }
    }

    render() {
        // check authentications
        const authOk = true;

        if (authOk) {
            // Todo : add history to this one;
            console.log('>> THIS IS AN ACCESS TOKEN WE GOT from jwt<<');
            console.log(this.props.match.params.accessToken);
            // push this to the cookie;

            return (
                <div>
                    <div>Login SuccessFull, Redirect to page X</div>
                    {this.props.user === 0 && <div> NO USER FOUND </div>}
                    {this.props.user !== 0 && this.props.user !== null && <div> USER: {this.props.user.name} </div>}

                    <Link to="/">HOME</Link>
                </div>
            );

            // return <Redirect to="/" />;
        } else {
            return <div> Login Failed </div>;
        }
    }
}

const mapStateToProps = state => {
    console.log(state);
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
