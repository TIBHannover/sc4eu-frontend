import styled from 'styled-components';
import { Input } from 'reactstrap';

export const StyledResourceBody = styled.div`
    background-color: red;
    border: 1px solid black;
    border-top: none;
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

    border-bottom: 1px solid black;
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

export const StyledResourceHeader = styled.div`
    padding: 5px;
    border-radius: ${props => (props.experimentalLayout === true ? '0px 0px 0 0' : '10px 10px 0 0')};
    border: 1px solid black;
    padding: 5px;
    color: white;
    //background-color: ${props => (props.isHighlighted === true ? '#000000' : '#4388cc')};
    background-color: ${props => (props.experimentalLayout ? '#ccc' : props.isHighlighted === true ? '#000000' : '#4388cc')};
    color:${props => (props.experimentalLayout ? 'black' : 'white')};
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
