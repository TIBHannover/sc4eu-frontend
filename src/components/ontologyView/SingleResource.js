import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import ResourceHeader from '../RRView/ResourceHeader';
import ResourceBody from '../RRView/ResourceBody';
import { calculateBodyRows, transformResourceToTTL } from '../../mappers/ResToTTL';
import { Button } from 'reactstrap';
class SingleResource extends Component {
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

        const content = transformResourceToTTL(this.props.resourceContext);
        const numRowsRequired = calculateBodyRows(content);
        // console.log('CONTENT', content, 'requires', numRowsRequired);

        return (
            <div style={{ height: '100%', overflow: 'auto', paddingRight: '20px' }}>
                <ResourceHeader
                    resourceContext={this.props.resourceContext}
                    isEditing={this.state.isEditing}
                    toggleEditButton={this.toggleEditButton}
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
    resourceContext: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SingleResource);
