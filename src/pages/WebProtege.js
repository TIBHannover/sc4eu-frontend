import React, { Component } from 'react';
import { Button, Spinner } from 'reactstrap';
import { MAX_WIDTH } from '../styledComponents/styledComponents';
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
                style={{ position: 'absolute', height: '85%', width: 'calc(100% - 220px)', border: 'none' }}
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
                        <Button style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                            <Spinner animation="grow" size="sm" role="status" aria-hidden="true" style={{ marginBottom: '5px' }} />
                            <span>Loading WebProtege...</span>
                        </Button>
                    ) : null}
                    {this.getWebProtege()}
                </StyledDiv>
            </>
        );
    }
}

const StyledDiv = styled.div`
    background-color: ${colorStyled.PRIMARY.lighter};
    height: 100%;
    width: 100%;
    overflow-y: auto;
    display: flex;
    justify-content: center;
    align-items: center;

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
