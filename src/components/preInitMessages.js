import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faUnlockAlt, faCheck } from '@fortawesome/free-solid-svg-icons';
import { StyledPreInitMessagesCard, StyledPreInitMessagesCardBody, StyledPreInitMessagesCardHeader } from 'styledComponents/styledComponents';

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
                <StyledPreInitMessagesCard className="pl-1 pr-1" onDragStart={this.preventDraggingOfItem}>
                    <StyledPreInitMessagesCardHeader>
                        <div style={{ display: 'flex', paddingRight: '5px' }}>
                            <div>
                                <Icon className="mr-1" icon={faUnlockAlt} />
                            </div>
                            <div> {this.props.inputData.name} </div>
                            <div>
                                <Icon className="ml-1" icon={faCheck} />
                            </div>
                        </div>
                    </StyledPreInitMessagesCardHeader>
                    <StyledPreInitMessagesCardBody> Place Holder for descriptions, maybe some statistics for the ontology</StyledPreInitMessagesCardBody>
                </StyledPreInitMessagesCard>
            </div>
        );
    }
}

PreInitMessages.propTypes = {
    inputData: PropTypes.object.isRequired
};

