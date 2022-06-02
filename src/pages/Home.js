import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import UserRole from '../assets/images/UserRole.PNG';
import guidance from '../assets/images/guidance.png';
import Usecase from '../assets/images/Usecase.png';
import AboutSC3 from '../assets/images/AboutSC3.png';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

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
            <div style={{ width: '100%', height: '100%' }}>
                <div style={{ width: '100%', height: '85%', overflowY: 'scroll', paddingBottom: '40px' }}>
                    <div style={{ backgroundColor: '#B3E5FC' }}>
                        <div
                            style={{
                                margin: 'auto',
                                fontSize: '24px',
                                textAlign: 'center',
                                paddingTop: '100px',
                                paddingBottom: '20px',
                                color: 'black',
                                fontWeight: 600
                            }}
                        >
                            The Semantically Connencted Semiconductor Supply Chains (SC3) Portal for a collaborative Ontology Development.
                        </div>
                        {/*<div style={{ margin: 'auto', fontSize: 'large', textAlign: 'center', color: '#0056b3' }}>*/}
                        {/*    Please sign in to view or upload an Ontology*/}
                        {/*</div>*/}

                        {/*                    <Button
                        color="link"
                        className="clearfix"
                        style={{ position: 'relative', left: '48%', paddingTop: '20px' }}
                        tag={Link}
                        to={ROUTES.ONTOLOGY}
                        onClick={() => {
                            console.log('SING IN ACTION ');
                        }}
                    >
                        <Icon className="mr-1" icon={faUser} /> Sign in
                    </Button>*/}
                    </div>
                    {/* <div>
                    <div
                        style={{
                            backgroundImage: `url(${background})`,
                            //backgroundSize: '40% 65%',
                            opacity: '0.2',
                            width: '100%',
                            height: '100%',
                            position: 'fixed',
                            backgroundPositionX: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    />
                    <div
                        style={{
                            margin: 'auto',
                            fontSize: '18px',
                            textAlign: 'center',
                            paddingTop: '50px',
                            paddingBottom: '20px',
                            marginLeft: '15%',
                            marginRight: '15%'
                        }}
                    >
                        The key objective of this platform is to implement data documentation of an actionable ontology-based ecosystem that consists
                        of a top-level ontology, adapted from existing domain ontologies, and complemented by new ones for other subdomains to ensure
                        interoperability of data.
                    </div>
                </div>*/}
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
                            <p style={{ textAlign: 'justify', fontSize: '12px' }}>
                                SC3 establishes a standard language for comprehensive collaboration between humans and machines, as well as all other
                                partners.The key objective of this platform is to implement data documentation of an actionable ontology-based
                                ecosystem that consists of a top-level ontology, adapted from existing domain ontologies, and complemented by new ones
                                for other subdomains to ensure interoperability of data.
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
                            <p style={{ textAlign: 'justify' }}>
                                We identified that the most crucial requirement for ontology development is to serve users' needs from various
                                audiences with diverse backgrounds and in different contexts. We have therefore introduced several modes of
                                operations.
                            </p>
                            <img src={UserRole} width="100%" height="300" />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', paddingLeft: '20px', marginRight: '20px' }}>
                            <img src={guidance} width="70" height="70" style={{ alignSelf: 'center' }} />
                            <h5>Framework for collaborative ontology development</h5>
                            <p style={{ textAlign: 'justify', cursor: 'pointer' }}>
                                {this.state.isreadmore ? FrameworkText : FrameworkText.substring(0, 200)}
                                <span style={{ color: 'blue', fontWeight: 600 }} onClick={this.toggleReadmore}>
                                    {this.state.isreadmore ? ' Read Less' : ' ...Read More'}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}
