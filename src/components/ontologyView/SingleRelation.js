import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { calculateBodyRows, transformRelationToTTL } from '../../mappers/RelationToTTL';
import { Button } from 'reactstrap';
import { redux_editRelation, redux_removeRelation } from '../../redux/actions/rrm_actions';
import RelationHeader from '../RRView/RelationHeader';
import RelationBody from '../RRView/RelationBody';
class SingleRelation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isEditing: false
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    toggleEditButton = val => {
        this.setState({ isEditing: val });
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
        this.props.redux_removeRelation(relation);
    };
    render() {
        // check if we have a body;
        // const resDef = this.props.resourceContext;
        // console.log(resDef);
        // let headerTerminationToken = ';';
        // const anCount = Object.keys(resDef.annotations).length;
        // const axCount = Object.keys(resDef.axioms).length;
        // console.log('# # ', anCount, axCount);
        // if (anCount === 0 && axCount === 0) {
        //     headerTerminationToken = '.';
        // }

        const content = transformRelationToTTL(this.props.relationContext);
        const numRowsRequired = calculateBodyRows(content);
        //console.log('CONTENT', content, 'requires', numRowsRequired);

        const isFiltered = this.props.relationContext.isFilteredOut;
        const isVisible = isFiltered === true ? 'none' : 'block';
        return (
            <div style={{ height: '100%', overflow: 'auto', paddingRight: '20px', display: isVisible }}>
                <RelationHeader
                    relationContext={this.props.relationContext}
                    isEditing={this.state.isEditing}
                    toggleEditButton={this.toggleEditButton}
                    deleteRelation={this.deleteRelation}
                    editRelation={this.editRelation}
                />
                {numRowsRequired > 0 && (
                    <div id="bodyContainer" style={{ display: 'flex' }}>
                        <RelationBody relationContext={this.props.relationContext} isEditing={this.state.isEditing} />
                        <Button
                            style={{
                                padding: 0,
                                float: 'right',
                                width: '20px',
                                backgroundColor: 'red',
                                writingMode: 'tb',
                                textAlign: 'center',
                                clipPath: 'polygon(0 0, 0 100%, 100% 90%, 100% 10%, 0% 0)',
                                position: 'relative',
                                right: '-20px',
                                marginLeft: '-20px'
                            }}
                        >
                            Visualize
                        </Button>
                    </div>
                )}
                {/*{this.props.resourceContext.identifier} rdf:type {' ' + this.props.resourceContext.type + ' ' + headerTerminationToken}{' '}*/}
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
    redux_editRelation: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    redux_removeRelation: data => dispatch(redux_removeRelation(data)),
    redux_editRelation: data => dispatch(redux_editRelation(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleRelation);
