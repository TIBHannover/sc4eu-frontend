import React, { Component } from 'react';
import ResourceRenderer from './ResourceRenderer';
import RelationRenderer from './RelationRenderer';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { reverse } from 'named-urls';
import ROUTES from '../../constants/routes';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { expandAllBodies } from '../../redux/actions/globalUI_actions';
import FadingNotification from '../ReusableComponents/FadingNotification';
import { StyledOntologyContentViewerDiv, HeaderBar, ControlLink, ControlButton, Column } from 'styledComponents/styledComponents';

class OntologyContentViewer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showCopyNotification: false
        };
    }

    componentDidMount() {}

    componentDidUpdate(prevProps, prevState, snapshot) {}

    copyUrlToClipboard = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url).then(() => {
            this.setState({ showCopyNotification: true });
            setTimeout(() => {
                this.setState({ showCopyNotification: false });
            }, 2000);
        });
    };

    render() {
        return (
            <div style={{ height: '100%' }}>
                <HeaderBar>
                    {this.props.selectedProject ? (
                        <ControlLink
                            to={{
                                pathname: reverse(ROUTES.ONTOLOGY),
                                project: this.props.selectedProject
                            }}
                            title="Open Ontology List"
                        >
                            <Icon icon={faAngleLeft} style={{ marginRight: '5px' }} />
                            <span>List of Ontology</span>
                        </ControlLink>
                    ) : (
                        <></>
                    )}
                    <div style={{ textAlign: 'center', fontSize: '1.5em' }}>
                        {this.props.selectedOntology
                            ? this.props.selectedOntology.name.length > 42
                                ? `${this.props.selectedOntology.name.substring(0, 40)}...`
                                : this.props.selectedOntology.name
                            : 'N/A'}
                    </div>
                    <div>
                        <ControlButton onClick={this.copyUrlToClipboard}>Copy URL</ControlButton>
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
                </HeaderBar>
                <StyledOntologyContentViewerDiv>
                    <Column>
                        <ResourceRenderer experimentalLayout={this.props.experimentalLayout} />
                    </Column>
                    <Column>
                        <RelationRenderer experimentalLayout={this.props.experimentalLayout} />
                    </Column>
                </StyledOntologyContentViewerDiv>
                {this.state.showCopyNotification && <FadingNotification message="URL copied to clipboard" timeout={2000} />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        globalUIReducer: state.globalUIReducer,
        selectedProject: state.ResourceRelationModelReducer.project,
        selectedOntology: state.ResourceRelationModelReducer.ontology
    };
};

OntologyContentViewer.propTypes = {
    experimentalLayout: PropTypes.bool.isRequired,
    globalUIReducer: PropTypes.object.isRequired,
    expandAllBodies: PropTypes.func.isRequired,
    selectedProject: PropTypes.object.isRequired,
    selectedOntology: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
    expandAllBodies: payload => dispatch(expandAllBodies(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(OntologyContentViewer);

