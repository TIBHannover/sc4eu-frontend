import React, { Component } from 'react';

import ResourceRenderer from './ResourceRenderer';
import { connect } from 'react-redux';
class OntologyContentViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        return (
            <div style={{ display: 'flex', marginTop: '0', height: '100%' }}>
                <div style={{ width: '50%', backgroundColor: '#67a0d0', borderRight: '1px solid black' }}>
                    {' '}
                    <ResourceRenderer />{' '}
                </div>
                <div style={{ width: '50%', backgroundColor: '#3dff3f' }}> Property Viewer </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
};

OntologyContentViewer.propTypes = {};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OntologyContentViewer);
