import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faProjectDiagram, faAlignJustify, faJedi, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

class ItemController extends Component {
    getBackgroundColor = () => {
        if (this.props.itemType === 'Relation') {
            if (this.props.itemContext.isHighlighted) {
                return '#000000';
            } else if (this.props.itemContext.type[0].toLowerCase() === 'owl:objectProperty'.toLowerCase()) {
                return '#4388cc';
            } else if (this.props.itemContext.type[0].toLowerCase() === 'owl:datatypeProperty'.toLowerCase()) {
                return '#9c6';
            }
            return '#838a92';
        } else {
            return undefined;
        }
    };

    getFontColor = () => {
        if (this.props.itemType === 'Relation') {
            if (this.props.itemContext.isHighlighted) {
                return '#ffffff';
            } else if (this.props.itemContext.type[0].toLowerCase() === 'owl:objectProperty'.toLowerCase()) {
                return '#ffffff';
            } else if (this.props.itemContext.type[0].toLowerCase() === 'owl:datatypeProperty'.toLowerCase()) {
                return '#000000';
            }
            return '#fff';
        } else {
            return undefined;
        }
    };

    getSuffix = val => {
        const lastHashPos = val.lastIndexOf('#');
        const lastSlashPos = val.lastIndexOf('/');
        const splitToken = Math.max(lastHashPos, lastSlashPos);
        return val.slice(splitToken + 1, val.length);
    };
    render() {
        const itemLabel = this.getSuffix(this.props.itemContext.identifier);
        const itemHighlighted = this.props.itemContext.isHighlighted;
        return (
            <StyledController style={{ padding: 0, height: '30px', width: '100%', overflow: 'auto', display: 'flex' }}>
                {/*TEXT VIEW*/}
                <div style={{ width: '250px', minWidth: '100px', display: 'flex' }}>
                    <ControlButton size="sm" onClick={this.props.showBody} active={this.props.showingBody}>
                        <Icon icon={faAlignJustify} />
                    </ControlButton>

                    {/*GRAPH VIEW*/}
                    <ControlButton size="sm" onClick={this.props.showGraphVis} active={this.props.showingGraph}>
                        <Icon icon={faProjectDiagram} />
                    </ControlButton>

                    {/*PROTEGE VIEW */}
                    <ControlButton size="sm" onClick={this.props.showWidget} active={this.props.showingWidget}>
                        <Icon icon={faJedi} />
                    </ControlButton>
                </div>
                <div style={{ width: '100%', float: 'center' }}>
                    <LabelDiv isHighlighted={itemHighlighted} typedBasedColor={this.getBackgroundColor()} typedBasedFontColor={this.getFontColor()}>
                        {itemLabel}
                    </LabelDiv>
                </div>

                {/*--------CONTROLS  (FLOAT RIGHT reverses the order of items )*/}
                <div style={{ width: '250px', minWidth: '100px', float: 'right' }}>
                    {/*DELETE*/}
                    <ControlButton
                        size="sm"
                        color="primary"
                        type="control"
                        style={{ marginRight: 0, float: 'right' }}
                        onClick={this.props.deleteResource}
                    >
                        <Icon icon={faTrash} />
                    </ControlButton>
                    {/* EDIT  */}
                    <ControlButton
                        size="sm"
                        color="primary"
                        type="control"
                        style={{ float: 'right' }}
                        onClick={() => {
                            this.props.toggleEditButton(!this.props.isEditing);
                        }}
                    >
                        <Icon icon={faPen} />
                    </ControlButton>
                    {/* EDIT  */}
                    <ControlButton size="sm" color="primary" type="control" style={{ float: 'right' }}>
                        <Icon icon={faEyeSlash} />
                    </ControlButton>
                </div>
            </StyledController>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        relations: state.ResourceRelationModelReducer.relations
    };
};

ItemController.propTypes = {
    itemType: PropTypes.string.isRequired,
    forcedReRendering: PropTypes.bool.isRequired,
    itemContext: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    toggleEditButton: PropTypes.func.isRequired,
    deleteResource: PropTypes.func.isRequired,
    editResource: PropTypes.func.isRequired,
    showBody: PropTypes.func.isRequired,
    showGraphVis: PropTypes.func.isRequired,
    showWidget: PropTypes.func.isRequired,
    isBodyExpanded: PropTypes.bool.isRequired,
    showingBody: PropTypes.bool.isRequired,
    showingGraph: PropTypes.bool.isRequired,
    showingWidget: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ItemController);

const StyledController = styled.div`
    padding: 5px;
    // border-radius: 10px 10px 0 0;
    // border: 1px solid black;
    border-bottom: none;
    padding: 5px;
    color: white;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;
const LabelDiv = styled.div`
    padding: 5px;
    border-radius: 10px 10px 0 0;
    border: 1px solid black;
    border-bottom: none;
    padding: 5px;
    color: white;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    height: 30px;
    color: ${props => (props.typedBasedFontColor ? props.typedBasedFontColor : '#fff')};
    background-color: ${props => (props.isHighlighted === true ? '#000000' : props.typedBasedColor ? props.typedBasedColor : '#4388cc')};
`;

const ControlButton = styled.div`
    padding: 5px;
    border-radius: ${props => (props.type === 'control' ? '0' : '10px 10px 0 0')};
    border: 1px solid black;
    border-bottom: none;
    text-align: center;
    margin-right: ${props => (props.type === 'control' ? '3px' : '-1px')};
    background-color: ${props => (props?.active === true ? '#ad2f38' : '#007bff')};

    width: 30px;
    height: 30px;
    color: white;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }

    :hover {
        background-color: ${props => (props?.active === true ? '#952d36' : '#0061c1')};
        cursor: pointer;
    }
`;
