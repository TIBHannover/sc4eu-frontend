import React, { Component } from 'react';

import LeftSideBar from './LeftSideBar';
import RightSideBar from './RightSideBar';
import MainWidget from './MainWidget';

class OntologyViewRoot extends Component {
    constructor(props) {
        super(props);

        this.state = {
            leftSidebarExpanded: true,
            rightSidebarExpanded: true,
            oldMainWidgetWidth: 500,
            newMainWidgetWidth: 500,
            windowWidth: 500,
            mainWidgetHeight: 200,
            componentInitialized: false,
            oldLeftSideState: true,
            leftSidebarWidth: 400,
            rightSidebarWidth: 400
        };

        this.sidebarHeightOffset = -40;
    }

    componentDidMount() {
        // on mount we fetch all Ontologies
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

    render() {
        return (
            <div id="mainWidgetContainer" style={{ display: 'flex', marginTop: '5px', zIndex: 150, height: 'calc(100vh - 95px)' }}>
                <MainWidget
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
                />
                <LeftSideBar
                    width={this.state.leftSidebarWidth}
                    height={this.state.containerHeight + this.sidebarHeightOffset}
                    title="Ontology Meta Information"
                    // loading={this.props.loading}
                    updateEvent={this.leftSideBarUpdateEvent}
                />
                <RightSideBar
                    width={this.state.rightSidebarWidth}
                    height={this.state.containerHeight + this.sidebarHeightOffset}
                    title="Provenance Information"
                    updateEvent={this.rightSideBarUpdateEvent}
                    heightUpdateEvent={this.updateMainWidgetSize}
                />
            </div>
        );
    }
}

OntologyViewRoot.propTypes = {};

export default OntologyViewRoot;
