import React from 'react';
import Drawer from 'react-modern-drawer';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import 'react-modern-drawer/dist/index.css';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import SideBar from '../components/SideBar';
import { MAX_WIDTH } from '../styledComponents/styledComponents';

const StyledButton = styled(Button)`
    height: 25;
    width: 20;
    margin-top: 5px;
    :hover {
        transform: scale(1.3);
    }

    @media (max-width: ${MAX_WIDTH}) {
        display: none;
    }
`;

const StyledIcon = styled(Icon)`
    font-size: 30px;
    @media (max-width: ${MAX_WIDTH}) {
        font-size: 20px;
    }
`;

const ButtonForMobile = styled(Button)`
    display: none;

    @media (max-width: ${MAX_WIDTH}) {
        display: inline-block;
        height: 15;
        width: 10;
        box-shadow: none !important;
    }
`;

const SideBarLayout = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggleDrawer = () => {
        setIsOpen(prevState => !prevState);
    };

    return (
        <>
            <ButtonForMobile color="none" title="Open Menu" onClick={toggleDrawer}>
                <StyledIcon icon={faBars} />
            </ButtonForMobile>
            <StyledButton color="none" title="Open Menu" onMouseOver={toggleDrawer}>
                <StyledIcon icon={faBars} />
            </StyledButton>
            <Drawer open={isOpen} onClose={toggleDrawer} direction="left" style={{ marginTop: '50px', width: '250px', height: 'auto' }}>
                <div onMouseLeave={toggleDrawer}>
                    <SideBar />
                </div>
            </Drawer>
        </>
    );
};

export default SideBarLayout;
