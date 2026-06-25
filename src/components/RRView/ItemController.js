import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { withTheme } from '@emotion/react';
import { StyledController, LabelDiv, ControlItemControllerButton } from 'styledComponents/styledComponents';

class ItemController extends Component {
    constructor() {
        super();
        this.state = {
            headerLabel: ''
        };
    }
    componentDidMount() {
        this.header();
    }

    header = () => {
        const label = this.props.itemContext.annotations['rdfs:label'];
        const itemLabel = this.getSuffix(this.props.itemContext.identifier);
        if (label) {
            if (label.en) {
                this.setState({ headerLabel: label.en });
            } else if (label.de) {
                this.setState({ headerLabel: label.de });
            } else {
                this.setState({ headerLabel: Object.values(label)[0] });
            }
        } else {
            this.setState({ headerLabel: itemLabel });
        }
    };

    getBackgroundColor = () => {
        const { theme } = this.props;
        if (this.props.itemType === 'Relation') {
            if (this.props.itemContext.isHighlighted) {
                return 'black';
            } else if (this.props.itemContext.type[0].toLowerCase() === 'owl:objectProperty'.toLowerCase()) {
                return theme.palette.primary.light;
            } else if (this.props.itemContext.type[0].toLowerCase() === 'owl:datatypeProperty'.toLowerCase()) {
                return theme.palette.secondary.light;
            }
            return '#838a92';
        } else {
            return undefined;
        }
    };

    getFontColor = () => {
        if (this.props.itemType === 'Relation') {
            if (this.props.itemContext.isHighlighted) {
                return 'black';
            } else if (this.props.itemContext.type[0].toLowerCase() === 'owl:objectProperty'.toLowerCase()) {
                return 'black';
            } else if (this.props.itemContext.type[0].toLowerCase() === 'owl:datatypeProperty'.toLowerCase()) {
                return 'black';
            }
            return 'white';
        } else {
            return undefined;
        }
    };

    getSuffix = val => {
        const lastHashPos = val.lastIndexOf('#');
        const lastSlashPos = val.lastIndexOf('/');
        const splitToken = Math.max(lastHashPos, lastSlashPos);
        return val.slice(splitToken + 1, val.length);
    };

    render() {
        const itemHighlighted = this.props.itemContext.isHighlighted;
        return (
            <StyledController style={{ padding: 0, height: '30px', width: '100%', overflow: 'hidden', display: 'flex' }}>
                {/*TEXT VIEW*/}
                <div style={{ width: '250px', minWidth: '100px', display: 'flex' }}>
                    {/*GRAPH VIEW*/}
                    <Tippy content={'Show Graph'}>
                        <ControlItemControllerButton size="sm" onClick={this.props.showGraphVis} active={this.props.showingGraph}>
                            <Icon icon={faProjectDiagram} />
                        </ControlItemControllerButton>
                    </Tippy>

                    <Tippy content={'Show Text View'}>
                        <ControlItemControllerButton size="sm" onClick={this.props.showBody} active={this.props.showingBody}>
                            <Icon icon={faAlignJustify} />
                        </ControlItemControllerButton>
                    </Tippy>
                </div>
                <div style={{ width: '100%' }}>
                    <Tippy content={this.state.headerLabel}>
                        <LabelDiv
                            isHighlighted={itemHighlighted}
                            typedBasedColor={this.getBackgroundColor()}
                            typedBasedFontColor={this.getFontColor()}
                        >
                            {this.state.headerLabel}
                        </LabelDiv>
                    </Tippy>
                </div>
            </StyledController>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        relations: state.ResourceRelationModelReducer.relations
    };
};

ItemController.propTypes = {
    itemType: PropTypes.string.isRequired,
    itemContext: PropTypes.object.isRequired,
    isEditing: PropTypes.bool.isRequired,
    toggleEditButton: PropTypes.func.isRequired,
    deleteResource: PropTypes.func.isRequired,
    editResource: PropTypes.func.isRequired,
    showBody: PropTypes.func.isRequired,
    showGraphVis: PropTypes.func.isRequired,
    showWidget: PropTypes.func.isRequired,
    isBodyExpanded: PropTypes.bool.isRequired,
    showingBody: PropTypes.bool.isRequired,
    showingGraph: PropTypes.bool.isRequired,
    showingWidget: PropTypes.bool.isRequired,
    showWidgetAnnotation: PropTypes.func.isRequired,
    showingWidgetAnnotation: PropTypes.bool.isRequired
};

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ItemController));

