import React, { Component } from 'react';
import { MAX_WIDTH, TEXTCOLOR } from '../styledComponents/styledComponents';
import ProjectView from '../components/ProjectView';
import RightSideProjectBar from '../components/ontologyView/RightSideProjectBar';
import styled from 'styled-components';

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
        this.setState({ updateFlipFlop: !this.state.updateFlipFlop });
    };

    render() {
        return (
            <>
                <StyledInfo>This page is not available in mobile version if you want to open this page please use desktop site.</StyledInfo>
                <StyledDiv>
                    <ProjectView
                        title="Accessible Private & Public Projects "
                        reloadAfterUpdate={() => this.reloadAfterUpdate()}
                        updateFlipFlop={this.state.updateFlipFlop}
                    />
                    <RightSideProjectBar
                        title="Available Projects"
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
    height: 94%;
    width: 74%;

    @media (max-width: ${MAX_WIDTH}) {
        display: none;
    }
`;

const StyledInfo = styled.h5`
    display: none;

    @media (max-width: ${MAX_WIDTH}) {
        display: block;
        width: 100%;
        padding-top: 20px;
        padding-left: 10%;
        padding-right: 10%;
        text-align: justify;
        text-align-last: center;
        color: ${TEXTCOLOR};
    }
`;
