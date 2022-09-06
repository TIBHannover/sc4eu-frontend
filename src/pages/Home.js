import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import UserRole from '../assets/images/UserRole.PNG';
import guidance from '../assets/images/guidance.png';
import Usecase from '../assets/images/Usecase.png';
import AboutSC3 from '../assets/images/AboutSC3.png';
import { ALL_PAGE_BACKGROUND_COLOR } from '../constants/globalStyled';

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
        const FrameworkText =
            ' A machine-readable conceptualization of the semiconductor domain and related supply chains requires standardized\n' +
            ' ontologies of high quality and a common set of conceptualizations in order to apply Semantic Web technologies widely\n' +
            ' to the semiconductor domain. Knowledge engineers and domain experts usually work together on ontology development. The\n' +
            ' latter have less expertise in a specific domain, whereas domain experts often struggle to understand logical notations\n' +
            ' used in OWL (Web Ontology Language). It is necessary to reduce the complexity of OWL formalization for domain experts\n' +
            ' in order to more directly involve them in ontology modelling and foster communication with knowledge engineers.\n' +
            ' However, they must maintain full OWL modelling capabilities for knowledge engineers. Because of this, we are\n' +
            ' developing a user-centered approach to collaborative ontology development, addressing the needs and backgrounds of\n' +
            ' different user groups.';

        return (
            <div style={{ width: '100%', height: '100%', backgroundColor: ALL_PAGE_BACKGROUND_COLOR }}>
                <div>
                    <div
                        style={{
                            margin: 'auto',
                            fontSize: '24px',
                            textAlign: 'center',
                            paddingTop: '30px',
                            paddingBottom: '30px',
                            color: 'black',
                            fontWeight: 600
                        }}
                    >
                        The Semantically Connencted Semiconductor Supply Chains (SC3) Portal for a collaborative Ontology Development.
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
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingRight: '20px' }}>
                        <img src={AboutSC3} width="70" height="70" style={{ alignSelf: 'center' }} />
                        <h5>About SC3</h5>
                        <p />
                        <p style={{ textAlign: 'justify', marginTop: '8px', fontFamily: 'normal', fontSize: '18px' }}>
                            SC3 establishes a standard language for comprehensive collaboration between humans and machines, as well as all other
                            partners.The key objective of this platform is to implement data documentation of an actionable ontology-based ecosystem
                            that consists of a top-level ontology, adapted from existing domain ontologies, and complemented by new ones for other
                            subdomains to ensure interoperability of data. "Further information about the project you can find on our &nbsp;
                            <a target="_blank" rel="noopener noreferrer" href="https://sc3-project.automotive.oth-aw.de/">
                                SC3 webpage
                            </a>
                            , on our&nbsp;
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.youtube.com/channel/UCkP7Qi9G9uHDLdyATT7tKow/featured?view_as=subscriber"
                            >
                                YouTube chanel
                            </a>
                            , or&nbsp;
                            <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://www.linkedin.com/in/sc3-project-886b56209/?originalSubdomain=de"
                            >
                                via LinkedIn.
                            </a>
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
                        <img src={Usecase} width="70" height="70" style={{ alignSelf: 'center' }} />
                        <h5 style={{ paddingBottom: '10px' }}>What the portal can do for you</h5>
                        <p style={{ textAlign: 'justify', marginTop: '15px', fontFamily: 'normal', fontSize: '18px' }}>
                            We identified that the most crucial requirement for ontology development is to serve users' needs from various audiences
                            with diverse backgrounds and in different contexts. We have therefore introduced several modes of operations.
                        </p>
                        <img src={UserRole} width="100%" height="300" />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: '20px', marginRight: '20px' }}>
                        <img src={guidance} width="70" height="70" style={{ alignSelf: 'center' }} />
                        <h5>Framework for collaborative ontology development</h5>
                        <p style={{ textAlign: 'justify', cursor: 'pointer', fontFamily: 'normal', fontSize: '18px' }}>
                            {this.state.isreadmore ? FrameworkText : FrameworkText.substring(0, 500)}
                            <span style={{ color: 'blue', fontWeight: 600 }} onClick={this.toggleReadmore}>
                                {this.state.isreadmore ? ' Read Less' : ' ...Read More'}
                            </span>
                        </p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
