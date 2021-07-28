import * as d3 from 'd3';
import NodePrimitive from './renderingElements/NodePrimitive';
import LinkPrimitive from './renderingElements/LinkPrimitive';
import DrawTools from './DrawTools';
import ForceLayout from './Layout/ForceLayout';
import Interactions from './Interactions/interactions';
import GraphInteractions from './Interactions/graphInteractions';
import NodeInteractions from './Interactions/nodeInteractions';
import LinkInteractions from './Interactions/linkInteractions';
import BasicRenderingHandler from './renderingConfigs/BasicRenderingHandler';
export default class GraphRenderer {
    constructor() {
        this.GRAPH_TYPE = 'ABSTRACT_RENDERING_TYPE';
        this.graphIsInitialized = false;
        this.model = null;
        this.originalModel = null;
        this.layoutHandler = null;
        this.renderingConfig = null;
        this.interactionHandler = null;
        this.drawTools = null;

        this.nodes = [];
        this.links = [];

        this.nodeMap = {};
        this.linkMap = {};

        this.divRoot = null;
        this.svgRoot = null;
        this.graphRoot = null;

        // this can be overwritten (but it gives a proper ordering of the layers)
        this.layerObject = ['arrows', 'links', 'properties', 'nodes', 'forceNodes'];

        this.graphBgColor = '#ECF0F1';
        this.showSubclassRelations = true;
    }

    setGraphInitialized = val => {
        this.graphIsInitialized = val;
    };

    fullRedrawGraph = () => {
        const backupTranslation = this.interactionHandler.graphInteractions.graphTranslation;
        const backupZoom = this.interactionHandler.graphInteractions.zoomFactor;
        this.initializeRenderingContainer();
        this.redrawRenderingPrimitives(true);
        if (this.interactionHandler) {
            this.interactionHandler.applyInteractions(this);
        } else {
            console.log('No Interaction Handler set, the graph will be static!');
        }
        this.resetUserNavigation(backupTranslation, backupZoom);
        this.layoutHandler.initializeLayoutEngine();
    };

    filterSubClassRelations = val => {
        console.log('wants to filter the subclass types', val);
        const scoAr = this.links.filter(item => item.__displayName === 'Subclass of');
        scoAr.forEach(item => {
            item.visible(val);
        });

        this.fullRedrawGraph();
    };

    filterDisjointRelations = val => {
        console.log('wants to filter the disjoint thingy types', val);
        const scoAr = this.links.filter(item => item.__displayName === 'Disjoint With');
        scoAr.forEach(item => {
            item.visible(val);
        });
        this.fullRedrawGraph();
    };

    /** Exposed functions >> DO NOT OVERWRITE **/
    setGraphBackgroundColor = val => {
        this.graphBgColor = val;
    };

    setRenderingContainer = divId => {
        this.divRoot = divId;
    };

    setDrawTools = tools => {
        this.drawTools = tools;
    };

    setModel = model => {
        if (this.model === null) {
            this.originalModel = model;
        }
        this.model = model;
    };

    setRenderingConfig = config => {
        this.renderingConfig = config;
    };

    getRenderedElements = () => {
        return { nodes: this.nodes, links: this.links };
    };

    getRenderingHandler = () => {
        return this.renderingConfig;
    };

    setInteractionHandler = handler => {
        this.interactionHandler = handler;
    };

