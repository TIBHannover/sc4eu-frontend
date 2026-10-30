import React, { Component } from 'react';
import logo from 'assets/images/logo.png';

export default class Logo extends Component {
    render() {
        return (
            <div style={{ display: 'inline-block', position: 'relative', top: '-4px' }}>
                <img src={logo} alt="Project Logo" style={{ height: 30, padding: '0.2rem 0.1rem' }} />
            </div>
        );
    }
}
