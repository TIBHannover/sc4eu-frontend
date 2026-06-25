import { styled } from '@mui/material';
import Gravatar from 'react-gravatar';
import { Badge, Chip, Button, Tooltip, Card, IconButton } from '@mui/material';
import MuiSwipeableDrawer from '@mui/material/SwipeableDrawer';
import { tooltipClasses } from '@mui/material/Tooltip';
import PropTypes from 'prop-types';
import { DropdownItem, DropdownMenu, Modal, Button as ReactStrapButton, Label, Tooltip as ReactstrapTooltip, Input, Container } from 'reactstrap';
import { fontStyled } from './styledFont';
import { NavLink, Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { keyframes } from 'styled-components';
import { CSSTransition } from 'react-transition-group';

export const StyledGravatar = styled(Gravatar)(({ theme }) => ({
    border: `3px solid ${theme.palette.divider}`,
    cursor: 'pointer'
}));

export const StyledAuthTooltip = styled(ReactstrapTooltip)(({ theme }) => ({
    '.tooltip': {
        opacity: '1 !important',
        marginTop: '65px',
        marginRight: '-5px',
        padding: 0,
        borderRadius: '20px',
        boxShadow: '0px 5px 10px 0px rgba(0, 0, 0, 0.5)',

        '.arrow': {
            display: 'none !important'
        }
    },
    '.tooltip-inner': {
        fontSize: '16px',
        backgroundColor: theme.palette.background.default,
        maxWidth: '410px',
        padding: '15px',
        borderRadius: '20px',

        '.tooltip-content': {
            marginBottom: '8px'
        },

        '.user-profile-link': {
            color: theme.palette.text.primary,
            textDecoration: 'none',

            '&:hover': {
                textDecoration: 'underline'
            }
        }
    }
}));

export const StyledBadge = styled(
    Badge,
    {}
)(({ customVariant, theme }) => ({
    '.MuiBadge-badge': {
        ...(customVariant === 'orange' && {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.text.primary
        }),
        ...(customVariant === 'blue' && {
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.text.primary
        })
    }
}));

StyledBadge.propTypes = {
    customVariant: PropTypes.oneOf(['orange', 'blue'])
};

export const StyledChip = styled(Chip)(({ customVariant, theme }) => ({
    '.MuiChip-root': {
        ...(customVariant === 'mention' && {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText
        }),
        ...(customVariant === 'agreement' && {
            backgroundColor: theme.palette.secondary.light,
            color: theme.palette.secondary.contrastText
        })
    }
}));

StyledChip.propTypes = {
    customVariant: PropTypes.oneOf(['mention', 'agreement'])
};

export const StyledTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'transparent',
        color: theme.palette.error.contrastText,
        fontSize: '1rem'
    }
}));

export const MAX_WIDTH = '769px';

export const SMALL_SCREEN_WIDTH = '480px';

export const LARGE_SCREEN_SIZE = '1200px';

export const MIN_WIDTH_FOR_MONITOR = '1750px';

export const CustomDropdownItem = styled(DropdownItem)(({ theme }) => ({
    '&&&': {
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight: 0,
        textAlign: 'center'
    }
}));

export const StyledTable = styled('table')(({ theme }) => ({
    borderCollapse: 'collapse',
    borderSpacing: 0,
    width: '100%',
    border: '1px solid #ddd',

    'th, td': {
        textAlign: 'left',
        padding: '16px',
        border: '1px solid #ddd'
    },

    'tr:nth-child(even)': {
        backgroundColor: theme.palette.background.default
    },

    'tr:hover': {
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary
    },

    th: {
        paddingTop: '12px',
        paddingBottom: '12px',
        textAlign: 'center',
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText
    }
}));

export const StyledButton = styled(Button)(({ theme }) => ({
    display: 'flex',
    justifyContent: 'space-around',
    right: '60px',
    minWidth: '150px',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    borderRadius: '4px',

    [`@media (max-width: 1300px)`]: {
        right: '50px',
        minWidth: '50px'
    },

    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText
    }
}));

export const StyledSpan = styled('span')(({ theme }) => ({
    display: 'block',

    [`@media (max-width: 1300px)`]: {
        display: 'none'
    }
}));

export const StyledRootDiv = styled('div')(({ theme }) => ({
    display: 'block'
}));

export const StyledModal = styled(Modal)(({ theme }) => ({
    display: 'block',
    maxWidth: '70%',
    width: '100%',
    marginLeft: '20%',
    marginRight: '10%',
    borderRadius: '15px',
    overflow: 'hidden',
    fontFamily: `${fontStyled.fontFamily}`
}));

export const StyledOntologyTooltip = styled(({ className, ...props }) => <Tooltip {...props} classes={{ popper: className }} />)(({ theme }) => ({
    '.MuiTooltip-tooltip': {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        fontSize: '14px',
        padding: '12px 16px',
        borderRadius: '8px',
        maxWidth: '300px',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.15)',
        margin: '8px'
    },
    '.MuiTooltip-arrow': {
        color: theme.palette.primary.main
    }
}));

export const StyledCard = styled(Card)(({ theme }) => ({
    '&&': {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        padding: '3px',
        borderRadius: '20px',
        transition: 'transform 0.2s',
        width: '300px',
        height: '300px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
        '&:hover': {
            transform: 'scale(1.05)',
            backgroundColor: `${theme.palette.primary.main}CC`
        },

        '.MuiTypography-root': {
            color: theme.palette.primary.contrastText
        },

        '.MuiIconButton-root': {
            color: theme.palette.primary.contrastText,
            '&:disabled': {
                color: `${theme.palette.primary.contrastText}4D`
            }
        }
    }
}));

export const StyledScrollbarDiv = styled('div')(({ theme }) => ({
    height: 'calc(100vh - 200px)' /* Adjust 200px based on your header + footer height */,
    width: '100%',
    borderTop: `0.01rem solid ${theme.palette.divider}`,
    borderBottom: `0.01rem solid ${theme.palette.divider}`,
    overflow: 'hidden'
}));

export const StyledContentDiv = styled('div')(({ theme }) => ({
    height: 'calc(100% - 10px)' /* Percentage height for different screen sizes */
}));

