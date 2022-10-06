import React from 'react';
import Drawer from 'react-modern-drawer';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import 'react-modern-drawer/dist/index.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import Logo from '../assets/images/logo.png';
import SideBar from '../components/SideBar';
import { Link } from 'react-router-dom';
import ROUTES from '../constants/routes';

const StyledButton = styled(Button)`
    :hover {
        transform: scale(1.3);
    }
`;

const StyledLink = styled(Link)`
    :hover {
        transform: scale(1.3);
    }
`;

const Image = styled.img``;

const SideBarLayout = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleDrawer = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <>
            <StyledButton color="none" size="lg" title="Open Menu" onClick={toggleDrawer}>
                <Icon icon={faBars} />
            </StyledButton>
            <StyledButton color="none" title="Home">
                <StyledLink activestyle={{ backgroundColor: '#90c8ac' }} to={ROUTES.HOME} size="lg">
                    <Image src={Logo} alt="Home Logo" style={{ height: 20, width: 20 }} />
                </StyledLink>
            </StyledButton>
            <Drawer open={isOpen} onClose={toggleDrawer} direction="left" style={{ marginTop: '50px', width: '250px', height: 'auto' }}>
                <SideBar />
            </Drawer>
        </>
    );
};

export default SideBarLayout;
