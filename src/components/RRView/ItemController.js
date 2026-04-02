import React, { Component } from 'react';

import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import styled from 'styled-components';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faProjectDiagram, faAlignJustify } from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react';
import { colorStyled } from 'styledComponents/styledColor';
import { MIN_WIDTH_FOR_MONITOR } from '../../styledComponents/styledComponents';
import { fontStyled } from '../../styledComponents/styledFont';

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
        if (this.props.itemType === 'Relation') {
            if (this.props.itemContext.isHighlighted) {
                return 'black';
            } else if (this.props.itemContext.type[0].toLowerCase() === 'owl:objectProperty'.toLowerCase()) {
                return colorStyled.primaryContainer;
            } else if (this.props.itemContext.type[0].toLowerCase() === 'owl:datatypeProperty'.toLowerCase()) {
                return colorStyled.secondaryContainer;
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
                        <ControlButton size="sm" onClick={this.props.showGraphVis} active={this.props.showingGraph}>
                            <Icon icon={faProjectDiagram} />
                        </ControlButton>
                    </Tippy>

                    <Tippy content={'Show Text View'}>
                        <ControlButton size="sm" onClick={this.props.showBody} active={this.props.showingBody}>
                            <Icon icon={faAlignJustify} />
                        </ControlButton>
                    </Tippy>

                    {/*PROTEGE VIEW */}
                    {/*<Tippy content={'Show Description'}>*/}
                    {/*    <ControlButton size="sm" onClick={this.props.showWidget} active={this.props.showingWidget}>*/}
                    {/*        <Icon icon={faCubesStacked} />*/}
                    {/*    </ControlButton>*/}
                    {/*</Tippy>*/}
                    {/*<Tippy content={'Show Annotation'}>*/}
                    {/*    <ControlButton size="sm" onClick={this.props.showWidgetAnnotation} active={this.props.showingWidgetAnnotation}>*/}
                    {/*        <Icon icon={faCircleNodes} />*/}
                    {/*    </ControlButton>*/}
                    {/*</Tippy>*/}
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

export default connect(mapStateToProps, mapDispatchToProps)(ItemController);

const StyledController = styled.div`
    padding: 5px;
    // border-radius: 10px 10px 0 0;
    // border: 1px solid black;
    border-bottom: none;
    padding: 5px;
    color: white;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }
`;
const LabelDiv = styled.div`
    overflow: hidden;
    max-width: 260px;
    white-space: nowrap;
    text-overflow: ellipsis;
    border-radius: 10px 10px 0 0;
    border-bottom: none;
    padding: 5px;
    color: white;
    text-align: left;
    margin-left: auto;
    margin-right: auto;
    height: 30px;
    color: ${props => (props.typedBasedFontColor ? props.typedBasedFontColor : 'black')};
    background-color: ${props =>
        props.isHighlighted === true ? `${colorStyled.primaryContainer}` : props.typedBasedColor ? props.typedBasedColor : `${colorStyled.secondaryContainer}`};
    font-size: ${fontStyled.fontSize.NormalText};

    @media (min-width: ${MIN_WIDTH_FOR_MONITOR}) {
        font-size: ${fontStyled.fontSize.LaptopAndDesktopViewNormalText};
    }
`;

const ControlButton = styled.div`
    padding: 5px;
    border-radius: ${props => (props.type === 'control' ? '0' : '10px 10px 0 0')};
    border-bottom: none;
    text-align: center;
    margin-right: ${props => (props.type === 'control' ? '3px' : '-1px')};
    background-color: ${props => (props?.active === true ? `${colorStyled.primary}` : `${colorStyled.secondary}`)};

    width: 30px;
    height: 30px;
    color: white;
    :focus {
        outline: none;
    }
    ::-moz-focus-inner {
        border: 0;
    }

    :hover {
        background-color: #005c5f;
        cursor: pointer;
    }
`;
