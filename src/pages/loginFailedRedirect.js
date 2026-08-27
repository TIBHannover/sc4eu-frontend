import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import { withTheme } from '@emotion/react';
class LoginFailedRedirect extends Component {
    render() {
        const {theme} = this.props;
        return (
            <div style={{ height: '100%' }}>
                <div
                    style={{
                        textAlign: 'center',
                        fontWeight: '600',
                        backgroundColor: theme.palette.background.default,
                        height: '100%',
                        fontSize: '22px'
                    }}
                >
                    <p style={{ paddingTop: '40px' }}>Something Went wrong please try again after some time</p>
                </div>
                <Footer />
            </div>
        );
    }
}

export default withTheme(LoginFailedRedirect);
