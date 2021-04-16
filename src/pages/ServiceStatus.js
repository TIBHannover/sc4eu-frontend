import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { checkBuildType, checkOAuth, checkBackend, checkOntologyProcessing } from '../network/serviceStatusCalls';

export default class ServiceStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frontendBuild: 'unknown',
            oauthConfigured: false,
            backendService: false,
            ontologyProcessingService: false,

            loading_frontendBuild: true,
            loading_oauthConfigured: true,
            loading_backendService: true,
            loading_ontologyProcessingService: true
        };
    }

    componentDidMount = async () => {
        // check build type
        const buildType = await checkBuildType();
        this.setState({ frontendBuild: buildType.frontendBuild, loading_frontendBuild: false });

        // check if oauth is configured
        if (buildType !== 'NodeJs -- Client only') {
            const oauth = await checkOAuth();
            this.setState({ oauthConfigured: oauth.oauth, loading_oauthConfigured: false });
        } else {
            this.setState({ oauthConfigured: false, loading_oauthConfigured: false });
        }

        // check if backend is configured
        const backend = await checkBackend();
        this.setState({ backendService: backend.backendService, loading_backendService: false });

        // check if ontology processing is configured
        const processing = await checkOntologyProcessing();
        this.setState({ ontologyProcessingService: processing.ontologyProcessingService, loading_ontologyProcessingService: false });
    };

    render() {
        return (
            <Container className="mt-3 p-0" style={{ border: '1px solid black', borderRadius: '10px' }}>
                <div style={{ padding: '10px' }}>
                    <h1>Status:</h1>
                    {/*OAUTH LOGIN Service*/}
                    <div>Frontend Build Type: {this.state.loading_frontendBuild ? <Icon icon={faSpinner} spin /> : this.state.frontendBuild}</div>
                    {/*OAUTH LOGIN Service*/}
                    <div style={{ display: 'flex' }}>
                        OAUTH Configured:{' '}
                        {this.state.loading_oauthConfigured ? (
                            <Icon style={{ margin: '5px' }} icon={faSpinner} spin />
                        ) : this.state.oauthConfigured ? (
                            <p style={{ color: 'green', marginBottom: 0 }}>True </p>
                        ) : (
                            <p style={{ color: 'red', marginBottom: 0 }}>False </p>
                        )}
                    </div>
                    {/*Backend Service*/}
                    <div style={{ display: 'flex' }}>
                        Backend Service:{' '}
                        {this.state.loading_backendService ? (
                            <Icon style={{ margin: '5px' }} icon={faSpinner} spin />
                        ) : this.state.backendService ? (
                            <p style={{ color: 'green', marginBottom: 0 }}>True </p>
                        ) : (
                            <p style={{ color: 'red', marginBottom: 0 }}>False </p>
                        )}
                    </div>
                    {/*Ontology Processing Service*/}
                    <div style={{ display: 'flex' }}>
                        Ontology Processing Service:{' '}
                        {this.state.loading_ontologyProcessingService ? (
                            <Icon style={{ margin: '5px' }} icon={faSpinner} spin />
                        ) : this.state.ontologyProcessingService ? (
                            <p style={{ color: 'green', marginBottom: 0 }}>True </p>
                        ) : (
                            <p style={{ color: 'red', marginBottom: 0 }}>False </p>
                        )}
                    </div>
                </div>
            </Container>
        );
    }
}
