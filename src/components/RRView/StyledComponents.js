import styled from 'styled-components';
import { Input } from 'reactstrap';
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';
import { fontStyled } from '../../styledComponents/styledFont';
import { colorStyled } from '../../styledComponents/styledColor';

export const StyledResourceBody = styled.div`
    background-color: red;
    color: black;
    width: 100%;
    background: white;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
    word-break: none;
    white-space: nowrap;
    padding: 2px;
    position: relative;
`;

export const StyledBodyInput = styled(Input)`
    background: #fff;
    color: black;
    outline: 0;
    word-break: none;
    white-space: pre;

    border-radius: 0;
    padding: 2px;
    padding-bottom: 0;
    margin-bottom: 1px;

    display: block;

    &:focus {
        background: #fff;
        color: black;
        outline: 0;
        padding: 0 4px;
        border-radius: 0;
        display: block;
    }
`;

export const StyledResourceAndRelationHeader = styled.div`
    padding: 5px;
    // border-radius: ${props => (props.experimentalLayout === true ? '0px 0px 0 0' : '10px 10px 0 0')};
    padding: 5px;
    color: white;
    //background-color: ${props => (props.isHighlighted === true ? 'black' : '#4388cc')};
    background-color: ${props => (props.experimentalLayout ? PRIMARY.dark : props.isHighlighted === true ? 'black' : '#4388cc')};
    color:${props => (props.experimentalLayout ? 'black' : 'blue')};
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;

export const StyledContentView = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

export const HeaderValueInput = styled(Input)`
    background: #fff;
    color: black;
    outline: 0;
    border: dotted 2px red;
    border-radius: 0;
    padding: 0 4px;
    display: block;
    height: 22px !important;

    min-width: 150px;
    margin: 1px 1px;
    padding: 0 2px;

    &:focus {
        background: #fff;
        color: black;
        outline: 0;
        border: dotted 2px green;
        padding: 0 4px;
        border-radius: 0;
        display: block;
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
    dark: '#536b78'
};

export const StyledHeaderDiv = styled.div`
    margin: 10px 6px 10px 10px;
    border-radius: 7px 7px 7px 7px;
    text-color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    background-color: ${colorStyled.PRIMARY.dark};
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
