import React, { Component } from 'react';
import { Button, Spinner } from 'reactstrap';
import { MAX_WIDTH } from '../styledComponents/styledComponents';
import Footer from '../Layout/Footer';
import styled from 'styled-components';
import { colorStyled } from '../styledComponents/styledColor';

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
                style={{ position: 'absolute', height: 'calc(85% - 80px)', width: '100%', border: 'none' }}
                loading="lazy"
                src="https://service.tib.eu/wp4tib/"
                onLoad={this.hideSpinner}
            />
        );
    };

    render() {
        return (
            <>
                <StyledInfo>This page is not available in mobile version if you want to open this page please use desktop site.</StyledInfo>
                <StyledDiv>
                    {this.state.isLoading ? (
                        <Button variant="primary" disabled>
                            <Spinner as="span" animation="grow" size="sm" role="status" aria-hidden="true" />
                            Loading WebProtege...
                        </Button>
                    ) : null}
                    {this.getWebProtege()}
                </StyledDiv>
                <Footer />
            </>
        );
    }
}

const StyledDiv = styled.div`
    background-color: ${colorStyled.PRIMARY.lighter};
    height: calc(100% - 80px);
    width: 100%;
    overflow-y: auto;

    @media (max-width: ${MAX_WIDTH}) {
        display: none;
    }
`;

const StyledInfo = styled.h5`
    display: none;

    @media (max-width: ${MAX_WIDTH}) {
        display: block;
        width: 100%;
        height: 90%;
        padding-top: 20px;
        padding-left: 10%;
        padding-right: 10%;
        text-align: justify;
        text-align-last: center;
        color: ${colorStyled.TEXTCOLOR};
    }
`;
