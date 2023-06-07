import * as React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import KeyboardDoubleArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowLeftOutlined';
import KeyboardDoubleArrowRightOutlinedIcon from '@mui/icons-material/KeyboardDoubleArrowRightOutlined';
import SideBar from '../components/SideBar';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { styled } from '@mui/material/styles';
import { MAX_WIDTH } from '../styledComponents/styledComponents';
import { Button } from 'reactstrap';
import { colorStyled } from '../styledComponents/styledColor';
import { useLocation } from 'react-router-dom';

export default function SideBarLayout() {
    const [open, setOpen] = React.useState(false);
    const location = useLocation();

    const handleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div style={{ display: 'flex' }}>
            <StyledButtonMobileView color="none" title="Open Menu" onMouseOver={handleDrawer}>
                <Icon icon={faBars} />
            </StyledButtonMobileView>
            <Drawer variant="permanent" open={open} currentpage={location.pathname}>
                <StyledDiv open={open}>
                    <IconButton onClick={handleDrawer} style={{ padding: '10px 10px 10px 10px' }}>
                        {open ? (
                            <div style={{ display: 'flex', alignItems: 'center', marginLeft: '15px' }}>
                                <KeyboardDoubleArrowLeftOutlinedIcon />
                                <span style={{ fontSize: '15px', marginLeft: '5px' }}>Collapse Sidebar</span>
                            </div>
                        ) : (
                            <KeyboardDoubleArrowRightOutlinedIcon />
                        )}
                    </IconButton>
                </StyledDiv>
                <Divider />
                <List style={{ marginTop: '-20px' }}>
                    <SideBar isOpen={open} />
                </List>
            </Drawer>
        </div>
    );
}

const StyledButtonMobileView = styled(Button)`
    display: none;

    @media (max-width: ${MAX_WIDTH}) {
        padding: 8px 8px 8px 8px;
        margin: 10px 10px 10px 10px;
        display: flex;
        margin-top: 5px;
        :hover {
            transform: scale(1.3);
        }
    }
`;

const StyledDiv = styled('div')(({ open }) => ({
    display: 'flex',
    justifyContent: open ? 'flex-start' : 'center',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        display: 'none'
    }
}));

const Drawer = styled(MuiDrawer)(({ open, currentpage }) => ({
    '& .MuiDrawer-paper': {
        width: open ? '220px' : '80px',
        height: currentpage === '/' ? 'calc(100% - 155px)' : 'calc(100% - 100px)',
        top: 100,
        bot: 80,
        overflow: 'hidden',
        transition: '0.6s',
        whiteSpace: 'nowrap',
        backgroundColor: `${colorStyled.PRIMARY.lighter}`,

        [`@media (max-width: ${MAX_WIDTH})`]: {
            width: open ? '220px' : '0px',
            height: 'calc(100% - 130px)',
            top: 50,
            bot: 80
        }
    }
}));
