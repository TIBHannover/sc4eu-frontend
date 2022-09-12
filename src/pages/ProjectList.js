import React, { Component } from 'react';
import { PRIMARY } from '../styledComponents/styledComponents';
import { Container } from 'reactstrap';
import ProjectView from '../components/ProjectView';

export default class ProjectList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedProject: false
        };
    }

    updateHeaderValue = projectSelected => {
        this.setState({ selectedProject: projectSelected });
    };

    render() {
        return (
            <div style={{ height: '100vh', backgroundColor: PRIMARY.lighter }}>
                <Container
                    style={{
                        borderTop: 'none',
                        overflow: 'auto',
                        position: 'relative',
                        backgroundColor: '#ffffff'
                    }}
                >
                    <ProjectView
                        title="Select Project"
                        updateHeaderValueCallback={params => {
                            this.updateHeaderValue(params);
                        }}
                    />
                </Container>
            </div>
        );
    }
}