export const StyledButtonProjectAndOntologyUpload = styled(Button)(({ theme }) => ({
    float: 'right',
    margin: '10px 15px 15px 0px',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    marginLeft: '1%',
    fontSize: `${fontStyled.fontSize.NormalText}`,
    border: 'none',

    '&:hover': {
        backgroundColor: `${theme.palette.secondary.main}CC`,
        color: theme.palette.secondary.contrastText
    },

    '&:disabled': {
        backgroundColor: `${theme.palette.secondary.main}4D`,
        color: `${theme.palette.text.primary}4D`
    },

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: fontStyled.fontSize.LaptopAndDesktopViewNormalText
    }
}));

export const StyledInfoSpan = styled('span')(({ theme }) => ({
    fontSize: fontStyled.fontSize.NormalText,
    color: theme.palette.text.primary,

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: fontStyled.fontSize.LaptopAndDesktopViewNormalText
    }
}));

export const StyledDiv = styled('div')(({ theme }) => ({
    width: '700px',
    height: '350px',
    position: 'fixed',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: theme.palette.background.default,
    boxShadow: '0px 0px 18px 0px rgba(0, 0, 0, 0.75)',
    borderRadius: '8px',
    zIndex: '1000',
    fontFamily: fontStyled.fontFamily
}));

export const StyledImage = styled('img')(({ theme }) => ({
    height: '40px',
    width: '40px',
    margin: '12px 12px 0px 12px'
}));

export const StyledDropdownMenu = styled(DropdownMenu)(({ theme }) => ({
    padding: '0 !important',
    width: '100%',
    margin: '0 !important'
}));

export const StyledProjectCard = styled('div')(({ theme }) => ({
    margin: '5px',
    padding: '0 !important',

    '&:focus': {
        outline: 'none'
    },

    '&::-moz-focus-inner': {
        border: 0
    }
}));

export const StyledLabel = styled(Label)(({ theme }) => ({
    padding: '10px',
    fontSize: fontStyled.fontSize.NormalText,
    color: theme.palette.text.primary,
    '&:focus': {
        outline: 'none'
    },
    '&::-moz-focus-inner': {
        border: 0
    },

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: fontStyled.fontSize.LaptopAndDesktopViewNormalText
    }
}));

export const StyledCardHeader = styled('div')(({ theme }) => ({
    borderRadius: '10px 10px 0 0',
    border: `1px solid ${theme.palette.primary.main}`,
    padding: '2px',
    color: theme.palette.primary.contrastText,
    background: theme.palette.secondary.light,
    '&:focus': {
        outline: 'none'
    },
    '&::-moz-focus-inner': {
        border: 0
    }
}));

export const StyledCardBody = styled('div')(({ theme }) => ({
    padding: '5px',
    border: `1px solid ${theme.palette.primary.main}`,
    fontSize: fontStyled.fontSize.NormalText,
    backgroundColor: theme.palette.secondary.light,
    color: theme.palette.secondary.contrastText,
    borderTop: 'none',

    '&:focus': {
        outline: 'none'
    },

    '&::-moz-focus-inner': {
        border: 0
    },

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: fontStyled.fontSize.LaptopAndDesktopViewNormalText
    }
}));

export const StyledIcon = styled(FontAwesomeIcon)(({ theme }) => ({
    fontSize: fontStyled.fontSize.NormalText,
    float: 'right',
    marginTop: '7px',
    marginRight: '5px',
    cursor: 'pointer',

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: fontStyled.fontSize.LaptopAndDesktopViewNormalText
    }
}));

//ProjectView.js
export const StyledProjectsGrid = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    margin: '2px',
    flexWrap: 'wrap',
    gap: '20px',
    paddingBottom: '20px',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        gap: '10px',
        padding: '10px',
        justifyContent: 'center',
        width: '100%'
    }
}));

export const StyledProjectsViewRootDiv = styled('div')(({ theme }) => ({
    width: '100%',
    marginLeft: 'auto',
    backgroundColor: theme.palette.background.default,
    marginTop: '0.5%',
    height: 'calc(100vh - 100px)',
    marginRight: '2%',
    fontFamily: `${fontStyled.fontFamily}`,

    [`@media (max-width: ${MAX_WIDTH})`]: {
        marginRight: 0,
        marginLeft: 0,
        minHeight: 'calc(100vh - 80px)'
    }
}));

export const StyledSubHeadingDiv = styled('div')(({ theme }) => ({
    height: '100px',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        height: 'auto',
        padding: '10px',
        flexDirection: 'column',
        alignItems: 'flex-start'
    }
}));

//SideBar.js
export const StyledText = styled('span')(({ theme }) => ({
    marginLeft: '20px',
    whiteSpace: 'nowrap',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        marginLeft: '20px'
    }
}));

export const StyledLink = styled(NavLink)(({ theme }) => ({
    width: '100%',
    height: '40px',
    display: 'inline-block',
    borderRadius: '4px',
    padding: '7px 10px 7px 11px',
    background: 'transparent',
    color: theme.palette.text.primary,
    textDecoration: 'none !important',
    fontSize: '14px',
    transition: 'background-color 0.15s ease',

    '&:hover': {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.text.primary
    },

    [`@media (max-width: ${MAX_WIDTH})`]: {
        height: '30px',
        padding: '3px 10px 10px 5px'
    }
}));

export const StyledSideBarButton = styled('button')(({ theme }) => ({
    width: '100%',
    height: '40px',
    display: 'inline-block',
    padding: '7px 100px 7px 11px',
    background: 'transparent',
    color: theme.palette.text.primary,
    borderRadius: '4px',
    border: 'none',
    fontSize: '14px',
    transition: 'background-color 0.15s ease',

    '&:hover': {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.text.primary
    }
}));

const expandContentContainerAnimationRight = ({ expanded, width }) => {
    return keyframes`
        from {
            right: ${expanded ? -width : 0}px;
        }
        to {
            right: ${expanded ? 0 : -width}px;

        }
    `;
};

export const SelectionSideBar = styled('div')(({ theme }) => ({
    position: 'absolute',
    width: `${props => (props.expanded ? '350px' : '0')}`,
    height: 'calc(100% - 140px)',
    transition: 'width 0.3s ease',
    backgroundColor: theme.palette.background.default,
    border: `${props => (props.expanded ? '1px solid black' : 'none')}`,

    '&:focus': {
        outline: 'none'
    },

    '&::-moz-focus-inner': {
        border: 0
    },

    wordBreak: 'normal',
    whiteSpace: 'nowrap'
}));

export const StyledHeaderButton = styled(ReactStrapButton)(({ theme }) => ({
    position: 'absolute',
    left: `${props => (props.expanded ? '350px' : '0px')}`,
    transition: 'left 0.3s ease'
}));

