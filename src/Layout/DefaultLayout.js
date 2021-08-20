import React from 'react';
import styled from 'styled-components';

import Header from './Header';
import PropTypes from 'prop-types';

export default function DefaultLayout(props) {
    return (
        <StyledBody>
            <div>
                <Header />
                <StyledAppContent>{props.children}</StyledAppContent>
            </div>
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
    overflow: hidden;
`;

const StyledAppContent = styled.div`
    padding-top: 40px;
    height: calc(100vh - 0px);
`;
