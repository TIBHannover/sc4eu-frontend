import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import { MAX_WIDTH, MIN_WIDTH_FOR_MONITOR } from '../styledComponents/styledComponents';
import IntroductoryPopUp from '../components/IntroductoryPopUp';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';
import Logo from '../assets/images/nfdi4ing_logo.svg';
import GoogleSurvey from '../components/GoogleSurvey';
import Typography from "@mui/material/Typography";

const VocabularyReferenceTxt = (
    <>
        <p>
            You could find more information about the tool in about Portal and FAQ sections in a menu on the left side.
        </p>
    </>
);

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isreadmore: false
        };
    }

    render() {
        return (
            <>
                <StyledRootDiv>
                    <StyledDivPopUp>
                        <IntroductoryPopUp />
                    </StyledDivPopUp>
                    <StyledBody>
                        <StyledBodyDiv style={{ maxWidth: 700, alignSelf: 'center', marginBottom: 20 }}>
                            <StyledBodyLogo src={Logo} alt="Welcome to the testing Vocabulary platform" />
                            <Typography variant="h4">
                                Welcome to the Sandbox Vocabulary Development Support Tool (VDST) server
                            </Typography>
                            <StyledBodyTextBigger>{VocabularyReferenceTxt}</StyledBodyTextBigger>
                        </StyledBodyDiv>
                    </StyledBody>
                </StyledRootDiv>
                <StyledSurveyDiv>
                    <GoogleSurvey />
                </StyledSurveyDiv>
                <Footer />
            </>
        );
    }
}

const StyledRootDiv = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const StyledHeadingDiv = styled.div`
    display: flex;
    justify-content: center;
    height: 10%;

    @media (max-width: ${MAX_WIDTH}) {
        display: none;
    }
`;

const StyledHeading = styled.div`
    font-size: ${fontStyled.fontSize.subHeading};
    margin-top: 4%;
    color: black;
    font-weight: 600;
    font-family: sans-serif;
    text-align-last: center;

    @media (max-width: ${MAX_WIDTH}) {
        font-size: 12px;
        margin-top: 3%;
        text-align: center;
        color: black;
        font-weight: 600;
        font-family: sans-serif;
        margin-right: 25px;
    }
    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.mainHeading};
    }
`;

const StyledLogo = styled.img`
    height: 70px;
    width: 70px;
    margin-right: 10px;
    float: left;
    margin-top: 3%;

    @media (max-width: ${MAX_WIDTH}) {
        height: 25px;
        width: 45px;
    }
    overflow: auto;
`;

const StyledBody = styled.div`
    height: auto;
    margin: auto;
    text-align: center;
    padding-top: 50px;
    margin-left: 10%;
    margin-right: 10%;
    display: flex;
    flex-direction: column;
    color: black;

    @media (max-width: ${MAX_WIDTH}) {
        height: auto;
        flex-direction: column;
        text-align: center;
        margin-left: 2%;
        padding-top: 5%;
        margin-right: 2%;
        display: flex;
        color: black;
        margin-bottom: 0px;
        overflow: auto;
    }

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        margin-left: 15%;
        margin-right: 15%;
    }
`;

const StyledBodyDiv = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 1%;
    padding-right: 3%;

    @media (max-width: ${MAX_WIDTH}) {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-left: 2.5%;
        padding-right: 2.5%;
    }
`;

const StyledBodyLogo = styled.img`
    width: 450px;
    height: auto;
    align-self: center;
    margin-top: -20px;

    @media (max-width: ${MAX_WIDTH}) {
        width: 180px;
        height: auto;
        align-self: center;
        margin-bottom: 10px;
    }

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        width: 360px;
        height: auto;
    }
`;

const StyledBodyLinkBiger = styled(Link)`
    font-size: ${fontStyled.fontSize.mainHeading};
    font-weight: 600;
    color: black;
    padding-bottom: 3%;
    font-family: ${fontStyled.fontFamily};

    @media (max-width: ${MAX_WIDTH}) {
        font-size: ${fontStyled.fontSize.MobileViewHeading};
    }

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.DesktopViewSubHeading};
    }
`;

const StyledBodyLink = styled(Link)`
    font-size: ${fontStyled.fontSize.subHeading};
    font-weight: 600;
    color: black;
    padding-bottom: 3%;
    font-family: ${fontStyled.fontFamily};

    @media (max-width: ${MAX_WIDTH}) {
        font-size: ${fontStyled.fontSize.MobileViewHeading};
    }

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.DesktopViewSubHeading};
    }
`;

const StyledBodyTextBigger = styled.div`
    font-size: calc(${fontStyled.fontSize.NormalText} * 1.3);
    font-family: ${fontStyled.fontFamily};
    line-height: 1.6;
    color: ${colorStyled.TEXTCOLOR};
    text-align: left;
    margin-top: 1rem;

    p {
        margin-bottom: 1rem;
        text-align: justify;
    }

    ul {
        margin-top: 0.5rem;
        list-style-type: disc;
    }

    li {
        margin-bottom: 0.5rem;
    }

    @media (max-width: ${MAX_WIDTH}) {
        font-size: calc(${fontStyled.fontSize.MobileViewNormalText} * 1.3);
    }

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: calc(${fontStyled.fontSize.DesktopViewNormalText} * 1.3);
    }
`;


const StyledBodyText = styled.p`
    font-size: calc(${fontStyled.fontSize.NormalText} * 1.15);
    font-family: ${fontStyled.fontFamily};
    text-align: justify;
    text-align-last: center;
    color: ${colorStyled.TEXTCOLOR};

    @media (max-width: ${MAX_WIDTH}) {
        font-size: calc(${fontStyled.fontSize.MobileViewNormalText} * 1.15);
    }

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: calc(${fontStyled.fontSize.DesktopViewNormalText} * 1.15);
    }
`;

const StyledVisLogo = styled.img`
    width: 200px;
    height: 120px;
    align-self: center;

    @media (max-width: ${MAX_WIDTH}) {
        width: 90px;
        height: 80px;
        align-self: center;
    }

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        width: 240px;
        height: 160px;
    }
`;

const StyledEditLogo = styled.img`
    width: 180px;
    height: 120px;
    align-self: center;
    margin-right: 20%;
    padding-right: 8%;

    @media (max-width: ${MAX_WIDTH}) {
        width: 100px;
        height: 75px;
        align-self: center;
        margin-right: 1%;
        margin-top: 4%;
    }

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        width: 220px;
        height: 160px;
    }
`;

const StyledSurveyDiv = styled.div`
    position: fixed;
    display: block;
    bottom: 80px;
    right: 0;

    @media (max-width: ${MAX_WIDTH}) {
        display: none;
    }
`;

const StyledDivPopUp = styled.div`
    display: block;

    @media (max-width: ${MAX_WIDTH}) {
        display: none;
    }
`;

const SmallLogoLeft = styled.img`
    width: 105px;
    height: 105px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-60%, -40%);
    z-index: 2;
`;

const SmallLogoRight = styled.img`
    width: 80px;
    height: 80px;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(15%, -50%);
    z-index: 2;
`;