export const SelectionRightSidebar = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.error.main,
    border: `1px solid ${theme.palette.divider}`,
    color: theme.palette.text.primary,
    width: '350px',
    height: 'calc(100% - 140px)',
    background: 'white',

    '&:focus': {
        outline: 'none'
    },

    '&::-moz-focus-inner': {
        border: 0
    },

    wordBreak: 'normal',
    whiteSpace: 'nowrap',

    borderBottom: '1px solid black',
    padding: '2px',
    position: 'relative',
    animationName: `${expandContentContainerAnimationRight}`,
    animationDuration: '400ms',
    right: `${props => (props.expanded ? 0 : -props.width)}px`
}));

//metadata.js
export const ModalFooter = styled('div')(({ theme }) => ({
    height: '60px',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '10px',
    borderTop: '1px solid #ccc'
}));

export const CloseButton = styled(Button)(({ theme }) => ({
    float: 'right',
    fontWeight: 'bold'
}));

export const HeadingSpan = styled('span')(({ theme }) => ({
    fontSize: '16px'
}));

export const StyledMetaDataIcon = styled(FontAwesomeIcon)(({ theme }) => ({
    fontSize: `${fontStyled.fontSize.NormalText}`,
    marginRight: '5px',

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: `${fontStyled.fontSize.LaptopAndDesktopViewNormalText}`
    }
}));

export const StyledMetaDataButton = styled(ReactStrapButton)(({ theme }) => ({
    marginTop: '5px',
    height: '40px',
    width: '100%',
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: `${fontStyled.fontSize.NormalText}`,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: `${fontStyled.fontSize.LaptopAndDesktopViewNormalText}`
    }
}));

export const ShowComparisonButton = styled(Button)(({ theme }) => ({
    margin: '5px',
    fontSize: `${fontStyled.fontSize.NormalText}`,
    backgroundColor: theme.palette.secondary.main,

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: `${fontStyled.fontSize.LaptopAndDesktopViewNormalText}`
    }
}));

export const StyledCardWidgetVisSpan = styled('span')(({ theme }) => ({
    fontSize: fontStyled.fontSize.NormalText,

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: fontStyled.fontSize.LaptopAndDesktopViewNormalText
    }
}));

export const ControlButton = styled(ReactStrapButton)(({ theme }) => ({
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    borderRadius: '5px 5px',
    marginTop: '10px',
    marginRight: '10px',
    float: 'right',
    fontSize: `${fontStyled.fontSize.NormalText}`,

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: `${fontStyled.fontSize.LaptopAndDesktopViewNormalText}`
    },
    '&:focus': {
        outline: 'none'
    },
    '&::-moz-focus-inner': {
        border: 0
    }
}));

export const CopyButton = styled('button')(({ theme }) => ({
    padding: '5px 10px',
    fontSize: '14px',
    cursor: 'pointer'
}));

export const ControlLink = styled(Link)(({ theme }) => ({
    float: 'left',
    marginTop: '15px',
    marginLeft: '10px',
    fontSize: `${fontStyled.fontSize.NormalText}`,

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: `${fontStyled.fontSize.LaptopAndDesktopViewNormalText}`
    },

    '&:focus': {
        outline: 'none'
    },
    '&::-moz-focus-inner': {
        border: 0
    }
}));

export const StyledOntologyContentViewerDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    height: 'calc(100% - 55px)',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        flexDirection: 'column',
        height: 'auto'
    }
}));

export const Column = styled('div')(({ theme }) => ({
    width: '50%',
    overflowY: 'auto',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        width: '100%'
    }
}));

export const HeaderBar = styled('div')(({ theme }) => ({
    padding: '8px 12px',
    minHeight: '56px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        flexWrap: 'wrap',
        paddingTop: '12px',
        paddingBottom: '12px'
    }
}));

export const StyledOntologyViewRootDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    height: '100%',
    fontFamily: `${fontStyled.fontFamily}`
}));

export const CenterDisplayDiv = styled('div')(({ theme }) => ({
    width: '95%',
    transition: 'width 0.5s ease-out',
    backgroundColor: theme.palette.background.default,
    marginLeft: 'auto',
    marginTop: '0.5%',
    height: '95%',
    marginRight: '2%',
    fontFamily: `${fontStyled.fontFamily}`,
    borderRadius: '10px',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        width: '90%',
        marginRight: '5%'
    },

    [`@media (max-width: ${MAX_WIDTH})`]: {
        width: '100%',
        height: 'auto'
    }
}));

export const StyledHeadingDiv = styled('div')(({ theme }) => ({
    borderRadius: '10px',
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center'
}));

export const OpenCloseButton = styled(ReactStrapButton)(({ theme }) => ({
    display: 'flex',
    width: '28px',
    borderRadius: '30px',
    padding: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    position: 'relative',
    top: '-15px',
    left: '-20px'
}));

export const StyledRightSideBarScrollbarDiv = styled('div')(({ theme }) => ({
    height: 'calc(100% - 65px)',
    marginTop: '-15px'
}));

export const StyledRightSideProjectBarRootDiv = styled('div')(({ theme }) => ({
    width: '25%',
    marginTop: '0.5%',
    height: '95%',
    backgroundColor: theme.palette.background.default,
    fontFamily: `${fontStyled.fontFamily}`,

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        width: '22%'
    }
}));

export const StyledInfoDiv = styled('div')(({ theme }) => ({
    fontSize: `${fontStyled.fontSize.NormalText}`,
    float: 'left',
    textAlign: 'center',
    height: '75px',

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: `${fontStyled.fontSize.LaptopAndDesktopViewNormalText}`
    }
}));

export const AutoModal = styled(Modal)(({ theme }) => ({
    fontFamily: fontStyled.fontFamily,
    '.modal-content': {
        maxWidth: '80%',
        maxHeight: 'auto',
        margin: 'auto',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    },

    '.modal-header': {
        border: '0 !important',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    },
    '.modal-body': {
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary
    },
    '.modal-footer': {
        border: '0 !important',
        backgroundColor: theme.palette.background.paper
    }
}));

export const StyledAlertPopUpButton = styled(ReactStrapButton)(({ theme }) => ({
    height: '40px',
    width: '70px',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText
}));

export const StyledController = styled('div')(({ theme }) => ({
    padding: '5px',
    borderBottom: 'none',
    color: theme.palette.text.primary,
    '&:focus': {
        outline: 'none'
    },
    '&::-moz-focus-inner': {
        border: 0
    }
}));

