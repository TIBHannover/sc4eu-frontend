import React, { Component } from 'react';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import { MAX_WIDTH, MIN_WIDTH_FOR_MONITOR } from '../styledComponents/styledComponents';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';

class Footer extends Component {
    render() {
        return (
            <StyledBodyDiv>
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
    padding-right: 3%;
    height: 55px;
    background-color: ${colorStyled.surfaceContainerLowest};
    color: ${colorStyled.onSurface};
    

    @media (max-width: ${MAX_WIDTH}) {
        padding-left: 1%;
        padding-right: 1%;
        height: 0;  
    }

    @media screen and (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        padding-left: 3%;
        padding-right: 3%;
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
    padding-left: 5px;

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
