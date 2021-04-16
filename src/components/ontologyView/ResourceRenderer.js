import React, { Component } from 'react';

import PropTypes from 'prop-types';
import SingleResource from './SingleResource';

import { connect } from 'react-redux';
class ResourceRenderer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    renderAllResources = () => {
        if (this.props.resources.length > 0) {
            const mappedResources = this.props.resources.map((item, index) => {
                // const mappedResources = testArray.map((item, index) => {
                return this.renderSingleResource(item, index);
            });
            return mappedResources;
        } else {
            return <> No Classes Found </>;
        }
    };
    renderSingleResource = (obj, index) => {
        return (
            <div key={'resourceIndexKey_' + index} style={{ backgroundColor: 'gray', padding: '5px' }}>
                <SingleResource resourceContext={obj} />
            </div>
        );
    };

    render() {
        console.log(this.props);

        return <div style={{ height: '100%', overflow: 'auto' }}> {this.renderAllResources()} </div>;
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        resources: state.ResourceRelationModelReducer.resources
    };
};

ResourceRenderer.propTypes = {
    resources: PropTypes.array.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceRenderer);