export const LabelDiv = styled('div')(({ theme }) => ({
    overflow: 'hidden',
    maxWidth: '260px',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    borderRadius: '10px 10px 0 0',
    borderBottom: 'none',
    padding: '5px',
    textAlign: 'left',
    marginLeft: 'auto',
    marginRight: 'auto',
    height: '30px',
    color: `${props => (props.typedBasedFontColor ? props.typedBasedFontColor : theme.palette.secondary.contrastText)}`,
    backgroundColor: `${props =>
        props.isHighlighted === true
            ? `${theme.palette.secondary.main}`
            : props.typedBasedColor
            ? props.typedBasedColor
            : theme.palette.secondary.light}`,
    fontSize: fontStyled.fontSize.NormalText,

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: fontStyled.fontSize.LaptopAndDesktopViewNormalText
    }
}));

export const ControlItemControllerButton = styled('div')(({ theme }) => ({
    padding: '5px',
    borderRadius: `${props => (props.type === 'control' ? '0' : '10px 10px 0 0')}`,
    borderBottom: 'none',
    textAlign: 'center',
    marginRight: `${props => (props.type === 'control' ? '3px' : '-1px')}`,
    backgroundColor: `${props => (props?.active === true ? theme.palette.secondary.dark : theme.palette.secondary.main)}`,
    color: theme.palette.secondary.contrastText,
    width: '30px',
    height: '30px',
    '&:focus': {
        outline: 'none'
    },

    '&::-moz-focus-inner': {
        border: 0
    },

    '&:hover': {
        backgroundColor: theme.palette.background.default,
        cursor: 'pointer'
    }
}));

//RelationBody.js
const expandContentContainerAnimation = ({ isExpanded, maxHeight, initialRendering, animationCompleted }) => {
    //  TODO: add the animationCompleted Flag

    if (initialRendering) {
        return;
    }
    if (isExpanded) {
        return keyframes`
              from {
                height: ${0}px;
                padding: ${0}px;
              }
              to {
                height: ${maxHeight}px;
                padding: 5px;
              }
        `;
    }
    if (!isExpanded) {
        return keyframes`
              from {
                height: ${maxHeight}px;
                padding: 5px;            
              }
              to {
                height: ${0}px;
                padding: ${0}px;
               
              }
        `;
    }
};

export const StyledRelationBody = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.error.main,
    color: theme.palette.text.primary,
    width: '100%',
    background: 'white',
    '&:focus': {
        outline: 'none'
    },

    '&::-moz-focus-inner': {
        border: 0
    },
    wordBreak: 'normal',
    whiteSpace: 'nowrap',
    animationName: `${expandContentContainerAnimation}`,
    padding: `${props => (props.isExpanded ? 5 : 0)}px`,
    animationDuration: `${props => (props.initialRendering ? 0 : 400)}ms`,
    position: 'relative'
}));

export const StyledBodyInput = styled(Input)(({ theme }) => ({
    background: theme.palette.background.default,
    color: theme.palette.text.primary,
    outline: 0,
    wordBreak: 'normal',
    whiteSpace: 'pre',

    borderRadius: 0,
    padding: 0,
    display: 'block',

    '&:focus': {
        background: theme.palette.background.paper,
        outline: 0,
        padding: '0 4px',
        borderRadius: 0,
        display: 'block'
    }
}));
//

//DefaultLayout.js
export const StyledBody = styled('div')(({ theme }) => ({
    minHeight: 'calc(100vh - 0px)',
    height: '100%',
    backgroundColor: theme.palette.background.default,
    fontFamily: theme.typography.fontFamily
}));
//

//Footer.js
export const StyledBodyDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    left: 0,
    bottom: 0,
    right: 0,
    paddingLeft: '3%',
    paddingRight: '3%',
    height: '55px',
    backgroundColor: `${theme.palette.background.default}`,
    color: `${theme.palette.text.primary}`,
    overflow: 'hidden',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        paddingLeft: '1%',
        paddingRight: '1%'
    },

    [`@media screen and (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        paddingLeft: '3%',
        paddingRight: '3%'
    }
}));

export const StyledLeftDiv = styled('div')(({ theme }) => ({
    display: 'flex'
}));

export const StyledNoteText = styled('div')(({ theme }) => ({
    fontSize: `${fontStyled.fontSize.infoText}`,
    color: theme.palette.text.primary,
    fontFamily: `${fontStyled.fontFamily}`,
    marginTop: '2%',
    marginLeft: '3%',
    whiteSpace: 'nowrap',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        display: 'none'
    }
}));

export const LogoOntologyPortal = styled('img')(({ theme }) => ({
    height: '40px',
    width: '70px',
    marginTop: '2%',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        display: 'none'
    },

    [`@media screen and (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        height: '40px',
        width: '75px'
    }
}));

export const Image = styled('img')(({ theme }) => ({
    height: '25px',
    marginTop: '3%',
    paddingLeft: '5px',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        display: 'none'
    },

    [`@media screen and (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        height: '30px'
    }
}));

export const StyledRightDiv = styled('div')(({ theme }) => ({
    display: 'flex',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        transform: 'translate(-30%, 15%)'
    }
}));

export const StyledFooterImage = styled('img')(({ theme }) => ({
    height: '40px',
    width: '110px',
    marginTop: '3%',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        height: '40px',
        width: '100px',
        marginTop: '1px'
    },

    [`@media screen and (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        height: '40px',
        width: '130px'
    }
}));

export const StyledFooterText = styled('p')(({ theme }) => ({
    fontSize: `${fontStyled.fontSize.infoText}`,
    fontFamily: `${fontStyled.fontFamily}`,
    color: theme.palette.text.primary,
    marginTop: '1.5%',
    marginLeft: '3%',
    whiteSpace: 'nowrap',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        marginLeft: '1%',
        fontSize: '10px',
        paddingLeft: '0.5%'
    }
}));

