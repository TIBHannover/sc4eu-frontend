import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { SMALL_SCREEN_WIDTH } from '../styledComponents/styledComponents';
import SideBar from '../components/SideBar';
import { colorStyled } from '../styledComponents/styledColor';
import { useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { KeyboardDoubleArrowLeftOutlined, KeyboardDoubleArrowRightOutlined, Menu, MenuOpenOutlined } from '@mui/icons-material';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useMediaQuery } from '@mui/material';

const createMixin = activePage => ({
    height: activePage === '/' ? 'calc(100% - 55px)' : 'calc(100% - 0px)',
    top: 0,
    overflow: 'hidden',
    transition: '0.6s',
    backgroundColor: `${colorStyled.PRIMARY.lighter}`,
    [`@media (max-width: ${SMALL_SCREEN_WIDTH})`]: {
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
    [`@media (max-width: ${SMALL_SCREEN_WIDTH})`]: {
        width: '0px'
    }
});

const MobileDrawerButton = styled(IconButton)(({ theme }) => ({
    position: 'fixed',
    top: 8,
    left: 8,
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: colorStyled.PRIMARY.lighter,
    boxShadow: theme.shadows[2],
    borderRadius: '50%',

    '&:hover': {
        backgroundColor: colorStyled.PRIMARY.light,
    },
}));


const SwipeableDrawer = styled(MuiSwipeableDrawer)(({ open, activepage }) => ({
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

    [`@media (max-width: ${SMALL_SCREEN_WIDTH})`]: {
        display: 'none'
    }
}));

export default function SideBarLayout(props) {
    const isMobile = useMediaQuery(`(max-width: ${SMALL_SCREEN_WIDTH})`);
    const [open, setOpen] = React.useState(!isMobile);
    const location = useLocation();

    React.useEffect(() => {
        setOpen(!isMobile);
    }, [isMobile]);

    const handleDrawer = () => {
        setOpen(!open);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            {isMobile && (
                <MobileDrawerButton
                    onClick={() => setOpen(!open)}
                >
                    {open ? <MenuOpenOutlined /> : <Menu />}
                </MobileDrawerButton>
            )}
            <SwipeableDrawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                swipeAreaWidth={0}
                activepage={location.pathname}
            >
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
                        <SideBar isOpen={open} onNavigate={isMobile ? () => setOpen(false) : undefined}/>
                    </List>
                </Scrollbars>
            </SwipeableDrawer>
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
