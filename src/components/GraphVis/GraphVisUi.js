import React, { Component } from 'react';
import { Container, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button, Input } from 'reactstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapperModule from '../../GraphVisLib/implementation/MapperModule';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { selectVisualNotation } from 'redux/actions/globalUI_actions';
import styled, { keyframes } from 'styled-components';
import { PRIMARY, SECONDARY } from '../RRView/StyledComponents';
import html2canvas from 'html2canvas';
import ScreenCapture from '../ScreenCapture';
import ScreenCaptureModal from '../Modals/ScreenCaptureModal';
import FadingNotification from '../ReusableComponents/FadingNotification';

class GraphVisUi extends Component {
    constructor(props) {
        super(props);

        this.possibleNotations = ['VOWL', 'UML'];

        this.graph = this.props.DonatelloGraph;
        this.graph.setSelectionPropagationFunction(this.handleSelection);
        this.mapperModule = new MapperModule();
        this.mapperModule.setGraphReference(this.graph);

        const modelAsJsonObject = { resources: this.props.resources, relations: this.props.relations };
        this.currentResourceRelationModel = {
            resultingModel: {
                type: 'TYPE_RESOURCE_RELATION_MODEL',
                modelAsJsonObject: modelAsJsonObject
            }
        };
        this.currentResourceRelationModel.resultingModel.getResult = function() {
            return modelAsJsonObject;
        };

        this.state = {
            notationSelectionOpen: false,
            layoutPlay: true,
            leftSideBarExpanded: false,
            rightSideBarExpanded: false,
            selectedItem: null,
            updateFlipFlop: false,
            screenCapture: '',
            open: false,
            startCapture: false,
            showCopyNotification: false
        };
        this.componentRef = React.createRef();
    }

    componentDidMount() {
        // add a flag to check if the tab is actually active
        if (this.props.visualizationTabIsActive === false) {
            return;
        }

        document.body.style.overflowX = 'hidden';
        // add resize event
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();

        if (!this.graph.graphIsInitialized) {
            // we will need to extract our resource relation model and feed it into the graph vis ;
            const config = {
                graph_mouseZoom: true,
                graph_mouseDrag: true,
                node_mouseDrag: true,
                node_mouseHover: true,
                node_mouseSingleClick: true,
                node_mouseDoubleClick: true,
                node_hasNodeSelection: true,
                graphBgColor: PRIMARY.lighter, // could be customizable
                configSelected: 'Default',
                link_mouseDrag: true,
                link_mouseHover: true
            };
            this.graph.setRenderingContainer('donatello_rendering_div');
            this.graph.configureGraphInteractions(config);

            // extract the resourceRelationModel;
            // wrapper object

            this.mapperModule.setResourceRelationModelInput(this.currentResourceRelationModel);
            this.mapperModule.setGraphReference(this.graph);
            this.mapperModule.setNodeLinkType(this.props.visualNotation);
            this.mapperModule.execute().then(model => {
                this.graph.setModel(model);
                // do the rendering magic
                this.graph.initializeRenderingContainer();
                this.graph.createRenderingElements();
                this.graph.drawRenderingPrimitives();
                this.graph.setGraphInitialized(true);
            });
        } else {
            // just rerender the graph as it is at the moment;
            this.mapperModule.setResourceRelationModelInput(this.currentResourceRelationModel);
            this.mapperModule.setNodeLinkType(this.props.visualNotation);
            // this.mapperModule.execute().then(model => {
            //     this.graph.setModel(model);
            //     // do the rendering magic
            //     this.graph.initializeRenderingContainer();
            //     this.graph.createRenderingElements();
            //     this.graph.drawRenderingPrimitives();
            //     this.graph.setGraphInitialized(true);
            // });
            this.graph.bruteForceRedrawGraph();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visualNotation !== this.props.visualNotation) {
            this.mapperModule.setNodeLinkType(this.props.visualNotation);
            this.mapperModule.execute().then(model => {
                this.graph.integrateUpdatedNodeLink(model);
            });
        }
    }

    updateDimensions = () => {
        this.graph.updateGraphSize();
    };

    handleSelection = item => {
        this.setState({ selectedItem: item });
    };

