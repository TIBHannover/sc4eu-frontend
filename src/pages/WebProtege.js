import React, { Component } from 'react';
import { Button, Spinner } from 'reactstrap';
import styled from 'styled-components';
import { colorStyled } from '../styledComponents/styledColor';

export default class WebProtege extends Component {
    state = { isLoading: true };

    hideSpinner = () => {
        this.setState({ isLoading: false });
    };

    render() {
        return (
            <Container>
                {this.state.isLoading && (
                    <LoadingOverlay>
                        <Button disabled>
                            <Spinner size="sm" style={{ marginBottom: '8px' }} />
                            <span>Loading WebProtege...</span>
                        </Button>
                    </LoadingOverlay>
                )}

                <Iframe title="WebProtege" src="https://service.tib.eu/wp4tib/" loading="lazy" onLoad={this.hideSpinner} />
            </Container>
        );
    }
}

const Container = styled.div`
    background-color: ${colorStyled.background};
    width: 100%;
    height: 100vh; /* Full viewport height */
    position: relative;
`;

const Iframe = styled.iframe`
    width: 100%;
    height: 100%;
    border: none;
`;

const LoadingOverlay = styled.div`
    position: absolute;
    inset: 0;
    background: rgba(255, 255, 255, 0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
`;
