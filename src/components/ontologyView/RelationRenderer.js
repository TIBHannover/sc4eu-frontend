import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { redux_addRelation } from '../../redux/actions/rrm_actions';
import { connect } from 'react-redux';
import SingleRelation from './SingleRelation';
import { Button, InputGroup } from 'reactstrap';
import SearchAutoComplete from './SearchAutoComplete';
import { redux_preserveFilterSearch } from '../../redux/actions/globalUI_actions';
import { PRIMARY } from '../RRView/StyledComponents';

class RelationRenderer extends Component {
    constructor(props) {
        super(props);
        this.arrayOfChildObjects = [];
        this.arrayOfRef = [];
        this.lookupList = [];
        this.cropped = [];
        this.searchText = this.props.globalUIReducer.ui_relation_search_value_preserved;
        this.filterText = this.props.globalUIReducer.ui_relation_filter_value_preserved;
        this.state = {
            updateFlipFlop: true
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.relationsExpanded !== prevProps.relationsExpanded) {
            this.expandAllBodies(this.props.relationsExpanded);
        }
    }

    expandAllBodies = val => {
        this.arrayOfChildObjects.forEach(item => {
            if (item) {
                item.setShowBody(val);
            }
        });
    };

    renderAllRelations = () => {
        this.arrayOfRef = [];
        if (this.props.relations && this.props.relations.length > 0) {
            this.cropped = this.props.relations.slice(0, 100);

            this.cropped.sort((item1, item2) => {
                if (item1.type.length === 0) {
                    return item1;
                }
                return item1.type[0].localeCompare(item2.type[0]);
            });

            const mappedRelations = this.cropped.map(item => {
                this.lookupList.push(
                    item.identifier
                        .split('/')
                        .pop()
                        .split('#')
                        .pop()
                );
                return this.renderSingleRelation(item);
            });
            return mappedRelations;
        } else {
            return <> No Relations Found </>;
        }
    };

    registerToParent = item => {
        this.arrayOfChildObjects.push(item);
    };

    unRegisterFromParent = itemToRemove => {
        const index = this.arrayOfChildObjects.findIndex(item => item === itemToRemove);
        if (index > -1) {
            this.arrayOfChildObjects.splice(index, 1);
        }
    };

    removeFromLookupList = itemIdentifierToRemove => {
        const itemToRemove = itemIdentifierToRemove
            .split('/')
            .pop()
            .split('#')
            .pop();

        const index = this.lookupList.findIndex(item => item === itemToRemove);
        if (index > -1) {
            this.lookupList.splice(index, 1);
        }
    };

    renderSingleRelation = obj => {
        //const isVisible = obj.isFilteredOut === true ? 'none' : 'block';
        return (
            <SingleRelation
                arrayOfRef={this.arrayOfRef}
                key={'relationIndexKey_' + obj.identifier}
                registerToParent={this.registerToParent}
                unRegisterFromParent={this.unRegisterFromParent}
                removeFromLookupList={this.removeFromLookupList}
                relationContext={obj}
                experimentalLayout={this.props.experimentalLayout}
            />
        );
    };

