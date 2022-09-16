import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import nutzen from '../assets/images/LineArt_nutzen.png';
import erstellen from '../assets/images/LineArt_erstellen.png';
import teilen from '../assets/images/LineArt_teilen_gespiegelt.png';
import { PRIMARY, TEXTCOLOR } from '../styledComponents/styledComponents';
import Logo from '../assets/images/logo.png';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isreadmore: false
        };
    }

    toggleReadmore = () => {
        this.setState({ isreadmore: !this.state.isreadmore });
    };

    render() {
        return (
            <div style={{ width: '100%', height: '100%', backgroundColor: PRIMARY.lighter }}>
                <div>
                    <div
                        style={{
                            margin: 'auto',
                            fontSize: '26px',
                            textAlign: 'center',
                            paddingTop: '30px',
                            paddingBottom: '30px',
                            color: 'black',
                            fontWeight: 600
                        }}
                    >
                        <img src={Logo} alt="SC3 Logo" style={{ height: 80, width: 70, marginRight: '10px' }} />
                        The SC3 Portal enables effective ontology management and visualization for cross-stakeholder ontology engineering
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
                        <img src={nutzen} width="200" height="150" alt="nutzen" style={{ alignSelf: 'center' }} />
                        <p style={{ fontSize: '26px', fontWeight: 600 }}>Collection</p>
                        <p style={{ textAlign: 'justify', textAlignLast: 'center', fontSize: '16px', color: TEXTCOLOR }}>
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
                        <img src={teilen} width="200" height="150" alt="teilen" style={{ alignSelf: 'center' }} />
                        <p style={{ fontSize: '26px', fontWeight: 600 }}>Visualisation</p>
                        <p style={{ textAlign: 'justify', textAlignLast: 'center', fontSize: '16px', color: TEXTCOLOR }}>
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
                        <img src={erstellen} width="200" height="150" alt="erstellen" style={{ alignSelf: 'center', marginRight: '60px' }} />
                        <p style={{ fontSize: '26px', fontWeight: 600 }}>Editing</p>
                        <p style={{ textAlign: 'justify', textAlignLast: 'center', fontSize: '16px', color: TEXTCOLOR }}>
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
