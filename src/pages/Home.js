import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import collection from '../assets/images/collection.png';
import edite from '../assets/images/Edit.png';
import visualisation from '../assets/images/visulization.png';
import { MAX_WIDTH, MIN_WIDTH_FOR_MONITOR } from '../styledComponents/styledComponents';
import IntroductoryPopUp from '../components/IntroductoryPopUp';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ROUTES from 'constants/routes';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';
import Logo from '../assets/images/logo.png';
import GoogleSurvey from '../components/GoogleSurvey';
const digitalReferenceURL = process.env.REACT_APP_DIGITAL_REFERENCE_ONTOLOGY_URL;

const CurationTxt = (
    <>
        {'The SC4EU Ontology Curation Portal enables you to collect all ontologies relevant for your research project.' +
            ' You can create new collections and add as much ontologies as you like.'}
    </>
);
const VisualizationTxt = (
    <>
        {'Creation of ontologies requires expertise from various stakeholders with different ontology proficiency levels.' +
            ' The portal allows easy translation of visualizations for various expert groups.'}
    </>
);
const EditingTxt = (
    <>
        {'Collaborative editing of ontologies is the next step in the ontology agreement process. The SC4EU Ontology ' +
            'Curation Portal integrates the broadly known WebProtege for collaborative editing.'}
    </>
);

const DigitalReferenceTxt = (
    <>{'The Digital Reference Ontology provides a comprehensive framework for understanding and utilizing semiconductor supply chain ontologies.'}</>
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
                    <StyledHeadingDiv>
                        <StyledLogo src={Logo} alt="SC3 Logo" />
                        <StyledHeading>True Demand-Driven Semiconductor Supply Chains for Europe</StyledHeading>
                    </StyledHeadingDiv>
                    <StyledBody>
                        <StyledBodyDiv>
                            <StyledBodyLogo src={edite} alt="edite" />
                            <StyledBodyLink to={ROUTES.PROJECT} style={{ marginTop: '20px' }}>
                                Collaborative Ontology Curation
                            </StyledBodyLink>
                            <StyledBodyText>{CurationTxt}</StyledBodyText>
                        </StyledBodyDiv>
                        <StyledBodyDiv>
                            <StyledBodyLogo src={visualisation} alt="visualisation" />
                            <StyledBodyLink to={ROUTES.PROJECT} style={{ marginTop: '20px' }}>
                                Ontology Visualisation
                            </StyledBodyLink>
                            <StyledBodyText>{VisualizationTxt}</StyledBodyText>
                        </StyledBodyDiv>
                        <StyledBodyDiv>
                            <StyledBodyLogo src={collection} alt="collection" />
                            <StyledBodyLink to={digitalReferenceURL} style={{ marginTop: '20px' }}>
                                Digital Reference Ontology
                            </StyledBodyLink>
                            <StyledBodyText>{DigitalReferenceTxt}</StyledBodyText>
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
    height: 90%;
    margin: auto;
    text-align: center;
    padding-top: 100px;
    margin-left: 10%;
    margin-right: 10%;
    display: flex;
    color: black;

    @media (max-width: ${MAX_WIDTH}) {
        height: 90%;
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
    width: 200px;
    height: 170px;
    align-self: center;
    margin-top: -20px;

    @media (max-width: ${MAX_WIDTH}) {
        width: 110px;
        height: 90px;
        align-self: center;
        margin-bottom: 10px;
    }

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        width: 240px;
        height: 210px;
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

const StyledBodyText = styled.p`
    font-size: ${fontStyled.fontSize.NormalText};
    font-family: ${fontStyled.fontFamily};
    text-align: justify;
    text-align-last: center;
    color: ${colorStyled.TEXTCOLOR};

    @media (max-width: ${MAX_WIDTH}) {
        font-size: ${fontStyled.fontSize.MobileViewNormalText};
    }

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.DesktopViewNormalText};
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
