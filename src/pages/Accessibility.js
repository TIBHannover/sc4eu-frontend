import React, { Component } from 'react';
import { withTheme } from '@emotion/react';
import { StyledImprintDiv, StyledImprintText, StyledLinkH5 } from 'styledComponents/styledComponents';

class Accessibility extends Component {
    render() {
        const { theme } = this.props;
        const linkStyle = { color: theme.palette.primary.main };
        const listStyle = { color: theme.palette.text.secondary, textAlign: 'justify' };

        return (
            <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <StyledImprintDiv>
                    <h3 style={{ textAlign: 'center', color: theme.palette.text.primary, fontWeight: 'bold', paddingBottom: '2%' }}>Accessibility Statement</h3>
                    <StyledImprintText>
                        Information on the accessibility of these web pages and its contact details in accordance with § 9b NBGG
                        <br />
                        Date of this declaration: 10 November 2026
                        <br />
                        This accessibility statement applies to https://www.service.tib.eu and its sub-pages.
                    </StyledImprintText>
                    <h6 style={{ color: theme.palette.text.primary, fontWeight: 'bold', paddingBottom: '1%', fontSize: '1.15rem' }}>
                        These websites are mostly compatible with the requirements of the harmonized European standard EN 301 549 V2.1.2 (08-2018) and
                        WCAG 2.1 (Web Content Accessibility Guidelines).
                    </h6>

                    <StyledLinkH5>Establishment of this Accessibility Statement:</StyledLinkH5>
                    <StyledImprintText>
                        This statement was established on 10 November 2026 and will be updated annually. The assessment is based on self-assessment.
                    </StyledImprintText>

                    <StyledLinkH5>Feedback and contact details:</StyledLinkH5>
                    <StyledImprintText>You can report cases of non-compliance with accessibility requirements to us.</StyledImprintText>
                    <StyledImprintText>
                        Technische Informationsbibliothek (TIB)
                        <br />
                        Vertrauensperson der TIB für schwerbehinderte Menschen
                        <br />
                        Postfach 60 80, 30060 Hannover
                        <br />
                        Phone :{' '}
                        <a href="tel:+4951176217806" style={linkStyle}>
                            +49 (0)511 762-17806
                        </a>
                        <br />
                        Email : &nbsp;
                        <a href="mailto:SBV@tib.eu" style={linkStyle}>
                            SBV@tib.eu
                        </a>
                    </StyledImprintText>

                    <StyledLinkH5>Arbitration procedure:</StyledLinkH5>
                    <StyledImprintText>
                        If you are not satisfied with the answers of our above-mentioned contact point, you can contact the arbitration office, which
                        is located at the State Representative for People with Disabilities in Lower Saxony, for the initiation of an arbitration
                        procedure in accordance with the Niedersächsisches Behindertengleichstellungsgesetz (Disability Equality Act of Lower Saxony)
                        (NBGG).
                    </StyledImprintText>
                    <StyledImprintText>
                        The arbitration office has the task according to § 9 d NBGG of settling disputes between people with disabilities and public
                        institutions of the state of Lower Saxony on the topic of accessibility in IT. The arbitration procedure is free of charge. No
                        legal counsels are required.
                    </StyledImprintText>
                    <StyledImprintText>
                        You can contact the arbitration office directly at:
                        <br />
                        Phone :{' '}
                        <a href="tel:+495111204010" style={linkStyle}>
                            +49 (0)511/120-4010
                        </a>
                        <br />
                        Email : &nbsp;
                        <a href="mailto:schlichtungsstelle@ms.niedersachsen.de" style={linkStyle}>
                            schlichtungsstelle@ms.niedersachsen.de
                        </a>
                    </StyledImprintText>
                </StyledImprintDiv>
            </div>
        );
    }
}

export default withTheme(Accessibility);
