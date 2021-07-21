import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { Button } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faCaretSquareDown, faCaretSquareUp } from '@fortawesome/free-solid-svg-icons';
import { transformIdentifierToPrefixed } from '../../mappers/ResToTTL';
import Tippy from '@tippyjs/react';
import { StyledResourceHeader, HeaderValueInput, StyledContentView } from './StyledComponents';

class ResourceHeader extends Component {
    constructor(props) {
        super(props);

        // check if we have a body;
        const resDef = this.props.resourceContext;
        let headerTerminationToken = ';';
        const anCount = Object.keys(resDef.annotations).length;
        const axCount = Object.keys(resDef.axioms).length;
        if (anCount === 0 && axCount === 0) {
            headerTerminationToken = '.';
        }
        const prefixList = this.props.metaInformation.prefixList.longToShort;
        this.state = {
            headerInputValue:
                transformIdentifierToPrefixed(this.props.resourceContext.identifier, prefixList) +
                ' rdf:type ' +
                this.props.resourceContext.type +
                ' ' +
                headerTerminationToken
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    toggleEditButton = () => {
        this.props.toggleEditButton(!this.props.isEditing);
    };

    render() {
        return (
            <StyledResourceHeader
                isHighlighted={this.props.resourceContext.isHighlighted}
                experimentalLayout={this.props.experimentalLayout}
                style={{ height: '100%', overflow: 'auto', display: 'flex' }}
            >
                {/*TODO add checkBox for 'selective filtering' */}

                {!this.props.experimentalLayout && (
                    <>
                        <Button color="white" size="sm" style={{ float: 'right', padding: '0px', paddingRight: '5px' }} onClick={this.props.showBody}>
                            {!this.props.isBodyExpanded ? (
                                <Icon icon={faCaretSquareDown} color="white" />
                            ) : (
                                <Icon icon={faCaretSquareUp} color="white" />
                            )}
                        </Button>
                        <Button
                            color="white"
                            size="sm"
                            title="Edit Resource"
                            style={{ float: 'right', padding: '0px', paddingRight: '5px' }}
                            onClick={this.toggleEditButton}
                        >
                            <Icon icon={faPen} color={this.state.isEditing ? 'red' : 'white'} />
                        </Button>
                    </>
                )}

                {this.props.isEditing ? (
                    <HeaderValueInput
                        autoFocus={true}
                        value={this.state.headerInputValue}
                        // onChange={this.cellValueChanged}
                        // innerRef={inputRefs}
                        onKeyDown={e => e.keyCode === 13 && e.target.blur()} // Disable multiline Input
                        onChange={e => {
                            this.setState({ headerInputValue: e.target.value });
                        }}
                        onBlur={e => {
                            this.props.editResource(e.target.value);
                            // todo: do validation stuff
                            // props.data.setLabel(cellLabelValue);
                            // props.tippySource.data.instance.enable();
                            // setRenderingItem('text');
                        }}
                        // onFocus={
                        //     // e => {
                        //     //     e.target.select();
                        //     // } // Highlights the entire label when edit
                        // }
                    />
                ) : (
                    <Tippy content={this.state.headerInputValue}>
                        <StyledContentView>{this.state.headerInputValue}</StyledContentView>
                    </Tippy>
                )}
                {!this.props.experimentalLayout && (
                    <Button
                        color="white"
                        size="sm"
                        title="Delete Resource"
                        onClick={this.props.deleteResource}
                        style={{ float: 'right', padding: '0px', paddingLeft: '5px', marginLeft: 'auto' }}
                    >
                        <Icon icon={faTrash} color={'white'} />
                    </Button>
                )}

                {/*// add enable editing botton*/}
            </StyledResourceHeader>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        resources: state.ResourceRelationModelReducer.resources,
        metaInformation: state.ResourceRelationModelReducer.metaInformation
    };
};

ResourceHeader.propTypes = {
    resourceContext: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    toggleEditButton: PropTypes.func.isRequired,
    deleteResource: PropTypes.func.isRequired,
    editResource: PropTypes.func.isRequired,
    showBody: PropTypes.func.isRequired,
    isBodyExpanded: PropTypes.bool.isRequired,
    experimentalLayout: PropTypes.bool.isRequired,
    metaInformation: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceHeader);
