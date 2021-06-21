import React, { Component } from 'react';

import PropTypes from 'prop-types';
import SingleResource from './SingleResource';

import { connect } from 'react-redux';
import { redux_addResource } from '../../redux/actions/rrm_actions';

class ResourceRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateFlipFlop: true
        };

        this.handleSearch = this.handleSearch.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    renderAllResources = () => {
        if (this.props.resources && this.props.resources.length > 0) {
            const cropped = this.props.resources.slice(0, 100);
            const mappedResources = cropped.map((item, index) => {
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
            <div key={'resourceIndexKey_' + obj.identifier} style={{ backgroundColor: 'gray', padding: '5px' }}>
                <SingleResource resourceContext={obj} />
            </div>
        );
    };

    handleSearch(event) {
        const value = event.target.value;
        const resources = this.props.resources;
        resources.forEach(item => {
            item.isHighlighted = false;
        });

        if (value !== '') {
            const matchedResults = resources.filter(item => item.identifier.toLowerCase().includes(value.toLowerCase()));
            matchedResults.forEach(item => {
                item.isHighlighted = true;
            });
        }
        this.setState({ updateFlipFlop: !this.state.updateFlipFlop });
    }

    handleFilter(event) {
        const filterValue = event.target.value;
        //set all filters to false
        const resources = this.props.resources;
        resources.forEach(item => {
            item.isFilteredOut = false;
            if (filterValue !== '') {
                item.isFilteredOut = true;
                if (item.identifier.toLowerCase().includes(filterValue.toLowerCase())) {
                    item.isFilteredOut = false;
                }
            }
        });
        this.setState({ updateFlipFlop: !this.state.updateFlipFlop });
    }

    handleAdd() {
        const newResource = { identifier: 'foaf:', axioms: {}, annotations: {}, type: '' };
        this.props.redux_addResource(newResource);
    }

    render() {
        return (
            <div style={{ height: '100%', overflow: 'hidden' }}>
                {/*    Controls*/}
                <div>
                    <button onClick={this.handleAdd}> Add </button>
                    <input type={'text'} placeholder={'filter...'} onChange={this.handleFilter} />
                    <input type="text" className="input" placeholder="search..." onChange={this.handleSearch} />
                </div>
                {/* REsources*/}
                <div key={this.state.updateFlipFlop} style={{ height: '90%', overflow: 'auto' }}>
                    {' '}
                    {this.renderAllResources()}{' '}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        resources: state.ResourceRelationModelReducer.resources
    };
};

ResourceRenderer.propTypes = {
    resources: PropTypes.array.isRequired,
    redux_addResource: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    redux_addResource: data => dispatch(redux_addResource(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceRenderer);
