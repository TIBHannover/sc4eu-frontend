import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import visualisation from '../assets/images/visulization.png';
import IntroductoryPopUp from '../components/IntroductoryPopUp';
import Logo from '../assets/images/logo.png';
import { StyledHomeRootDiv, StyledHomeHeadingDiv, StyledHeading, StyledHomeLogo, StyledHomeBody, StyledHomeBodyDiv, StyledBodyLogo, StyledBodyLinkBiger, StyledBodyTextBigger, StyledDivPopUp } from 'styledComponents/styledComponents';
const digitalReferenceURL = process.env.REACT_APP_DIGITAL_REFERENCE_ONTOLOGY_URL;

const DigitalReferenceTxt = (
    <>
        <p>
            The digital reference ontology, developed as part of the SC4EU project, provides a framework for creating, integrating and applying
            ontologies to the semiconductor supply chain.
        </p>
        <p>The Ontology Curation Portal supports the creation, collection and visualisation of these ontologies. Core features:</p>
        <ul>
            <li>Consolidated access to distributed ontologies via projects.</li>
            <li>Visualising ontologies.</li>
            <li>Creating new vocabularies to extend or create ontologies.</li>
        </ul>
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
                <StyledHomeRootDiv>
                    <StyledDivPopUp>
                        <IntroductoryPopUp />
                    </StyledDivPopUp>
                    <StyledHomeHeadingDiv>
                        <StyledHomeLogo src={Logo} alt="SC4EU Logo" />
                        <StyledHeading>True Demand-Driven Semiconductor Supply Chains for Europe</StyledHeading>
                    </StyledHomeHeadingDiv>
                    <StyledHomeBody>
                        <StyledHomeBodyDiv style={{ maxWidth: 700, alignSelf: 'center', marginBottom: 20 }}>
                            <StyledBodyLogo src={visualisation} alt="Digital Reference Ontology" />
                            <StyledBodyLinkBiger
                                as="a"
                                href={digitalReferenceURL}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ marginTop: 16, display: 'block', cursor: 'pointer' }}
                            >
                                Digital Reference Ontology
                            </StyledBodyLinkBiger>
                            <StyledBodyTextBigger>{DigitalReferenceTxt}</StyledBodyTextBigger>
                        </StyledHomeBodyDiv>
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                gap: 40,
                                flexWrap: 'wrap',
                                width: '100%',
                                alignSelf: 'center'
                            }}
                        ></div>
                    </StyledHomeBody>
                </StyledHomeRootDiv>
                <Footer />
            </>
        );
    }
}