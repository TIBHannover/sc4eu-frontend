import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import MapperModule from '../../GraphVisLib/implementation/MapperModule';
import DonatelloGraph from '../../GraphVisLib/implementation/Renderes/gizmoRenderer/DonatelloGraph';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { initializeResourceRelationModel } from '../../redux/actions/rrm_actions';
import { connect } from 'react-redux';
import { getPrefixedVersion } from '../../mappers/helperFunctions';

class CardGraphVis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            updateFlipFlop: false,
            createdGraph: false
        };
        this.animationComplete = false;
        this.graphRenderingIdentifier =
            'cardRenderingIdentifier_' +
            getPrefixedVersion(this.props.itemIdentifier, this.props.rrModel.metaInformation.prefixList.longToShort).replace(':', '_');
        this.graph = new DonatelloGraph();
        this.mapperModule = new MapperModule();
        this.parentDivObserver = new ResizeObserver(() => {
            this.updateDimensions();
        });
    }

    componentDidMount() {
        console.log('RESIZE EVENT SHOULD ONLY BE APPLIED WHEN THERE IS A DIV TO RENDER');
        window.addEventListener('resize', this.updateDimensions);
        this.updateDimensions();

        if (!this.state.createdGraph && this.props.isExpanded) {
            this.setState({ updateFlipFlop: !this.state.updateFlipFlop });
        }

        // add graph updates;
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (!this.props.isExpanded) {
            return;
        }

        if (!this.state.createdGraph) {
            // crateGraph and update the state;
            console.log('create sub resource relation model for the identifier', this.props.itemType);
            const graphContainer = document.getElementById(this.graphRenderingIdentifier);
            if (graphContainer) {
                console.log(graphContainer);
                this.parentDivObserver.observe(graphContainer, { subtree: false, childList: true });
            }
            if (this.props.itemType === 'Resource') {
                console.log('>>> CREATE THE SUB GRAPH FROM A RESOURCE');

                const resources = this.props.rrModel.resources;
                const relations = this.props.rrModel.relations;

                const itemOfInterest = resources.find(item => item.identifier === this.props.itemIdentifier);
                console.log('itemOfInterest ', itemOfInterest);

                if (itemOfInterest) {
                    const sub_resources = [];
                    const sub_relations = [];
                    sub_resources.push(itemOfInterest);
                    for (const name in itemOfInterest.axioms) {
                        if (itemOfInterest.axioms.hasOwnProperty(name)) {
                            const subAxioms = itemOfInterest.axioms[name];
                            subAxioms.forEach(axiom => {
                                // find that axiom target;
                                const res = resources.find(item => item.identifier === axiom);
                                sub_resources.push(res);
                            });
                        }
                    }

                    resources.forEach(resource => {
                        // check if the itemOf Interest identifier is somewhere else;
                        // TODO : make this better, now just looking in axioms;

                        for (const name in resource.axioms) {
                            if (resource.axioms.hasOwnProperty(name)) {
                                const subAxioms = resource.axioms[name];
                                if (subAxioms.indexOf(this.props.itemIdentifier) !== -1) {
                                    sub_resources.push(resource);
                                }
                            }
                        }
                    });
                    relations.forEach(relation => {
                        // check if the itemOf Interest identifier is somewhere else;
                        // TODO : make this better, now just looking in axioms;

                        relation.domainRangePairs.forEach(pair => {
                            if (pair.domain === this.props.itemIdentifier) {
                                sub_relations.push(relation);
                                const rangeResource = resources.find(range => range.identifier === pair.range);
                                if (rangeResource) {
                                    sub_resources.push(rangeResource);
                                }
                            }
                            if (pair.range === this.props.itemIdentifier) {
                                sub_relations.push(relation);
                                const domainResource = resources.find(domain => domain.identifier === pair.domain);
                                sub_resources.push(domainResource);
                            }
                        });
                    });

                    // make unique;

                    console.log('subResources,', sub_resources);
                    console.log('subRelations,', sub_relations);

                    const config = {
                        graph_mouseZoom: false,
                        graph_ctrl_mouseZoom: true,
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
                    this.graph.setRenderingContainer(this.graphRenderingIdentifier);
                    this.graph.configureGraphInteractions(config);

                    const modelAsJsonObject = { resources: sub_resources, relations: sub_relations };
                    const currentResourceRelationModel = {
                        resultingModel: {
                            type: 'TYPE_RESOURCE_RELATION_MODEL',
                            modelAsJsonObject: modelAsJsonObject
                        }
                    };
                    currentResourceRelationModel.resultingModel.getResult = function() {
                        console.log(modelAsJsonObject);
                        return modelAsJsonObject;
                    };

                    this.mapperModule.setResourceRelationModelInput(currentResourceRelationModel);
                    this.mapperModule.setGraphReference(this.graph);
                    this.mapperModule.setNodeLinkType('VOWL');
                    this.mapperModule.execute().then(model => {
                        this.graph.setModel(model);
                        // do the rendering magic
                        this.graph.initializeRenderingContainer();
                        this.updateDimensions();
                        this.graph.createRenderingElements();
                        this.graph.drawRenderingPrimitives();
                        this.graph.setGraphInitialized(true);
                        this.setState({ createdGraph: true });
                    });
                }
            }

            if (this.props.itemType === 'Relation') {
                console.log('>>> CREATE THE SUB GRAPH FROM A RELATION');
            }
        } else {
            // mostlikely we need to redraw the full graph since there is no div items;
            this.updateDimensions();
            this.graph.fullRedrawGraph();
        }

        // we initialize the card based on the target item id for rendering
    };

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    updateDimensions = () => {
        this.graph.updateGraphSize();
    };

    render() {
        return (
            <GraphVisCardContainer
                isExpanded={this.props.isExpanded}
                maxHeight={250}
                initialRendering={this.props.initialRendering}
                animationCompleted={this.animationCompleted}
            >
                {this.props.isExpanded && (
                    <div
                        id={this.graphRenderingIdentifier}
                        style={{
                            width: '100%',
                            height: '250px',
                            border: '1px solid black',
                            borderTop: 'none'
                            // backgroundColor: '#0af225'
                        }}
                    >
                        {!this.state.createdGraph && (
                            <div style={{ width: '100%', margin: 'auto', textAlign: 'center' }}>
                                <span>
                                    <Icon icon={faSpinner} spin />
                                </span>
                                Loading
                            </div>
                        )}
                    </div>
                )}
            </GraphVisCardContainer>
        );
    }
}
CardGraphVis.propTypes = {
    height: PropTypes.number,
    itemIdentifier: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
    rrModel: PropTypes.object.isRequired,
    isExpanded: PropTypes.bool.isRequired,
    initialRendering: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
    return {
        rrModel: state.ResourceRelationModelReducer
    };
};

const mapDispatchToProps = dispatch => ({
    initializeResourceRelationModel: payload => dispatch(initializeResourceRelationModel(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(CardGraphVis);

const expandContentContainerAnimation = ({ isExpanded, maxHeight, initialRendering, animationCompleted }) => {
    //  TODO: add the animationCompleted Flag

    if (initialRendering) {
        return;
    }
    if (isExpanded) {
        return keyframes`
              from {
                height: ${0}px;
             
              }
              to {
                height: ${maxHeight}px;
              }
        `;
    }
    if (!isExpanded) {
        return keyframes`
              from {
                height: ${maxHeight}px;
              }
              to {
                height: ${0}px;
               
              }
        `;
    }
};

const GraphVisCardContainer = styled.div`
    animation-name: ${expandContentContainerAnimation};
    animation-duration: 400ms;
    position: relative;

    height: ${props => (props.isExpanded ? props.maxHeight : 0)}px;
`;
