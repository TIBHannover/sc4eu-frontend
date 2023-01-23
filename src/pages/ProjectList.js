import React, { Component } from 'react';
import { PRIMARY } from '../styledComponents/styledComponents';
import { Container } from 'reactstrap';
import ProjectView from '../components/ProjectView';
import RightSideProjectBar from '../components/ontologyView/RightSideProjectBar';

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
            <div style={{ display: 'flex', marginTop: '5px', zIndex: 150, height: '94vh', width: '74%' }}>
                <ProjectView title="My Projects" reloadAfterUpdate={() => this.reloadAfterUpdate()} updateFlipFlop={this.state.updateFlipFlop} />
                <RightSideProjectBar title="Available Projects" updateFlipFlop={this.state.updateFlipFlop} />
            </div>
        );
    }
}
