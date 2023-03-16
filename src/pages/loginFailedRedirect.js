import React, { Component } from 'react';
import { PRIMARY } from '../styledComponents/styledComponents';
import Footer from '../Layout/Footer';

class LoginFailedRedirect extends Component {
    render() {
        return (
            <div style={{ height: '100%' }}>
                <div
                    style={{
                        textAlign: 'center',
                        fontWeight: '600',
                        backgroundColor: PRIMARY.lighter,
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

export default LoginFailedRedirect;