export const StyledLogo = styled('img')(({ theme }) => ({
    height: '40px',
    width: '40px',
    marginTop: '2%',
    marginLeft: '3%',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        display: 'none'
    },

    [`@media screen and (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        height: '40px',
        width: '40px'
    }
}));
//

//Header.js
export const StyledHeaderRootDiv = styled('div')(({ theme }) => ({
    height: '50px',
    overflow: 'auto',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        height: '50px',
        overflow: 'hidden'
    }
}));

export const StyledHeaderDiv = styled('div')(({ theme }) => ({
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [`@media (max-width: ${MAX_WIDTH})`]: {
        height: '50px',
        overflow: 'hidden',
        backgroundImage: 'none'
    }
}));

export const StyledRightSideDiv = styled('div')(({ theme }) => ({
    marginLeft: 'auto',
    marginRight: '1%',
    display: 'flex',
    [`@media (max-width: ${MAX_WIDTH})`]: {
        position: 'absolute',
        right: '10px',
        top: '10px',
        marginRight: 0,
        zIndex: 1000
    }
}));

export const StyledHeaderReactStrapButton = styled(ReactStrapButton)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: '14px',
    borderRadius: '14px',
    border: 'none !important',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    margin: '10px 0',
    marginBottom: '8px',
    textAlign: 'center',
    transition: 'background-color 0.3s, color 0.3s',

    [`&:hover`]: {
        backgroundColor: `${theme.palette.secondary.main}CC`,
        color: theme.palette.secondary.contrastText,
        border: 'none !important'
    }
}));

export const ButtonIcon = styled('span')(({ theme }) => ({
    marginRight: '20px'
}));

export const ButtonText = styled('span')(({ theme }) => ({
    textAlign: 'left'
}));
//

//SideBarLayout.js
export const StyledAppContent = styled('div')(({ theme, activePage }) => ({
    height: activePage === '/' ? 'calc(100vh - 155px)' : 'calc(100vh - 100px)',
    overflow: 'auto'
}));

const createMixin = (theme, activePage) => ({
    height: activePage === '/' ? 'calc(100% - 55px)' : 'calc(100% - 0px)',
    top: 0,
    overflow: 'hidden',
    transition: '0.6s',
    backgroundColor: theme.palette.background.default,
    [`@media (max-width: ${SMALL_SCREEN_WIDTH})`]: {
        height: activePage === '/' ? 'calc(100% - 55px)' : 'calc(100% - 0px)',
        top: 50
    }
});

const openedMixin = (theme, activePage) => ({
    width: '230px',
    ...createMixin(theme, activePage)
});

const closedMixin = (theme, activePage) => ({
    width: '80px',
    ...createMixin(theme, activePage),
    [`@media (max-width: ${SMALL_SCREEN_WIDTH})`]: {
        width: '0px'
    }
});

export const MobileDrawerButton = styled(IconButton)(({ theme }) => ({
    position: 'fixed',
    top: 8,
    left: 8,
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.default,
    boxShadow: theme.shadows[2],
    borderRadius: '50%',

    '&:hover': {
        backgroundColor: theme.palette.background.paper
    }
}));

export const SwipeableDrawer = styled(MuiSwipeableDrawer)(({ open, theme, activepage }) => ({
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open ? openedMixin(theme, activepage) : closedMixin(theme, activepage)),
    '.MuiDrawer-paper': {
        ...(open ? openedMixin(theme, activepage) : closedMixin(theme, activepage))
    }
}));

export const StyledSideBarLayoutDiv = styled('div')(({ open }) => ({
    display: 'flex',
    justifyContent: open ? 'flex-start' : 'center',

    [`@media (max-width: ${SMALL_SCREEN_WIDTH})`]: {
        display: 'none'
    }
}));
//

//DataProtection.js
export const StyledDataProtectionDiv = styled('div')(({ theme }) => ({
    width: '100%',
    height: '100%',
    overflowY: 'auto',
    alignItems: 'center',
    paddingLeft: '20%',
    paddingRight: '20%',
    fontFamily: `${fontStyled.fontFamily}`,

    [`@media (max-width: ${MAX_WIDTH})`]: {
        paddingLeft: '10%',
        paddingRight: '10%'
    }
}));

export const StyledDataProtectionText = styled('p')(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: 'justify',
    fontSize: `${fontStyled.fontSize.LaptopAndDesktopViewNormalText}`,

    [`@media (max-width: ${MAX_WIDTH})`]: {
        fontSize: `${fontStyled.fontSize.MobileViewNormalText}`
    }
}));
//

//Documentations.js
export const StyledDocumentationsDiv = styled('div')(({ theme }) => ({
    paddingLeft: '20%',
    paddingRight: '20%',
    fontFamily: `${fontStyled.fontFamily}`,

    [`@media (max-width: ${MAX_WIDTH})`]: {
        paddingLeft: '10%',
        paddingRight: '10%'
    }
}));
//

//EmailVerify.js
export const StyledEmailVerifyDiv = styled('div')(({ theme }) => ({
    width: '100vw',
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
}));
//

//Home.js
export const StyledHomeRootDiv = styled('div')(({ theme }) => ({
    width: '100%',
    height: '100%',
    overflow: 'auto'
}));

export const StyledHomeHeadingDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'center',
    height: '10%',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        display: 'none'
    }
}));

export const StyledHeading = styled('div')(({ theme }) => ({
    fontSize: `${fontStyled.fontSize.subHeading}`,
    marginTop: '4%',
    color: theme.palette.text.primary,
    fontWeight: 600,
    fontFamily: 'sans-serif',
    textAlignLast: 'center',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        fontSize: '12px',
        marginTop: '3%',
        textAlign: 'center',
        color: theme.palette.text.primary,
        fontWeight: 600,
        fontFamily: 'sans-serif',
        marginRight: '25px'
    },

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: `${fontStyled.fontSize.mainHeading}`
    }
}));

export const StyledHomeLogo = styled('img')(({ theme }) => ({
    height: '70px',
    width: '70px',
    marginRight: '10px',
    float: 'left',
    marginTop: '3%',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        height: '25px',
        width: '45px'
    },
    overflow: 'auto'
}));

export const StyledHomeBody = styled('div')(({ theme }) => ({
    height: 'auto',
    margin: 'auto',
    textAlign: 'center',
    paddingTop: '50px',
    marginLeft: '10%',
    marginRight: '10%',
    display: 'flex',
    flexDirection: 'column',
    color: theme.palette.text.primary,

    [`@media (max-width: ${MAX_WIDTH})`]: {
        height: 'auto',
        flexDirection: 'column',
        textAlign: 'center',
        marginLeft: '2%',
        paddingTop: '5%',
        marginRight: '2%',
        display: 'flex',
        marginBottom: '0px',
        overflow: 'auto'
    },

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        marginLeft: '15%',
        marginRight: '15%'
    }
}));

export const StyledHomeBodyDiv = styled('div')(({ theme }) => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: '1%',
    paddingRight: '3%',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: '2.5%',
        paddingRight: '2.5%'
    }
}));

export const StyledBodyLogo = styled('img')(({ theme }) => ({
    width: '200px',
    height: '170px',
    alignSelf: 'center',
    marginTop: '-20px',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        width: '110px',
        height: '90px',
        alignSelf: 'center',
        marginBottom: '10px'
    },

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        width: '240px',
        height: '210px'
    }
}));

export const StyledBodyLinkBiger = styled(Link)(({ theme }) => ({
    fontSize: `${fontStyled.fontSize.mainHeading}`,
    fontWeight: 600,
    color: theme.palette.text.primary,
    paddingBottom: '3%',
    fontFamily: `${fontStyled.fontFamily}`,

    [`@media (max-width: ${MAX_WIDTH})`]: {
        fontSize: `${fontStyled.fontSize.MobileViewHeading}`
    },

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: `${fontStyled.fontSize.DesktopViewSubHeading}`
    }
}));

export const StyledBodyTextBigger = styled('div')(({ theme }) => ({
    fontSize: `calc(${fontStyled.fontSize.NormalText} * 1.3)`,
    fontFamily: `${fontStyled.fontFamily}`,
    lineHeight: 1.6,
    color: theme.palette.text.primary,
    textAlign: 'left',
    marginTop: '1rem',

    '&p': {
        marginBottom: '1rem',
        textAlign: 'justify'
    },

    '&ul': {
        marginTop: '0.5rem',
        listStyleType: 'disc'
    },

    '&li': {
        marginBottom: '0.5rem'
    },

    [`@media (max-width: ${MAX_WIDTH})`]: {
        fontSize: `calc(${fontStyled.fontSize.MobileViewNormalText} * 1.3)`
    },

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: `calc(${fontStyled.fontSize.DesktopViewNormalText} * 1.3)`
    }
}));

export const StyledDivPopUp = styled('div')(({ theme }) => ({
    display: 'block',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        display: 'none'
    }
}));

//

//Imprint.js
export const StyledImprintDiv = styled('div')(({ theme }) => ({
    paddingTop: '20px',
    paddingLeft: '20%',
    paddingRight: '20%',
    Fontfamily: `${fontStyled.fontFamily}`,

    [`@media (max-width: ${MAX_WIDTH})`]: {
        paddingLeft: '10%',
        paddingRight: '10%'
    }
}));

export const StyledImprintText = styled('p')(({ theme }) => ({
    color: theme.palette.text.secondary,
    textAlign: 'justify',
    fontSize: `${fontStyled.fontSize.LaptopAndDesktopViewNormalText}`,

    [`@media (max-width: ${MAX_WIDTH})`]: {
        Fontsize: `${fontStyled.fontSize.MobileViewNormalText}`
    }
}));

export const StyledLinkH5 = styled('h5')(({ theme }) => ({
    color: theme.palette.text.primary
}));
//

//OntolofyIndexing.js
export const StyledContainer = styled(Container)(({ theme }) => ({
    height: '95%',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    padding: '0.5% 2%',
    Maxwidth: '1800px',
    margin: '0 auto',

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        width: '100%'
    }
}));
//

//ProjectList.js
export const StyledProjectListDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    Zindex: 150,
    height: '100%',
    width: '100%'
}));
//

//Training.js
export const RootDiv = styled('div')(({ theme }) => ({
    display: 'flex',
    height: '100%',
    overflow: 'hidden',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    }
}));

export const LeftSidebar = styled('div')(({ theme }) => ({
    width: '25%',
    padding: '20px',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.default,

    '&h3': {
        marginBottom: '20px',
        color: theme.palette.text.primary,
        fontFamily: 'Roboto, sans-serif'
    },

    ['@media (max-width: ${MAX_WIDTH})']: {
        width: '100%',
        padding: '10px',
        display: 'none'
    }
}));

export const RightSidebar = styled('div')(({ theme }) => ({
    flexGrow: 1,
    height: '100%',
    padding: '20px',
    width: 'calc(100% - 25%)',
    backgroundColor: theme.palette.background.default,
    overflowX: 'hidden',

    ['@media (max-width: ${MAX_WIDTH})']: {
        padding: '12px',
        width: '100%'
    }
}));

export const MobileTOC = styled('select')(({ theme }) => ({
    width: '100%',
    padding: '12px',
    marginBottom: '12px',
    fontSize: '16px',

    [`@media (min-width: ${MAX_WIDTH})`]: {
        display: 'none'
    }
}));

export const Page = styled('div')(({ theme }) => ({
    margin: '0 auto 20px auto',
    padding: '12px',
    maxWidth: '900px',
    borderRadius: '6px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',

    '&iframe': {
        width: '100%',
        height: 'auto',
        Minheight: '220px',
        aspectRatio: 16 / 9
    },

    '&img': {
        Maxwidth: '100%',
        height: 'auto'
    }
}));

export const PageTitle = styled('h3')(({ theme }) => ({
    marginBottom: '10px',
    color: theme.palette.text.primary
}));

export const PageContent = styled('p')(({ theme }) => ({
    Textalign: 'justify',
    color: theme.palette.text.primary,

    '&a': {
        color: theme.palette.primary.main
    }
}));

export const StyledTrainingLink = styled(Link)(({ theme }) => ({
    display: 'block',
    overflow: 'hidden',
    color: theme.palette.text.primary,
    Textdecoration: 'none',
    marginBottom: '10px',
    padding: '5px 10px',
    Borderradius: '4px',
    transition: 'background-color 0.3s',

    '&:hover': {
        backgroundColor: `${theme.palette.text.primary}1A`
    },

    '&.active': {
        backgroundColor: `${theme.palette.text.primary}29`,
        Fontweight: 'bold'
    }
}));
//

//ViewOntology.js
export const StyledViewOntologyRootDiv = styled('div')(({ theme }) => ({
    height: '100%',
    backgroundColor: theme.palette.background.default
}));

export const StyledH1 = styled('h1')(({ theme }) => ({
    color: theme.palette.text.primary
}));
//

//WebProgete.js
export const StyledWebProtegeContainer = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    width: '100%',
    height: '100vh',
    position: 'relative'
}));

export const Iframe = styled('iframe')(({ theme }) => ({
    width: '100%',
    height: '100%',
    border: 'none'
}));

export const LoadingOverlay = styled('div')(({ theme }) => ({
    position: 'absolute',
    inset: 0,
    background: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
}));
//

//CheckDropdown.js
export const DropdownSpan = styled('span')(({ theme }) => ({
    color: theme.palette.text.primary
}));

export const DropdownContainer = styled('div')(({ theme }) => ({
    position: 'relative',
    width: '250px',
    margin: '10px'
}));

export const DropdownButton = styled('button')(({ theme }) => ({
    width: '100%',
    padding: '8px 12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',

    [`&:hover`]: {
        backgroundColor: theme.palette.background.paper
    }
}));

export const StyledCheckdropdownDropdownMenu = styled('div')(({ theme }) => ({
    position: 'absolute',
    top: '100%',
    left: 0,
    width: '100%',
    backgroundColor: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '4px',
    marginTop: '4px',
    boxShadow: `0 2px 5px rgba(0, 0, 0, 0.1)`,
    zIndex: 1000
}));

export const StyledDropdownItem = styled('div')(({ theme }) => ({
    padding: `8px 12px`,
    borderBottom: `1px solid ${theme.palette.background.default}`,
    display: 'flex',
    alignItems: 'center',

    [`&:last-child`]: {
        borderBottom: 'none'
    },

    [`&:hover`]: {
        backgroundColor: `${theme.palette.background.default}`
    }
}));

export const Checkbox = styled('input')(({ theme }) => ({
    marginRight: '8px',
    cursor: 'pointer'
}));

export const StyledCheckDropdownLabel = styled('label')(({ theme }) => ({
    cursor: 'pointer',
    flexGrow: 1,
    margin: 0,
    color: theme.palette.text.primary
}));
//

//preInitMessages.js
export const StyledPreInitMessagesCard = styled('div')(({ theme }) => ({
    margin: '5px',
    padding: '0 !important',

    '&:focus': {
        outline: 'none'
    },
    '&::-moz-focus-inner': {
        border: 0
    }
}));

export const StyledPreInitMessagesCardHeader = styled('div')(({ theme }) => ({
    borderRadius: '10px 10px 0 0',
    border: '1px solid black',
    padding: '5px',
    color: theme.palette.text.primary,
    background: theme.palette.background.default,
    '&:focus': {
        outline: 'none'
    },
    '&::-moz-focus-inner': {
        border: 0
    }
}));

export const StyledPreInitMessagesCardBody = styled('div')(({ theme }) => ({
    padding: '5px',
    border: '1px solid black',
    borderTop: 'none',
    '&:focus': {
        outline: 'none'
    },
    '&::-moz-focus-inner': {
        border: 0
    }
}));
//

//ScreenCapture.js
export const Overlay = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.default,

    '&.highlighting': {
        background: 'none',
        borderColor: theme.palette.background.paper,
        borderStyle: 'solid'
    }
}));

export const Crosshairs = styled('div')(({ theme }) => ({
    position: 'absolute',
    width: '100%',
    zIndex: 2147483645,

    '&::before, &::after': {
        content: '',
        position: 'absolute'
    },

    '&::before': {
        height: '24px',
        width: '2px',
        background: theme.palette.background.default,
        top: '-11px'
    },

    '&::after': {
        width: '24px',
        height: '2px',
        background: theme.palette.background.default,
        left: '-11px'
    }
}));
//

//GraphModal.js
export const ModalOverlay = styled('div')(({ theme }) => ({
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    background: 'rgba(0, 0, 0, 0.3)',
    zIndex: 2000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

export const ModalContent = styled('div')(({ theme }) => ({
    background: theme.palette.background.default,
    borderRadius: '10px',
    boxShadow: '0 4px 32px rgba(0, 0, 0, 0.25)',
    width: '95vw',
    maxWidth: '1600px',
    height: '90vh',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden'
}));

export const Header = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 30px 10px 30px',
    borderBottom: `1px solid ${theme.palette.divider}`,
    background: theme.palette.background.default
}));

export const Title = styled('div')(({ theme }) => ({
    fontSize: '1.5rem',
    fontWeight: 600
}));

export const CloseGraphModalButton = styled('div')(({ theme }) => ({
    fontSize: '1.1rem',
    padding: '6px 18px',
    background: theme.palette.background.default,
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background 0.2s',
    '&:hover': {
        background: theme.palette.background.paper
    }
}));

export const ContentArea = styled('div')(({ theme }) => ({
    flex: 1,
    width: '100%',
    height: '100%',
    padding: 0,
    background: theme.palette.background.paper,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch'
}));

//

//SparqlQueryForm.js
export const ContentSparqlQueryFormArea = styled('div')(({ theme }) => ({
    flex: 1,
    padding: '18px 28px',
    background: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column'
}));

export const FormRow = styled('div')(({ theme }) => ({
    display: 'flex',
    aligItems: 'center',
    marginBottom: '16px',

    '& > label': {
        width: '90px',
        fontWeight: 500,
        marginRight: '10px'
    },

    '& > select, & > input': {
        flex: 1,
        fontSize: '1rem',
        padding: '6px 10px',
        borderRadius: '4px',
        border: '1px solid #bbb'
    }
}));
export const PreviewBox = styled('pre')(({ theme }) => ({
    background: theme.palette.background.paper,
    border: '1px solid #bbb',
    borderRadius: '6px',
    padding: '10px',
    fontSize: '0.98rem',
    fontFamily: `'Fira Mono', 'Consolas', 'Menlo', monospace`,
    margin: 0,
    width: '100%',
    minHeight: '60px',
    color: theme.palette.text.primary
}));

//

//SparqlQueryInputModal.js
export const Textarea = styled('textarea')(({ theme }) => ({
    width: '100%',
    height: '200px',
    fontSize: '1.05rem',
    fontFamily: `'Fira Mono', 'Consolas', 'Menlo', monospace`,
    border: '1px solid #bbb',
    borderRadius: '6px',
    padding: '10px',
    resize: 'vertical',
    background: theme.palette.background.paper
}));

export const Footer = styled('div')(({ theme }) => ({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: '16px 28px 18px 28px',
    borderTop: '1px solid #eee',
    background: theme.palette.background.default
}));

export const SparqlQueryInputModalButton = styled('button')(({ theme, primary }) => ({
    fontSize: '1rem',
    padding: '7px 22px',
    background: primary ? '#2a7ae2' : '#eee',
    color: primary ? '#fff' : '#222',
    border: '1px solid #bbb',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: 0,
    transition: 'background 0.2s',
    '&:hover': {
        background: primary ? '#1a5ab8' : '#ddd'
    }
}));

export const ModeSwitch = styled('div')(({ theme }) => ({
    display: 'flex',
    gap: '8px',
    marginLeft: 'auto'
}));

export const SwitchButton = styled('button')(({ theme, active }) => ({
    fontSize: '1rem',
    padding: '5px 16px',
    background: active ? '#2a7ae2' : '#eee',
    color: active ? '#fff' : '#222',
    border: '1px solid #bbb',
    borderRadius: '5px',
    cursor: 'pointer',
    marginLeft: 0,
    transition: 'background 0.2s',
    '&:hover': {
        background: active ? '#1a5ab8' : '#ddd'
    }
}));

export const PreviewArea = styled('div')(({ theme }) => ({
    width: '100%',
    background: theme.palette.background.paper,
    borderRadius: '6px',
    border: '1px solid #eee',
    padding: '8px 0 0 0'
}));
//

//AnnotationsDropDown.js
export const StyledAnnotationsDropdownSpan = styled('div')(({ theme }) => ({
    fontSize: `${fontStyled.fontSize.NormalText}`,

    [`@media (min-width: ${MIN_WIDTH_FOR_MONITOR})`]: {
        fontSize: `${fontStyled.fontSize.LaptopAndDesktopViewNormalText}`
    }
}));
//

//SignInModal.js
export const AnimationContainer = styled(CSSTransition)(({ theme }) => ({
    '&.fadeIn-enter': {
        opacity: 0
    },

    '&.fadeIn-enter.fadeIn-enter-active': {
        opacity: 1,
        transition: '1s opacity'
    }
}));
//

//AnnotatorPage.js
export const StyledAnnotatorPageDiv = styled('div')(({ theme }) => ({
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    padding: '10px 5% 2%',
    fontFamily: fontStyled.fontFamily,
    overflowY: 'auto',
    [`@media (max-width: ${MAX_WIDTH})`]: {
        paddingLeft: '5%',
        paddingRight: '5%'
    }
}));
//

//Partners.js
export const PartnersGrid = styled('div')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '56px',
    padding: '70px 40px',
    justifyItems: 'center',
    alignItems: 'center',
    background: theme.palette.background.default,
    maxHeight: 'calc(100vh - 120px)',
    overflowY: 'auto'
}));

export const PartnerCard = styled('a')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '38px 28px',
    borderRadius: '20px',
    background: theme.palette.secondary.light,
    boxShadow: theme.shadows[4],
    transition: 'transform 0.2s, box-shadow 0.2s',
    textDecoration: 'none',
    cursor: 'pointer',
    width: '260px',
    height: '200px',
    minWidth: '260px',
    minHeight: '200px',
    maxWidth: '260px',
    maxHeight: '200px',
    boxSizing: 'border-box',
    '&:hover': {
        transform: 'translateY(-12px) scale(1.09)',
        boxShadow: theme.shadows[8]
    }
}));

export const PartnerLogo = styled('img')(({ theme }) => ({
    width: '180px',
    height: '80px',
    marginBottom: '22px',
    objectFit: 'contain',
    transition: 'filter 0.2s',
    display: 'block',
    [`${PartnerCard}:hover &`]: {
        filter: `brightness(1.1) drop-shadow(0 2px 12px ${theme.palette.grey[400]})`
    }
}));

export const PartnerName = styled('div')(({ theme }) => ({
    fontSize: '1rem',
    color: theme.palette.text.primary,
    fontWeight: 500,
    textAlign: 'center'
}));
//

//vocabulary_support.js
export const StyledVocabularySupportDiv = styled('div')(({ theme }) => ({
    paddingTop: '10px',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: '2%',
    fontFamily: `${fontStyled.fontFamily}`,
    overflowY: 'auto',

    [`@media (max-width: ${MAX_WIDTH})`]: {
        paddingLeft: '0%',
        paddingRight: '0%'
    }
}));
//

//TabLikeHeader.js
const expandButtonAnimation = ({ expanded, initialRendering }) => {
    if (!initialRendering) {
        return keyframes`
  from {
    transform: rotate(${expanded ? -90 : 90}deg);
  }
  to {
    transform: rotate(${expanded ? 90 : 270}deg);
   
  }
`;
    }
    if (initialRendering) {
        return keyframes`
  from {
    transform: rotate(90deg);
  }
  to {
    transform: rotate(90deg);
   
  }
`;
    }
};

const collapsableBodyContainerAnimation = ({ expand, collapsable, minHeight, maxHeight }) => {
    if (collapsable) {
        return keyframes`
  from {
    height: ${expand ? minHeight : maxHeight}px;
  }
  to {
    height: ${expand ? maxHeight : minHeight}px;
   
  }
`;
    }
    if (!collapsable) {
        return keyframes`
  from {
    height: ${minHeight}px;
  }
  to {
    height: ${minHeight}px;
   
  }
`;
    }
};

const indicatorItemAnimation = ({ expanded, initialRendering }) => {
    if (!initialRendering) {
        return keyframes`
  0% {
    opacity: ${expanded ? 1 : 0};
  }
  50% {
    opacity: ${expanded ? 1 : 0};
  }
  100% {
    opacity: ${expanded ? 0 : 1};
  }
 
`;
    }
};

export const IndicatorItem = styled('div')(({ theme, collapsable, expand }) => ({
    animationName: `${indicatorItemAnimation}`,
    animationDuration: '500ms',
    opacity: collapsable ? (expand ? 0 : 1) : 1
}));

export const CollapsableBodyContainer = styled('div')(({ theme, collapsable, expand, maxHeight, minHeight }) => ({
    animationName: `${collapsableBodyContainerAnimation}`,
    animationDuration: '400ms',
    height: `${collapsable ? (expand ? maxHeight : minHeight) : minHeight}px`
}));

export const ButtonContainer = styled('div')(({ theme, expanded }) => ({
    animationName: `${expandButtonAnimation}`,
    animationDuration: '400ms',
    transform: `rotate(${expanded ? 90 : 270}deg)`
}));

//

//FadingNotification.jsx
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const fadeOut = keyframes`
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
`;

export const Notification = styled('div')(({ theme }) => ({
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    padding: '10px 20px',
    borderRadius: '5px',
    animation: `${props => (props.show ? fadeIn : fadeOut)} 0.5s forwards`
}));
//
