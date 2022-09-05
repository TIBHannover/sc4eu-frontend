import React, { Component } from 'react';
import eu_logo from 'assets/images/eu_logo.jpg';
import ECSEL_logo from 'assets/images/ECSEL_logo.jpg';
import infinion_logo from '../assets/images/infineon.png';
import tib_logo from '../assets/images/TIB2.jpg';
import ftk_logo from '../assets/images/FTK.png';
import bosch_logo from '../assets/images/Bosch.png';
import mines_logo from '../assets/images/MINES.png';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const Image = styled.img``;

class Footer extends Component {
    render() {
        return (
            <div>
                <div
                    style={{
                        display: 'flex',
                        background: 'white',
                        borderTop: '2px solid #ccc',
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        right: 0,
                        paddingLeft: '310px',
                        paddingTop: '10px',
                        height: '9%'
                    }}
                >
                    <div style={{ flexDirection: 'column' }}>
                        <p style={{ fontSize: '13px', color: 'red' }}>
                            Note : This is a Minimal Viable Product of the SC3 project.
                            <br /> I.e., we dont provide any backup solution yet.
                        </p>
                    </div>
                    <div style={{ paddingLeft: '100px' }}>
                        <Image src={infinion_logo} alt="Infinion Logo" style={{ height: 30, marginTop: '10px', paddingLeft: '15px' }} />
                        <Image src={tib_logo} alt="TIB Logo" style={{ height: 30, marginTop: '10px', paddingLeft: '15px' }} />
                        <Image src={ftk_logo} alt="FTK Logo" style={{ height: 30, marginTop: '10px', paddingLeft: '15px' }} />
                        <Image src={bosch_logo} alt="Bosch Logo" style={{ height: 30, marginTop: '10px', paddingLeft: '15px' }} />
                        <Image src={mines_logo} alt="Mines Logo" style={{ height: 30, marginTop: '10px', paddingLeft: '15px' }} />
                    </div>
                    <div style={{ paddingLeft: '130px' }}>
                        <a href={'https://www.dfg.de/'}>
                            <Image src={ECSEL_logo} alt="DFG Logo" style={{ height: 50, width: 150 }} />
                        </a>
                        <p style={{ fontSize: '12px', float: 'right', paddingLeft: '15px' }}>
                            SC3 is Supported by ECSEL <br />
                            Under Grant number 101007312
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Footer);
