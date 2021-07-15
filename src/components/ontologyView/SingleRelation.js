import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { calculateBodyRows, transformRelationToTTL } from '../../mappers/RelationToTTL';
import { Button } from 'reactstrap';
import { redux_editRelation, redux_removeRelation } from '../../redux/actions/rrm_actions';
import RelationHeader from '../RRView/RelationHeader';
import RelationBody from '../RRView/RelationBody';
import CardGraphVis from '../GraphVis/CardGraphVis';
import CardWidgetVis from './CardWidgetVis';
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

            forcedUpdate: false
        };
    }

    componentDidMount() {
        // console.log('Mount');
        this.props.registerToParent(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        //  console.log('Update');
    }

    forceRerendering = () => {
        this.setState({ forcedUpdate: !this.state.forcedUpdate });
    };

    toggleEditButton = val => {
        this.setState({ isEditing: val });
    };

    setShowBody = val => {
        this.setState({ showBody: val });
    };
    showBody = () => {
        this.setState({ showBody: !this.state.showBody });
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
        const content = transformRelationToTTL(this.props.relationContext);
        const currentRelation = this.props.relationContext;
        const numRowsRequired = calculateBodyRows(content);
        this.props.arrayOfRef.push({ identifier: currentRelation.identifier, ref: this.ref });
        const isFiltered = this.props.relationContext.isFilteredOut;
        const isVisible = isFiltered === true ? 'none' : 'block';

        return (
            <div ref={this.ref} style={{ padding: '5px', overflow: 'auto', paddingRight: '5px', display: isVisible }}>
                <RelationHeader
                    relationContext={this.props.relationContext}
                    isEditing={this.state.isEditing}
                    forcedRerendering={this.state.forcedUpdate}
                    toggleEditButton={this.toggleEditButton}
                    deleteRelation={this.deleteRelation}
                    editRelation={this.editRelation}
                    showBody={this.showBody}
                    isBodyExpanded={this.state.showBody}
                />
                {numRowsRequired > 0 && (
                    <div id="bodyContainer" style={{ display: 'flex' }}>
                        <RelationBody
                            relationContext={this.props.relationContext}
                            isEditing={this.state.isEditing}
                            isBodyExpanded={this.state.showBody}
                            initialRendering={this.state.bodyInitialRendering}
                        />
                    </div>
                )}
                <CardGraphVis
                    isExpanded={this.state.showingGraphVis}
                    itemIdentifier={this.props.relationContext.identifier}
                    initialRendering={this.state.graphVisInitialRendering}
                    itemType="Relation"
                />
                <CardWidgetVis
                    isExpanded={this.state.showingWidgetVis}
                    itemIdentifier={this.props.relationContext.identifier}
                    initialRendering={this.state.widgetInitialRendering}
                    itemType="Relation"
                />

                <Button
                    style={{
                        padding: 0,
                        width: '49%',
                        backgroundColor: '#ad2f38',
                        textAlign: 'center',
                        position: 'relative',
                        borderRadius: '5px',
                        marginTop: '-3px',
                        marginRight: '1%',
                        borderTopLeftRadius: '0',
                        borderTopRightRadius: '0',
                        borderTop: 'none',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    }}
                    onClick={() => {
                        // this.createGraphVisForResource();
                    }}
                >
                    Graph Vis
                </Button>
                <Button
                    style={{
                        padding: 0,
                        width: '50%',
                        backgroundColor: '#cccccc',
                        color: 'black',
                        textAlign: 'center',
                        position: 'relative',
                        borderRadius: '5px',
                        marginTop: '-3px',
                        borderTopLeftRadius: '0',
                        borderTopRightRadius: '0',
                        borderTop: 'none',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis'
                    }}
                >
                    Widget-Based
                </Button>
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
