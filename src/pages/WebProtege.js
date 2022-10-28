import React, { Component } from 'react';
import { Button, Spinner } from 'reactstrap';
import { PRIMARY } from '../styledComponents/styledComponents';
import Footer from '../Layout/Footer';

export default class WebProtege extends Component {
    constructor(props) {
        super(props);
        this.state = { isLoading: true };
    }

    componentDidMount() {}

    hideSpinner = () => {
        console.log('Fully loaded');
        this.setState({
            isLoading: false
        });
    };

    getWebProtege = () => {
        return (
            <iframe
                title="WebProtege"
                style={{ position: 'absolute', height: '15%', width: '100%', border: 'none' }}
                loading="lazy"
                src="https://service.tib.eu/wp4tib/"
                onLoad={this.hideSpinner}
            />
        );
    };

    render() {
        return (
            <>
                <div style={{ backgroundColor: PRIMARY.lighter, height: '100%', width: '100%' }}>
                    {this.state.isLoading ? (
                        <Button variant="primary" disabled>
                            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                            Loading WebProtege...
                        </Button>
                    ) : null}
                    {this.getWebProtege()}
                </div>
                <Footer />
            </>
        );
    }
}
