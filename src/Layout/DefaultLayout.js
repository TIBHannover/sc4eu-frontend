import React from 'react';
import Header from './Header';
import PropTypes from 'prop-types';
import Footer from './Footer';
import SideBarLayout from './SideBarLayout';
import { StyledBody } from 'styledComponents/styledComponents';

export default function DefaultLayout(props) {
    return (
        <StyledBody>
            <Header />
            <SideBarLayout>{props.children}</SideBarLayout>
            {process.env.REACT_APP_PUBLIC_URL !== '/ocp/' && <Footer />}
        </StyledBody>
    );
}

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired
};

