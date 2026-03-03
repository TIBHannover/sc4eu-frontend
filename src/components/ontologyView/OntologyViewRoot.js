import React, { Component } from 'react';
import { fontStyled } from '../../styledComponents/styledFont';
import styled from 'styled-components';
import OntologyContentViewer from './OntologyContentViewer';
import { MAX_WIDTH, MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';
import { colorStyled } from '../../styledComponents/styledColor';

class OntologyViewRoot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            experimentalLayout: true,
            isSidebarOpen: true
        };
    }

    render() {
        return (
            <StyledRootDiv>
                <CenterDisplayDiv isSidebarOpen={this.state.isSidebarOpen}>
                    <OntologyContentViewer experimentalLayout={this.state.experimentalLayout} />
                </CenterDisplayDiv>
            </StyledRootDiv>
        );
    }
}

OntologyViewRoot.propTypes = {};

const StyledRootDiv = styled.div`
    display: flex;
    height: 100%;
    font-family: ${fontStyled.fontFamily};
`;

const CenterDisplayDiv = styled.div`
    width: 95%;
    transition: width 0.5s ease-out;
    background-color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
    margin-left: auto;
    margin-top: 0.5%;
    height: 95%;
    margin-right: 2%;
    font-family: ${fontStyled.fontFamily};
    border-radius: 10px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        width: 90%;
        margin-right: 5%;
    }
    
    @media (max-width: ${MAX_WIDTH}) {
        width: 100%;
        height: auto;
    }
`;

export default OntologyViewRoot;
