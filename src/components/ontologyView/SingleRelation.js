import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { redux_editRelation, redux_removeRelation } from '../../redux/actions/rrm_actions';
import RelationHeader from '../RRView/RelationHeader';
import RelationBody from '../RRView/RelationBody';
import CardGraphVis from '../GraphVis/CardGraphVis';
import CardWidgetVis from './CardWidgetVis';
import ItemController from '../RRView/ItemController';
import { CollapsibleItem, GraphVisButton, WidgetVisButton } from './StyledComponents';
import { PRIMARY } from '../RRView/StyledComponents';

class SingleRelation extends Component {
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

            forcedUpdate: false,
            updateSiblings: false
        };
    }

    componentDidMount() {
        // console.log('Mount');
        this.props.registerToParent(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log('am I Updated?');
    }

    updateSiblings = () => {
        this.setState({ updateSiblings: !this.state.updateSiblings });
    };

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
    createGraphVisForRelation = () => {
        this.setState({ showingGraphVis: !this.state.showingGraphVis, graphVisInitialRendering: false });
    };

    editRelation = inputHeaderString => {
        const inputArray = inputHeaderString.split(' ');
        const typeArray = inputArray.slice(2, inputArray.length);
        if (typeArray[typeArray.length - 1] === '.' || typeArray[typeArray.length - 1] === ';') {
            typeArray.pop();
        }
        const currentRelationContext = this.props.relationContext;

        const newRelation = {
            axioms: currentRelationContext.axioms,
            annotations: currentRelationContext.annotations,
            domainRangePairs: currentRelationContext.domainRangePairs,
            identifier: inputArray[0],
            type: typeArray
        };
        this.props.redux_editRelation({ updatedRelation: newRelation, relationIdentifier: currentRelationContext.identifier });
    };

    deleteRelation = () => {
        const relation = this.props.relationContext;
        const index = this.props.arrayOfRef.findIndex(refItem => {
            return refItem.identifier === relation.identifier;
        });

        if (index > -1) {
            this.props.arrayOfRef.splice(index, 1);
        }

        this.props.unRegisterFromParent(this);
        this.props.removeFromLookupList(relation.identifier);

        this.props.redux_removeRelation(relation);
    };

    render() {
        // const content = transformRelationToTTL(this.props.relationContext);
        const currentRelation = this.props.relationContext;
        //TODO: we need this to auto init the number of lines
        // const numRowsRequired = calculateBodyRows(content);
        this.props.arrayOfRef.push({ identifier: currentRelation.identifier, ref: this.ref });
        const isFiltered = this.props.relationContext.isFilteredOut;
        const isVisible = isFiltered === true ? 'none' : 'block';

        return (
            <div
                ref={this.ref}
                style={{
                    padding: '1px',
                    marginLeft: '10px',
                    overflow: 'none',
                    display: isVisible,
                    backgroundColor:
                        this.props.relationContext.type[0].toLowerCase() === 'owl:DatatypeProperty'.toLowerCase()
                            ? PRIMARY.main
                            : this.props.relationContext.type[0].toLowerCase() === 'owl:objectProperty'.toLowerCase()
                            ? PRIMARY.lightMain
                            : PRIMARY.lighter,
                    borderRadius: '10px 10px 0px 0px',
                    marginBottom: '5px'
                }}
            >
                {this.props.experimentalLayout && (
                    <ItemController
                        itemType="Relation"
                        forcedReRendering={this.state.forcedUpdate}
                        itemContext={this.props.relationContext}
                        isEditing={this.state.isEditing}
                        isBodyExpanded={this.state.showBody}
                        toggleEditButton={this.toggleEditButton}
                        deleteResource={this.deleteRelation}
                        editResource={this.editRelation}
                        showBody={this.showBody}
                        showGraphVis={this.createGraphVisForRelation}
                        showWidget={this.showWidgetVis}
                        showingBody={this.state.showBody}
                        showingWidget={this.state.showingWidgetVis}
                        showingGraph={this.state.showingGraphVis}
                    />
                )}

                <RelationHeader
                    relationContext={this.props.relationContext}
                    isEditing={this.state.isEditing}
                    forcedRerendering={this.state.forcedUpdate}
                    toggleEditButton={this.toggleEditButton}
                    deleteRelation={this.deleteRelation}
                    editRelation={this.editRelation}
                    showBody={this.showBody}
                    isBodyExpanded={this.state.showBody}
                    experimentalLayout={this.props.experimentalLayout}
                />

                <div style={{ display: 'flex' }}>
                    <CollapsibleItem isOpen={this.state.showBody}>
                        <RelationBody
                            relationContext={this.props.relationContext}
                            isEditing={this.state.isEditing}
                            isBodyExpanded={this.state.showBody}
                            initialRendering={this.state.bodyInitialRendering}
                        />
                    </CollapsibleItem>
                </div>

                <CollapsibleItem isOpen={this.state.showingGraphVis}>
                    <CardGraphVis
                        isExpanded={this.state.showingGraphVis}
                        itemIdentifier={this.props.relationContext.identifier}
                        itemContext={this.props.relationContext}
                        itemType="Relation"
                        callback={this.updateSiblings}
                    />
                </CollapsibleItem>
                <CollapsibleItem isOpen={this.state.showingWidgetVis}>
                    <CardWidgetVis
                        isExpanded={this.state.showingWidgetVis}
                        itemIdentifier={this.props.relationContext.identifier}
                        itemContext={this.props.relationContext}
                        itemType="Relation"
                        callback={this.updateSiblings}
                    />
                </CollapsibleItem>
                {!this.props.experimentalLayout && (
                    <div style={{ display: 'flex', width: '100%' }}>
                        <GraphVisButton
                            onClick={() => {
                                this.createGraphVisForRelation();
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

SingleRelation.propTypes = {
    relationContext: PropTypes.object.isRequired,
    redux_removeRelation: PropTypes.func.isRequired,
    redux_editRelation: PropTypes.func.isRequired,
    experimentalLayout: PropTypes.bool.isRequired,
    registerToParent: PropTypes.func.isRequired,
    unRegisterFromParent: PropTypes.func.isRequired,
    removeFromLookupList: PropTypes.func.isRequired,
    arrayOfRef: PropTypes.array.isRequired
};

const mapDispatchToProps = dispatch => ({
    redux_removeRelation: data => dispatch(redux_removeRelation(data)),
    redux_editRelation: data => dispatch(redux_editRelation(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRelation);
