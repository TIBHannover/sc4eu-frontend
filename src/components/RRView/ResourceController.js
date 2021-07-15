import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash, faProjectDiagram, faAlignJustify, faJedi, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
class ResourceController extends Component {
    render() {
        return (
            <StyledController style={{ padding: 0, height: '30px', width: '100%', overflow: 'auto', display: 'flex' }}>
                {/*TEXT VIEW*/}
                <div style={{ width: '100%' }}>
                    <ControlButton size="sm" color="primary" onClick={this.props.showBody}>
                        <Icon icon={faAlignJustify} />
                    </ControlButton>

                    {/*GRAPH VIEW*/}
                    <ControlButton size="sm" color="primary" onClick={this.props.showGraphVis}>
                        <Icon icon={faProjectDiagram} />
                    </ControlButton>

                    {/*PROTEGE VIEW */}
                    <ControlButton size="sm" color="primary" onClick={this.props.showWidget}>
                        <Icon icon={faJedi} />
                    </ControlButton>
                </div>
                <div style={{ width: '100%', float: 'center' }}>
                    <ControlButton
                        size="sm"
                        color="primary"
                        style={{ marginRight: 'auto', marginLeft: 'auto', float: 'center', width: '100%', backgroundColor: '#5497d6' }}
                    >
                        EXAMPLE CLASS
                    </ControlButton>
                </div>

                {/*--------CONTROLS  (FLOAT RIGHT reverses the order of items )*/}
                <div style={{ width: '100%', float: 'right' }}>
                    {/* DELETE  */}
                    <ControlButton size="sm" color="primary" style={{ marginRight: 0, float: 'right' }} onClick={this.props.deleteResource}>
                        <Icon icon={faTrash} />
                    </ControlButton>
                    {/* EDIT  */}
                    <ControlButton
                        size="sm"
                        color="primary"
                        style={{ float: 'right' }}
                        onClick={() => {
                            this.props.toggleEditButton(!this.props.isEditing);
                        }}
                    >
                        <Icon icon={faPen} />
                    </ControlButton>
                    {/* EDIT  */}
                    <ControlButton size="sm" color="primary" style={{ float: 'right' }}>
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

ResourceController.propTypes = {
    resourceContext: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    toggleEditButton: PropTypes.func.isRequired,
    deleteResource: PropTypes.func.isRequired,
    editResource: PropTypes.func.isRequired,
    showBody: PropTypes.func.isRequired,
    showGraphVis: PropTypes.func.isRequired,
    showWidget: PropTypes.func.isRequired,
    isBodyExpanded: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceController);

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
const ControlButton = styled(Button)`
    padding: 5px;
    border-radius: 10px 10px 0 0;
    border: 1px solid black;
    border-bottom: none;
    padding: 5px;
    margin-right: 3px;
    width: 30px;
    color: white;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;
