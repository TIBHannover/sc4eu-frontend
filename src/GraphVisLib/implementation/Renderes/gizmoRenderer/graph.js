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
        this.semanticNodeMap = {};
        this.linkMap = {};
        this.semanticLinkMap = {};

        this.divRoot = null;
        this.svgRoot = null;
        this.graphRoot = null;

        // this can be overwritten (but it gives a proper ordering of the layers)
        this.layerObject = ['arrows', 'links', 'properties', 'nodes', 'forceNodes'];

        this.graphBgColor = '#ECF0F1';
        this.showSubclassRelations = true;
        this.linkCounter = 0;
        this.nodeCounter = 0;
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
        const scoAr = this.links.filter(item => item.__displayName === 'Subclass of');
        scoAr.forEach(item => {
            item.visible(val);
        });

        this.fullRedrawGraph();
    };

    filterDisjointRelations = val => {
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
        const nodeSelection = state.node_hasNodeSelection ? state.node_hasNodeSelection : false;

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
        this.interactionHandler.nodeInteractions.setHasNodeSelection(nodeSelection);

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
            if (node) {
                //TODO this is not a fix, check why node is undefined
                this.createNodePrimitive(node);
            }
        });

        this.model.links.forEach(link => {
            if (link) {
                //TODO this is nto a fix, check why node is undefined
                const targetNode = this.semanticNodeMap[link.__target.__nodeLinkIdentifier];
                const sourceNode = this.semanticNodeMap[link.__source.__nodeLinkIdentifier];
                if (targetNode && sourceNode) {
                    this.createLinkPrimitive(link);
                }
            }
        });

        this.updateMultiLinkTypes(this.links);
    }
    createRenderingElements() {
        if (!this.model) {
            console.error('NO MODEL SET ! ');
        }
        if (!this.renderingConfig) {
            // create a default renderingConfigHandler;
            console.warn('NO RENDERING CONFIG HANDLER SET! WILL CREATE A DEFAULT ONE FOR YOU!');
            this.renderingConfig = new BasicRenderingHandler();
        }
        if (!this.drawTools) {
            // create a default renderingConfigHandler;
            console.warn('NO DRAWTOOLS  HANDLER SET! WILL CREATE A DEFAULT ONE FOR YOU!');
            this.drawTools = new DrawTools(this);
        }

        if (!this.layoutHandler) {
            // create a default renderingConfigHandler;
            console.warn('NO LAYOUT  HANDLER SET! WILL CREATE A DEFAULT ONE FOR YOU! << FORCE DIRECTED LAYOUT>>>');
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
        this.layoutHandler.pauseForceLayoutAnimation(val);
    };

    zoomToExtent = (waitTime = 0) => {
        if (waitTime === 0) {
            this.executeZoom();
        } else {
            setTimeout(this.executeZoom, waitTime);
        }
    };

    executeZoom = () => {
        // get the rendering dom elements
        const bbox = this.graphRoot.node().getBoundingClientRect();
        const svgBbox = this.svgRoot.node().getBoundingClientRect();
        const graphTranslation = this.interactionHandler.graphInteractions.graphTranslation;
        const zoomFactor = this.interactionHandler.graphInteractions.zoomFactor;

        // get the graph coordinates
        const bboxOffset = 20; // default radius of a node;
        const topLeft = this.getWorldPosFromScreen(bbox.left - svgBbox.left, bbox.top - svgBbox.top, graphTranslation, zoomFactor);
        const botRight = this.getWorldPosFromScreen(bbox.right - svgBbox.left, bbox.bottom - svgBbox.top, graphTranslation, zoomFactor);

        // get svg size;
        const w = svgBbox.width;
        const h = svgBbox.height;

        // reduce the graph viewport by bboxOffset ; >> used for scaleFactor computations
        topLeft.x += bboxOffset;
        topLeft.y -= bboxOffset;
        botRight.x -= bboxOffset;
        botRight.y += bboxOffset;

        // gets the graph viewport size
        const g_w = botRight.x - topLeft.x;
        const g_h = botRight.y - topLeft.y;

        // position in word coords where we want to zoom to;
        const posX = 0.5 * (topLeft.x + botRight.x);
        const posY = 0.5 * (topLeft.y + botRight.y);

        // zoom factor calculations and fail safes;
        let newZoomFactor;
        //get the smaller one
        const a = w / g_w;
        const b = h / g_h;
        if (a <= b) {
            newZoomFactor = a;
        } else {
            newZoomFactor = b;
        }
        // fail saves
        if (newZoomFactor > this.interactionHandler.graphInteractions.zoom.scaleExtent()[1]) {
            newZoomFactor = this.interactionHandler.graphInteractions.zoom.scaleExtent()[1];
        }
        if (newZoomFactor < this.interactionHandler.graphInteractions.zoom.scaleExtent()[0]) {
            newZoomFactor = this.interactionHandler.graphInteractions.zoom.scaleExtent()[0];
        }

        // center point of the svg element
        const cx = 0.5 * w;
        const cy = 0.5 * h;

        const cp = this.getWorldPosFromScreen(cx, cy, graphTranslation, zoomFactor);

        // apply Zooming
        const sP = [cp.x, cp.y, h / zoomFactor];
        const eP = [posX, posY, h / newZoomFactor];

        // interpolation function
        const pos_interpolation = d3.interpolateZoom(sP, eP);

        let lenAnimation = pos_interpolation.duration;
        if (lenAnimation > 2500) {
            // fix duration to be max 2.5 sec
            lenAnimation = 2500;
        }
        const that = this;
        // apply the interpolation
        that.graphRoot
            .attr('transform', that.transform(sP, cx, cy, this))
            .transition()
            .duration(lenAnimation)
            .attrTween('transform', function() {
                return function(t) {
                    return that.transform(pos_interpolation(t), cx, cy, that);
                };
            })
            .on('end', function() {
                const gi = that.interactionHandler.graphInteractions;

                if (gi.zoom) {
                    that.graphRoot.attr('transform', `translate(${gi.graphTranslation})scale(${gi.zoomFactor})`);

                    const newTransform = d3.zoomIdentity.translate(gi.graphTranslation[0], gi.graphTranslation[1]).scale(gi.zoomFactor);

                    that.svgRoot.call(gi.zoom.transform, newTransform);
                }
            });
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
        nodePrimitive.id('NODE_' + this.nodeCounter++);
        nodePrimitive.displayName(node.__displayName);
        nodePrimitive.renderingConfig(this.renderingConfig.getNodeConfigFromType(node.__nodeType[0]));
        nodePrimitive.semanticReference(node);
        nodePrimitive.drawTools(this.drawTools);

        // TESTING DEFAULT NODE POSITIONS

        this.nodes.push(nodePrimitive);
        this.nodeMap[nodePrimitive.id()] = nodePrimitive;
        this.semanticNodeMap[node.__nodeLinkIdentifier] = nodePrimitive;
    };

    createLinkPrimitive = link => {
        const linkPrimitive = new LinkPrimitive();

        linkPrimitive.id('LINK_' + this.linkCounter++);
        linkPrimitive.displayName(link.__displayName);

        if (link.__linkType !== 'axiomLink') {
            linkPrimitive.renderingConfig(this.renderingConfig.getLinkConfigFromType(link.__linkType[0]));
        } else {
            linkPrimitive.renderingConfig(this.renderingConfig.getLinkConfigFromType(link.__linkAxiom));
        }
        linkPrimitive.drawTools(this.drawTools);
        linkPrimitive.semanticReference(link);
        // fetch the source and target from the map;

        linkPrimitive.setSourceNode(this.semanticNodeMap[link.__source.__nodeLinkIdentifier]);
        linkPrimitive.setTargetNode(this.semanticNodeMap[link.__target.__nodeLinkIdentifier]);

        if (this.nodeMap[linkPrimitive.sourceNode.id()] === this.nodeMap[linkPrimitive.targetNode.id()]) {
            linkPrimitive.setInternalType('loop');
            const item = this.nodeMap[linkPrimitive.sourceNode.id()];
            item.numberOfLoops(item.numberOfLoops() + 1);
        }
        this.links.push(linkPrimitive);
        this.linkMap[linkPrimitive.id()] = linkPrimitive;
        this.semanticLinkMap[link.__nodeLinkIdentifier] = linkPrimitive;
    };

    updateMultiLinkTypes = links => {
        links.forEach(link => {
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
                const n1 = link.sourceNode;
                const n2 = link.targetNode;
                // give me all links that participate between this two nodes;
                const n1_in_links = n1.incomingLinks.filter(item => {
                    return item.sourceNode.id() === n2.id();
                });
                const n1_out_links = n1.outgoingLinks.filter(item => {
                    return item.targetNode.id() === n2.id();
                });
                const links = [].concat(n1_out_links, n1_in_links).filter(item => item.visible());
                this.createMultiLinkPrimitive(n1, n2, links);
            }

            // kill multiLink if we have no label to draw!;
            if (link.renderingConfig().options.drawPropertyNode === false) {
                link.setInternalType('singleLink');
            }
        });
    };

    createMultiLinkPrimitive = (n1, n2, links) => {
        // sort them to create only one;
        const left = n1.id() < n2.id() ? n1.id() : n2.id();
        const right = n1.id() > n2.id() ? n1.id() : n2.id();
        const mlLinkId = left + '__' + right;

        if (this.linkMap[mlLinkId] === undefined) {
            // create the linkPrimitive;
            const linkPrimitive = new LinkPrimitive();
            linkPrimitive.id(mlLinkId);
            linkPrimitive.displayName(links.length);
            linkPrimitive.renderingConfig(this.renderingConfig.getLinkConfigFromType('multilink'));
            linkPrimitive.drawTools(this.drawTools);

            // fetch the source and target from the map;
            linkPrimitive.setSourceNode(n1);
            linkPrimitive.setTargetNode(n2);
            linkPrimitive.setInternalType('singleLink');
            linkPrimitive.visible(false);

            linkPrimitive.__isHiddenML = true;

            linkPrimitive.__linkGroup = links;
            this.links.push(linkPrimitive);
            this.linkMap[mlLinkId] = linkPrimitive;
        }
    };

    showML_renderingPrimitive = groupRepresentative => {
        const n1 = groupRepresentative.sourceNode;
        const n2 = groupRepresentative.targetNode;

        const left = n1.id() < n2.id() ? n1.id() : n2.id();
        const right = n1.id() > n2.id() ? n1.id() : n2.id();
        const mlLinkId = left + '__' + right;
        if (this.linkMap[mlLinkId]) {
            this.linkMap[mlLinkId].visible(true);
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

    _drawRenderingPrimitivesForLinks = () => {
        const linkContainer = d3.select('#' + this.divRoot + '_links');
        linkContainer.selectAll('g').remove();
        const propertyContainer = d3.select('#' + this.divRoot + '_properties');
        propertyContainer.selectAll('g').remove();
        const arrowContainer = d3.select('#' + this.divRoot + '_arrows');
        arrowContainer.selectAll('marker').remove();
        this.renderedLinks = this.createRenderingPrimitives(linkContainer, this.links, 'LinkItem');

        // execute the rendering function of the nodes;
        this.renderedLinks.each(function(item) {
            if (item.visible()) {
                item.render(d3.select(this), propertyContainer, arrowContainer);
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

    /** Helper functions **/
    getWorldPosFromScreen(x, y, translate, scale) {
        // have to check if scale is array or value >> temp variable
        const temp = scale[0];
        let xn, yn;
        if (temp) {
            xn = (x - translate[0]) / temp;
            yn = (y - translate[1]) / temp;
        } else {
            xn = (x - translate[0]) / scale;
            yn = (y - translate[1]) / scale;
        }
        return { x: xn, y: yn };
    }

    getScreenCoords = (x, y) => {
        return {
            x: this.interactionHandler.graphTranslation[0] + x * this.interactionHandler.zoomFactor,
            y: this.interactionHandler.graphTranslation[1] + y * this.interactionHandler.zoomFactor
        };
    };

    transform(p, cx, cy, parent) {
        if (parent) {
            // one iteration step for the locate target animation
            parent.interactionHandler.graphInteractions.zoomFactor = parent.svgRoot.node().getBoundingClientRect().height / p[2];
            parent.interactionHandler.graphInteractions.graphTranslation = [
                cx - p[0] * parent.interactionHandler.graphInteractions.zoomFactor,
                cy - p[1] * parent.interactionHandler.graphInteractions.zoomFactor
            ];
            parent.interactionHandler.graphInteractions.zoom.translate(parent.interactionHandler.graphInteractions.graphTranslation);
            parent.interactionHandler.graphInteractions.zoom.scale(parent.interactionHandler.graphInteractions.zoomFactor);
            return (
                'translate(' +
                parent.interactionHandler.graphInteractions.graphTranslation +
                ')scale(' +
                parent.interactionHandler.graphInteractions.zoomFactor +
                ')'
            );
        }
    }

    updateColorOfNodesWithPrefix = (uriPrefix, color) => {
        this.nodes.forEach(node => {
            if (node.__semanticReference.__nodeLinkIdentifier.startsWith(uriPrefix)) {
                const cfg = node.renderingConfig();
                cfg.style.bgColor = color;
                node.redraw();
                this.interactionHandler.nodeInteractions.reapplyNodeInteractions(node);
            }
        });
    };
    updateColorOfObjectPropsWithPrefix = (uriPrefix, color) => {
        this.links.forEach(link => {
            if (link.__semanticReference && link.__semanticReference.__nodeLinkIdentifier) {
                const nlId = link.__semanticReference.__nodeLinkIdentifier;
                if (link.__semanticReference.__linkType && link.__semanticReference.__linkType[0] === 'owl:ObjectProperty') {
                    if (nlId.startsWith(uriPrefix)) {
                        link.renderingConfig().style.propertyNode.style.bgColor = color;
                        link.redraw();
                    }
                }
            }
        });
    };
}
