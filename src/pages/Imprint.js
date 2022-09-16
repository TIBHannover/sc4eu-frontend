import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import { PRIMARY, TEXTCOLOR, SECONDARY } from '../styledComponents/styledComponents';

export default class Imprint extends Component {
    render() {
        return (
            <div style={{ height: '100%', width: '100%', backgroundColor: PRIMARY.lighter }}>
                <div style={{ width: '100%', height: '100%', overflowY: 'auto', paddingBottom: '30px' }}>
                    <div style={{ paddingTop: '20px', paddingLeft: '300px', paddingRight: '300px' }}>
                        <h2>Imprint</h2>
                        <p style={{ color: TEXTCOLOR, textAlign: 'justify' }}>
                            Imprint for this website ‐ also serves as provider identification according to § 5 Telemediengesetz (TMG)
                        </p>
                        <h3>Provider:</h3>
                        <p style={{ color: TEXTCOLOR, textAlign: 'justify' }}>
                            Technische Informationsbibliothek (TIB)
                            <br />
                            Welfengarten 1 B, 30167 Hannover
                            <br />
                            Postfach 6080, 30060 Hannover
                            <br />
                        </p>

                        <h3>Authorised Representative:</h3>

                        <p style={{ color: TEXTCOLOR, textAlign: 'justify' }}>
                            Prof. Dr. Sören Auer (Director of TIB)
                            <br />
                            Technische Informationsbibliothek (TIB) is a foundation of public law of the state of Lower Saxony.
                            <br />
                        </p>

                        <h3>Responsible Supervisory Authority:</h3>

                        <p style={{ color: TEXTCOLOR, textAlign: 'justify' }}>Ministry for Science and Culture of Lower Saxony</p>

                        <h3>Contact:</h3>

                        <p style={{ color: TEXTCOLOR, textAlign: 'justify' }}>
                            Customer service phone : +49 511 762-8989
                            <br />
                            Central information desk phone : +49 511 762-2268
                            <br />
                            Fax : +49 511 762-4076
                            <br />
                            Email : &nbsp;
                            <a href="mailto:information@tib.eu" style={{ color: SECONDARY.link }}>
                                information(AT)tib.eu
                            </a>
                            <br />
                        </p>

                        <h3>VAT (sales tax) registration number :</h3>

                        <p style={{ color: TEXTCOLOR }}>DE 214931803</p>

                        <h3>Editorial Office:</h3>

                        <p style={{ color: TEXTCOLOR }}>
                            Felix Engel
                            <br />
                            Email : &nbsp;
                            <a href="mailto:felix.engel@tib.eu" style={{ color: SECONDARY.link }}>
                                felix.engel(AT)tib.eu
                            </a>
                            <br />
                        </p>

                        <h3>Copyright Notice:</h3>

                        <p style={{ color: TEXTCOLOR }}>
                            The layout of the homepage, the graphics used and the other content are protected by copyright.
                            <br />
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
