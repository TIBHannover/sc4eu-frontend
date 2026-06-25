import React, { Component } from 'react';
import ProjectView from '../components/ProjectView';
import { StyledProjectListDiv } from 'styledComponents/styledComponents';

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
                <StyledProjectListDiv>
                    <ProjectView
                        title="Current Projects"
                        reloadAfterUpdate={() => this.reloadAfterUpdate()}
                        updateFlipFlop={this.state.updateFlipFlop}
                    />
                </StyledProjectListDiv>
            </>
        );
    }
}


