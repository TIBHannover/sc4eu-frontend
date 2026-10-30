import React, { Component } from 'react';
import { Button, Spinner } from 'reactstrap';
import { StyledWebProtegeContainer, Iframe, LoadingOverlay } from 'styledComponents/styledComponents';
export default class WebProtege extends Component {
    state = { isLoading: true };

    hideSpinner = () => {
        this.setState({ isLoading: false });
    };

    render() {
        return (
            <StyledWebProtegeContainer>
                {this.state.isLoading && (
                    <LoadingOverlay>
                        <Button disabled>
                            <Spinner size="sm" style={{ marginBottom: '8px' }} />
                            <span>Loading WebProtege...</span>
                        </Button>
                    </LoadingOverlay>
                )}

                <Iframe title="WebProtege" src="https://service.tib.eu/wp4tib/" loading="lazy" onLoad={this.hideSpinner} />
            </StyledWebProtegeContainer>
        );
    }
}


