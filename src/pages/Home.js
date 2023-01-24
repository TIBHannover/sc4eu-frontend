import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import collection from '../assets/images/collection.png';
import edite from '../assets/images/Edit.png';
import visualisation from '../assets/images/visulization.png';
import { MAX_WIDTH, PRIMARY, TEXTCOLOR } from '../styledComponents/styledComponents';
import Logo from '../assets/images/logo.png';
import IntroductoryPopUp from '../components/IntroductoryPopUp';
import styled from 'styled-components';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isreadmore: false
        };
    }

    render() {
        return (
            <StyledRootDiv style={{ width: '100%', height: '100%', backgroundColor: PRIMARY.lighter }}>
                <IntroductoryPopUp />
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <StyledLogo src={Logo} alt="SC3 Logo" />
                    <StyledHeading>
                        The SC3 Portal Enables Effective Ontology Management and Visualization for Cross-stakeholder Ontology Engineering
                    </StyledHeading>
                </div>
                <StyledBody>
                    <StyledBodyDiv>
                        <StyledBodyLogo src={collection} alt="collection" style={{ marginTop: '-20px' }} />
                        <StyledBodyHeading style={{ marginTop: '-10px' }}>Collection</StyledBodyHeading>
                        <StyledBodyText>
                            The SC3 Portal enables you to collect all ontologies relevant for your research project. You can create new collections
                            and add as much ontologies as you like.
                        </StyledBodyText>
                    </StyledBodyDiv>
                    <StyledBodyDiv>
                        <StyledVisLogo src={visualisation} alt="visualisation" />
                        <StyledBodyHeading style={{ marginTop: '20px' }}>Visualisation</StyledBodyHeading>
                        <StyledBodyText>
                            Creation of ontologies requires expertise from various stakeholders with different ontology proficiency levels. The portal
                            allows easy translation of visualizations for various expert groups.
                        </StyledBodyText>
                    </StyledBodyDiv>
                    <StyledBodyDiv>
                        <StyledEditLogo src={edite} alt="edite" />
                        <StyledBodyHeading style={{ marginTop: '20px' }}>Editing</StyledBodyHeading>
                        <StyledBodyText>
                            Collaborative editing of ontologies is the next step in the ontology agreement process. The SC3 portal integrates the
                            broadly known WebProtege for collaborative editing.
                        </StyledBodyText>
                    </StyledBodyDiv>
                </StyledBody>
                <Footer />
            </StyledRootDiv>
        );
    }
}

const StyledRootDiv = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${PRIMARY.lighter};

    @media (max-width: ${MAX_WIDTH}) {
        overflow: scroll;
    }
`;

const StyledHeading = styled.div`
    font-size: 26px;
    margin-top: 4%;
    padding-bottom: 50px;
    padding-left: 1%;
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
`;

const StyledLogo = styled.img`
    height: 80px;
    width: 70px;
    margin-left: 5%;
    float: left;
    margin-top: 3%;

    @media (max-width: ${MAX_WIDTH}) {
        height: 25px;
        width: 25px;
    }
`;

const StyledBody = styled.div`
    margin: auto;
    font-size: 14px;
    text-align: center;
    padding-top: 50px;
    padding-bottom: 20px;
    margin-left: 15%;
    margin-right: 15%;
    display: flex;
    color: black;

    @media (max-width: ${MAX_WIDTH}) {
        margin: auto;
        flex-direction: column;
        font-size: 8px;
        text-align: center;
        padding-top: 20px;
        padding-bottom: 5px;
        margin-left: 2%;
        margin-right: 2%;
        display: flex;
        color: black;
        margin-bottom: 20px;
    }
`;

const StyledBodyDiv = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-left: 10px;
    padding-right: 35px;

    @media (max-width: ${MAX_WIDTH}) {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding-left: 25px;
        padding-right: 25px;
    }
`;

const StyledBodyLogo = styled.img`
    width: 210px;
    height: 190px;
    align-self: center;

    @media (max-width: ${MAX_WIDTH}) {
        width: 110px;
        height: 90px;
        align-self: center;
    }
`;

const StyledBodyHeading = styled.p`
    font-size: 26px;
    font-weight: 600;
    font-family: sans-serif;
    margin-top: -10px;

    @media (max-width: ${MAX_WIDTH}) {
        font-size: 16px;
        font-weight: 600;
        font-family: sans-serif;
    }
`;

const StyledBodyText = styled.p`
    font-size: 16px;
    font-family: sans-serif;
    text-align: justify;
    text-align-last: center;
    color: ${TEXTCOLOR};

    @media (max-width: ${MAX_WIDTH}) {
        font-size: 12px;
    }
`;

const StyledVisLogo = styled.img`
    width: 190px;
    height: 140px;
    align-self: center;

    @media (max-width: ${MAX_WIDTH}) {
        width: 90px;
        height: 80px;
        align-self: center;
    }
`;

const StyledEditLogo = styled.img`
    width: 190px;
    height: 140px;
    align-self: center;
    margin-right: 70px;

    @media (max-width: ${MAX_WIDTH}) {
        width: 90px;
        height: 75px;
        align-self: center;
        margin-right: 20px;
    }
`;
