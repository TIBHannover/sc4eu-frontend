import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import OntologyContentViewer from './OntologyContentViewer';

export default class MainWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: true,
            minWidth: 300,

            title: props.title,
            initialRendering: true,
            updateFlipFlop: false
        };
    }

    componentDidMount() {}

    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.initialRendering === true) {
            // make a timer for that;
            setTimeout(() => {
                this.setState({ initialRendering: false });
            }, 400);
        }
    };

    componentWillUnmount() {}

    render() {
        return (
            <ContentContainer
                id="MainWidget"
                expandedLeft={this.props.leftSideBarExpanded}
                expandedRight={this.props.rightSideBarExpanded}
                oldWidth={this.props.oldWidth}
                newWidth={this.props.newWidth}
                leftWidth={this.props.leftSidebarWidth}
                rightWidth={this.props.rightSidebarWidth}
                oldLeftExpanded={this.props.oldLeftSidebarState}
                initialRendering={this.state.initialRendering}
                fullWidth={this.props.fullWidth}
                style={{
                    height: '300px',
                    position: 'relative'
                }}
            >
                <div
                    style={{
                        width: '90%',
                        height: '100%',
                        border: '1px solid black',
                        position: 'relative',
                        left: '5%',
                        backgroundColor: '#f2f2f2'
                    }}
                >
                    <OntologyContentViewer />
                </div>
            </ContentContainer>
        );
    }
}

MainWidget.propTypes = {
    title: PropTypes.string,
    oldWidth: PropTypes.number,
    newWidth: PropTypes.number,
    height: PropTypes.number,
    fullWidth: PropTypes.number,
    leftSidebarWidth: PropTypes.number.isRequired,
    rightSidebarWidth: PropTypes.number.isRequired,
    oldLeftSidebarState: PropTypes.bool.isRequired,
    leftSideBarExpanded: PropTypes.bool.isRequired,
    rightSideBarExpanded: PropTypes.bool.isRequired
};

const expandContentContainerAnimation = ({ expandedLeft, oldLeftExpanded, newWidth, oldWidth, leftWidth, initialRendering, fullWidth }) => {
    // Handing initial rendering
    if (initialRendering) {
        // create await call
        return keyframes`
          from {
            left: ${0}px;
            width:${fullWidth}px;
          }
          to {
            left: ${leftWidth}px;
            width:${newWidth}px;
          }
        `;
    }

    // the other cases need to be simplified
    if (!initialRendering) {
        // Handing right sidebar collapse expand when left is open
        if (expandedLeft && oldLeftExpanded === true) {
            // console.log('>>>>>>>> EXPANDING/Collapse RIGHT SIDE, when left is open [x]');
            return keyframes`
              from {
                left: ${leftWidth}px;
                width:${oldWidth}px;
              }
              to {
                left: ${leftWidth}px;
                width:${newWidth}px;
              }
        `;
        }

        if (!expandedLeft && oldLeftExpanded === true) {
            // console.log('>>>>>>>> COLLAPSE LEFT SIDE [x] ');
            return keyframes`
              from {
                left: ${leftWidth}px;
                width:${oldWidth}px;
              }
              to {
                left:  ${0}px;
                width:${newWidth}px;
              }
            `;
        }

        if (!expandedLeft && oldLeftExpanded === false) {
            // console.log('>>>>>>>> EXPANDING/Collapse RIGHT SIDE, when left is closed  [x]');
            return keyframes`
              from {
                left: ${0}px;
                width:${oldWidth}px
              }
              to {
                left: ${leftWidth}px
                width:${newWidth}px;
              }
            `;
        }

        if (expandedLeft && oldLeftExpanded === false) {
            // console.log('>>>>>>>> EXPANDING LEFT SIDE  [x]');
            return keyframes`
              from {
                left: ${0}px;
                width:${oldWidth}px
              }
              to {
                left: ${leftWidth};
                width:${newWidth}
            `;
        }
    }
};

const ContentContainer = styled.div`
    animation-name: ${expandContentContainerAnimation};
    animation-duration: 400ms;
    position: relative;

    width: ${props => props.newWidth}px;
    left: ${props => (props.expandedLeft ? props.leftWidth : 0)}px;
`;
