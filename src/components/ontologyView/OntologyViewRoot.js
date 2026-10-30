import React, { Component } from 'react';
import OntologyContentViewer from './OntologyContentViewer';
import { StyledOntologyViewRootDiv, CenterDisplayDiv } from 'styledComponents/styledComponents';
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
            <StyledOntologyViewRootDiv>
                <CenterDisplayDiv isSidebarOpen={this.state.isSidebarOpen}>
                    <OntologyContentViewer experimentalLayout={this.state.experimentalLayout} />
                </CenterDisplayDiv>
            </StyledOntologyViewRootDiv>
        );
    }
}

OntologyViewRoot.propTypes = {};

export default OntologyViewRoot;
