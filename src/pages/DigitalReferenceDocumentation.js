import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Footer from '../Layout/Footer';
import ROUTES from '../constants/routes';
import '../assets/scss/DigitalRefrencesDocumentation.scss';
import { detect } from 'detect-browser';

class DigitalReferenceDocumentation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drlink: '',
            isloading: true,
            drlinkerror: false,
            browsererror: false
        };
    }

    componentDidMount() {
        this.GetDR();
    }

    GetDR = () => {
        // TODO: Make available in firefox browser also.
        // currently this methode is working only in Chrome browser
        const browser = detect();
        if (browser.name === 'firefox') {
            this.setState({ browsererror: true });
        }
        const drDocumentationlink =
            'http://150.146.207.114/lode/extract?url=https%3A%2F%2Fraw.githubusercontent.com%2Ftibonto%2Fdr%2Fmaster%2FDigitalReference.ttl&owlapi=true&lang=en';
        fetch(drDocumentationlink)
            //.then(response => response.text())
            .then(response => {
                if (response.status === 200) {
                    this.setState({ drlink: drDocumentationlink });
                    this.setState({ isloading: false });
                } else {
                    this.setState({ drlinkerror: true });
                }
            });
    };

    render() {
        return (
            <div>
                <div>
                    {this.state.drlinkerror === true ? (
                        <div style={{ backgroundColor: '#B3E5FC', height: '100vh', width: '100vw', textAlign: 'center' }}>
                            <div style={{ color: '#ffffff', fontFamily: 'sans-serif', fontSize: '11rem' }}>Sorry!</div>
                            <span
                                style={{
                                    textAlign: 'center',
                                    fontFamily: 'sans-serif',
                                    fontSize: '1.6rem'
                                }}
                            >
                                Currently this page content is not available
                                <p>
                                    Let's go <a href={ROUTES.HOME}>Home</a> and try from there.
                                </p>
                            </span>
                        </div>
                    ) : this.state.browsererror === true ? (
                        <div style={{ backgroundColor: '#B3E5FC', height: '100vh', width: '100vw', textAlign: 'center' }}>
                            <div style={{ color: '#ffffff', fontFamily: 'sans-serif', fontSize: '11rem' }}>Sorry!</div>
                            <span
                                style={{
                                    textAlign: 'center',
                                    fontFamily: 'sans-serif',
                                    fontSize: '1.6rem'
                                }}
                            >
                                Currently this page content is not available in Firefox Browser we are working on it
                            </span>
                        </div>
                    ) : this.state.isloading === true ? (
                        <div className="loading-container">
                            <div className="loader" />
                            <span className="loading">Loading...</span>
                        </div>
                    ) : (
                        <iframe style={{ width: '100vw', height: '81vh' }} src={this.state.drlink} />
                    )}
                </div>
                <Footer />
            </div>
        );
    }
}

DigitalReferenceDocumentation.propTypes = {};

export default DigitalReferenceDocumentation;
