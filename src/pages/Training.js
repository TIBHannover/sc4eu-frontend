import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import { Collapse, Button, Container, Table } from 'reactstrap';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { MAX_WIDTH } from '../styledComponents/styledComponents';
import styled from 'styled-components';
import { colorStyled } from '../styledComponents/styledColor';
import { fontStyled } from '../styledComponents/styledFont';

import ReactGoogleSlides from 'react-google-slides';
import { Link } from 'react-router-dom';
export default class Training extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseSection1: false,
            collapseSection2: false,
            collapseSection3: false
        };
    }

    toggleSection1 = () => {
        this.setState({ collapseSection1: !this.state.collapseSection1 });
    };

    toggleSection2 = () => {
        this.setState({ collapseSection2: !this.state.collapseSection2 });
    };

    toggleSection3 = () => {
        this.setState({ collapseSection3: !this.state.collapseSection3 });
    };

    render() {
        return (
            <>
                <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                    <Container
                        style={{
                            borderTop: 'none',
                            overflow: 'auto',
                            position: 'relative',
                            backgroundColor: '#ffffff',
                            borderRadius: '10px 10px 10px 10px ',
                            height: 'calc(100% - 80px)',
                            fontFamily: fontStyled.fontFamily
                        }}
                    >
                        <Button
                            style={{ width: '100% ', height: '45px', marginTop: '60px', textAlign: 'start', background: colorStyled.SECONDARY.dark }}
                            className="btn"
                            onClick={this.toggleSection1}
                        >
                            <Icon icon={!this.state.collapseSection1 ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
                            Presentation Material
                        </Button>
                        <Collapse isOpen={this.state.collapseSection1}>
                            <ReactGoogleSlides
                                width={'100%'}
                                height={600}
                                slidesLink="https://docs.google.com/presentation/d/154vcWKt-ei4W5b6LdTEeRhO26WPGQ0z1A5OO_UBStnw/edit?usp=sharing"
                                position={1}
                                showControls={true}
                                loop={true}
                            />
                        </Collapse>
                        <Button
                            style={{ width: '100% ', height: '45px', marginTop: '20px', textAlign: 'start', background: colorStyled.SECONDARY.dark }}
                            className="btn"
                            onClick={this.toggleSection2}
                        >
                            <Icon icon={!this.state.collapseSection2 ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
                            Video Demonstrator
                        </Button>
                        <Collapse isOpen={this.state.collapseSection2}>
                            <StyledText> Here will go the Video</StyledText>
                        </Collapse>
                        <Button
                            style={{ width: '100% ', height: '45px', marginTop: '20px', textAlign: 'start', background: colorStyled.SECONDARY.dark }}
                            className="btn"
                            onClick={this.toggleSection3}
                        >
                            <Icon icon={!this.state.collapseSection3 ? faCaretRight : faCaretDown} style={{ marginRight: '5px' }} />
                            Scientific Publication
                        </Button>
                        <Collapse isOpen={this.state.collapseSection3}>
                            <a href="https://ceur-ws.org/Vol-3376/paper10.pdf" />
                            <div style={{ padding: '20px 20px 20px 20px' }}>
                                <li>
                                    <a target="_blank" href="https://ceur-ws.org/Vol-3376/paper11.pdf" rel="noreferrer">
                                        Collaborative and Cross-Stakeholder Ontology Engineering
                                    </a>
                                </li>
                                <li>
                                    <a target="_blank" href="https://ceur-ws.org/Vol-3376/paper10.pdf " rel="noreferrer">
                                        Collaborative Work on Ontologies - A Report
                                    </a>
                                </li>
                                <li>
                                    <a
                                        target="_blank"
                                        href="https://www.researchgate.net/profile/Nour-Ramzy/publication/358523968_The_Digital_Reference_Semantically_Connecting_Semiconductor_Supply_Chains_to_Customers_-The_Open_Online_Sales_and_Marketing_Vision/links/620619e2634ff774f4c214cf/The-Digital-Reference-Semantically-Connecting-Semiconductor-Supply-Chains-to-Customers-The-Open-Online-Sales-and-Marketing-Vision.pdf"
                                        rel="noreferrer"
                                    >
                                        The Digital Reference: Semantically Connecting Semiconductor Supply Chains to Customers -The Open Online Sales
                                        and Marketing Vision
                                    </a>
                                </li>
                            </div>
                        </Collapse>
                    </Container>
                </div>
                <Footer />
            </>
        );
    }
}

const StyledText = styled.p`
    color: ${colorStyled.TEXTCOLOR};
    text-align: justify;
    margin-top: 2%;
    font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};

    @media (max-width: ${MAX_WIDTH}) {
        font-size: ${fontStyled.fontSize.MobileViewNormalText};
    }
`;
