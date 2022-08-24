import React from 'react';

// import component 👇
import Drawer from 'react-modern-drawer';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

//import styles 👇
import 'react-modern-drawer/dist/index.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import Logo from '../assets/images/logo.png';
import SideBar from '../components/SideBar';

const StyledButton = styled(Button)`
    :hover {
        color: #90c8ac;
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
            <StyledButton color="none" size="lg" title="Open Manu" onClick={toggleDrawer}>
                <Icon icon={faBars} />
            </StyledButton>
            <StyledButton color="none" size="sm" title="Open Manu" onClick={toggleDrawer}>
                <Image src={Logo} alt="Home Logo" style={{ height: 20, width: 20 }} />
            </StyledButton>
            <Drawer open={isOpen} onClose={toggleDrawer} direction="left" style={{ marginTop: '50px', width: '250px', height: 'auto' }}>
                <SideBar />
            </Drawer>
        </>
    );
};

export default SideBarLayout;
