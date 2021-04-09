import React, { Component } from 'react';
import ROUTES from 'constants/routes';

import { Cookies } from 'react-cookie';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Logo from 'components/Logo';

import { openAuthDialog } from '../redux/actions/auth';
import { firstLoad } from '../redux/actions/auth';

import { Button, Navbar } from 'reactstrap';
import SignInModal from '../components/Signin/SignInModal';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHomePageStyle: this.props.location.pathname === ROUTES.HOME
        };

        this.userPopup = React.createRef();
        this.logoutTimeoutId = null; // timeout for auto-logout
    }

    componentDidMount() {
        // headers component mounts, so lets try to see if we have a user;
        console.log('USER: ', this.props.user);

        if (this.props.user === 0) {
            // make a call to redux to look into the cookie jar
            this.props.firstLoad();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.location.pathname !== prevProps.location.pathname) {
            this.setState({
                isHomePageStyle: this.props.location.pathname === ROUTES.HOME
            });
        }
        if (this.state.redirectLogout) {
            this.setState({
                redirectLogout: false
            });
        }
    }

    componentWillUnmount() {
        if (this.logoutTimeoutId) {
            clearTimeout(this.logoutTimeoutId); // clear timeout
            this.logoutTimeoutId = null;
        }
    }

    preventDraggingOfItem = event => {
        // event.stopPropagation();
        event.preventDefault();
        return false;
    };

    render() {
        // this shall be a nav bar in the end
        return (
            <StyledTopBar>
                <Navbar className="navBar" expand="md" fixed="top" id="main-navbar" style={{ borderBottom: '1px solid black' }}>
                    <StyledLink to={ROUTES.HOME} className="mr-4 p-0 noSelect" onDragStart={this.preventDraggingOfItem}>
                        <Logo />
                    </StyledLink>

                    <StyledLink to={ROUTES.ONTOLOGY} className="mr-4 p-0 noSelect" onDragStart={this.preventDraggingOfItem}>
                        Ontologies
                    </StyledLink>
                    {/*<StyledLink to={ROUTES.PAGEB} className="mr-4 p-0 noSelect" onDragStart={this.preventDraggingOfItem}>*/}
                    {/*    Page B*/}
                    {/*</StyledLink>*/}

                    <div style={{ display: 'flex', float: 'right', marginTop: '-8px' }}>
                        <Button
                            color="link"
                            className="clearfix"
                            onClick={() => {
                                console.log('SING IN ACTION ');
                                console.log('location:', this.props.location);
                                // push that to the redux state so that the user is rederected to its prev location;
                                this.props.openAuthDialog({ action: 'signin', redirectRoute: this.props.location.pathname });
                            }}
                        >
                            <Icon className="mr-1" icon={faUser} /> Sign in
                        </Button>
                    </div>
                </Navbar>
                <SignInModal />
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
    firstLoad: () => dispatch(firstLoad())
});

Header.propTypes = {
    location: PropTypes.object.isRequired,
    openAuthDialog: PropTypes.func.isRequired,
    firstLoad: PropTypes.func.isRequired,
    user: PropTypes.oneOfType([PropTypes.object, PropTypes.number])
};

export default compose(connect(mapStateToProps, mapDispatchToProps), withRouter)(Header);

const StyledTopBar = styled.div`
    margin-bottom: 0;
    width:100%
    height:40px;
    color:red;
    position:fixed;
    // padding-top: 5px;

    // For the background
    background: #5f6474;
`;

const StyledLink = styled(Link)`
    padding: 10px;

    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;
