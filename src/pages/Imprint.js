import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import { MAX_WIDTH } from '../styledComponents/styledComponents';
import styled from 'styled-components';
import { fontStyled } from '../styledComponents/styledFont';
import { colorStyled } from '../styledComponents/styledColor';

export default class Imprint extends Component {
    render() {
        return (
            <>
                <div style={{ height: 'calc(100% - 80px)', width: '100%' }}>
                    <div style={{ width: '100%', height: '100%', overflowY: 'auto', paddingBottom: '3%' }}>
                        <StyledDiv>
                            <h3 style={{ textAlign: 'center', paddingBottom: '2%', paddingTop: '1%' }}>Imprint</h3>
                            <StyledText>
                                Imprint for this website ‐ also serves as provider identification according to § 5 Telemediengesetz (TMG)
                            </StyledText>
                            <h5>Provider:</h5>
                            <StyledText>
                                Technische Informationsbibliothek (TIB)
                                <br />
                                Welfengarten 1 B, 30167 Hannover
                                <br />
                                Postfach 6080, 30060 Hannover
                                <br />
                            </StyledText>

                            <h5>Authorised Representative:</h5>

                            <StyledText>
                                Prof. Dr. Sören Auer (Director of TIB)
                                <br />
                                Technische Informationsbibliothek (TIB) is a foundation of public law of the state of Lower Saxony.
                                <br />
                            </StyledText>

                            <h5>Responsible Supervisory Authority:</h5>

                            <StyledText>Ministry for Science and Culture of Lower Saxony</StyledText>

                            <h5>Contact:</h5>

                            <StyledText>
                                Customer service phone : +49 511 762-8989
                                <br />
                                Central information desk phone : +49 511 762-2268
                                <br />
                                Fax : +49 511 762-4076
                                <br />
                                Email : &nbsp;
                                <a href="mailto:information@tib.eu" style={{ color: colorStyled.SECONDARY.link }}>
                                    information(AT)tib.eu
                                </a>
                                <br />
                            </StyledText>

                            <h5>VAT (sales tax) registration number :</h5>

                            <StyledText>DE 214931803</StyledText>

                            <h5>Editorial Office:</h5>

                            <StyledText>
                                Felix Engel
                                <br />
                                Email : &nbsp;
                                <a href="mailto:felix.engel@tib.eu" style={{ color: colorStyled.SECONDARY.link }}>
                                    felix.engel(AT)tib.eu
                                </a>
                                <br />
                            </StyledText>

                            <h5>Copyright Notice:</h5>

                            <StyledText>
                                The layout of the homepage, the graphics used and the other content are protected by copyright.
                                <br />
                            </StyledText>
                        </StyledDiv>
                    </div>
                </div>
                <Footer />
            </>
        );
    }
}

const StyledDiv = styled.div`
    padding-top: 20px;
    padding-left: 20%;
    padding-right: 20%;
    font-family: ${fontStyled.fontFamily};

    @media (max-width: ${MAX_WIDTH}) {
        padding-left: 10%;
        padding-right: 10%;
    }
`;

const StyledText = styled.p`
    color: ${colorStyled.TEXTCOLOR};
    text-align: justify;
    font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};

    @media (max-width: ${MAX_WIDTH}) {
        font-size: ${fontStyled.fontSize.MobileViewNormalText};
    }
`;
