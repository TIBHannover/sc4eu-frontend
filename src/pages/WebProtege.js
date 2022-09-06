import React, { Component } from 'react';
import { Button, Spinner } from 'reactstrap';
import { ALL_PAGE_BACKGROUND_COLOR } from '../constants/globalStyled';
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
                style={{ position: 'center', height: '99vh', width: '100vw', border: 'none' }}
                loading="lazy"
                src="https://service.tib.eu/wp4tib/"
                onLoad={this.hideSpinner}
            />
        );
    };

    render() {
        return (
            <>
                <div style={{ backgroundColor: ALL_PAGE_BACKGROUND_COLOR }}>
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