    // helper:
    getPrefixOfURI = uri => {
        //TODO this needs to be fixed properly, check why the uir is empty
        if (!uri) {
            return;
        }
        const lastIndexOfHash = uri.lastIndexOf('#');
        const lastIndexOfSlash = uri.lastIndexOf('/');
        let prefixUri = '';
        if (lastIndexOfHash > lastIndexOfSlash) {
            prefixUri = uri.substring(0, lastIndexOfHash + 1);
        } else {
            prefixUri = uri.substring(0, lastIndexOfSlash + 1);
        }
        return prefixUri;
    };

    /** RENDERING FUNCTIONS **/

    renderGlobalCustomizationOptions = () => {
        // lets try for nodes first;
        const usedPrefixesNodes = [];
        const usedPrefixesOProps = [];
        this.props.resources.forEach(resource => {
            const res = this.getPrefixOfURI(resource.resourceURI);
            if (usedPrefixesNodes.indexOf(res) === -1) {
                usedPrefixesNodes.push(res);
            }
        });
        this.props.relations
            .filter(item => item.type[0] === 'owl:ObjectProperty')
            .forEach(relation => {
                const res = this.getPrefixOfURI(relation.resourceURI);
                if (usedPrefixesOProps.indexOf(res) === -1) {
                    usedPrefixesOProps.push(res);
                }
            });
        // TODO: improve the default colors based on types:
        const confNodes = this.graph.renderingConfig.getNodeConfigFromType('owl:class');
        let defaultValue = '#000';
        if (confNodes) {
            defaultValue = confNodes.style.bgColor;
        }
        if (!this.updateColorValuesNodes) {
            this.updateColorValuesNodes = {};
            usedPrefixesNodes.forEach(item => {
                this.updateColorValuesNodes[item] = defaultValue;
            });
        }

        if (!this.updateColorValuesOProps) {
            this.updateColorValuesOProps = {};
            usedPrefixesOProps.forEach(item => {
                this.updateColorValuesOProps[item] = defaultValue;
            });
        }

        const colorOptionsNodes = usedPrefixesNodes.map((item, index) => {
            let prefixLabel = '';
            if (this.props.prefixList.longToShort[item]) {
                prefixLabel = this.props.prefixList.longToShort[item];
            } else {
                prefixLabel = item;
            }

            // fetch default color using owl:class selector from a rendering config;

            return (
                <div style={{ display: 'flex', marginBottom: '5px' }} key={'__key_colorSelector_' + index}>
                    <Input
                        style={{ width: '50px', minWidth: '50px', height: '25px', marginRight: '5px' }}
                        type="color"
                        onChange={e => {
                            this.graph.updateColorOfNodesWithPrefix(item, e.target.value);
                            this.updateColorValuesNodes[item] = e.target.value;
                            this.setState({ updateFlipFlop: !this.state.updateFlipFlop });
                        }}
                        value={this.updateColorValuesNodes[item]}
                    />
                    {prefixLabel}:
                </div>
            );
        });
        const colorOptionsObjectProps = usedPrefixesOProps.map((item, index) => {
            let prefixLabel = '';
            if (this.props.prefixList.longToShort[item]) {
                prefixLabel = this.props.prefixList.longToShort[item];
            } else {
                prefixLabel = item;
            }

            // fetch default color using owl:class selector from a rendering config;

            return (
                <div style={{ display: 'flex', marginBottom: '5px' }} key={'__key_colorSelector_' + index}>
                    <Input
                        style={{ width: '50px', minWidth: '50px', height: '25px', marginRight: '5px' }}
                        type="color"
                        onChange={e => {
                            this.graph.updateColorOfObjectPropsWithPrefix(item, e.target.value);
                            this.updateColorValuesOProps[item] = e.target.value;
                            this.setState({ updateFlipFlop: !this.state.updateFlipFlop });
                        }}
                        value={this.updateColorValuesOProps[item]}
                        onBlur={() => {
                            this.graph.bruteForceRedrawGraph();
                        }}
                    />
                    {prefixLabel}:
                </div>
            );
        });

        return (
            <div>
                Color nodes by prefix:
                <div>{colorOptionsNodes}</div>
                Color object properties by prefix:
                <div>{colorOptionsObjectProps}</div>
            </div>
        );
    };

