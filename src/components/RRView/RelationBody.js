import React, { createRef, Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { Input } from 'reactstrap';

import { transformRelationToTTL, calculateBodyRows } from '../../mappers/RelationToTTL';

class RelationBody extends Component {
    constructor(props) {
        super(props);

        this.state = {
            vb_width: 0,
            vb_height: 0
        };

        this.bodyRef = createRef();
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        const resDef = this.props.relationContext;
        const prefixList = this.props.metaInformation.prefixList.longToShort;
        const content = transformRelationToTTL(resDef, prefixList);
        const numRowsRequired = calculateBodyRows(content);
        if (numRowsRequired === 0) {
            return <> </>;
        } else {
            return (
                <StyledRelationBody ref={this.bodyRef} isExpanded={this.props.isBodyExpanded} initialRendering={this.props.initialRendering}>
                    {this.props.isBodyExpanded && (
                        <StyledBodyInput
                            type="textarea"
                            readOnly
                            name="text"
                            id="ontologyContent"
                            rows={numRowsRequired}
                            value={content}
                            style={{ padding: '2px' }}
                        />
                    )}
                </StyledRelationBody>
            );
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        relations: state.ResourceRelationModelReducer.relations,
        metaInformation: state.ResourceRelationModelReducer.metaInformation
    };
};

RelationBody.propTypes = {
    relationContext: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    isBodyExpanded: PropTypes.bool.isRequired,
    initialRendering: PropTypes.bool.isRequired,
    metaInformation: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RelationBody);

const expandContentContainerAnimation = ({ isExpanded, maxHeight, initialRendering, animationCompleted }) => {
    //  TODO: add the animationCompleted Flag

    if (initialRendering) {
        return;
    }
    if (isExpanded) {
        return keyframes`
              from {
                height: ${0}px;
                padding: ${0}px;
              }
              to {
                height: ${maxHeight}px;
                padding: 5px;
              }
        `;
    }
    if (!isExpanded) {
        return keyframes`
              from {
                height: ${maxHeight}px;
                padding: 5px;            
              }
              to {
                height: ${0}px;
                padding: ${0}px;
               
              }
        `;
    }
};

const StyledRelationBody = styled.div`
    background-color: red;
    border: 1px solid black;
    border-top: none;
    color: black;
    width: 100%;
    background: white;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
    word-break: none;
    white-space: nowrap;

    animation-name: ${expandContentContainerAnimation};

    border-bottom: ${props => (props.isExpanded ? 1 : 0)}px solid black;
    padding: ${props => (props.isExpanded ? 5 : 0)}px;
    animation-duration: ${props => (props.initialRendering ? 0 : 400)}ms;

    position: relative;
`;

export const StyledBodyInput = styled(Input)`
    background: #fff;
    color: black;
    outline: 0;
    word-break: none;
    white-space: pre;

    border-radius: 0;
    padding: 0;
    display: block;

    &:focus {
        background: #fff;
        color: black;
        outline: 0;
        padding: 0 4px;
        border-radius: 0;
        display: block;
    }
`;
