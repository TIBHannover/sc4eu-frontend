import React, { Component } from 'react';
import ROUTES from 'constants/routes';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { reverse } from 'named-urls';
import { Redirect } from 'react-router-dom';

import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Logo from 'components/Logo';

import { openAuthDialog } from '../redux/actions/auth';
import { firstLoad, resetAuth, toggleAuthDialog, closeAuthDialog } from '../redux/actions/auth';
import greetingTime from 'greeting-time';
import { Button, ButtonGroup, Row, Navbar } from 'reactstrap';
import SignInModal from '../components/Signin/SignInModal';

import { StyledAuthTooltip, StyledGravatar, StyledTopBar } from 'styledComponents/styledComponents';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHomePageStyle: this.props.location.pathname === ROUTES.HOME,
            userTooltipOpen: false,
            redirectOnAuthAction: false
        };

        this.userPopup = React.createRef();
        this.logoutTimeoutId = null; // timeout for auto-logout
    }

    componentDidMount() {
        // headers component mounts, so lets try to see if we have a user;
        // console.log('USER: ', this.props.user);
        document.addEventListener('mousedown', this.handleClickOutside);
        if (this.props.user === 0) {
            // make a call to redux to look into the cookie jar
            // console.log('User is NULL, >> FIRST LOAD');
            this.props.firstLoad();
        } else {
            // console.log('we do have some user');
            if (!this.props.user.displayName || !this.props.user.gravatarId) {
                // console.log('This should fetch some data');
                this.props.firstLoad();
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({
                isHomePageStyle: this.props.location.pathname === ROUTES.HOME
            });
        }
        if (this.state.redirectOnAuthAction) {
            this.setState({
                redirectOnAuthAction: false
            });
        }
    }

    componentWillUnmount() {
        if (this.logoutTimeoutId) {
            clearTimeout(this.logoutTimeoutId); // clear timeout
            this.logoutTimeoutId = null;
        }
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    preventDraggingOfItem = event => {
        // event.stopPropagation();
        event.preventDefault();
        return false;
    };

    toggleUserTooltip = () => {
        this.setState({
            userTooltipOpen: !this.state.userTooltipOpen
        });
    };

    handleClickOutside = event => {
        if (this.userPopup.current && !this.userPopup.current.contains(event.target) && this.state.userTooltipOpen) {
            this.toggleUserTooltip();
        }
    };

    handleSignOut = async () => {
        await this.props.resetAuth();
        this.toggleUserTooltip();
        this.setState({
            redirectOnAuthAction: true
        });
    };

    loginCallback = () => {
        this.props.closeAuthDialog();
    };

    render() {
        if (this.state.redirectOnAuthAction === true) {
            // TODO redirect to current page
            // const path = this.props.location.pathname;
            // return <Redirect to={this.props.location.pathname} />;
            // return <Redirect to={ROUTES.USER_SETTINGS} />;
            return <Redirect to="/" />;
        }

        // this shall be a nav bar in the end
        const greeting = greetingTime(new Date());

        const LinkStyle = {
            color: '#ffff',
            display: 'flex',
            paddingRight: '20px',
            alignItems: 'center',
            height: '100%',
            cursor: 'pointer',
            float: 'left',
            fontWeight: 700
        };

        return (
            <StyledTopBar>
                <Navbar
                    expand="md"
                    fixed="top"
                    id="main-navbar"
                    style={{ borderBottom: '1px solid black', background: '#007bff', display: 'block', height: '40px' }}
                >
                    <Link style={Object.assign({ marginTop: '5px' }, LinkStyle)} to={ROUTES.HOME} onDragStart={this.preventDraggingOfItem}>
                        <Logo />
                    </Link>
                    <Link style={LinkStyle} to={ROUTES.HOME} onDragStart={this.preventDraggingOfItem}>
                        Home
                    </Link>
                    <Link style={LinkStyle} to={ROUTES.ONTOLOGY} onDragStart={this.preventDraggingOfItem}>
                        Ontologies
                    </Link>
                    <Link style={LinkStyle} to={ROUTES.Documentations} onDragStart={this.preventDraggingOfItem}>
                        Documentations
                    </Link>
                    <Link style={LinkStyle} to={ROUTES.Dataprotections} onDragStart={this.preventDraggingOfItem}>
                        Data Policy
                    </Link>

                    <div
                        style={{
                            color: '#fff',
                            display: 'flex',
                            alignItems: 'center',
                            height: '100%',
                            cursor: 'pointer',
                            float: 'right'
                        }}
                    >
                        {this.props.user && this.props.user.displayName && this.props.user.gravatarId ? (
                            <div>
                                <StyledGravatar className="rounded-circle" md5={this.props.user.gravatarId} size={35} id="TooltipExample" />
                                <StyledAuthTooltip
                                    fade={false}
                                    trigger="click"
                                    innerClassName="pr-3 pl-3 pt-3 pb-3 clearfix"
                                    placement="bottom-end"
                                    isOpen={this.state.userTooltipOpen}
                                    target="TooltipExample"
                                    toggle={this.toggleUserTooltip}
                                    innerRef={this.userPopup}
                                >
                                    <Row>
                                        <div className="col-3 text-center">
                                            <Link
                                                onClick={this.toggleUserTooltip}
                                                to={reverse(ROUTES.USER_PROFILE, { userId: this.props.user.userId })}
                                            >
                                                <StyledGravatar
                                                    className="rounded-circle"
                                                    style={{ border: '3px solid #fff' }}
                                                    md5={this.props.user.gravatarId}
                                                    size={64}
                                                    id="TooltipExample"
                                                />
                                            </Link>
                                        </div>
                                        <div className="col-9 text-left">
                                            <span className="ml-1">
                                                {greeting} {this.props.user.displayName}
                                            </span>
                                            <ButtonGroup className="mt-2" size="sm">
                                                <Button
                                                    color="secondary"
                                                    onClick={this.toggleUserTooltip}
                                                    tag={Link}
                                                    to={reverse(ROUTES.USER_PROFILE, { userId: this.props.user.userId })}
                                                >
                                                    Profile
                                                </Button>
                                                <Button color="secondary" onClick={this.toggleUserTooltip} tag={Link} to={ROUTES.USER_SETTINGS}>
                                                    Settings
                                                </Button>
                                                <Button onClick={this.handleSignOut}>Sign out</Button>
                                            </ButtonGroup>
                                        </div>
                                    </Row>
                                </StyledAuthTooltip>
                            </div>
                        ) : (
                            <Button
                                style={{ backgroundColor: '#000000' }}
                                className="clearfix"
                                onClick={() => {
                                    console.log('SING IN ACTION ');
                                    console.log('location:', this.props.location);
                                    // push that to the redux state so that the user is rederected to its prev location;
                                    this.props.openAuthDialog({
                                        action: 'signin',
                                        redirectRoute: this.props.location.pathname
                                    });
                                }}
                            >
                                <Icon className="mr-1" icon={faUser} /> Sign in
                            </Button>
                        )}
                    </div>
                </Navbar>
                <SignInModal callback={this.loginCallback} />
            </StyledTopBar>
        );
    }
}

const mapStateToProps = state => ({
    dialogIsOpen: state.auth.dialogIsOpen,
    user: state.auth.user
});

const mapDispatchToProps = dispatch => ({
    openAuthDialog: payload => dispatch(openAuthDialog(payload)),
    toggleAuthDialog: () => dispatch(toggleAuthDialog()),
    closeAuthDialog: () => dispatch(closeAuthDialog()),

    firstLoad: () => dispatch(firstLoad()),
    resetAuth: () => dispatch(resetAuth())
});

Header.propTypes = {
    location: PropTypes.object.isRequired,
    openAuthDialog: PropTypes.func.isRequired,
    toggleAuthDialog: PropTypes.func.isRequired,
    closeAuthDialog: PropTypes.func.isRequired,
    firstLoad: PropTypes.func.isRequired,
    resetAuth: PropTypes.func.isRequired,

    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Header);
