import React, { Component } from 'react';
import { withTheme } from '@emotion/react';
import { StyledDataProtectionDiv, StyledDataProtectionText } from 'styledComponents/styledComponents';
class Dataprotections extends Component {
    render() {
        const { theme } = this.props;
        return (
            <StyledDataProtectionDiv>
                <h3 style={{ textAlign: 'center', paddingBottom: '2%', paddingTop: '1%', color: theme.palette.text.secondary }}>
                    Privacy Statement{' '}
                </h3>
                <StyledDataProtectionText>
                    Data protection is of high priority for the Technische Informationsbibliothek (TIB). As a general rule, the use of TIBʼs services
                    does not require the provision of any personal data. However, the processing of personal data may be required where a data subject
                    wants to use special services via the TIBʼs web pages. Where the processing of personal data is required and where there is no
                    legal basis for such processing, we shall obtain the data subject's consent.
                    <br />
                    The processing of personal data, such as for example the data subject's name, address, email address, or telephone number shall
                    always be carried out in accordance with the General Data Protection Regulation (GDPR) and the state and institution-specific data
                    protection rules and regulations applicable to the TIB. This privacy statement serves to inform the public about the nature, scope
                    and purpose of the personal data we collect, use and process, as well as of the rights data subjects are entitled to.
                    <br />
                    The terms used in this privacy statement are to be understood within the meaning of the European General Data Protection General
                    Data Protection Regulation (GDPR).
                </StyledDataProtectionText>
                <h5 style={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>Name and address of the controller</h5>
                <StyledDataProtectionText>
                    The controller under data protection law shall be:
                    <br />
                    Technische Informationsbibliothek (TIB)
                    <br />
                    Welfengarten 1 B
                    <br />
                    30167 Hannover
                    <br />
                    Germany
                    <br />
                    Phone : +49 511 762-8989
                    <br />
                    Email :&nbsp;
                    <a href="https://www.tib.eu" style={{ color: theme.palette.primary.main }} target="_blank" rel="noreferrer">
                        www.tib.eu
                    </a>
                    <br />
                    Website :&nbsp;
                    <a href="https://www.tib.eu" style={{ color: theme.palette.primary.main }} target="_blank" rel="noreferrer">
                        www.tib.eu
                    </a>
                </StyledDataProtectionText>
                <h5 style={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>Name and address of the data protection officer</h5>
                <StyledDataProtectionText>
                    The data protection officer of the controller shall be:
                    <br />
                    Elke Brehm
                    <br />
                    Phone : +49 511 762-8138
                    <br />
                    Email : &nbsp;
                    <a href="mailto:datenschutz@tib.eu" style={{ color: theme.palette.primary.main }}>
                        datenschutz(AT)tib.eu
                    </a>
                    <br />
                </StyledDataProtectionText>
                <h5 style={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>Postal Address :</h5>
                <StyledDataProtectionText>
                    Technische Informationsbibliothek (TIB)
                    <br />
                    data protection officer
                    <br />
                    Welfengarten 1 B
                    <br />
                    30167 Hannover
                    <br />
                    Germany
                    <br />
                </StyledDataProtectionText>
                <h5 style={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>Visiting Address:</h5>
                <StyledDataProtectionText>
                    TIB Conti-Campus
                    <br />
                    Königsworther Platz 1 B
                    <br />
                    30167 Hannover
                    <br />
                </StyledDataProtectionText>
                <StyledDataProtectionText>
                    Any data subject may contact our data protection officer directly regarding any and all questions and suggestions regarding data
                    protection at any time.
                    <br />
                </StyledDataProtectionText>
                <h5 style={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>Registration</h5>
                <StyledDataProtectionText>
                    Users must register in order to use the vocabulary service. Registration is possible with an email address and a password, or via
                    an external OAuth provider (GitHub, GitLab, Google, SAP). When registering, personal data is collected in order to be able to
                    provide personalized and generally improved services to users. Services that require user authentication cannot be used without
                    providing the required data.
                    <br />
                    When registering with an email address, the email address is used to identify the account and to contact the user about it. It is
                    stored as provided, so that it can be used for login and communication. Passwords are never stored in plain text; they are stored
                    only as salted hashes (SHA-256 crypt). When using an OAuth provider, the data provided by that provider (e.g. name and email
                    address) is processed in accordance with the privacy policy of the respective provider.
                    <br />
                    The legal basis for the collection of such data shall be the{' '}
                    <a href="https://www.tib.eu/en/terms-of-use" style={{ color: theme.palette.primary.main}} target="_blank" rel="noreferrer">
                        Terms of use of the TIB
                    </a>
                    , the special conditions applicable to this service, or the consent given by the user.
                </StyledDataProtectionText>
                <h5 style={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>Terms and discussions stored on GitHub</h5>
                <StyledDataProtectionText>
                    Vocabulary terms and the discussions about them are stored in a publicly accessible GitHub repository. Anything submitted there,
                    including the content of a term or comment and the associated username, is therefore openly visible to everybody and may be
                    copied, indexed and archived by third parties. Please do not include any personal data in terms or discussions that you do not
                    wish to be made public. Data on GitHub is processed in accordance with the{' '}
                    <a
                        href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement"
                        style={{ color: theme.palette.primary.main}}
                        target="_blank"
                        rel="noreferrer"
                    >
                        GitHub Privacy Statement
                    </a>
                    . Removal of such content can be requested from the controller.
                </StyledDataProtectionText>
                <h5 style={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>Cookies</h5>
                <StyledDataProtectionText>
                    The TIB websites use cookies. Cookies are text files that are placed and stored on a computer system via an Internet browser and
                    serve to render the offer of the TIB more user-friendly, effective and secure.
                    <br />
                    Most of the cookies used are so-called <q>session cookies</q>, which are automatically deleted at the end of the visit. Other
                    cookies remain stored on the user's terminal device until he or she deletes them. These cookies enable the TIB to recognise the
                    user's browser on his or her next visit.
                    <br />
                    Users can prevent and permanently object to the setting of cookies by TIB websites at any time by choosing the corresponding
                    settings of the Internet browser used. Furthermore, cookies already set can be deleted at any time with the Internet browser or by
                    other software programs. This is possible in all common Internet browsers. If the data subject deactivates the setting of cookies
                    in the Internet browser used, the TIB web pages may not function properly.
                    <br />
                </StyledDataProtectionText>

                <h5 style={{ color: theme.palette.text.secondary, fontWeight: 'bold' }}>Use of web analysis tools (Matomo plugin)</h5>
                <StyledDataProtectionText>
                    This website uses the open source web analytics software Matomo (matomo.org) to analyse usage data in order to optimise its online
                    offer. TIB self-hosts Matomo and no data is shared with third parties. Cookies are used to enable a statistical analysis of the
                    use of this website by its visitors. There is no other use, merging with other data or disclosure to third parties.
                    <br />
                    The information generated with Matomo about the use of this website is processed and stored exclusively by TIB. You can opt out
                    below: an opt-out cookie is placed in your browser, which prevents Matomo from storing usage data. When cookies are deleted, the
                    opt-out cookie is also deleted and the opt-out must be declared again on your next visit.
                </StyledDataProtectionText>
                <div>
                    <iframe
                        title="data policy"
                        src="https://support.tib.eu/piwik/index.php?module=CoreAdminHome&amp;action=optOut&amp;language=en&amp;backgroundColor=&amp;fontColor=&amp;fontSize=&amp;fontFamily=sans-serif"
                        style={{ border: 0, height: '250px', width: '100%', color: theme.palette.text.secondary, textAlign: 'justify' }}
                    />
                </div>
            </StyledDataProtectionDiv>
        );
    }
}

export default withTheme(Dataprotections);
