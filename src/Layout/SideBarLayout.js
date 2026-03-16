import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { MAX_WIDTH } from '../styledComponents/styledComponents';
import SideBar from '../components/SideBar';
import { colorStyled } from '../styledComponents/styledColor';
import { useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { CloseOutlined, KeyboardDoubleArrowLeftOutlined, KeyboardDoubleArrowRightOutlined, Menu } from '@mui/icons-material';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useMediaQuery } from '@mui/material';

const StyledButtonMobileView = styled('div')(() => ({
    display: 'none',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        display: 'flex',
        height: '40px',
        position: 'fixed',
        width: '40px',
        left: 0,
        top: 5,
        zIndex: 999
    }
}));

const createMixin = activePage => ({
    height: activePage === '/' ? 'calc(100% - 55px)' : 'calc(100% - 0px)',
    top: 0,
    overflow: 'hidden',
    transition: '0.6s',
    backgroundColor: `${colorStyled.PRIMARY.lighter}`,
    [`@media (max-width: ${MAX_WIDTH})`]: {
        height: activePage === '/' ? 'calc(100% - 55px)' : 'calc(100% - 0px)',
        top: 50
    }
});

const openedMixin = activepage => ({
    width: '230px',
    ...createMixin(activepage)
});

const closedMixin = activepage => ({
    width: '80px',
    ...createMixin(activepage),
    [`@media (max-width: ${MAX_WIDTH})`]: {
        width: '0px'
    }
});

const Drawer = styled(MuiDrawer)(({ open, activepage }) => ({
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open ? openedMixin(activepage) : closedMixin(activepage)),
    '& .MuiDrawer-paper': {
        ...(open ? openedMixin(activepage) : closedMixin(activepage))
    }
}));

const StyledDiv = styled('div')(({ open }) => ({
    display: 'flex',
    justifyContent: open ? 'flex-start' : 'center',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        display: 'none'
    }
}));

export default function SideBarLayout(props) {
    const [open, setOpen] = React.useState(true);
    const location = useLocation();
    const isMobile = useMediaQuery(`max-width(${MAX_WIDTH})`);

    const handleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <StyledButtonMobileView position="fixed">
                <IconButton size="large" onClick={handleDrawer}>
                    {open ? <CloseOutlined /> : <Menu />}
                </IconButton>
            </StyledButtonMobileView>
            <Drawer variant={isMobile ? 'temporary' : 'permanent'} open={open} onClose={() => setOpen(false)} activepage={location.pathname}>
                <Scrollbars style={{ overflowX: 'hidden' }}>
                    <StyledDiv open={open}>
                        <IconButton onClick={handleDrawer} style={{ padding: '10px 10px 10px 10px' }}>
                            {open ? (
                                <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
                                    <KeyboardDoubleArrowLeftOutlined />
                                    <span style={{ fontSize: '15px', marginLeft: '5px' }}>Collapse Sidebar</span>
                                </div>
                            ) : (
                                <KeyboardDoubleArrowRightOutlined />
                            )}
                        </IconButton>
                    </StyledDiv>
                    <Divider />
                    <List style={{ marginTop: '-20px' }}>
                        <SideBar isOpen={open} />
                    </List>
                </Scrollbars>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, margin: 0, padding: 0 }}>
                <StyledAppContent activePage={location.pathname}>{props.children}</StyledAppContent>
            </Box>
        </Box>
    );
}

SideBarLayout.propTypes = {
    children: PropTypes.array.isRequired
};

const StyledAppContent = styled('div')(({ activePage }) => ({
    height: activePage === '/' ? 'calc(100vh - 155px)' : 'calc(100vh - 100px)',
    overflow: 'hidden'
}));
