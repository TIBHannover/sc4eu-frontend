import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { Button, Input } from 'reactstrap';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

class ResourceHeader extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    toggleEditButton = () => {
        this.props.toggleEditButton(!this.props.isEditing);
    };

    render() {
        // check if we have a body;
        const resDef = this.props.resourceContext;
        let headerTerminationToken = ';';
        const anCount = Object.keys(resDef.annotations).length;
        const axCount = Object.keys(resDef.axioms).length;
        if (anCount === 0 && axCount === 0) {
            headerTerminationToken = '.';
        }

        const headerValue = this.props.resourceContext.identifier + ' rdf:type ' + this.props.resourceContext.type + ' ' + headerTerminationToken;
        return (
            <StyledResourceHeader style={{ height: '100%', overflow: 'auto', display: 'flex' }}>
                {/*TODO add checkBox for 'selective filtering' */}

                <Button color="white" size="sm" style={{ float: 'right', padding: '0px', paddingRight: '5px' }} onClick={this.toggleEditButton}>
                    <Icon icon={faPen} color={this.state.isEditing ? 'red' : 'white'} />
                </Button>
                {this.props.isEditing ? (
                    <HeaderValueInput
                        autoFocus={true}
                        value={headerValue}
                        // onChange={this.cellValueChanged}
                        // innerRef={inputRefs}
                        onKeyDown={e => e.keyCode === 13 && e.target.blur()} // Disable multiline Input
                        onBlur={e => {
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
                    <StyledContentView>
                        {/*  holds some styling for managing long texts;*/}
                        {this.props.resourceContext.identifier} rdf:type {' ' + this.props.resourceContext.type + ' ' + headerTerminationToken}{' '}
                    </StyledContentView>
                )}

                {/*// add enable editing botton*/}
            </StyledResourceHeader>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        resources: state.ResourceRelationModelReducer.resources
    };
};

ResourceHeader.propTypes = {
    resourceContext: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    toggleEditButton: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ResourceHeader);

const StyledResourceHeader = styled.div`
    background-color: red;
    padding: 5px;
    border-radius: 10px 10px 0 0;
    border: 1px solid black;
    padding: 5px;
    color: white;
    background: #4388cc;
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
