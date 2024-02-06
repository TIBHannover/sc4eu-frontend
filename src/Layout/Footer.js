import React, { Component } from 'react';
import KDT_logo from '../assets/images/KDT-JU-logo-full.gif';
import ChipsJu_logo from '../assets/images/chipsju.png';
import infinion_logo from '../assets/images/infineon.png';
import tib_logo from '../assets/images/TIB2.png';
import ftk_logo from '../assets/images/FTK.png';
import bosch_logo from '../assets/images/Bosch.png';
import mines_logo from '../assets/images/MINES.png';
import STMicroelectronics_logo from '../assets/images/st-logo.png';
import SAP_logo from '../assets/images/sap-logo.png';
import NXP_logo from '../assets/images/NXP-Logo.png';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { MAX_WIDTH, MIN_WIDTH_FOR_MONITOR } from '../styledComponents/styledComponents';
import Logo from '../assets/images/logo.png';
import OntologyPortal from '../assets/images/OntologyPOrtalLogo.png';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';

class Footer extends Component {
    render() {
        return (
            <StyledBodyDiv>
                <StyledLeftDiv>
                    <LogoOntologyPortal src={OntologyPortal} alt="OntologyPortal" />
                    <StyledNoteText>
                        <span style={{ fontWeight: 600 }}>Note :</span> This is a Minimal Viable Product of the SC4EU project.
                        <br /> I.e., We don't provide any backup solution yet.
                    </StyledNoteText>
                </StyledLeftDiv>
                <div>
                    <Image src={infinion_logo} alt="Infinion Logo" />
                    <a href={'https://www.tib.eu/de/'} target="_blank" rel="noopener noreferrer">
                        <Image src={tib_logo} alt="TIB Logo" style={{ paddingLeft: '15px' }} />
                    </a>
                    <Image src={ftk_logo} alt="FTK Logo" style={{ paddingLeft: '15px' }} />
                    <Image src={bosch_logo} alt="Bosch Logo" style={{ paddingLeft: '15px' }} />
                    <Image src={mines_logo} alt="Mines Logo" style={{ paddingLeft: '15px' }} />
                    <Image src={STMicroelectronics_logo} alt="ST Microelectronics Logo" style={{ paddingLeft: '15px' }} />
                    <Image src={SAP_logo} alt="SAP Logo" style={{ paddingLeft: '15px' }} />
                    <Image src={NXP_logo} alt="NXP Logo" style={{ paddingLeft: '15px' }} />
                </div>
                <StyledRightDiv>
                    <a href={'https://www.chips-ju.europa.eu/'} target="_blank" rel="noopener noreferrer">
                        <StyledImage src={ChipsJu_logo} alt="DFG Logo" />
                    </a>
                    <StyledText>
                        SC4EU is Supported by Chips JU <br />
                        Under Grant number 101139949
                    </StyledText>
                    <StyledLogo src={Logo} alt="SC3 Logo" />
                </StyledRightDiv>
            </StyledBodyDiv>
        );
    }
}

export default withRouter(Footer);

const StyledBodyDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    padding-left: 3%;
    padding-right: 6%;
    height: 55px;
    background: ${colorStyled.PRIMARY.light};
    overflow: hidden;

    @media (max-width: ${MAX_WIDTH}) {
        padding-left: 1%;
        padding-right: 1%;
    }

    @media screen and (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        padding-left: 5%;
        padding-right: 5%;
    }
`;

const StyledLeftDiv = styled.div`
    display: flex;
`;

const StyledNoteText = styled.div`
    font-size: ${fontStyled.fontSize.infoText};
    color: #003554;
    font-family: ${fontStyled.fontFamily};
    margin-top: 2%;
    margin-left: 3%;
    white-space: nowrap;

    @media (max-width: ${MAX_WIDTH}) {
        display: none;
    }
`;

const LogoOntologyPortal = styled.img`
    height: 40px;
    width: 70px;
    margin-top: 2%;

    @media (max-width: ${MAX_WIDTH}) {
        display: none;
    }

    @media screen and (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        height: 40px;
        width: 75px;
    }
`;

const Image = styled.img`
    height: 25px;
    margin-top: 3%;

    @media (max-width: ${MAX_WIDTH}) {
        display: none;
    }

    @media screen and (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        height: 30px;
    }
`;

const StyledRightDiv = styled.div`
    display: flex;

    @media (max-width: ${MAX_WIDTH}) {
        transform: translate(-30%, 15%);
    }
`;

const StyledImage = styled.img`
    height: 40px;
    width: 110px;
    margin-top: 3%;

    @media (max-width: ${MAX_WIDTH}) {
        height: 40px;
        width: 100px;
        margin-top: 1px;
    }

    @media screen and (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        height: 40px;
        width: 130px;
    }
`;

const StyledText = styled.p`
    font-size: ${fontStyled.fontSize.infoText};
    font-family: ${fontStyled.fontFamily};
    color: #003554;
    margin-top: 1.5%;
    margin-left: 3%;
    white-space: nowrap;

    @media (max-width: ${MAX_WIDTH}) {
        margin-left: 1%;
        font-size: 10px;
        padding-left: 0.5%;
    }
`;

const StyledLogo = styled.img`
    height: 40px;
    width: 40px;
    margin-top: 2%;
    margin-left: 3%;

    @media (max-width: ${MAX_WIDTH}) {
        display: none;
    }

    @media screen and (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        height: 40px;
        width: 40px;
    }
`;
