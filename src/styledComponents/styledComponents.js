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
    }
    & .tooltip-inner {
        font-size: 16px;
        background-color: #5f6474;
        max-width: 410px;
        box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 10);

        .btn {
            border-color: black;
            background-color: ##007bff;

            &:hover {
                background-color: #0056b3;
            }
        }
    }

    & .arrow:before {
        border-bottom-color: black !important;
    }
`;

export const PRIMARY = {
    lighter: '#F7FBFC',
    light: '#D6E6F2',
    lightMain: '#92bdff',
    main: '#B9D7EA',
    dark: '#769FCD'
};
export const SECONDARY = {
    dark: '#536b78',
    darker: '#2f3d45',
    link: '#0000EE'
};

export const TEXTCOLOR = '#4d5b7c';

export const MAX_WIDTH = '769px';
