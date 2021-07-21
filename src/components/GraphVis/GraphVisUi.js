import React, { Component } from 'react';
import { Container, Dropdown, DropdownMenu, DropdownItem, DropdownToggle, Button } from 'reactstrap';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MapperModule from '../../GraphVisLib/implementation/MapperModule';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faPauseCircle } from '@fortawesome/free-solid-svg-icons';
import { selectVisualNotation } from 'redux/actions/globalUI_actions';

class GraphVisUi extends Component {
    constructor(props) {
        super(props);

        this.possibleNotations = ['VOWL', 'UML'];

        this.graph = this.props.DonatelloGraph;
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
            console.log(modelAsJsonObject);
            return modelAsJsonObject;
        };

        this.state = {
            notationSelectionOpen: false,
            selectedNotation: 'VOWL',
            layoutPlay: true
        };
    }

    componentDidMount() {
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
                graphBgColor: '#eeeeee',
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
            //TODO  FOR NOW, user interactions can update the resourceRelation model later
            this.mapperModule.setResourceRelationModelInput(this.currentResourceRelationModel);
            this.graph.fullRedrawGraph();
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.visualNotation !== this.props.visualNotation) {
            console.log('UPDATING NOTATION : ', prevProps.visualNotation, '->', this.props.visualNotation);
            this.mapperModule.setNodeLinkType(this.props.visualNotation);
            this.mapperModule.execute().then(model => {
                this.graph.integrateUpdatedNodeLink(model);
            });
        }
    }

    updateDimensions = () => {
        this.graph.updateGraphSize();
    };

    /** RENDERING FUNCTIONS **/

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
                    <DropdownToggle caret color="primary" style={{ border: '1px solid black' }}>
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

    render() {
        console.log('Layoout should play', this.state.layoutPlay);
        return (
            <div style={{ marginTop: '-25px' }}>
                <div
                    style={{
                        display: 'flex',
                        width: 'auto',
                        marginLeft: '200px',
                        marginRight: '50px',
                        paddingLeft: '10px',
                        paddingRight: '10px',
                        background: '#6c757d',
                        position: 'relative',
                        top: '-5px',
                        borderTopLeftRadius: '10px',
                        borderTopRightRadius: '10px',
                        height: '35px'
                    }}
                >
                    <Button
                        color={!this.state.layoutPlay ? 'primary' : 'secondary'}
                        size="sm"
                        className="mr-sm-1"
                        style={{ borderRadius: '20px', marginLeft: '-7px', marginTop: '7px', height: '20px', padding: 0 }}
                        onClick={() => {
                            this.graph.pauseForceDirectedLayout(this.state.layoutPlay);
                            this.setState({ layoutPlay: !this.state.layoutPlay });
                        }}
                    >
                        <Icon style={{ fontSize: '1.3em', verticalAlign: '0.825em' }} icon={this.state.layoutPlay ? faPauseCircle : faPlayCircle} />
                    </Button>
                    {this.createDropDownForNotations()}
                </div>
                <Container
                    id="donatello_parent_container"
                    style={{ marginTop: '-5px', maxWidth: '100%', height: 'calc(100vh - 85px)', backgroundColor: '#eeeeee', padding: 0 }}
                >
                    <div id="donatello_rendering_div" style={{ height: '100%', overflow: 'auto' }} />
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        resources: state.ResourceRelationModelReducer.resources,
        relations: state.ResourceRelationModelReducer.relations,
        visualNotation: state.globalUIReducer.ui_visual_notation_selector
    };
};

GraphVisUi.propTypes = {
    resources: PropTypes.array.isRequired,
    relations: PropTypes.array.isRequired,
    DonatelloGraph: PropTypes.object.isRequired,
    visualNotation: PropTypes.string.isRequired,
    selectVisualNotation: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
    selectVisualNotation: payload => dispatch(selectVisualNotation(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphVisUi);