    handleSearch = (value, counter = 0) => {
        this.lookupList = [];
        this.searchText = value;
        this.props.redux_preserveFilterSearch({ ui_relation_search_value_preserved: value });
        this.arrayOfChildObjects.forEach(child => {
            if (child.props.relationContext.isHighlighted) {
                child.props.relationContext.isHighlighted = false;
                child.forceRerendering();
            }
        });

        if (value === '' || value === undefined) {
            // scroll to top if nothing was found or empty string
            this.arrayOfRef[0].ref.current.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const found = this.cropped.filter(item => {
            if (item.identifier.toLowerCase().includes(value.toLowerCase()) || this.checkInAnnotations(item.annotations, value)) {
                const foundChild = this.arrayOfChildObjects.find(
                    child => child.props.relationContext.identifier.toLowerCase() === item.identifier.toLowerCase()
                );

                if (item.isFilteredOut) {
                    return false;
                }
                if (!item.isHighlighted) {
                    item.isHighlighted = true;
                    if (foundChild) {
                        foundChild.forceRerendering();
                    }
                }
                return true;
            }
            return false;
        });

        if (found.length > 0) {
            this.arrayOfRef.forEach(refItem => {
                const itemNumber = counter % found.length;
                if (refItem.identifier === found[itemNumber].identifier) {
                    refItem.ref.current.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    };

    checkInAnnotations = (annotations, value) => {
        for (const item of Object.keys(annotations)) {
            const itemValue = annotations[item];
            for (const language of Object.keys(itemValue)) {
                const itemValuePerLanguage = itemValue[language];
                for (const it in itemValuePerLanguage) {
                    return itemValuePerLanguage[it].toLowerCase().includes(value.toLowerCase());
                }
            }
            return false;
        }
    };

    handleFilter = filterValue => {
        this.filterText = filterValue;
        this.props.redux_preserveFilterSearch({ ui_relation_filter_value_preserved: filterValue });
        //set all filters to false
        this.cropped.forEach(item => {
            item.isFilteredOut = false;
            if (filterValue !== '') {
                item.isFilteredOut = true;
                if (item.identifier.toLowerCase().includes(filterValue.toLowerCase())) {
                    item.isFilteredOut = false;
                }
            }
        });

        this.arrayOfChildObjects.forEach(childItem => childItem.forceRerendering());
    };

    /* handleAdd = () => {
        const newRelation = { identifier: 'foaf:', axioms: {}, annotations: {}, domainRangePairs: [], resourceURI: '', type: [] };
        this.props.redux_addRelation(newRelation);
    };*/

    render() {
        return (
            <div style={{ height: '100%', overflow: 'hidden' }}>
                <div
                    style={{
                        display: 'flex',
                        height: '50px',
                        background: PRIMARY.dark,
                        margin: '10px',
                        borderRadius: '7px 7px 7px 7px',
                        position: 'relative',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                >
                    <h4 style={{ color: '#ffffff' }}>Relations</h4>
                </div>
                {/*    Controls*/}
                <div style={{ display: 'flex', height: '30px', margin: '5px', marginBottom: '15px' }}>
                    {/*TODO: fix add relation functionality*/}
                    {/*<Button size="sm" color="primary" style={{ height: '39px' }} disabled={false} onClick={this.handleAdd}>
                        Add
                    </Button>*/}
                    <InputGroup>
                        <SearchAutoComplete
                            preservedSearchFilterValue={this.filterText}
                            placeholder={'Filter...'}
                            lookupList={this.lookupList}
                            handleSearch={this.handleFilter}
                        />
                    </InputGroup>

                    <InputGroup>
                        <SearchAutoComplete
                            preservedSearchFilterValue={this.searchText}
                            placeholder={'Search...'}
                            lookupList={this.lookupList}
                            handleSearch={this.handleSearch}
                        />
                    </InputGroup>
                </div>
                {/* Relations*/}
                <div key={this.state.updateFlipFlop} style={{ marginTop: '10px', height: 'calc(100% - 120px)', overflow: 'auto' }}>
                    {this.renderAllRelations()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        relations: state.ResourceRelationModelReducer.relations,
        relationsExpanded: state.globalUIReducer.ui_all_relation_bodies_expanded,
        metaInformation: state.ResourceRelationModelReducer.metaInformation,
        globalUIReducer: state.globalUIReducer
    };
};

RelationRenderer.propTypes = {
    relations: PropTypes.array.isRequired,
    redux_addRelation: PropTypes.func.isRequired,
    experimentalLayout: PropTypes.bool.isRequired,
    relationsExpanded: PropTypes.bool.isRequired,
    globalUIReducer: PropTypes.object.isRequired,
    redux_preserveFilterSearch: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    redux_addRelation: data => dispatch(redux_addRelation(data)),
    redux_preserveFilterSearch: data => dispatch(redux_preserveFilterSearch(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(RelationRenderer);
