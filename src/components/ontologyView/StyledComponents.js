import styled from 'styled-components';
import { Collapse, Button } from 'reactstrap';

export const CollapsibleItem = styled(Collapse)`
    width: 100%;
`;

export const GraphVisButton = styled(Button)`
    padding: 0;
    width: 49%;
    background-color: #ad2f38;
    text-align: center;
    position: relative;
    border-radius: 5px;

    margin-right: 1%;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: none;
    overflow: hidden;
    whitespace: nowrap;
    text-overflow: ellipsis;
`;

export const WidgetVisButton = styled(Button)`
    padding: 0;
    width: 50%;
    background-color: #cccccc;
    color: black;
    text-align: center;
    position: relative;
    border-radius: 5px;

    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border-top: none;
    overflow: hidden;
    whitespace: nowrap;
    text-overflow: ellipsis;
`;
