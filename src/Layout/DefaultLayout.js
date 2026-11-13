import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import Footer from './Footer';
import SideBarLayout from './SideBarLayout';
import { StyledBody } from 'styledComponents/styledComponents';
import { IS_VOCABULARY_INSTANCE } from '../constants/globalConstants';

export default function DefaultLayout(props) {
    return (
        <StyledBody>
            <Header />
            <SideBarLayout>{props.children}</SideBarLayout>
            {IS_VOCABULARY_INSTANCE && <Footer />}
        </StyledBody>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
};
