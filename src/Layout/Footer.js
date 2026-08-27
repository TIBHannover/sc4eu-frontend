import React, { Component } from 'react';
import ChipsJu_logo from '../assets/images/chipsju.png';
import { withRouter } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import OntologyPortal from '../assets/images/OntologyPOrtalLogo.png';
import { StyledBodyDiv, StyledLeftDiv, LogoOntologyPortal, StyledNoteText, StyledRightDiv, StyledFooterImage, StyledFooterText, StyledLogo } from 'styledComponents/styledComponents';

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
                <StyledRightDiv>
                    <a href={'https://www.chips-ju.europa.eu/'} target="_blank" rel="noopener noreferrer">
                        <StyledFooterImage src={ChipsJu_logo} alt="DFG Logo" />
                    </a>
                    <StyledFooterText>
                        SC4EU is Supported by Chips JU <br />
                        Under Grant number 101139949
                    </StyledFooterText>
                    <StyledLogo src={Logo} alt="SC3 Logo" />
                </StyledRightDiv>
            </StyledBodyDiv>
        );
    }
}

export default withRouter(Footer);
