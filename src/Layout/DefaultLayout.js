import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import PropTypes from 'prop-types';
import { PRIMARY } from '../styledComponents/styledComponents';

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
    overflow: auto;
    background-color: ${PRIMARY.lighter};
`;

const StyledAppContent = styled.div`
    height: calc(100vh - 100px);
    overflow: auto;
`;
