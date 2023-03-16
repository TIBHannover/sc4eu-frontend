import React, { Component } from 'react';
import ResourceRenderer from './ResourceRenderer';
import RelationRenderer from './RelationRenderer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { reverse } from 'named-urls';
import ROUTES from '../../constants/routes';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { expandAllBodies } from '../../redux/actions/globalUI_actions';
import styled from 'styled-components';
import { Button } from 'reactstrap';
import { SECONDARY } from '../RRView/StyledComponents';
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
                <div style={{ height: '7%' }}>
                    <Link
                        style={{ float: 'left', margin: '15px 0px 0px 15px' }}
                        to={{
                            pathname: reverse(ROUTES.ONTOLOGY),
                            project: this.props.selectedProject
                        }}
                        title="Open Ontology List"
                    >
                        <Icon icon={faAngleLeft} style={{ marginRight: '5px' }} />
                        <span>List of Ontology</span>
                    </Link>
                    <ControlButton
                        onClick={() => {
                            // emit this as signal;
                            this.props.expandAllBodies({
                                ui_all_resource_bodies_expanded: !this.props.globalUIReducer.ui_all_resource_bodies_expanded,
                                ui_all_relation_bodies_expanded: !this.props.globalUIReducer.ui_all_relation_bodies_expanded
                            });
                        }}
                    >
                        {this.props.globalUIReducer.ui_all_resource_bodies_expanded ? 'Collapse' : 'Expand'} all resources/relations
                    </ControlButton>
                </div>
                <div style={{ display: 'flex', height: '93%' }}>
                    <div style={{ width: '50%' }}>
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
        globalUIReducer: state.globalUIReducer,
        selectedProject: state.ResourceRelationModelReducer.project
    };
};

OntologyContentViewer.propTypes = {
    experimentalLayout: PropTypes.bool.isRequired,
    globalUIReducer: PropTypes.object.isRequired,
    expandAllBodies: PropTypes.func.isRequired,
    selectedProject: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
    expandAllBodies: payload => dispatch(expandAllBodies(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(OntologyContentViewer);

const ControlButton = styled(Button)`
    background: ${SECONDARY.dark};
    border-radius: 5px 5px;
    padding: 0;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: -5px;
    height: 40px;
    margin-top: 10px;
    margin-right: 10px;
    font-size: 16px;
    color: white;
    float: right;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;