    configureGraphInteractions = state => {
        // get the required configFlags;

        const zoom = state.graph_mouseZoom;
        const ctrlZoom = state.graph_ctrl_mouseZoom;
        const drag = state.graph_mouseDrag;

        if (!this.interactionHandler) {
            this.interactionHandler = new Interactions();
        }
        if (!this.interactionHandler.graphInteractions) {
            this.interactionHandler.graphInteractions = new GraphInteractions(this);
        }

        this.interactionHandler.graphInteractions.enableMouseZoom(zoom);
        this.interactionHandler.graphInteractions.enableMouseDrag(drag);
        this.interactionHandler.graphInteractions.enableCtrlMouseZoom(ctrlZoom);

        // node link interactions ;;;

        const nodeDrag = state.node_mouseDrag;
        const nodeHover = state.node_mouseHover;
        const nodeClick = state.node_mouseSingleClick;
        const nodeDoubleClick = state.node_mouseDoubleClick;

        if (!this.interactionHandler.nodeInteractions) {
            this.interactionHandler.nodeInteractions = new NodeInteractions(this);
        }

        this.interactionHandler.graphInteractions.enableMouseZoom(zoom);
        this.interactionHandler.graphInteractions.enableMouseDrag(drag);

        this.interactionHandler.nodeInteractions.setNodeClickEnabled(nodeClick);
        this.interactionHandler.nodeInteractions.setNodeDoubleClickEnabled(nodeDoubleClick);
        this.interactionHandler.nodeInteractions.setHoverEnabled(nodeHover);
        this.interactionHandler.nodeInteractions.setDragEnabled(nodeDrag);

        // link interactions
        if (!this.interactionHandler.linkInteractions) {
            this.interactionHandler.linkInteractions = new LinkInteractions(this);
        }

        const linkDrag = state.link_mouseDrag;
        const linkHover = state.link_mouseHover;

        this.interactionHandler.linkInteractions.setHoverEnabled(linkHover);
        this.interactionHandler.linkInteractions.setDragEnabled(linkDrag);

        this.setGraphBackgroundColor(state.graphBgColor);
    };

    createPrimitives() {
        // create the primitives;
        this.model.nodes.forEach(node => {
            this.createNodePrimitive(node);
        });

        this.model.links.forEach(link => {
            this.createLinkPrimitive(link);
        });
    }
    createRenderingElements() {
        if (!this.model) {
            console.error('NO MODEL SET ! ');
        }
        if (!this.renderingConfig) {
            // create a default renderingConfigHandler;
            console.warn('NO RENDERING CONFIG HANDLER SET ! WILL CREATE A DEFAULT ONE FOR YOU!');
            this.renderingConfig = new BasicRenderingHandler();
        }
        if (!this.drawTools) {
            // create a default renderingConfigHandler;
            console.warn('NO DRAWTOOLS  HANDLER SET ! WILL CREATE A DEFAULT ONE FOR YOU!');
            this.drawTools = new DrawTools(this);
        }

        if (!this.layoutHandler) {
            // create a default renderingConfigHandler;
            console.warn('NO LAYOUT  HANDLER SET ! WILL CREATE A DEFAULT ONE FOR YOU! << FORCE DIRECTED LAYOUT>>>');
            this.layoutHandler = new ForceLayout(this);
        }
    }

    resetUserNavigation = (translation, zoomfactor) => {
        if (this.interactionHandler) {
            if (this.interactionHandler.graphInteractions) {
                this.interactionHandler.graphInteractions.resetUserLayout(translation, zoomfactor);
            }
        }
    };

    initializeRenderingContainer = () => {
        if (!this.divRoot) {
            console.error('No div found for the graph ');
            return;
        }
        // clear rendering containers;
        this._clearRenderingContainers();
        // create the renderingContainers
        this._createRenderingContainers();
    };

    _clearRenderingContainers = () => {
        if (this.graphRoot) {
            this.graphRoot.selectAll('defs').remove();
            this.graphRoot.selectAll('g').remove();
            this.graphRoot.remove();
        }
        if (this.svgRoot) {
            this.svgRoot.remove();
        }

        if (d3.select('#' + this.divRoot + '_svgRoot')) {
            // we have on from some other initialization.. remove that
            d3.select('#' + this.divRoot + '_svgRoot').remove();
        }
    };

    _updateSVG_Size = () => {
        if (this.svgRoot) {
            // TODO
            const divNode = d3.select('#' + this.divRoot);
            const divBoundingBox = divNode.node().getBoundingClientRect();
            this.svgRoot.style('width', divBoundingBox.width + 'px');
            this.svgRoot.style('height', divBoundingBox.height + 'px');
        }
    };

    pauseForceDirectedLayout = val => {
        console.log('Graph wants to be paused? ', val);
        this.layoutHandler.pauseForceLayoutAnimation(val);
    };

