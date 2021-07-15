import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import ResourceHeader from '../RRView/ResourceHeader';
import ResourceBody from '../RRView/ResourceBody';
import { calculateBodyRows, transformResourceToTTL } from '../../mappers/ResToTTL';
import { Button } from 'reactstrap';
import { redux_editResource, redux_removeResource } from '../../redux/actions/rrm_actions';
class SingleResource extends Component {
    constructor(props) {
        super(props);
        this.ref = React.createRef();
        this.state = {
            isEditing: false,
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

    editResource = inputHeaderString => {
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
        const currentResource = this.props.resourceContext;
        const content = transformResourceToTTL(currentResource);

        const numRowsRequired = calculateBodyRows(content);
        //console.log('CONTENT', content, 'requires', numRowsRequired);
        const isVisible = currentResource.isFilteredOut === true ? 'none' : 'block';
        this.props.arrayOfRef.push({ identifier: currentResource.identifier, ref: this.ref });
        return (
            <div ref={this.ref} style={{ padding: '5px', overflow: 'auto', paddingRight: '20px', display: isVisible }}>
                <ResourceHeader
                    resourceContext={currentResource}
                    isEditing={this.state.isEditing}
                    forcedRerendering={this.state.forcedUpdate}
                    toggleEditButton={this.toggleEditButton}
                    deleteResource={this.deleteResource}
                    editResource={this.editResource}
                />
                {numRowsRequired > 0 && (
                    <div id="bodyContainer" style={{ display: 'flex' }}>
                        <ResourceBody resourceContext={this.props.resourceContext} isEditing={this.state.isEditing} />
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

SingleResource.propTypes = {
    resourceContext: PropTypes.object.isRequired,
    redux_removeResource: PropTypes.func.isRequired,
    redux_editResource: PropTypes.func.isRequired,
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
