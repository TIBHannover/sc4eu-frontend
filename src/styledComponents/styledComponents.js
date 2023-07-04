import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Gravatar from 'react-gravatar';
import { Tooltip } from 'reactstrap';

export const StyledTopBar = styled.div`
    margin-bottom: 0;
    width:100%
    height:40px;
    color:red;
    position:fixed;
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

export const StyledAuthTooltip = styled(Tooltip)`
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

export const MAX_WIDTH = '769px';

export const MIN_WIDTH_FOR_MONITOR = '1750px';