    createDropDownForNotations = () => {
        return (
            <div>
                <Dropdown
                    color="secondary"
                    size="sm"
                    isOpen={this.state.visSelectionOpen}
                    style={{ paddingTop: '2px' }}
                    toggle={() => {
                        this.setState({
                            visSelectionOpen: !this.state.visSelectionOpen
                        });
                    }}
                >
                    <DropdownToggle caret style={{ backgroundColor: SECONDARY.dark, height: '35px' }}>
                        Notation: {this.props.visualNotation}
                    </DropdownToggle>
                    <DropdownMenu>
                        {this.possibleNotations.map((item, id) => {
                            return (
                                <DropdownItem
                                    key={'graphNotationDropDown_' + id}
                                    onClick={() => this.props.selectVisualNotation({ ui_visual_notation_selector: item })}
                                >
                                    {item}
                                </DropdownItem>
                            );
                        })}
                    </DropdownMenu>
                </Dropdown>
            </div>
        );
    };
    renderCustomizationOptions = () => {
        const fontsize = this.state.selectedItem.renderingConfig().fontStyle.fontSize.split('px')[0];
        const overwriteOffset = this.state.selectedItem.renderingConfig().options.overwriteOffset;
        const cfg = this.state.selectedItem.renderingConfig();
        return (
            <div>
                <div>
                    <div style={{ display: 'flex' }}>
                        <div>Color:</div>{' '}
                        <Input
                            type="color"
                            onChange={e => {
                                cfg.style.bgColor = e.target.value;
                                this.state.selectedItem.redraw();
                                this.graph.interactionHandler.nodeInteractions.reapplyNodeInteractions(this.state.selectedItem);
                                this.setState({ updateFlipFlop: !this.state.updateFlipFlop });
                            }}
                            value={this.state.selectedItem.renderingConfig().style.bgColor}
                        />
                    </div>
                </div>
                <div style={{ display: 'flex', padding: '5px' }}>
                    <div>Font Size:</div>
                    <Input
                        type="number"
                        value={fontsize}
                        onChange={e => {
                            cfg.fontStyle.fontSize = e.target.value + 'px';
                            this.state.selectedItem.redraw();
                            this.graph.interactionHandler.nodeInteractions.reapplyNodeInteractions(this.state.selectedItem);
                            this.setState({ updateFlipFlop: !this.state.updateFlipFlop });
                        }}
                    />
                </div>
                <div style={{ display: 'flex', padding: '5px' }}>
                    <input
                        type="checkbox"
                        onChange={e => {
                            cfg.options.overwritesShapeSize = e.target.checked;
                            this.state.selectedItem.redraw();
                            this.graph.interactionHandler.nodeInteractions.reapplyNodeInteractions(this.state.selectedItem);
                            this.setState({ updateFlipFlop: !this.state.updateFlipFlop });
                        }}
                        checked={cfg.options.overwritesShapeSize}
                    />
                    Overwrite Shapesize
                </div>
                <div style={{ display: 'flex', padding: '5px' }}>
                    <div>Offset:</div>
                    <Input
                        type="number"
                        value={overwriteOffset}
                        onChange={e => {
                            cfg.options.overwriteOffset = e.target.value;
                            this.state.selectedItem.redraw();
                            this.graph.interactionHandler.nodeInteractions.reapplyNodeInteractions(this.state.selectedItem);
                            this.setState({ updateFlipFlop: !this.state.updateFlipFlop });
                        }}
                    />
                </div>
            </div>
        );
    };

