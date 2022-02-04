import React, { Component } from 'react';
import Footer from '../Layout/Footer';
import background from '../assets/images/background.png';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import ROUTES from 'constants/routes';

export default class Home extends Component {
    render() {
        return (
            <div>
                <div style={{ backgroundColor: 'lightgray' }}>
                    <div
                        style={{
                            margin: 'auto',
                            fontSize: 'large',
                            textAlign: 'center',
                            paddingTop: '100px',
                            paddingBottom: '20px',
                            color: '#0056b3'
                        }}
                    >
                        The Semantically Coordinated Semiconductor Supply Chains (SC3) aims to provide a collaborative Ontolgoy Development Platform
                        for the Digital Reference.
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
                <div>
                    <div
                        style={{
                            backgroundImage: `url(${background})`,
                            backgroundSize: '65% 60%',
                            opacity: '0.2',
                            width: '100%',
                            height: '100%',
                            position: 'fixed',
                            backgroundRepeat: 'repeat-x'
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
                </div>
                <Footer />
            </div>
        );
    }
}
