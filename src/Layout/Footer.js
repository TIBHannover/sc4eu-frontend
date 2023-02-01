import React, { Component } from 'react';
import KDT_logo from '../assets/images/KDT-JU-logo-full.gif';
import infinion_logo from '../assets/images/infineon.png';
import tib_logo from '../assets/images/TIB2.png';
import ftk_logo from '../assets/images/FTK.png';
import bosch_logo from '../assets/images/Bosch.png';
import mines_logo from '../assets/images/MINES.png';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { MAX_WIDTH, PRIMARY } from '../styledComponents/styledComponents';

class Footer extends Component {
    render() {
        return (
            <div>
                <StyledBodyDiv>
                    <div style={{ flexDirection: 'column' }}>
                        <StyledNoteText>
                            <span style={{ fontWeight: 600 }}>Note :</span> This is a Minimal Viable Product of the SC3 project.
                            <br /> I.e., We don't provide any backup solution yet.
                        </StyledNoteText>
                    </div>
                    <div style={{ paddingLeft: '10%' }}>
                        <Image src={infinion_logo} alt="Infinion Logo" style={{ paddingLeft: '15px' }} />
                        <a href={'https://www.tib.eu/de/'} target="_blank" rel="noopener noreferrer">
                            <Image src={tib_logo} alt="TIB Logo" style={{ paddingLeft: '15px' }} />
                        </a>
                        <Image src={ftk_logo} alt="FTK Logo" style={{ paddingLeft: '15px' }} />
                        <Image src={bosch_logo} alt="Bosch Logo" style={{ paddingLeft: '15px' }} />
                        <Image src={mines_logo} alt="Mines Logo" style={{ paddingLeft: '5px' }} />
                    </div>
                    <div style={{ paddingLeft: '10%' }}>
                        <a href={'https://www.kdt-ju.europa.eu/'} target="_blank" rel="noopener noreferrer">
                            <StyledImage src={KDT_logo} alt="DFG Logo" />
                        </a>
                        <StyledText>
                            SC3 is Supported by KDT JU <br />
                            Under Grant number 101007312
                        </StyledText>
                    </div>
                </StyledBodyDiv>
            </div>
        );
    }
}

export default withRouter(Footer);

const StyledBodyDiv = styled.div`
    display: flex;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 10px;
    height: 9%;
    background: ${PRIMARY.light};
    overflow: hidden;

    @media (max-width: ${MAX_WIDTH}) {
        padding-left: 1%;
        padding-right: 1%;
    }
`;

const StyledNoteText = styled.p`
    font-size: 13px; 
    color: #003554, 
    font-family: 
    sans-serif;
    margin-top: 10px;

    @media (max-width: ${MAX_WIDTH}) {
        display: none
    }
`;

const Image = styled.img`
    height: 30px;
    margin-top: 10px;

    @media (max-width: ${MAX_WIDTH}) {
        display: none;
    }
`;

const StyledImage = styled.img`
    height: 50px;
    width: 150px;
    margin-top: 10px;

    @media (max-width: ${MAX_WIDTH}) {
        height: 50px;
        width: 100px;
        margin-top: 5px;
    }
`;

const StyledText = styled.p`
    font-size: 12px;
    float: right;
    padding-left: 15px;
    font-family: sans-serif;
    color: #003554;
    margin-top: 10px;

    @media (max-width: ${MAX_WIDTH}) {
        margin-top: 15px;
        margin-left: 10px;
        font-size: 10px;
        padding-left: 5px;
    }
`;
