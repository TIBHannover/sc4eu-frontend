import React, { Component } from 'react';
import ManagementViewRoot from '../components/ManagementViewRoot';

export default class ManagementView extends Component {
    constructor(props) {
        super(props);
        this.leftSideExpanded = true;
        this.rightSideExpanded = true;
    }

    setLeftSideExpanded = val => {
        this.leftSideExpanded = val;
    };
    setRightSideExpanded = val => {
        this.rightSideExpanded = val;
    };

    render() {
        return (
            <ManagementViewRoot
                leftSideExpanded={this.leftSideExpanded}
                rightSideExpanded={this.rightSideExpanded}
                toggleLeftSideExpanded={this.setLeftSideExpanded}
                toggleRightSideExpanded={this.setRightSideExpanded}
            />
        );
    }
}
