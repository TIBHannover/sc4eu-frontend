import React, { Component } from 'react';
import { MAX_WIDTH } from '../styledComponents/styledComponents';
import ProjectView from '../components/ProjectView';
import RightSideProjectBar from '../components/ontologyView/RightSideProjectBar';
import styled from 'styled-components';
import { colorStyled } from '../styledComponents/styledColor';

export default class ProjectList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateFlipFlop: false
        };
    }

    componentDidMount() {}

    componentDidUpdate = (prevProps, prevState) => {};

    reloadAfterUpdate = () => {
        console.log('reloadAfterUpdate');
        //this.forceUpdate();
        this.setState(prevState => ({ updateFlipFlop: !prevState.updateFlipFlop }));
    };

    render() {
        return (
            <>
                <StyledDiv>
                    <ProjectView
                        title="Current Projects"
                        reloadAfterUpdate={() => this.reloadAfterUpdate()}
                        updateFlipFlop={this.state.updateFlipFlop}
                    />
                </StyledDiv>
            </>
        );
    }
}

const StyledDiv = styled.div`
    display: flex;
    z-index: 150;
    height: 100%;
    width: 100%;
    
`;

