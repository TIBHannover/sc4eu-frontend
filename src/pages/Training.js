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
export default class Training extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseSection1: false,
            collapseSection2: false
        };
    }

    toggleSection1 = () => {
        this.setState({ collapseSection1: !this.state.collapseSection1 });
    };

    toggleSection2 = () => {
        this.setState({ collapseSection2: !this.state.collapseSection2 });
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
