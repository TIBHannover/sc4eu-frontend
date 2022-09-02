import React, { Component } from 'react';
import ResourceRenderer from './ResourceRenderer';
import RelationRenderer from './RelationRenderer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { expandAllBodies } from '../../redux/actions/globalUI_actions';
class OntologyContentViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    render() {
        return (
            <div style={{ height: '100%' }}>
                <div style={{ display: 'flex', height: '6%', borderBottom: '1px solid rgb(219,221,229)', justifyContent: 'flex-start' }}>
                    <div style={{ margin: '5px 0px 5px 15px' }}>
                        <ControlButton
                            color={'primary'}
                            onClick={() => {
                                // emit this as signal;
                                this.props.expandAllBodies({
                                    ui_all_resource_bodies_expanded: !this.props.globalUIReducer.ui_all_resource_bodies_expanded,
                                    ui_all_relation_bodies_expanded: !this.props.globalUIReducer.ui_all_relation_bodies_expanded
                                });
                            }}
                        >
                            {this.props.globalUIReducer.ui_all_resource_bodies_expanded ? 'Collapse' : 'Expand'} all bodies
                        </ControlButton>
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: '0', height: '94%', marginBottom: '10px' }}>
                    <div style={{ width: '50%', borderRight: '1px solid rgb(219,221,229)' }}>
                        <ResourceRenderer experimentalLayout={this.props.experimentalLayout} />
                    </div>
                    <div style={{ width: '50%' }}>
                        <RelationRenderer experimentalLayout={this.props.experimentalLayout} />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        globalUIReducer: state.globalUIReducer
    };
};

OntologyContentViewer.propTypes = {
    experimentalLayout: PropTypes.bool.isRequired,
    expandAllBodies: PropTypes.func.isRequired,
    globalUIReducer: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
    expandAllBodies: payload => dispatch(expandAllBodies(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(OntologyContentViewer);

const ControlButton = styled(Button)`
    border-radius: 5px 5px;
    padding: 0;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: -5px;
    height: 40px;
    font-size: 16px;
    color: white;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;
