import React, { Component } from 'react';
import { PRIMARY } from '../styledComponents/styledComponents';
import { Container } from 'reactstrap';
import ProjectView from '../components/ProjectView';

export default class ProjectList extends Component {
    render() {
        return (
            <div style={{ height: '100vh', backgroundColor: PRIMARY.lighter }}>
                <Container
                    style={{
                        borderTop: 'none',
                        overflow: 'auto',
                        position: 'relative',
                        backgroundColor: 'white'
                    }}
                >
                    <ProjectView title="Select Project" />
                </Container>
            </div>
        );
    }
}
