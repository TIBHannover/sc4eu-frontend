import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import RightSideBar from './RightSideBar';
import { fontStyled } from '../../styledComponents/styledFont';
import styled from 'styled-components';
import OntologyContentViewer from './OntologyContentViewer';
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';
import { colorStyled } from '../../styledComponents/styledColor';

class OntologyViewRoot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            experimentalLayout: true,
            isSidebarOpen: true
        };
    }
    // toggleSidebar = () => {
    //     this.setState({ isSidebarOpen: !this.state.isSidebarOpen });
    // };

    render() {
        return (
            <StyledRootDiv>
                <CenterDisplayDiv isSidebarOpen={this.state.isSidebarOpen}>
                    <OntologyContentViewer experimentalLayout={this.state.experimentalLayout} />
                </CenterDisplayDiv>
                {/*<RightSideDisplayDiv isSidebarOpen={this.state.isSidebarOpen}>*/}
                {/*    <RightSideBar isSidebarOpen={this.state.isSidebarOpen} toggleSidebar={this.toggleSidebar} />*/}
                {/*</RightSideDisplayDiv>*/}
            </StyledRootDiv>
        );
    }
}

OntologyViewRoot.propTypes = {
    ontologyVersion: PropTypes.string.isRequired
};

const StyledRootDiv = styled.div`
    display: flex;
    height: 100%;
    font-family: ${fontStyled.fontFamily};
`;

const CenterDisplayDiv = styled.div`
    width: ${({ isSidebarOpen }) => (isSidebarOpen ? '95%' : '95%')};
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
        width: ${({ isSidebarOpen }) => (isSidebarOpen ? '90%' : '90%')};
        margin-right: 5%;
    }
`;

// const RightSideDisplayDiv = styled.div`
//     transition: width 0.5s ease-out, margin-right 0.5s ease-out;
//     background-color: ${colorStyled.CONTAINER_BACKGROUND_COLOR};
//     margin-top: 0.5%;
//     height: 95%;
//     width: ${({ isSidebarOpen }) => (isSidebarOpen ? '25%' : '0')};
//     font-family: ${fontStyled.fontFamily};
//     border-radius: 10px;
//     border-bottom-right-radius: 0;
//     border-bottom-left-radius: 0;
//
//     @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
//         width: ${({ isSidebarOpen }) => (isSidebarOpen ? '22%' : '0')};
//     }
// `;

export default OntologyViewRoot;