    captureScreenshot = () => {
        const MainRenderingContainer = document.querySelector('#MainRenderingContainer');
        if (!MainRenderingContainer) {
            return;
        }

        html2canvas(MainRenderingContainer, {
            scale: 3
        }).then(canvas => {
            const screenshotUrl = canvas.toDataURL();

            const link = document.createElement('a');
            link.href = screenshotUrl;
            link.download = 'screenshot.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    };

    handleScreenCapture = CapturedImage => {
        this.setState({ screenCapture: CapturedImage }, () => {
            this.setState({ open: true });
        });
    };

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
        if (this.props.visualizationTabIsActive === false) {
            return <div>This should never be visible</div>;
        }
        return (
            <div>
                <div style={{ textAlign: 'center', fontSize: '1.5em' }}>
                    {this.props.selectedOntology
                        ? this.props.selectedOntology.name.length > 42
                            ? `${this.props.selectedOntology.name.substring(0, 40)}...`
                            : this.props.selectedOntology.name
                        : 'N/A'}
                </div>
                <div
                    style={{
                        display: 'flex',
                        width: 'auto',
                        marginRight: '50px',
                        marginBottom: '10px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        background: PRIMARY.lighter,
                        position: 'relative',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        height: '35px'
                    }}
                >
                    <Button
                        color={!this.state.layoutPlay ? 'primary' : 'secondary'}
                        size="sm"
                        className="mr-sm-1"
                        style={{ borderRadius: '20px', marginTop: '3px', height: '30px', padding: 0 }}
                        onClick={() => {
                            this.graph.setForceLayoutPlayState(this.state.layoutPlay);
                            this.setState({ layoutPlay: !this.state.layoutPlay });
                        }}
                    >
                        <Icon style={{ fontSize: '2.0em', verticalAlign: '0.825em' }} icon={this.state.layoutPlay ? faPauseCircle : faPlayCircle} />
                    </Button>
                    {/*TODO: Enable UML Notation view once the error has been resolved*/}
                    {/*/ As of Now we disabled the VOWl TO UML view in Graph Visualization because when we are switching from VOWL to
                    UML it is throwing error The Problem could be in all-services\frontend\src\GraphVisLib\implementation\Renderes\gizmoRenderer\LineTools.js
                     it has function computeIntersectionPointsWithProperty has domain and range Parameter so sometimes domain.x has value,
                      but it is returning 0 same as the range so that could be problem but still further investigation needed  */}
                    {/*{this.createDropDownForNotations()}*/}
                    <Button
                        onClick={() => {
                            this.graph.zoomToExtent();
                        }}
                        style={{
                            backgroundColor: SECONDARY.dark,
                            textAlign: 'center',
                            marginLeft: '5px',
                            marginTop: '2px',
                            height: '35px'
                        }}
                    >
                        Zoom
                    </Button>
                    <Button
                        style={{
                            backgroundColor: SECONDARY.dark,
                            textAlign: 'center',
                            marginLeft: '5px',
                            marginTop: '2px',
                            height: '35px'
                        }}
                        onClick={this.captureScreenshot}
                    >
                        Visible-page capture
                    </Button>
                    <Button
                        style={{
                            backgroundColor: SECONDARY.dark,
                            textAlign: 'center',
                            marginLeft: '5px',
                            marginTop: '2px',
                            height: '35px'
                        }}
                        onClick={() => this.setState({ startCapture: true })}
                    >
                        Interactive Capture
                    </Button>
                    <Button
                        style={{
                            backgroundColor: SECONDARY.dark,
                            textAlign: 'center',
                            marginLeft: '5px',
                            marginTop: '2px',
                            height: '35px'
                        }}
                        onClick={this.copyUrlToClipboard}
                    >
                        Copy URL
                    </Button>
                </div>

                <div id="MainRenderingContainer" ref={this.componentRef}>
                    <SelectionSideBar expanded={this.state.leftSideBarExpanded}>
                        <StyledButton
                            expanded={this.state.leftSideBarExpanded}
                            onClick={() => {
                                this.setState({ leftSideBarExpanded: !this.state.leftSideBarExpanded });
                            }}
                            style={{ backgroundColor: SECONDARY.dark }}
                        >
                            {this.state.leftSideBarExpanded ? '<' : '>'}
                        </StyledButton>
                        {this.state.leftSideBarExpanded && (
                            <div>
                                <h3>Customization Options</h3>
                                <div>Selected Item: {this.state.selectedItem ? this.state.selectedItem.__displayName : 'NONE'}</div>
                                {this.state.selectedItem && this.renderCustomizationOptions()}
                            </div>
                        )}
                    </SelectionSideBar>

                    <SelectionRightSidebar
                        style={{ position: 'absolute', backgroundColor: 'white' }}
                        expanded={this.state.rightSideBarExpanded}
                        width={350}
                    >
                        <div style={{ position: 'relative', right: '35px' }}>
                            <Button
                                onClick={() => {
                                    this.setState({ rightSideBarExpanded: !this.state.rightSideBarExpanded });
                                }}
                                style={{ backgroundColor: SECONDARY.dark }}
                            >
                                {this.state.rightSideBarExpanded ? '>' : '<'}
                            </Button>
                        </div>
                        <div
                            style={{
                                position: 'relative',
                                top: '-40px',
                                padding: '5px'
                            }}
                        >
                            {this.renderGlobalCustomizationOptions()}
                        </div>
                    </SelectionRightSidebar>

                    <Container
                        id="donatello_parent_container"
                        style={{
                            marginTop: '-5px',
                            maxWidth: '100%',
                            height: 'calc(100vh - 140px)',
                            backgroundColor: '#eeeeee',
                            padding: 0,
                            overflow: 'hidden'
                        }}
                    >
                        <div id="donatello_rendering_div" style={{ height: '100%', overflow: 'hidden' }} />
                    </Container>
                </div>
                {this.state.open && (
                    <ScreenCaptureModal
                        toggle={() => {
                            this.setState({ open: !this.state.open, screenCapture: '', startCapture: false });
                        }}
                        modelOpen={this.state.open}
                        screenCapture={this.state.screenCapture}
                    />
                )}
                {this.state.startCapture && <ScreenCapture onEndCapture={this.handleScreenCapture} onStartCapture={this.state.capture} />}
                {this.state.showCopyNotification && <FadingNotification message="URL copied to clipboard" timeout={2000} />}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        resources: state.ResourceRelationModelReducer.resources,
        relations: state.ResourceRelationModelReducer.relations,
        prefixList: state.ResourceRelationModelReducer.metaInformation.prefixList,
        visualNotation: state.globalUIReducer.ui_visual_notation_selector,
        selectedOntology: state.ResourceRelationModelReducer.ontology
    };
};

GraphVisUi.propTypes = {
    visualizationTabIsActive: PropTypes.bool.isRequired,
    resources: PropTypes.array.isRequired,
    relations: PropTypes.array.isRequired,
    prefixList: PropTypes.object.isRequired,
    DonatelloGraph: PropTypes.object.isRequired,
    visualNotation: PropTypes.string.isRequired,
    selectVisualNotation: PropTypes.func.isRequired,
    selectedOntology: PropTypes.object.isRequired
};

const mapDispatchToProps = dispatch => ({
    selectVisualNotation: payload => dispatch(selectVisualNotation(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphVisUi);

const expandContentContainerAnimationRight = ({ expanded, width }) => {
    return keyframes`
        from {
            right: ${expanded ? -width : 0}px;
        }
        to {
            right: ${expanded ? 0 : -width}px;

        }
    `;
};
export const SelectionSideBar = styled.div`
    position: absolute;
    width: ${props => (props.expanded ? '350px' : '0')};
    height: calc(100% - 140px);
    transition: width 0.3s ease;
    background-color: white;
    border: ${props => (props.expanded ? '1px solid black' : 'none')};

    :focus {
        outline: none;
    }

    ::-moz-focus-inner {
        border: 0;
    }

    word-break: none;
    white-space: nowrap;
`;

const StyledButton = styled(Button)`
    position: absolute;
    left: ${props => (props.expanded ? '350px' : '0px')};
    transition: left 0.3s ease;
`;

export const SelectionRightSidebar = styled.div`
    background-color: red;
    border: 1px solid black;
    color: black;
    width: 350px;
    height: calc(100% - 140px);
    background: white;

    :focus {
        outline: none;
    }

    ::-moz-focus-inner {
        border: 0;
    }

    word-break: none;
    white-space: nowrap;

    border-bottom: 1px solid black;
    padding: 2px;
    position: relative;
    animation-name: ${expandContentContainerAnimationRight};
    animation-duration: 400ms;
    // opacity: 0.5;
    right: ${props => (props.expanded ? 0 : -props.width)}px;
`;
