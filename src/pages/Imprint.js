import React, { Component } from 'react';
import { withTheme } from '@emotion/react'
import { StyledImprintDiv, StyledImprintText, StyledLinkH5 } from 'styledComponents/styledComponents';

class Imprint extends Component {
    render() {
        const { theme } = this.props;
        return (
            <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <StyledImprintDiv>
                    <h3 style={{ textAlign: 'center', color: theme.palette.text.primary }}>Imprint</h3>
                    <StyledImprintText>Imprint for this website ‐ also serves as provider identification according to § 5 Telemediengesetz (TMG)</StyledImprintText>
                    <StyledLinkH5>Provider:</StyledLinkH5>
                    <StyledImprintText>
                        Technische Informationsbibliothek (TIB)
                        <br />
                        Welfengarten 1 B, 30167 Hannover
                        <br />
                        Postfach 6080, 30060 Hannover
                        <br />
                    </StyledImprintText>

                    <StyledLinkH5>Authorised Representative:</StyledLinkH5>

                    <StyledImprintText>
                        Prof. Dr. Sören Auer (Director of TIB)
                        <br />
                        Technische Informationsbibliothek (TIB) is a foundation of public law of the state of Lower Saxony.
                        <br />
                    </StyledImprintText>

                    <StyledLinkH5>Responsible Supervisory Authority:</StyledLinkH5>

                    <StyledImprintText>Ministry for Science and Culture of Lower Saxony</StyledImprintText>

                    <StyledLinkH5>Contact:</StyledLinkH5>

                    <StyledImprintText>
                        Customer service phone : +49 511 762-8989
                        <br />
                        Central information desk phone : +49 511 762-2268
                        <br />
                        Fax : +49 511 762-4076
                        <br />
                        Email : &nbsp;
                        <a href="mailto:information@tib.eu" style={{ color: theme.palette.primary.main }}>
                            information(AT)tib.eu
                        </a>
                        <br />
                    </StyledImprintText>

                    <StyledLinkH5>VAT (sales tax) registration number :</StyledLinkH5>

                    <StyledImprintText>DE 214931803</StyledImprintText>

                    <StyledLinkH5>Editorial Office:</StyledLinkH5>

                    <StyledImprintText>
                        Felix Engel
                        <br />
                        Email : &nbsp;
                        <a href="mailto:felix.engel@tib.eu" style={{ color: theme.palette.primary.main }}>
                            felix.engel(AT)tib.eu
                        </a>
                        <br />
                    </StyledImprintText>

                    <StyledLinkH5>Copyright Notice:</StyledLinkH5>

                    <StyledImprintText>
                        The layout of the homepage, the graphics used and the other content are protected by copyright.
                        <br />
                    </StyledImprintText>
                </StyledImprintDiv>
            </div>
        );
    }
}

export default withTheme(Imprint);