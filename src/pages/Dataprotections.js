import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import { PRIMARY, SECONDARY, TEXTCOLOR } from '../styledComponents/styledComponents';

export default class Dataprotections extends Component {
    render() {
        return (
            <div style={{ width: '100%', height: '100%', backgroundColor: PRIMARY.lighter }}>
                <div
                    style={{
                        width: '100%',
                        height: '90%',
                        overflowY: 'auto',
                        alignItems: 'center',
                        paddingLeft: '300px',
                        paddingRight: '300px'
                    }}
                >
                    <h2
                        style={{
                            marginTop: '20px'
                        }}
                    >
                        Privacy Statement
                    </h2>
                    <p style={{ color: TEXTCOLOR, textAlign: 'justify' }}>
                        Data protection is of high priority for the Technische Informationsbibliothek (TIB). As a general rule, the use of TIBʼs
                        services does not require the provision of any personal data. However, the processing of personal data may be required where a
                        data subject wants to use special services via the TIBʼs web pages. Where the processing of personal data is required and
                        where there is no legal basis for such processing, we shall obtain the data subject's consent.
                        <br />
                        The processing of personal data, such as for example the data subject's name, address, email address, or telephone number
                        shall always be carried out in accordance with the General Data Protection Regulation (GDPR) and the state and
                        institution-specific data protection rules and regulations applicable to the TIB. This privacy statement serves to inform the
                        public about the nature, scope and purpose of the personal data we collect, use and process, as well as of the rights data
                        subjects are entitled to.
                        <br />
                        The terms used in this privacy statement are to be understood within the meaning of the European General Data Protection
                        General Data Protection Regulation (GDPR).
                    </p>
                    <h3>Name and address of the controller</h3>
                    <p style={{ color: TEXTCOLOR, textAlign: 'justify' }}>
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
                        <a href="https://www.tib.eu" style={{ color: SECONDARY.link }} target="_blank" rel="noreferrer">
                            www.tib.eu
                        </a>
                        <br />
                        Website :&nbsp;
                        <a href="https://www.tib.eu" style={{ color: SECONDARY.link }} target="_blank" rel="noreferrer">
                            www.tib.eu
                        </a>
                    </p>
                    <h3>Name and address of the data protection officer</h3>
                    <p style={{ color: TEXTCOLOR, textAlign: 'justify' }}>
                        The data protection officer of the controller shall be:
                        <br />
                        Elke Brehm
                        <br />
                        Phone : +49 511 762-8138
                        <br />
                        Email : &nbsp;
                        <a href="mailto:datenschutz@tib.eu" style={{ color: SECONDARY.link }}>
                            datenschutz(AT)tib.eu
                        </a>
                        <br />
                    </p>
                    <h4>Postal Address :</h4>
                    <p style={{ color: TEXTCOLOR, textAlign: 'justify' }}>
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
                    </p>
                    <h4>Visiting Address:</h4>
                    <p style={{ color: TEXTCOLOR, textAlign: 'justify' }}>
                        TIB Conti-Campus
                        <br />
                        Königsworther Platz 1 B
                        <br />
                        30167 Hannover
                        <br />
                    </p>
                    <p style={{ color: TEXTCOLOR, textAlign: 'justify' }}>
                        Any data subject may contact our data protection officer directly regarding any and all questions and suggestions regarding
                        data protection at any time.
                        <br />
                    </p>
                    <h3>Cookies</h3>
                    <p style={{ color: TEXTCOLOR, textAlign: 'justify' }}>
                        The TIB websites use cookies. Cookies are text files that are placed and stored on a computer system via an Internet browser
                        and serve to render the offer of the TIB more user-friendly, effective and secure.
                        <br />
                        Most of the cookies used are so-called <q>session cookies</q>, which are automatically deleted at the end of the visit. Other
                        cookies remain stored on the user's terminal device until he or she deletes them. These cookies enable the TIB to recognise
                        the user's browser on his or her next visit.
                        <br />
                        Users can prevent and permanently object to the setting of cookies by TIB websites at any time by choosing the corresponding
                        settings of the Internet browser used. Furthermore, cookies already set can be deleted at any time with the Internet browser
                        or by other software programs. This is possible in all common Internet browsers. If the data subject deactivates the setting
                        of cookies in the Internet browser used, the TIB web pages may not function properly.
                        <br />
                    </p>

                    <h3>Web Analytics</h3>
                    <p style={{ color: TEXTCOLOR, textAlign: 'justify' }}>
                        The information generated with Matomo about the use of this website is processed and stored exclusively by TIB.
                    </p>
                    <div>
                        <iframe
                            title="data policy"
                            src="https://support.tib.eu/piwik/index.php?module=CoreAdminHome&amp;action=optOut&amp;language=en&amp;backgroundColor=&amp;fontColor=&amp;fontSize=&amp;fontFamily=sans-serif"
                            style={{ border: 0, height: '200px', width: '600px', color: TEXTCOLOR, textAlign: 'justify' }}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
