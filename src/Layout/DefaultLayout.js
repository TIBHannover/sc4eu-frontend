import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import PropTypes from 'prop-types';
import { colorStyled } from '../styledComponents/styledColor';
import { fontStyled } from '../styledComponents/styledFont';

export default function DefaultLayout(props) {
    return (
        <StyledBody>
            <Header />
            <StyledAppContent>{props.children}</StyledAppContent>
        </StyledBody>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.array.isRequired
};

/** --- local scoped stuff --- **/

const StyledBody = styled.div`
    min-height: calc(100vh - 0px);
    height: 100%;
    background-color: ${colorStyled.PRIMARY.lighter};
    font-family: ${fontStyled.fontFamily};
`;

const StyledAppContent = styled.div`
    height: calc(100vh - 100px);
    overflow: hidden;
`;
