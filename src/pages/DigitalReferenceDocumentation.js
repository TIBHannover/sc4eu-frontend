import React, { Component } from 'react';
import '../assets/scss/DigitalRefrencesDocumentation.scss';
import { Button, Spinner } from 'reactstrap';

export default class DigitalReferenceDocumentation extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true };
    }

    hideSpinner = () => {
        this.setState({
            isLoading: false
        });
    };

    getDRDocumentation = () => {
        return (
            <div>
                <iframe
                    style={{ position: 'center', height: '99vh', width: '100vw', border: 'none' }}
                    loading="lazy"
                    onLoad={this.hideSpinner}
                    src="http://150.146.207.114/lode/extract?url=https://raw.githubusercontent.com/tibonto/dr/master/DigitalReference.ttl&owlapi=true&lang=en"
                />
            </div>
        );
    };

    render() {
        return (
            <div>
                {this.state.isLoading ? (
                    <Button variant="primary" disabled>
                        <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                        Loading Digital Reference Documentation...
                    </Button>
                ) : null}
                {this.getDRDocumentation()}
            </div>
        );
    }
}
