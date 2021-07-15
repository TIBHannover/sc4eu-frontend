import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { connect } from 'react-redux';
class CardWidgetVis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateFlipFlop: false
        };
        this.initialRendering = true;
    }

    componentDidMount() {}

    componentDidUpdate = (prevProps, prevState) => {
        // we initialize the card based on the target item id for rendering
    };

    componentWillUnmount() {}

    render() {
        return (
            <CardWidgetVisCardContainer
                isExpanded={this.props.isExpanded}
                maxHeight={250}
                initialRendering={this.props.initialRendering}
                animationCompleted={this.animationCompleted}
            >
                {this.props.isExpanded && <div>HELLLO000000000</div>}
            </CardWidgetVisCardContainer>
        );
    }
}
CardWidgetVis.propTypes = {
    height: PropTypes.number,
    itemIdentifier: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    rrModel: PropTypes.object.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    initialRendering: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        rrModel: state.ResourceRelationModelReducer
    };
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(CardWidgetVis);

const expandContentContainerAnimation = ({ isExpanded, maxHeight, initialRendering, animationCompleted }) => {
    //  TODO: add the animationCompleted Flag

    if (initialRendering) {
        console.log('Rendering WIDGET CARD AS INIT RENDERING ');
        return;
    }
    if (isExpanded) {
        return keyframes`
              from {
                height: ${0}px;
             
              }
              to {
                height: ${maxHeight}px;
              }
        `;
    }
    if (!isExpanded) {
        return keyframes`
              from {
                height: ${maxHeight}px;
              }
              to {
                height: ${0}px;
               
              }
        `;
    }
};

const CardWidgetVisCardContainer = styled.div`
    animation-name: ${expandContentContainerAnimation};
    animation-duration: 400ms;
    position: relative;
    background-color: green;
    height: ${props => (props.isExpanded ? props.maxHeight : 0)}px;
`;
