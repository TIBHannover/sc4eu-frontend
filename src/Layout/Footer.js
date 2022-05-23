import React, { Component } from 'react';
import TIB_Logo_en from 'assets/images/TIB_Logo_en.png';
import eu_logo from 'assets/images/eu_logo.jpg';
import eu_logo2 from 'assets/images/eu_logo2.jpg';
import ECSEL_logo from 'assets/images/ECSEL_logo.jpg';
import infinion_logo from '../assets/images/infineon.png';
import tib_logo from '../assets/images/TIB2.jpg';
import ftk_logo from '../assets/images/FTK.png';
import bosch_logo from '../assets/images/Bosch.png';
import mines_logo from '../assets/images/MINES.png';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Image = styled.img``;

export default class Footer extends Component {
    render() {
        return (
            <div
                style={{
                    display: 'flex',
                    width: 'auto',
                    background: 'white',
                    borderTop: '2px solid #ccc',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    right: 0,
                    height: '15%'
                }}
            >
                <div>
                    <Image src={eu_logo} alt="EU Logo" style={{ height: 50, marginTop: '10px' }} />
                </div>
                <div>
                    <Image src={infinion_logo} alt="Infinion Logo" style={{ height: 50, marginTop: '10px' }} />
                </div>
                <div>
                    <Image src={tib_logo} alt="TIB Logo" style={{ height: 50, marginTop: '10px' }} />
                </div>
                <div>
                    <Image src={ftk_logo} alt="FTK Logo" style={{ height: 50, marginTop: '10px' }} />
                </div>
                <div>
                    <Image src={bosch_logo} alt="Bosch Logo" style={{ height: 50, marginTop: '10px' }} />
                </div>
                <div>
                    <Image src={mines_logo} alt="Mines Logo" style={{ height: 50, marginTop: '10px' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', position: 'absolute', right: 5, bottom: 5 }}>
                        {/*<div>*/}
                        {/*    <div style={{ color: '#777', fontSize: '24px' }}> Maintainer: </div>*/}
                        {/*    <a href={'https://www.tib.eu/de/'}>*/}
                        {/*        <Image src={TIB_Logo_en} alt="TIB Logo" style={{ height: 100, paddingTop: '15px' }} />*/}
                        {/*    </a>*/}
                        {/*</div>*/}
                        <div>
                            <div style={{ color: '#777', fontSize: '24px' }}> Funding: </div>
                            <a href={'https://www.dfg.de/'}>
                                <Image src={ECSEL_logo} alt="DFG Logo" style={{ height: 100 }} />
                            </a>
                        </div>
                    </div>
                    <div style={{ display: 'flex', position: 'relative', left: '150px', width: '600px' }}>
                        This Project has received funding from the ECSEL Joing Undertaking (JU) under grant agreement No 101007312. The JU receives
                        support from the European Union's Horizon 2020 research and innovation programme and Germany, France{' '}
                    </div>
                </div>
            </div>
        );
    }
}
