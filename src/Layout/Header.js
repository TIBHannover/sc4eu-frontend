import React, { Component } from 'react';
import ROUTES from '../constants/routes';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, Redirect, withRouter } from 'react-router-dom';
import { reverse } from 'named-urls';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { closeAuthDialog, firstLoad, openAuthDialog, resetAuth, toggleAuthDialog } from '../redux/actions/auth';
import greetingTime from 'greeting-time';
import SignInModal from '../components/Signin/SignInModal';
import { StyledAuthTooltip, StyledGravatar } from '../styledComponents/styledComponents';
import '../assets/scss/DefaultLayout.scss';
import { SettingsOutlined, LogoutOutlined, AccountCircleOutlined, DashboardCustomizeOutlined } from '@mui/icons-material';
import { NotificationToggle } from '../components/ReusableComponents/NotificationToggle';
import { NotificationManager } from '../utils/NotificationManager';
import { ThemeToggle } from 'components/ReusableComponents/ThemeToggle';
import {
    StyledHeaderRootDiv,
    StyledHeaderDiv,
    StyledRightSideDiv,
    StyledHeaderReactStrapButton,
    ButtonIcon,
    ButtonText
} from '../styledComponents/styledComponents';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHomePageStyle: this.props.location.pathname === ROUTES.HOME,
            userTooltipOpen: false,
            redirectOnAuthAction: false,
            showNotificationPrompt: false
        };

        this.userPopup = React.createRef();
        this.logoutTimeoutId = null; // timeout for auto-logout
    }

    componentDidMount() {
        // headers component mounts, so lets try to see if we have a user;
        //console.log('USER: ', this.props.user);
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
        this.setState(prevState => ({
            userTooltipOpen: !prevState.userTooltipOpen
        }));
    };

    showDashboard = () => {
        if (
            this.props.user.role.toLowerCase() === 'System ADMIN'.toLowerCase() ||
            this.props.user.role.toLowerCase() === 'Project Admin'.toLowerCase()
        ) {
            return (
                <StyledHeaderReactStrapButton onClick={this.toggleUserTooltip} tag={Link} to={ROUTES.ADMIN_DASHBOARD}>
                    <ButtonIcon>
                        <DashboardCustomizeOutlined />
                    </ButtonIcon>
                    <ButtonText>Dashboard</ButtonText>
                </StyledHeaderReactStrapButton>
            );
        }
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
        window.location.reload();
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

        return (
            <StyledHeaderRootDiv>
                {this.props.user?.displayName && <NotificationManager user={this.props.user.displayName} />}
                <StyledHeaderDiv>
                    <StyledRightSideDiv>
                        <ThemeToggle />
                        {this.props.user && this.props.user.displayName && this.props.user.gravatarId ? (
                            <>
                                <NotificationToggle user={this.props.user.displayName} />
                                <StyledGravatar className="rounded-circle" md5={this.props.user.gravatarId} size={35} id="TooltipExample" />
                                <StyledAuthTooltip
                                    fade={false}
                                    trigger="click"
                                    innerClassName="clearfix"
                                    placement="bottom-end"
                                    isOpen={this.state.userTooltipOpen}
                                    target="TooltipExample"
                                    toggle={this.toggleUserTooltip}
                                    innerRef={this.userPopup}
                                >
                                    <div>
                                        <Link
                                            onClick={this.toggleUserTooltip}
                                            to={reverse(ROUTES.USER_PROFILE, { userId: this.props.user.userId })}
                                            className="user-profile-link"
                                        >
                                            <StyledGravatar
                                                className="rounded-circle"
                                                style={{ border: '3px solid #fff' }}
                                                md5={this.props.user.gravatarId}
                                                size={40}
                                                id="TooltipExample"
                                            />
                                        </Link>
                                    </div>
                                    <span style={{ fontSize: '14px', color: '#000000' }}>
                                        {greeting} {this.props.user.displayName}
                                    </span>
                                    <div className="user-details">
                                        {this.showDashboard()}
                                        <StyledHeaderReactStrapButton
                                            onClick={this.toggleUserTooltip}
                                            tag={Link}
                                            to={reverse(ROUTES.USER_PROFILE, { userId: this.props.user.userId })}
                                        >
                                            <ButtonIcon>
                                                <AccountCircleOutlined />
                                            </ButtonIcon>
                                            <ButtonText>Profile</ButtonText>
                                        </StyledHeaderReactStrapButton>

                                        <StyledHeaderReactStrapButton onClick={this.toggleUserTooltip} tag={Link} to={ROUTES.USER_SETTINGS}>
                                            <ButtonIcon>
                                                <SettingsOutlined />
                                            </ButtonIcon>
                                            <ButtonText>Settings</ButtonText>
                                        </StyledHeaderReactStrapButton>

                                        <StyledHeaderReactStrapButton onClick={this.handleSignOut}>
                                            <ButtonIcon>
                                                <LogoutOutlined />
                                            </ButtonIcon>
                                            <ButtonText>Sign out</ButtonText>
                                        </StyledHeaderReactStrapButton>
                                    </div>
                                </StyledAuthTooltip>
                            </>
                        ) : (
                            <StyledHeaderReactStrapButton
                                className="clearfix"
                                onClick={() => {
                                    // push that to the redux state so that the user is rederected to its prev location;
                                    this.props.openAuthDialog({
                                        action: 'signin',
                                        redirectRoute: this.props.location.pathname
                                    });
                                }}
                            >
                                <Icon className="mr-1" icon={faUser} /> Login
                            </StyledHeaderReactStrapButton>
                        )}
                    </StyledRightSideDiv>
                    <SignInModal callback={this.loginCallback} />
                </StyledHeaderDiv>
            </StyledHeaderRootDiv>
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
