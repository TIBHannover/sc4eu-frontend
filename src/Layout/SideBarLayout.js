import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import { SMALL_SCREEN_WIDTH } from '../styledComponents/styledComponents';
import SideBar from '../components/SideBar';
import { useLocation } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import { KeyboardDoubleArrowLeftOutlined, KeyboardDoubleArrowRightOutlined, Menu, MenuOpenOutlined } from '@mui/icons-material';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { useMediaQuery } from '@mui/material';
import { MobileDrawerButton, SwipeableDrawer, StyledSideBarLayoutDiv, StyledAppContent } from '../styledComponents/styledComponents';

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
            {isMobile && <MobileDrawerButton onClick={() => setOpen(!open)}>{open ? <MenuOpenOutlined /> : <Menu />}</MobileDrawerButton>}
            <SwipeableDrawer
                variant={isMobile ? 'temporary' : 'permanent'}
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                swipeAreaWidth={0}
                activepage={location.pathname}
            >
                <Scrollbars style={{ overflowX: 'hidden' }}>
                    <StyledSideBarLayoutDiv open={open}>
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
                    </StyledSideBarLayoutDiv>
                    <Divider />
                    <List style={{ marginTop: '-20px' }}>
                        <SideBar isOpen={open} onNavigate={isMobile ? () => setOpen(false) : () => {}} />
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

