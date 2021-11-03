import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, Input } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import { faPen, faTrash, faCaretSquareDown, faCaretSquareUp } from '@fortawesome/free-solid-svg-icons';
import { transformIdentifierToPrefixed } from '../../mappers/RelationToTTL';
import Tippy from '@tippyjs/react';

class RelationHeader extends Component {
    constructor(props) {
        super(props);

        // check if we have a body;
        const resDef = this.props.relationContext;
        let headerTerminationToken = ';';
        const anCount = Object.keys(resDef.annotations).length;
        const axCount = Object.keys(resDef.axioms).length;
        if (anCount === 0 && axCount === 0) {
            headerTerminationToken = '.';
        }

        const prefixList = this.props.metaInformation.prefixList.longToShort;
        const prefixedIdentifier = transformIdentifierToPrefixed(this.props.relationContext.identifier, prefixList);
        this.state = {
            headerInputValue: prefixedIdentifier + ' rdf:type ' + this.props.relationContext.type + ' ' + headerTerminationToken
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log('HEADER >>>>> I got updated');
        if (prevProps.relationContext.type !== this.props.relationContext.type) {
            const resDef = this.props.relationContext;
            let headerTerminationToken = ';';
            const anCount = Object.keys(resDef.annotations).length;
            const axCount = Object.keys(resDef.axioms).length;
            if (anCount === 0 && axCount === 0) {
                headerTerminationToken = '.';
            }

            const prefixList = this.props.metaInformation.prefixList.longToShort;
            const prefixedIdentifier = transformIdentifierToPrefixed(this.props.relationContext.identifier, prefixList);
            this.setState({
                headerInputValue: prefixedIdentifier + ' rdf:type ' + this.props.relationContext.type + ' ' + headerTerminationToken
            });
        }
    }

    toggleEditButton = () => {
        this.props.toggleEditButton(!this.props.isEditing);
    };

    getBackgroundColor = () => {
        const relationContext = this.props.relationContext;
        if (relationContext.isHighlighted) {
            return '#000000';
        } else if (relationContext.type.length && relationContext.type[0].toLowerCase() === 'owl:objectProperty'.toLowerCase()) {
            return '#4388cc';
        } else if (relationContext.type.length && relationContext.type[0].toLowerCase() === 'owl:datatypeProperty'.toLowerCase()) {
            return '#9c6';
        }
        return '#838a92';
    };

    render() {
        return (
            <StyledRelationHeader
                experimentalLayout={this.props.experimentalLayout}
                isHighlighted={this.props.relationContext.isHighlighted}
                typedBasedColor={this.getBackgroundColor()}
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
                            title="Edit Relation"
                            color="white"
                            size="sm"
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
                            this.props.editRelation(e.target.value);
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
                        title="Delete Relation"
                        onClick={this.props.deleteRelation}
                        style={{ float: 'right', padding: '0px', paddingLeft: '5px', marginLeft: 'auto' }}
                    >
                        <Icon icon={faTrash} color={'white'} />
                    </Button>
                )}

                {/*// add enable editing botton*/}
            </StyledRelationHeader>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        relations: state.ResourceRelationModelReducer.relations,
        metaInformation: state.ResourceRelationModelReducer.metaInformation
    };
};

RelationHeader.propTypes = {
    relationContext: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    toggleEditButton: PropTypes.func.isRequired,
    deleteRelation: PropTypes.func.isRequired,
    editRelation: PropTypes.func.isRequired,
    experimentalLayout: PropTypes.bool.isRequired,
    showBody: PropTypes.func.isRequired,
    isBodyExpanded: PropTypes.bool.isRequired,
    metaInformation: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RelationHeader);

const StyledRelationHeader = styled.div`
    padding: 5px;
    border-radius: ${props => (props.experimentalLayout === true ? '0px 0px 0 0' : '10px 10px 0 0')};
    border: 1px solid black;
    padding: 5px;
    color: white;
    background-color: ${props => (props.experimentalLayout ? '#ccc' : props.isHighlighted === true ? '#000000' : props.typedBasedColor)};
    color: ${props => (props.experimentalLayout ? 'black' : 'white')};
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;

const StyledContentView = styled.div`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

export const HeaderValueInput = styled(Input)`
    background: #fff;
    color: black;
    outline: 0;
    border: dotted 2px red;
    border-radius: 0;
    padding: 0 4px;
    display: block;
    height: 22px !important;

    min-width: 150px;
    margin: 1px 1px;
    padding: 0 2px;

    &:focus {
        background: #fff;
        color: black;
        outline: 0;
        border: dotted 2px green;
        padding: 0 4px;
        border-radius: 0;
        display: block;
    }
`;
