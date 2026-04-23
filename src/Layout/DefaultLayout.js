import React from 'react';
import styled from 'styled-components';
import Header from './Header';
import PropTypes from 'prop-types';
import { colorStyled } from '../styledComponents/styledColor';
import { fontStyled } from '../styledComponents/styledFont';
import SideBarLayout from './SideBarLayout';

export default function DefaultLayout(props) {
    return (
        <StyledBody>
            <Header />
            <SideBarLayout>
                {props.children}
            </SideBarLayout>
        </StyledBody>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
};

/** --- local scoped stuff --- **/

const StyledBody = styled.div`
    min-height: calc(100vh - 0px);
    height: 100%;
    background-color: ${
            colorStyled.surfaceContainerLowest
    };
    font-family: ${
            fontStyled.fontFamily
    };
`;
