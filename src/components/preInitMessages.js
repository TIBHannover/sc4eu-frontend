import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faUnlockAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

export default class PreInitMessages extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        console.log(this.props.inputData);
        return (
            <div>
                <StyledCard className="pl-1 pr-1" onDragStart={this.preventDraggingOfItem}>
                    <StyledCardHeader>
                        <div style={{ display: 'flex', paddingRight: '5px' }}>
                            <div>
                                <Icon className="mr-1" icon={faUnlockAlt} />
                            </div>
                            <div> {this.props.inputData.name} </div>
                            <div>
                                <Icon className="ml-1" icon={faCheck} />
                            </div>
                        </div>
                    </StyledCardHeader>
                    <StyledCardBody> Place Holder for descriptions, maybe some statistics for the ontology</StyledCardBody>
                </StyledCard>
            </div>
        );
    }
}

PreInitMessages.propTypes = {
    inputData: PropTypes.object.isRequired
};

const StyledCard = styled.div`
    margin: 5px;
    padding: 0 !important;

    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;

const StyledCardHeader = styled.div`
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

const StyledCardBody = styled.div`
    padding: 5px;
    border: 1px solid black;
    border-top: none;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;
