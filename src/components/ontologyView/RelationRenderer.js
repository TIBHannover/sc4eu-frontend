import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { redux_addRelation } from '../../redux/actions/rrm_actions';
import { connect } from 'react-redux';
import SingleRelation from './SingleRelation';
import { Button, Input } from 'reactstrap';

class RelationRenderer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateFlipFlop: true
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    renderAllRelations = () => {
        if (this.props.relations && this.props.relations.length > 0) {
            const cropped = this.props.relations.slice(0, 100);
            const mappedRelations = cropped.map(item => {
                // const mappedResources = testArray.map((item, index) => {
                return this.renderSingleRelation(item);
            });
            return mappedRelations;
        } else {
            return <> No Relations Found </>;
        }
    };
    renderSingleRelation = obj => {
        return (
            <div key={'relationIndexKey_' + obj.identifier} style={{ padding: '5px' }}>
                <SingleRelation relationContext={obj} />
            </div>
        );
    };

    handleSearch = event => {
        const value = event.target.value;
        const relations = this.props.relations;
        relations.forEach(item => {
            item.isHighlighted = false;
        });

        if (value !== '') {
            const matchedResults = relations.filter(item => item.identifier.toLowerCase().includes(value.toLowerCase()));
            matchedResults.forEach(item => {
                item.isHighlighted = true;
            });
        }
        this.setState({ updateFlipFlop: !this.state.updateFlipFlop });
    };

    handleFilter = event => {
        const filterValue = event.target.value;
        //set all filters to false
        const relations = this.props.relations;
        relations.forEach(item => {
            item.isFilteredOut = false;
            if (filterValue !== '') {
                item.isFilteredOut = true;
                if (item.identifier.toLowerCase().includes(filterValue.toLowerCase())) {
                    item.isFilteredOut = false;
                }
            }
        });
        this.setState({ updateFlipFlop: !this.state.updateFlipFlop });
    };

    handleAdd = () => {
        const newRelation = { identifier: 'foaf:', axioms: {}, annotations: {}, domainRangePairs: [], resourceURI: '', type: '' };
        this.props.redux_addRelation(newRelation);
    };

    render() {
        return (
            <div style={{ height: '100%', overflow: 'hidden' }}>
                {/*    Controls*/}
                <div style={{ display: 'flex', height: '30px', margin: '5px' }}>
                    <Button size="sm" color="primary" onClick={this.handleAdd}>
                        Add
                    </Button>
                    <Input style={{ height: '30px' }} type="text" placeholder="filter..." onChange={this.handleFilter} />
                    <Input style={{ height: '30px' }} type="text" className="input" placeholder="search..." onChange={this.handleSearch} />
                </div>
                {/* Relations*/}
                <div key={this.state.updateFlipFlop} style={{ height: '90%', overflow: 'auto' }}>
                    {' '}
                    {this.renderAllRelations()}{' '}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        relations: state.ResourceRelationModelReducer.relations
    };
};

RelationRenderer.propTypes = {
    relations: PropTypes.array.isRequired,
    redux_addRelation: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    redux_addRelation: data => dispatch(redux_addRelation(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(RelationRenderer);
