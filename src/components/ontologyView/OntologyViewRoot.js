import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import MainWidget from './MainWidget';
import { Button } from 'reactstrap';
import styled from 'styled-components';

class OntologyViewRoot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftSidebarExpanded: this.props.leftSideExpanded,
            rightSidebarExpanded: this.props.rightSideExpanded,
            oldMainWidgetWidth: 500,
            newMainWidgetWidth: 500,
            windowWidth: 500,
            mainWidgetHeight: 200,
            componentInitialized: false,
            oldLeftSideState: this.props.leftSideExpanded,
            leftSidebarWidth: 400,
            rightSidebarWidth: 400,

            // other states;
            allBodiesExpanded: false,
            experimentalLayout: false
        };

        this.sidebarHeightOffset = -40;
        this._refMainWidget = React.createRef();
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.updateMainWidgetSize();
        if (!this.state.componentInitialized) {
            let result = this.state.windowWidth;
            if (this.state.leftSidebarExpanded) {
                result -= this.state.leftSidebarWidth;
            }
            if (this.state.rightSidebarExpanded) {
                result -= this.state.rightSidebarWidth;
            }
            this.setState({
                oldLeftSideState: prevState.leftSidebarExpanded,
                oldMainWidgetWidth: this.state.newMainWidgetWidth,
                newMainWidgetWidth: result,
                componentInitialized: true
            });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    leftSideBarUpdateEvent = expanded => {
        // child provides information about its expand status;
        //its status is forwarded to the mainWidget which then changes its width and position
        this.props.toggleLeftSideExpanded(expanded);
        let result = this.state.windowWidth;
        if (expanded) {
            result -= this.state.leftSidebarWidth;
        }
        if (this.state.rightSidebarExpanded) {
            result -= this.state.rightSidebarWidth;
        }

        this.setState({
            leftSidebarExpanded: expanded,
            oldLeftSideState: this.state.leftSidebarExpanded,
            oldMainWidgetWidth: this.state.newMainWidgetWidth,
            newMainWidgetWidth: result
        });
    };

    rightSideBarUpdateEvent = expanded => {
        // child provides information about its expand status;
        //its status is forwarded to the mainWidget which then changes its width and position
        this.props.toggleRightSideExpanded(expanded);
        let result = this.state.windowWidth;
        if (expanded) {
            result -= this.state.rightSidebarWidth;
        }
        if (this.state.leftSidebarExpanded) {
            result -= this.state.leftSidebarWidth;
        }
        this.setState({
            oldLeftSideState: this.state.leftSidebarExpanded,
            rightSidebarExpanded: expanded,
            oldMainWidgetWidth: this.state.newMainWidgetWidth,
            newMainWidgetWidth: result
        });
        this.updateMainWidgetSize();
    };

    updateDimensions = () => {
        const containerHeight = document.getElementById('mainWidgetContainer').getBoundingClientRect().height;
        let result = window.innerWidth;
        if (this.state.leftSidebarExpanded) {
            result -= this.state.leftSidebarWidth;
        }
        if (this.state.rightSidebarExpanded) {
            result -= this.state.rightSidebarWidth;
        }

        this.setState({
            leftSidebarExpanded: this.state.leftSidebarExpanded,
            oldLeftSideState: this.state.leftSidebarExpanded,
            oldMainWidgetWidth: result,
            newMainWidgetWidth: result,
            windowWidth: window.innerWidth,
            containerHeight: containerHeight
        });
    };

    updateMainWidgetSize = () => {
        // get document by ids;
        const leftSidebarHeight = document.getElementById('LeftSidebarContainer').getBoundingClientRect().height;
        const rightSidebarHeight = document.getElementById('RightSidebarContainer').getBoundingClientRect().height;
        const newHeight = Math.max(leftSidebarHeight, rightSidebarHeight);
        if (newHeight !== this.state.mainWidgetHeight) {
            this.setState({ mainWidgetHeight: newHeight });
        }
    };

    renderControls() {
        return (
            // TODO: make better ui layout
            <div style={{ marginTop: '-25px' }}>
                <div
                    style={{
                        display: 'flex',
                        width: 'auto',
                        marginLeft: '200px',
                        marginRight: '50px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        background: 'white',
                        border: '1px solid #ccc',
                        position: 'relative',
                        top: '-6px',
                        height: '32px'
                    }}
                >
                    <ControlButton
                        onClick={() => {
                            // emit this as signal;
                            this.setState({ allBodiesExpanded: !this.state.allBodiesExpanded });
                        }}
                    >
                        {this.state.allBodiesExpanded ? 'Collapse' : 'Expand'} all bodies
                    </ControlButton>
                    <ControlButton
                        onClick={() => {
                            this.setState({ experimentalLayout: !this.state.experimentalLayout });
                        }}
                    >
                        Use {this.state.experimentalLayout ? 'default' : 'experimental'} layout
                    </ControlButton>
                </div>
            </div>
        );
    }

    render() {
        return (
            <>
                {this.renderControls()}

                <div id="mainWidgetContainer" style={{ display: 'flex', marginTop: '5px', zIndex: 150, height: 'calc(100vh - 95px)' }}>
                    <MainWidget
                        ref={this._refMainWidget}
                        leftSideBarExpanded={this.state.leftSidebarExpanded}
                        rightSideBarExpanded={this.state.rightSidebarExpanded}
                        leftSidebarWidth={this.state.leftSidebarWidth}
                        rightSidebarWidth={this.state.rightSidebarWidth}
                        oldWidth={this.state.oldMainWidgetWidth}
                        newWidth={this.state.newMainWidgetWidth}
                        fullWidth={this.state.windowWidth}
                        oldLeftSidebarState={this.state.oldLeftSideState}
                        height={this.state.containerHeight}
                        title="MAIN"
                        experimentalLayout={this.state.experimentalLayout}
                    />
                    <LeftSideBar
                        width={this.state.leftSidebarWidth}
                        initialState={this.props.leftSideExpanded}
                        height={this.state.containerHeight + this.sidebarHeightOffset}
                        title="Ontology Meta Information"
                        // loading={this.props.loading}
                        updateEvent={this.leftSideBarUpdateEvent}
                    />
                    <RightSideBar
                        width={this.state.rightSidebarWidth}
                        initialState={this.props.rightSideExpanded}
                        height={this.state.containerHeight + this.sidebarHeightOffset}
                        title="Provenance Information"
                        updateEvent={this.rightSideBarUpdateEvent}
                        heightUpdateEvent={this.updateMainWidgetSize}
                    />
                </div>
            </>
        );
    }
}

OntologyViewRoot.propTypes = {
    leftSideExpanded: PropTypes.bool.isRequired,
    rightSideExpanded: PropTypes.bool.isRequired,
    toggleLeftSideExpanded: PropTypes.func.isRequired,
    toggleRightSideExpanded: PropTypes.func.isRequired
};

export default OntologyViewRoot;

const ControlButton = styled(Button)`
    border-radius: 10px 10px;
    // border: 1px solid black;
    padding: 0;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: -5px;
    height: 25px;
    margin-top: 2px;
    margin-right: 3px;
    font-size: 12px;
    color: white;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;