    updateGraphSize = () => {
        const divNode = d3.select('#' + this.divRoot);
        if (divNode && this.svgRoot && this.layoutHandler && divNode.node()) {
            const divBoundingBox = divNode.node().getBoundingClientRect();
            const borderOffset = 2; // QND
            this.svgRoot.style('width', divBoundingBox.width - borderOffset + 'px');
            this.svgRoot.style('height', divBoundingBox.height - borderOffset + 'px');
            this.layoutHandler.setLayoutSize(divBoundingBox.width - borderOffset, divBoundingBox.height - borderOffset);
        }
    };

    _createRenderingContainers = () => {
        const divNode = d3.select('#' + this.divRoot);
        this.svgRoot = divNode.append('svg');
        this.svgRoot.node().id = this.divRoot + '_svgRoot';
        this.svgRoot.style('background', this.graphBgColor);

        // adjust svgSize to the container size;
        this._checkForPaddingInDivNode();
        const divBoundingBox = divNode.node().getBoundingClientRect();
        const borderOffset = 2; // QND
        this.svgRoot.style('width', divBoundingBox.width - borderOffset + 'px');
        this.svgRoot.style('height', divBoundingBox.height - borderOffset + 'px');
        // createGraphGroup; // why you ask? so we can compute the bounding size of it later (zoom to graph Extent functions)

        this.graphRoot = this.svgRoot.append('g');
        this.graphRoot.style('overflow', 'hidden');

        this._createLayers();
    };

    _createLayers = () => {
        const root = this.graphRoot;
        const layerNamePrefix = this.divRoot;
        this.layerObject.forEach(function(layer) {
            if (layer === 'arrows') {
                const markerContainer = root.append('defs');
                markerContainer.node().id = layerNamePrefix + '_' + layer;
            } else {
                const renderingLayer = root.append('g');
                renderingLayer.node().id = layerNamePrefix + '_' + layer;
            }
        });
    };

    _checkForPaddingInDivNode = () => {
        const divNode = d3.select('#' + this.divRoot);
        if (divNode.style('padding-left') || divNode.style('padding-right') || divNode.style('padding-top') || divNode.style('padding-bottom')) {
            let noError = 0;
            if (divNode.style('padding-left') && (divNode.style('padding-left') === '0' || divNode.style('padding-left') === '0px')) {
                noError++;
            }
            if (divNode.style('padding-right') && (divNode.style('padding-right') === '0' || divNode.style('padding-right') === '0px')) {
                noError++;
            }

            if (divNode.style('padding-top') && (divNode.style('padding-top') === '0' || divNode.style('padding-top') === '0px')) {
                noError++;
            }
            if (divNode.style('padding-bottom') && (divNode.style('padding-bottom') === '0' || divNode.style('padding-bottom') === '0px')) {
                noError++;
            }
            if (noError !== 4) {
                console.error('DO NOT PUT PADDING INTO THE RENDERING DIV! \n Will nevertheless try to render it ');
            }
        }
    };

    // SOME RENDERING STUFF
    createNodePrimitive = node => {
        const nodePrimitive = new NodePrimitive();
        nodePrimitive.id(node.__nodeLinkIdentifier);
        nodePrimitive.displayName(node.__displayName);
        nodePrimitive.renderingConfig(this.renderingConfig.getNodeConfigFromType(node.__nodeType[0]));
        nodePrimitive.refereceResource = node;
        nodePrimitive.drawTools(this.drawTools);

        this.nodes.push(nodePrimitive);
        this.nodeMap[nodePrimitive.id()] = nodePrimitive;
    };

    createLinkPrimitive = link => {
        const linkPrimitive = new LinkPrimitive();
        linkPrimitive.id(link.__nodeLinkIdentifier);
        linkPrimitive.displayName(link.__displayName);

        if (link.__linkType !== 'axiomLink') {
            linkPrimitive.renderingConfig(this.renderingConfig.getLinkConfigFromType(link.__linkType[0]));
        } else {
            linkPrimitive.renderingConfig(this.renderingConfig.getLinkConfigFromType(link.__linkAxiom));
        }
        linkPrimitive.drawTools(this.drawTools);

        // fetch the source and target from the map;
        linkPrimitive.setSourceNode(this.nodeMap[link.__source.__nodeLinkIdentifier]);
        linkPrimitive.setTargetNode(this.nodeMap[link.__target.__nodeLinkIdentifier]);

        if (this.nodeMap[link.__source.__nodeLinkIdentifier] === this.nodeMap[link.__target.__nodeLinkIdentifier]) {
            linkPrimitive.setInternalType('loop');
            const item = this.nodeMap[link.__source.__nodeLinkIdentifier];
            item.numberOfLoops(item.numberOfLoops() + 1);
        }
        this.links.push(linkPrimitive);
        this.linkMap[linkPrimitive.id()] = linkPrimitive;
    };

