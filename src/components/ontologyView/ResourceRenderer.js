import React, { Component } from 'react';

import PropTypes from 'prop-types';
import SingleResource from './SingleResource';

import { Button, InputGroup } from 'reactstrap';
import { connect } from 'react-redux';
import { redux_addResource } from '../../redux/actions/rrm_actions';
import SearchAutoComplete from './SearchAutoComplete';
import { redux_preserveFilterSearch } from '../../redux/actions/globalUI_actions';

class ResourceRenderer extends Component {
    constructor(props) {
        super(props);
        this.arrayOfChildObjects = [];

        this.arrayOfRef = []; //  maybe investigate it in more details
        this.lookupList = [];
        this.cropped = [];
        this.searchText = this.props.globalUIReducer.ui_resource_search_value_preserved;
        this.filterText = this.props.globalUIReducer.ui_resource_filter_value_preserved;
        this.state = {
            updateFlipFlop: true
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.resourcesExpanded !== prevProps.resourcesExpanded) {
            this.expandAllBodies(this.props.resourcesExpanded);
        }
    }

    expandAllBodies = val => {
        this.arrayOfChildObjects.forEach(item => {
            if (item) {
                item.setShowBody(val);
            }
        });
    };

    renderAllResources = () => {
        this.arrayOfRef = [];
        if (this.props.resources && this.props.resources.length > 0) {
            const items = this.props.resources.filter(item => item.resourceURI !== 'http://www.w3.org/2000/01/rdf-schema#Literal');
            this.cropped = items.slice(0, 100);

            const mappedResources = this.cropped.map(item => {
                this.lookupList.push(
                    item.identifier
                        .split('/')
                        .pop()
                        .split('#')
                        .pop()
                );
                return this.renderSingleResource(item);
            });
            return mappedResources;
        } else {
            return <> No Classes Found </>;
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

    renderSingleResource = obj => {
        return (
            <SingleResource
                arrayOfRef={this.arrayOfRef}
                key={'resourceIndexKey_' + obj.identifier}
                registerToParent={this.registerToParent}
                unRegisterFromParent={this.unRegisterFromParent}
                removeFromLookupList={this.removeFromLookupList}
                resourceContext={obj}
                experimentalLayout={this.props.experimentalLayout}
            />
        );
    };

    handleSearch = (value, counter) => {
        this.searchText = value;
        this.props.redux_preserveFilterSearch({ ui_resource_search_value_preserved: value });
        this.arrayOfChildObjects.forEach(child => {
            if (child.props.resourceContext.isHighlighted) {
                child.props.resourceContext.isHighlighted = false;
                child.forceRerendering();
            }
        });

        if (value === '' || value === undefined) {
            // scroll to top if nothing was found or empty string
            this.arrayOfRef[0].ref.current.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        const found = this.cropped.filter(item => {
            if (item.identifier.toLowerCase().includes(value.toLowerCase()) || this.searchInAnnotations(item.annotations, value)) {
                const foundChild = this.arrayOfChildObjects.find(
                    child => child.props.resourceContext.identifier.toLowerCase() === item.identifier.toLowerCase()
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

    searchInAnnotations = (annotations, value) => {
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
        this.props.redux_preserveFilterSearch({ ui_resource_filter_value_preserved: filterValue });
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

    handleAdd = () => {
        const newResource = { identifier: 'foaf:', axioms: {}, annotations: {}, type: '' };
        this.props.redux_addResource(newResource);
    };

    render() {
        return (
            <div style={{ height: '100%', overflow: 'hidden' }}>
                {/*    Controls*/}
                <div style={{ display: 'flex', height: '30px', margin: '5px', marginBottom: '15px' }}>
                    <Button size="sm" color="primary" style={{ height: '39px' }} onClick={this.handleAdd}>
                        Add
                    </Button>
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
                {/* Resources*/}

                {/*WHY IS KEY A BOOL??? */}
                <div
                    id="resourceRendererContainer"
                    key={this.state.updateFlipFlop}
                    style={{ marginTop: '10px', height: 'calc(100% - 50px)', overflow: 'auto' }}
                >
                    {this.renderAllResources()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        resources: state.ResourceRelationModelReducer.resources,
        resourcesExpanded: state.globalUIReducer.ui_all_resource_bodies_expanded,
        metaInformation: state.ResourceRelationModelReducer.metaInformation,
        globalUIReducer: state.globalUIReducer
    };
};

ResourceRenderer.propTypes = {
    resources: PropTypes.array.isRequired,
    redux_addResource: PropTypes.func.isRequired,
    experimentalLayout: PropTypes.bool.isRequired,
    resourcesExpanded: PropTypes.bool.isRequired,
    globalUIReducer: PropTypes.object.isRequired,
    redux_preserveFilterSearch: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    redux_addResource: data => dispatch(redux_addResource(data)),
    redux_preserveFilterSearch: data => dispatch(redux_preserveFilterSearch(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceRenderer);
