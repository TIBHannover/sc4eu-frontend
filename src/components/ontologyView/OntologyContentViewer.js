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
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';
import { fontStyled } from '../../styledComponents/styledFont';
import FadingNotification from '../ReusableComponents/FadingNotification';
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
                <div style={{ paddingBottom: '3.1em', height: '55px' }}>
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
                    <ControlButton
                        onClick={this.copyUrlToClipboard}
                    >
                        Copy URL
                    </ControlButton>
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
                <StyledDiv>
                    <div style={{ width: '50%' }}>
                        <ResourceRenderer experimentalLayout={this.props.experimentalLayout} />
                    </div>
                    <div style={{ width: '50%' }}>
                        <RelationRenderer experimentalLayout={this.props.experimentalLayout} />
                    </div>
                </StyledDiv>
                {this.state.showCopyNotification && (
                    <FadingNotification message="URL copied to clipboard" timeout={2000} />
                )}
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
    margin-top: 10px;
    margin-right: 10px;
    color: white;
    float: right;
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;

const CopyButton = styled.button`
    padding: 5px 10px;
    font-size: 14px;
    cursor: pointer;
`;

const ControlLink = styled(Link)`
    float: left;
    margin-top: 15px;
    margin-left: 10px;
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;

const StyledDiv = styled.div`
    display: flex;
    height: calc(100% - 55px);
`;