    updateMultiLinkTypes = link => {
        if (link.__internalType === 'loop') {
            return;
        }
        const src = link.sourceNode;
        const tar = link.targetNode;

        // this is a pair;
        // lets see if we have multi link;
        let isMultiLink = false;
        src.outgoingLinks.forEach(out => {
            if (out.__internalType === 'loop' || out.id() === link.id()) {
                return;
            }
            if (out.targetNode.id() === tar.id()) {
                isMultiLink = true;
            }
        });

        tar.outgoingLinks.forEach(out => {
            if (out.__internalType === 'loop' || out.id() === link.id()) {
                return;
            }
            if (out.targetNode.id() === src.id()) {
                isMultiLink = true;
            }
        });
        if (isMultiLink) {
            link.setInternalType('multiLink');
        }

        // kill multiLink if we have no label to draw!;
        if (link.renderingConfig().options.drawPropertyNode === false) {
            link.setInternalType('singleLink');
        }
    };

    redrawRenderingPrimitives = debug => {
        this._drawRenderingPrimitivesForNodes(debug);
        this._drawRenderingPrimitivesForLinks(debug);
    };

    drawRenderingPrimitives = paused => {
        this._drawRenderingPrimitivesForNodes();
        this._drawRenderingPrimitivesForLinks();

        // applyInteractions
        if (this.interactionHandler) {
            this.interactionHandler.applyInteractions(this);
        } else {
            console.log('No Interaction Handler set, the graph will be static!');
        }

        if (this.layoutHandler) {
            this.layoutHandler.initializeLayoutEngine();
            if (paused === undefined || paused === false) {
                this.layoutHandler.resumeForce();
            }
        } else {
            console.log('No Layout Handler set, the graph will be static!');
        }
    };

    _drawRenderingPrimitivesForLinks = debug => {
        const linkContainer = d3.select('#' + this.divRoot + '_links');
        linkContainer.selectAll('g').remove();
        const propertyContainer = d3.select('#' + this.divRoot + '_properties');
        propertyContainer.selectAll('g').remove();
        const arrowContainer = d3.select('#' + this.divRoot + '_arrows');
        arrowContainer.selectAll('marker').remove();
        this.renderedLinks = this.createRenderingPrimitives(linkContainer, this.links, 'LinkItem');

        // execute the rendering function of the nodes;
        this.renderedLinks.each(function(item) {
            console.log('Rendering LInk ', item.__displayName, item.visible());
            if (item.visible()) {
                if (debug) {
                    console.log('DEBUG:', ' rendering LINK ITEM');
                }
                item.render(d3.select(this), propertyContainer, arrowContainer, debug);
            } else {
                d3.select(this).remove();
            }
        });
    };

    _drawRenderingPrimitivesForNodes = () => {
        const nodeContainer = d3.select('#' + this.divRoot + '_nodes');
        nodeContainer.selectAll('g').remove();
        this.renderedNodes = this.createRenderingPrimitives(nodeContainer, this.nodes, 'NodeItem');
        // execute the rendering function of the nodes;
        this.renderedNodes.each(function(item) {
            if (item.visible() === true) {
                item.render(d3.select(this));
            } else {
                d3.select(this).remove();
            }
        });
    };

    createRenderingPrimitives(container, data, typeClass) {
        return container
            .selectAll('.' + typeClass)
            .data(
                data.filter(item => {
                    return item.visible() === true;
                })
            )
            .enter()
            .append('g')
            .classed(typeClass, true)
            .attr('id', function(d) {
                return d.id();
            });
    }
}
