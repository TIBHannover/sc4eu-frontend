import React, { Component } from 'react';
import logo from 'assets/images/logo.png';
import styled from 'styled-components';
const Image = styled.img``;

export default class Logo extends Component {
    render() {
        return (
            <div style={{ display: 'inline-block', position: 'relative', top: '-4px' }}>
                <Image src={logo} alt="Example of a survey table" style={{ height: 30, padding: '0.2rem 0.1rem' }} />
            </div>
        );
    }
}
