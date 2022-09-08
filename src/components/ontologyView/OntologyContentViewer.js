import React, { Component } from 'react';
import ResourceRenderer from './ResourceRenderer';
import RelationRenderer from './RelationRenderer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
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
                <div style={{ width: '50%' }}>
                    <ResourceRenderer experimentalLayout={this.props.experimentalLayout} />
                </div>
                <div style={{ width: '50%' }}>
                    <RelationRenderer experimentalLayout={this.props.experimentalLayout} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user
    };
};

OntologyContentViewer.propTypes = {
    experimentalLayout: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(OntologyContentViewer);
