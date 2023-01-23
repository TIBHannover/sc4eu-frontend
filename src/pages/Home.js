import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import collection from '../assets/images/collection.png';
import edite from '../assets/images/Edit.png';
import visualisation from '../assets/images/visulization.png';
import { PRIMARY, TEXTCOLOR } from '../styledComponents/styledComponents';
import Logo from '../assets/images/logo.png';
import IntroductoryPopUp from '../components/IntroductoryPopUp';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isreadmore: false
        };
    }

    render() {
        return (
            <div style={{ width: '100%', height: '100%', backgroundColor: PRIMARY.lighter }}>
                <IntroductoryPopUp />
                <div>
                    <div
                        style={{
                            margin: 'auto',
                            fontSize: '26px',
                            textAlign: 'center',
                            paddingTop: '30px',
                            paddingBottom: '30px',
                            color: 'black',
                            fontWeight: 600,
                            fontFamily: 'sans-serif'
                        }}
                    >
                        <img src={Logo} alt="SC3 Logo" style={{ height: 80, width: 70, marginRight: '10px' }} />
                        The SC3 Portal Enables Effective Ontology Management and Visualization for Cross-stakeholder Ontology Engineering
                    </div>
                </div>
                <div
                    style={{
                        margin: 'auto',
                        fontSize: '14px',
                        textAlign: 'center',
                        paddingTop: '50px',
                        paddingBottom: '20px',
                        marginLeft: '15%',
                        marginRight: '15%',
                        display: 'flex',
                        color: 'black'
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            paddingLeft: '10px',
                            paddingRight: '35px'
                        }}
                    >
                        <img src={collection} width="210" height="190" alt="collection" style={{ alignSelf: 'center', marginTop: '-20px' }} />
                        <p style={{ fontSize: '26px', fontWeight: 600, fontFamily: 'sans-serif', marginTop: '-10px' }}>Collection</p>
                        <p
                            style={{
                                textAlign: 'justify',
                                textAlignLast: 'center',
                                fontSize: '16px',
                                color: TEXTCOLOR,
                                fontFamily: 'sans-serif'
                            }}
                        >
                            The SC3 Portal enables you to collect all ontologies relevant for your research project. You can create new collections
                            and add as much ontologies as you like.
                        </p>
                    </div>
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            paddingLeft: '10px',
                            paddingRight: '35px'
                        }}
                    >
                        <img src={visualisation} width="190" height="140" alt="visualisation" style={{ alignSelf: 'center' }} />
                        <p style={{ fontSize: '26px', fontWeight: 600, fontFamily: 'sans-serif', marginTop: '20px' }}>Visualisation</p>
                        <p
                            style={{
                                textAlign: 'justify',
                                textAlignLast: 'center',
                                fontSize: '16px',
                                color: TEXTCOLOR,
                                fontFamily: 'sans-serif'
                            }}
                        >
                            Creation of ontologies requires expertise from various stakeholders with different ontology proficiency levels. The portal
                            allows easy translation of visualizations for various expert groups.
                        </p>
                    </div>
                    <div
                        style={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            paddingLeft: '10px',
                            paddingRight: '10px'
                        }}
                    >
                        <img src={edite} width="190" height="140" alt="edite" style={{ alignSelf: 'center', marginRight: '60px' }} />
                        <p style={{ fontSize: '26px', fontWeight: 600, fontFamily: 'sans-serif', marginTop: '20px' }}>Editing</p>
                        <p
                            style={{
                                textAlign: 'justify',
                                textAlignLast: 'center',
                                fontSize: '16px',
                                color: TEXTCOLOR,
                                fontFamily: 'sans-serif'
                            }}
                        >
                            Collaborative editing of ontologies is the next step in the ontology agreement process. The SC3 portal integrates the
                            broadly known WebProtege for collaborative editing.
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
