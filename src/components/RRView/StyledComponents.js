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
    color: ${colorStyled.onPrimary};
    background-color: ${props => (props.experimentalLayout ? colorStyled.surface : props.isHighlighted === true ? colorStyled.primary : colorStyled.surfaceContainer)};
    color:${props => (props.experimentalLayout ? colorStyled.onSurface : colorStyled.onPrimaryContainer)};
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

export const StyledHeaderDiv = styled.div`
    margin: 10px 6px 10px 10px;
    border-radius: 7px 7px 7px 7px;
    text-color: ${colorStyled.onPrimaryContainer};
    color: ${colorStyled.onPrimaryContainer};
    background-color: ${colorStyled.primaryContainer};
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`;
