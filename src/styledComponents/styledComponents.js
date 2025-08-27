import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import { Badge, Chip } from '@mui/material';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { Tooltip as ReactstrapTooltip } from "reactstrap";
import { colorStyled } from './styledColor';
import PropTypes from 'prop-types';

export const StyledTopBar = styled.div`
    margin-bottom: 0;
    width: 100%;
    height: 40px;
    color: red;
    position: fixed;
    // padding-top: 5px;

    // For the background
    background: #5f6474;
`;

export const StyledLink = styled(Link)`
    padding: 10px;

    :focus {
        outline: none;
    }

    ::-moz-focus-inner {
        border: 0;
    }
`;

export const StyledGravatar = styled(Gravatar)`
    border: 3px solid black;
    cursor: pointer;
`;

export const StyledAuthTooltip = styled(ReactstrapTooltip)`
    & .tooltip {
        opacity: 1 !important;
        margin-top: 65px;
        margin-right: -5px;
        padding: 0;
        border-radius: 20px;
        box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);

        .arrow {
            display: none !important;
        }
    }
}

& .tooltip-inner {
    font-size: 16px;
    background-color: #fff;
    max-width: 410px;
    padding: 15px;
    border-radius: 20px;

    .tooltip-content {
        margin-bottom: 8px;
    }

    .user-profile-link {
        color: #fff;
        text-decoration: none;

        &:hover {
            text-decoration: underline;
        }
    }
}
`;

export const StyledBadge = styled(
    Badge,
    {}
)(({ customVariant }) => ({
    '& .MuiBadge-badge': {
        ...(customVariant === 'orange' && {
            backgroundColor: colorStyled.ORANGE_COLOR,
            color: colorStyled.CONTAINER_BACKGROUND_COLOR
        }),
        ...(customVariant === 'blue' && {
            backgroundColor: colorStyled.PRIMARY.main,
            color: colorStyled.CONTAINER_BACKGROUND_COLOR
        })
    }
}));

StyledBadge.propTypes = {
    customVariant: PropTypes.oneOf(['orange', 'blue'])
};

export const StyledChip = styled(Chip)(({ customVariant }) => ({
    '&.MuiChip-root': {
        ...(customVariant === 'mention' && {
            backgroundColor: colorStyled.ORANGE_COLOR,
            color: colorStyled.CONTAINER_BACKGROUND_COLOR
        }),
        ...(customVariant === 'agreement' && {
            backgroundColor: colorStyled.PRIMARY.lightMain,
            color: colorStyled.CONTAINER_BACKGROUND_COLOR
        })
    }
}));

StyledChip.propTypes = {
    customVariant: PropTypes.oneOf(['mention', 'agreement'])
};

export const StyledTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'transparent',
        color: 'red',
        fontSize: '1rem'
    },
}));

export const MAX_WIDTH = '769px';

export const MIN_WIDTH_FOR_MONITOR = '1750px';
