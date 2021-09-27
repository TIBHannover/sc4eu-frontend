import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import ResourceHeader from '../RRView/ResourceHeader';
import ResourceBody from '../RRView/ResourceBody';
import { redux_editResource, redux_removeResource } from '../../redux/actions/rrm_actions';
import CardGraphVis from '../GraphVis/CardGraphVis';
import CardWidgetVis from '../ontologyView/CardWidgetVis';
import ItemController from '../RRView/ItemController';
import { GraphVisButton, WidgetVisButton, CollapsibleItem } from './StyledComponents';
class SingleResource extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            isEditing: false,
            showingGraphVis: false,
            showingWidgetVis: false,
            showBody: false,

            graphVisInitialRendering: true,
            bodyInitialRendering: true,
            widgetInitialRendering: true,

            forcedUpdate: false
        };
    }

    componentDidMount() {
        this.props.registerToParent(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {}

    forceRerendering = () => {
        this.setState({ forcedUpdate: !this.state.forcedUpdate });
    };
    toggleEditButton = val => {
        this.setState({ isEditing: val });
    };
    setShowBody = val => {
        this.setState({ showBody: val, bodyInitialRendering: false });
    };
    showBody = () => {
        this.setState({ showBody: !this.state.showBody, bodyInitialRendering: false });
    };
    showWidgetVis = () => {
        this.setState({ showingWidgetVis: !this.state.showingWidgetVis, widgetInitialRendering: false });
    };
    createGraphVisForResource = () => {
        this.setState({ showingGraphVis: !this.state.showingGraphVis, graphVisInitialRendering: false });
    };

    editResource = inputHeaderString => {
        console.log(inputHeaderString);
        const inputArray = inputHeaderString.split(' ');
        const typeArray = inputArray.slice(2, inputArray.length);
        if (typeArray[typeArray.length - 1] === '.' || typeArray[typeArray.length - 1] === ';') {
            typeArray.pop();
        }
        const currentResource = this.props.resourceContext;
        const newResource = { axioms: currentResource.axioms, annotations: currentResource.annotations, identifier: inputArray[0], type: typeArray };
        this.props.redux_editResource({ updatedResource: newResource, resourceIdentifier: currentResource.identifier });
    };

    deleteResource = () => {
        const resource = this.props.resourceContext;
        const index = this.props.arrayOfRef.findIndex(refItem => {
            return refItem.identifier === resource.identifier;
        });

        if (index > -1) {
            this.props.arrayOfRef.splice(index, 1);
        }

        this.props.unRegisterFromParent(this);
        this.props.removeFromLookupList(resource.identifier);

        this.props.redux_removeResource(resource);
    };
    render() {
        const currentResource = this.props.resourceContext;
        const isVisible = currentResource.isFilteredOut === true ? 'none' : 'block';
        this.props.arrayOfRef.push({ identifier: currentResource.identifier, ref: this.ref });
        return (
            <div ref={this.ref} style={{ padding: '5px', overflow: 'none', paddingRight: '5px', display: isVisible }}>
                {this.props.experimentalLayout && (
                    <ItemController
                        itemType="Resource"
                        forcedReRendering={this.state.forcedUpdate}
                        itemContext={this.props.resourceContext}
                        isEditing={this.state.isEditing}
                        isBodyExpanded={this.state.showBody}
                        toggleEditButton={this.toggleEditButton}
                        deleteResource={this.deleteResource}
                        editResource={this.editResource}
                        showBody={this.showBody}
                        showGraphVis={this.createGraphVisForResource}
                        showWidget={this.showWidgetVis}
                        showingBody={this.state.showBody}
                        showingWidget={this.state.showingWidgetVis}
                        showingGraph={this.state.showingGraphVis}
                    />
                )}

                <ResourceHeader
                    resourceContext={currentResource}
                    isEditing={this.state.isEditing}
                    forcedRerendering={this.state.forcedUpdate}
                    toggleEditButton={this.toggleEditButton}
                    deleteResource={this.deleteResource}
                    editResource={this.editResource}
                    showBody={this.showBody}
                    isBodyExpanded={this.state.showBody}
                    experimentalLayout={this.props.experimentalLayout}
                />
                <div style={{ display: 'flex' }}>
                    <CollapsibleItem isOpen={this.state.showBody}>
                        <ResourceBody
                            resourceContext={this.props.resourceContext}
                            isEditing={this.state.isEditing}
                            isBodyExpanded={this.state.showBody}
                        />
                    </CollapsibleItem>
                </div>
                <CollapsibleItem isOpen={this.state.showingGraphVis}>
                    <CardGraphVis
                        itemIdentifier={this.props.resourceContext.identifier}
                        isExpanded={this.state.showingGraphVis}
                        itemType="Resource"
                    />
                </CollapsibleItem>
                <CollapsibleItem isOpen={this.state.showingWidgetVis}>
                    <CardWidgetVis
                        itemIdentifier={this.props.resourceContext.identifier}
                        itemContext={this.props.resourceContext}
                        isExpanded={this.state.showingWidgetVis}
                        itemType="Resource"
                    />
                </CollapsibleItem>
                {!this.props.experimentalLayout && (
                    <div style={{ display: 'flex', width: '100%' }}>
                        <GraphVisButton
                            onClick={() => {
                                this.createGraphVisForResource();
                            }}
                        >
                            Graph Vis
                        </GraphVisButton>
                        <WidgetVisButton
                            onClick={() => {
                                this.showWidgetVis();
                            }}
                        >
                            Widget-Based
                        </WidgetVisButton>
                    </div>
                )}
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

SingleResource.propTypes = {
    resourceContext: PropTypes.object.isRequired,
    redux_removeResource: PropTypes.func.isRequired,
    redux_editResource: PropTypes.func.isRequired,
    experimentalLayout: PropTypes.bool.isRequired,
    registerToParent: PropTypes.func.isRequired,
    unRegisterFromParent: PropTypes.func.isRequired,
    removeFromLookupList: PropTypes.func.isRequired,
    arrayOfRef: PropTypes.array.isRequired
};

const mapDispatchToProps = dispatch => ({
    redux_removeResource: data => dispatch(redux_removeResource(data)),
    redux_editResource: data => dispatch(redux_editResource(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleResource);
