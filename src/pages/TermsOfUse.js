import React, { Component } from 'react';
import { withTheme } from '@emotion/react';
import { StyledImprintDiv, StyledImprintText, StyledLinkH5 } from 'styledComponents/styledComponents';
import { Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import ROUTES from 'constants/routes';

class TermsOfUse extends Component {
    render() {
        const { theme } = this.props;
        return (
            <div style={{ width: '100%', height: '100%', overflowY: 'auto' }}>
                <style>{`
                    .terms-list { list-style: none; padding-left: 0; counter-reset: section; }
                    .terms-list > li { counter-increment: section; position: relative; padding-left: 2.5em; }
                    .terms-list > li > h5 { margin-left: 0; }
                    .terms-list > li::before { content: counter(section) "."; position: absolute; left: 0; font-weight: bold; }
                    .terms-sublist { list-style: none; padding-left: 0; counter-reset: item; }
                    .terms-sublist > li { counter-increment: item; position: relative; padding-left: 2.5em; }
                    .terms-sublist > li::before { content: counter(section) "." counter(item); position: absolute; left: 0; }
                `}</style>
                <StyledImprintDiv>
                    <h3 style={{ textAlign: 'center', color: theme.palette.text.primary, fontWeight: 'bold', paddingBottom: '2%' }}>
                        Terms of Use Vocabulary Development Support Tool (VDST)
                    </h3>
                    <StyledLinkH5>Status November 2026</StyledLinkH5>
                    <StyledImprintText>
                        <a href="https://www.tib.eu/en/service/terms-of-use" style={{ color: theme.palette.primary.main }}>
                            Terms of Use of the TIB
                        </a>{' '}
                        apply, supplemented by the following Special Conditions Vocabulary Development Support Tool (VDST).
                        <br />
                    </StyledImprintText>
                    <StyledLinkH5>Special Conditions VDST</StyledLinkH5>
                    <StyledImprintText>
                        The VDST services is provided by:
                        <br />
                        <p>Technische Informationsbibliothek (TIB)</p>
                        <p>German National Library of Science and Technology</p>
                        <br />
                        Welfengarten 1 B, 30167 Hannover, Germany
                        <br />
                        Postfach 6080, 30060 Hannover, Germany
                        <br />
                        <br />
                        Authorised Representative:
                        <br />
                        Prof. Dr. Sören Auer (Director of TIB)
                        <br />
                        Responsible Supervisory Authority:
                        <br />
                        Ministry for Science and Culture of Lower Saxony
                        <br />
                        <br />
                        Tel.no Customer Service: +49 511 762 - 8989
                        <br />
                        Fax : +49 511 762-4076
                        <br />
                        Email : &nbsp;
                        <a href="mailto:customerservice@tib.eu" style={{ color: theme.palette.primary.main }}>
                            customerservice@tib.eu
                        </a>
                        <br />
                    </StyledImprintText>
                    <ol className="terms-list">
                        <li>
                            <StyledLinkH5>Scope of Application</StyledLinkH5>
                            <ul className="terms-sublist">
                                <li>
                                    <StyledImprintText>
                                        These Special Conditions VDST regulate the use of the VDST as well as the rights and obligations of Registered
                                        Users and the TIB in addition to the Terms of Use of TIB.{' '}
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        VDST is primarily aimed at communities in building and documenting controlled vocabularies and providing them
                                        as a reliable basis for interoperable research data{' '}
                                    </StyledImprintText>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <StyledLinkH5>Registration</StyledLinkH5>
                            <ul className="terms-sublist">
                                <li>
                                    <StyledImprintText>VDST is primarily intended to be used with registration. </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        When registering, users must agree to the Special Conditions VDST and the Data Protection Declaration. If
                                        these Special Conditions VDST are updated, Registered Users will be notified of the changes two weeks in
                                        advance by email. By subsequently continuing to use VDST, Registered Users agree to the changes. .{' '}
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        A usage relationship is established between the TIB and the Registered User through registration.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        When registering, users are obliged to fill in mandatory fields truthfully and completely, to keep their data
                                        up-to-date and secret and to protect data from access by third parties.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        Accounts may be terminated for cause by TIB. A cause can be a breach of the Terms of Use or these Special
                                        Conditions or a legal obligation or official order for TIB to block the access or any other conduct, which
                                        raises the suspicion that the user violates or will violate the Terms of Use, these Special Conditions or
                                        other legal obligations also in the future.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        TIB will terminate accounts at the request of the user in text form at any time and without undue delay. All
                                        personal data in the user profile will be deleted without undue delay. Content created by users remains
                                        published as long as the TIB does not delete this content or the user does not request its deletion, whereupon
                                        the TIB will anonymise this content.
                                    </StyledImprintText>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <StyledLinkH5>VDST</StyledLinkH5>
                            <ul className="terms-sublist">
                                <li>
                                    <StyledImprintText>Registration is needed to create and modify content.</StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        The source code is made available under the{' '}
                                        <Link underline="hover" component={RouterLink} to={ROUTES.LICENSE} sx={{ color: theme.palette.primary.main }}>
                                            MIT License
                                        </Link>
                                        .
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        Registered Users confirm that published content does not infringe any third party rights (e.g. copyright,
                                        rights of performers, personality and publicity rights, data protection). If others are involved in the
                                        production, Registered Users confirm that all participants are aware of the content of this agreement and have
                                        given their consent.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        Registered Users ensure that the published content does not violate applicable law or offend common decency,
                                        in particular does not constitute a criminal offense and does not constitute an administrative offense (e.g.
                                        infringement of copyright, trademark law, competition law) or none have offensive, discriminatory, racist,
                                        pornographic or extremist content. In the event of a violation, Section 5 applies.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        If a user becomes aware of a violation of the law within the meaning of 3.3 or 3.4 he / she is obliged to
                                        inform the TIB immediately.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        Registered Users will indemnify the TIB from all claims of other users or third parties that they assert
                                        against the TIB due to infringement of their rights through content published by the respective Registered
                                        User, if the respective user can be held responsible. The respective Registered User assumes the costs of an
                                        appropriate legal defense of the TIB. This does not apply if the Registered User is not responsible for the
                                        infringement. Users are obliged to provide all information necessary for the examination of the claims and a
                                        defense in the event of a claim against the TIB truthfully and completely without further delay.
                                    </StyledImprintText>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <StyledLinkH5>Functionality of the VDST</StyledLinkH5>
                            <ul className="terms-sublist">
                                <li>
                                    <StyledImprintText>
                                        In order to use the VDST service users need to do a registration. VDST content can be reused freely for any
                                        purpose users see fit, in accordance with the CC0 License (5.2 of these Special Conditions VDST).
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        VDST provides programmatic access to the content (API). Creating and editing, including deleting, existing
                                        content via the VDST API is reserved to Registered Users.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        TIB manually curates VDST content, including metadata. In such activities, TIB also resolves personal
                                        identifiers of creators in order to reduce the ambiguity of personal names.
                                    </StyledImprintText>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <StyledLinkH5>Rights and obligations of the TIB</StyledLinkH5>
                            <ul className="terms-sublist">
                                <li>
                                    <StyledImprintText>
                                        VDST content created by Registered Users is licensed to TIB under the licence CC0 1.0 Universal{' '}
                                        <a
                                            href="https://creativecommons.org/publicdomain/zero/1.0/deed.en"
                                            style={{ color: theme.palette.primary.main }}
                                        >
                                            (CC0 1.0 Public Domain Dedication)
                                        </a>
                                        .
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        VDST content is published by TIB under CC0 1.0 Universal{' '}
                                        <a
                                            href="https://creativecommons.org/publicdomain/zero/1.0/deed.en"
                                            style={{ color: theme.palette.primary.main }}
                                        >
                                            (CC0 1.0 Public Domain Dedication)
                                        </a>
                                        .
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        The TIB assumes no liability that the service and its content are always uninterrupted, unchanged and
                                        available in full, as well as being up-to-date and free from errors of an editorial or technical nature. No
                                        liability is accepted for damage caused by trusting the content of the platform or its use.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        The TIB reserves the right to change the functionality, the appearance and these Special Conditions VDST at
                                        any time.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        The TIB is entitled to terminate its service at any time. In this case, the TIB reserves the right to delete
                                        the content. However, this does not result in an obligation to delete the content.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        The TIB provides scientific information in all areas of engineering as well as chemistry, information
                                        technology, mathematics and physics to the public. If content by Registered Users does not satisfy the quality
                                        criteria TIB generally applies to scientific information, TIB may exclude the content from its services
                                        without prior notice.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        In principle, the TIB is only liable for damage caused by intent or gross negligence. In case of injuries to
                                        life, body or health statutory provisions apply.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        Liability for damage from unauthorized use of password-protected logins by third parties is not accepted.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        Insofar as liability is limited or excluded, this also applies in favor of executive employees (m / f),
                                        representatives (m / f) and vicarious agents (m / f) of the TIB.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        If there are concrete indications of a violation of these Special Conditions VDST, the TIB is entitled to
                                        delete content, restrict the use of the services or block the Registered User concerned. When choosing a
                                        measure, the legitimate interests of the Registered User are taken into account, in particular whether there
                                        are indications that the Registered User was not responsible for the violation.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        Content that contains a legal violation according to 3.3 or 3.4 may be blocked or deleted by the TIB.
                                    </StyledImprintText>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <StyledLinkH5>Miscellaneous</StyledLinkH5>
                            <ul className="terms-sublist">
                                <li>
                                    <StyledImprintText>
                                        The usage relationship and these Special Conditions VDST are subject to German law.
                                    </StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>The place of jurisdiction is Hannover.</StyledImprintText>
                                </li>
                                <li>
                                    <StyledImprintText>
                                        In the event of a dispute, the TIB endeavors to reach an amicable settlement.
                                    </StyledImprintText>
                                </li>
                            </ul>
                        </li>
                    </ol>
                </StyledImprintDiv>
            </div>
        );
    }
}

export default withTheme(TermsOfUse);
