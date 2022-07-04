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
import { Link, withRouter } from 'react-router-dom';
import ROUTES from 'constants/routes';

const Image = styled.img``;

class Footer extends Component {
    render() {
        return (
            <div>
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
                        paddingLeft: '320px',
                        paddingTop: '10px',
                        height: '15%'
                    }}
                >
                    <div style={{ flexDirection: 'column' }}>
                        <div className="">
                            <h5 style={{ color: '#777', fontSize: '16px' }}>About the service:</h5>
                        </div>
                        <div style={{ fontSize: '15px' }}>
                            <Link to={ROUTES.Imprint}>Imprint</Link>
                        </div>
                        <div style={{ fontSize: '15px' }}>
                            <Link to={ROUTES.Dataprotections}>Data Policy</Link>
                        </div>
                        <div>
                            <p style={{ fontSize: '13px', color: 'red' }}>
                                Note : This is a Minimal Viable Product of the SC3 project.
                                <br /> I.e., we dont provide any backup solution yet.
                            </p>
                        </div>
                        <br />
                    </div>
                    <div style={{ paddingLeft: '170px', flexDirection: 'column' }}>
                        <h5 style={{ color: '#777', fontSize: '16px' }}>Project Partner: </h5>
                        <div style={{ display: 'flex' }}>
                            <div>
                                <Image src={eu_logo} alt="EU Logo" style={{ height: 30, marginTop: '10px' }} />
                            </div>
                            <div>
                                <Image src={infinion_logo} alt="Infinion Logo" style={{ height: 30, marginTop: '10px', paddingLeft: '15px' }} />
                            </div>
                            <div>
                                <Image src={tib_logo} alt="TIB Logo" style={{ height: 30, marginTop: '10px', paddingLeft: '15px' }} />
                            </div>
                        </div>
                        <div style={{ display: 'flex' }}>
                            <div>
                                <Image src={ftk_logo} alt="FTK Logo" style={{ height: 30, marginTop: '10px' }} />
                            </div>
                            <div>
                                <Image src={bosch_logo} alt="Bosch Logo" style={{ height: 30, marginTop: '10px', paddingLeft: '15px' }} />
                            </div>
                            <div>
                                <Image src={mines_logo} alt="Mines Logo" style={{ height: 30, marginTop: '10px', paddingLeft: '20px' }} />
                            </div>
                        </div>
                    </div>
                    {/* <div style={{ display: 'flex', position: 'relative', left: '120px', width: '400px' }}>
                    This Project has received funding from the ECSEL Joing Undertaking (JU) under grant agreement No 101007312. The JU receives
                    support from the European Union's Horizon 2020 research and innovation programme and Germany, France{' '}
                </div> */}
                    {/*<div>*/}
                    {/*    <div style={{ color: '#777', fontSize: '24px' }}> Maintainer: </div>*/}
                    {/*    <a href={'https://www.tib.eu/de/'}>*/}
                    {/*        <Image src={TIB_Logo_en} alt="TIB Logo" style={{ height: 100, paddingTop: '15px' }} />*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                    <div style={{ position: 'relative', left: '310px', width: '400px', flexDirection: 'column' }}>
                        <h5 style={{ color: '#777', fontSize: '16px' }}> Funding: </h5>
                        <a href={'https://www.dfg.de/'}>
                            <Image src={ECSEL_logo} alt="DFG Logo" style={{ height: 50, width: 150 }} />
                        </a>
                        <p style={{ fontSize: '12px' }}>
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
