import React, { Component } from 'react';
import KDT_logo from '../assets/images/KDT-JU-logo-full.gif';
import infinion_logo from '../assets/images/infineon.png';
import tib_logo from '../assets/images/TIB2.png';
import ftk_logo from '../assets/images/FTK.png';
import bosch_logo from '../assets/images/Bosch.png';
import mines_logo from '../assets/images/MINES.png';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { PRIMARY } from '../styledComponents/styledComponents';

const Image = styled.img``;

class Footer extends Component {
    render() {
        return (
            <div>
                <div
                    style={{
                        display: 'flex',
                        position: 'absolute',
                        left: 0,
                        bottom: 0,
                        right: 0,
                        paddingLeft: '310px',
                        paddingTop: '10px',
                        height: '9%',
                        background: PRIMARY.light,
                        overflow: 'hidden'
                    }}
                >
                    <div style={{ flexDirection: 'column' }}>
                        <p style={{ fontSize: '13px', color: '#003554', fontFamily: 'sans-serif' }}>
                            <span style={{ fontWeight: 600 }}>Note :</span> This is a Minimal Viable Product of the SC3 project.
                            <br /> I.e., We don't provide any backup solution yet.
                        </p>
                    </div>
                    <div style={{ paddingLeft: '100px' }}>
                        <Image src={infinion_logo} alt="Infinion Logo" style={{ height: 30, marginTop: '10px', paddingLeft: '15px' }} />
                        <a href={'https://www.tib.eu/de/'} target="_blank" rel="noopener noreferrer">
                            <Image src={tib_logo} alt="TIB Logo" style={{ height: 30, marginTop: '10px', paddingLeft: '15px' }} />
                        </a>
                        <Image src={ftk_logo} alt="FTK Logo" style={{ height: 30, marginTop: '10px', paddingLeft: '15px' }} />
                        <Image src={bosch_logo} alt="Bosch Logo" style={{ height: 30, marginTop: '10px', paddingLeft: '15px' }} />
                        <Image src={mines_logo} alt="Mines Logo" style={{ height: 30, marginTop: '10px', paddingLeft: '5px' }} />
                    </div>
                    <div style={{ paddingLeft: '130px' }}>
                        <a href={'https://www.kdt-ju.europa.eu/'} target="_blank" rel="noopener noreferrer">
                            <Image src={KDT_logo} alt="DFG Logo" style={{ height: 50, width: 150 }} />
                        </a>
                        <p style={{ fontSize: '12px', float: 'right', paddingLeft: '15px', fontFamily: 'sans-serif', color: '#003554' }}>
                            SC3 is Supported by KDT JU <br />
                            Under Grant number 101007312
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Footer);
