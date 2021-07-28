import GraphRenderer from './graph';
import Interactions from './Interactions/interactions';
import Animations from './Animations/Animations';
import NodePrimitive from './renderingElements/NodePrimitive';
import LinkPrimitive from './renderingElements/LinkPrimitive';
import * as d3 from 'd3';
export default class DonatelloGraph extends GraphRenderer {
    constructor() {
        super();
        this.GRAPH_TYPE = 'DONATELLO_RENDERING_TYPE';
        const that = this;
        this.layoutHandler = null;
        this.renderingConfig = null;
        this.interactionHandler = new Interactions();
        this.animationsHandler = new Animations(that);
        this.layoutPaused = false;
        this.itemOfInterest = null;
        this.emitItemSelection = null;
    }

    setSelectionPropagationFunction = func => {
        this.emitItemSelection = func;
    };

    createRenderingElements() {
        super.createRenderingElements();
        this.createPrimitives();
    }

    integrateUpdatedNodeLink(nodeLinkModel) {
        // create diff
        const addNodes = [];
        const delNodes = [];
        const addLinks = [];
        const delLinks = [];

        nodeLinkModel.nodes.forEach(node => {
            const found = this.nodes.find(item => item.__id === node.__nodeLinkIdentifier);
            if (!found) {
                addNodes.push(node);
            } else {
                const nodePrem = this.getNodePrimitiveDefinition(node);
                found.integrateNewDepiction(nodePrem);
            }
        });

        nodeLinkModel.links.forEach(link => {
            const found = this.links.find(item => item.__id === link.__nodeLinkIdentifier);
            if (!found) {
                addLinks.push(link);
            } else {
                const linkPrem = this.getLinkPrimitiveDefinition(link);
                found.integrateNewDepiction(linkPrem);
            }
        });

        this.nodes.forEach(node => {
            const found = nodeLinkModel.nodes.find(item => item.__nodeLinkIdentifier === node.__id);
            if (!found) {
                delNodes.push(node);
            }
        });

        this.links.forEach(link => {
            const found = nodeLinkModel.links.find(item => item.__nodeLinkIdentifier === link.__id);
            if (!found) {
                delLinks.push(link);
            }
        });

        // console.log('add Nodes', addNodes);
        // console.log('add Links', addLinks);
        // console.log('del Nodes', delNodes);
        // console.log('del Links', delLinks);

        // add new nodes
        this.addNewNodes(addNodes);
        this.addNewLinks(addLinks);
        this.removeNodes(delNodes);
        this.removeLinks(delLinks);

        this.layoutHandler.pauseForceLayoutAnimation(true);
        const backupTranslation = this.interactionHandler.graphInteractions.graphTranslation;
        const backupZoom = this.interactionHandler.graphInteractions.zoomFactor;

        // Collapsing Items
        console.log('STARTING TO APPLY NOTATION CHANGES');
        this.applyNotationChanges().then(() => {
            console.log('APPLY NOTATION DONE');
            //
            if (delNodes.length > 0) {
                this.layoutHandler.pauseForceLayoutAnimation(true);
                this.animationsHandler.collapseNodesAndLinksBeforeDelete(delNodes, () => {
                    this.layoutHandler.setForceAlpha(0.1);
                    this.layoutHandler.pauseForceLayoutAnimation(this.layoutPaused);
                    this.bruteForceRedrawGraph();
                });
            }
            if (addNodes.length > 0) {
                // Expanding Items
                this.bruteForceRedrawGraph();
                this.layoutHandler.pauseForceLayoutAnimation(true);
                const newNodes = this.setNewNodesPositionsToParents(addNodes);

                this.animationsHandler.expandNodesAndLinks(newNodes, () => {
                    this.layoutHandler.setForceAlpha(0.1);
                    this.layoutHandler.pauseForceLayoutAnimation(this.layoutPaused);
                    this.bruteForceRedrawGraph(true);
                    if (!this.layoutPaused) {
                        this.layoutHandler.resumeForce();
                    }
                });
            }
            this.resetUserNavigation(backupTranslation, backupZoom);
        });
    }

    setNewNodesPositionsToParents = nodes => {
        const renderingItems = [];
        nodes.forEach(node => {
            const renderedNode = this.nodes.find(item => item.__id === node.__nodeLinkIdentifier);
            if (renderedNode) {
                renderingItems.push(renderedNode);
                if (renderedNode.incomingLinks.length === 1) {
                    const parentPos = renderedNode.incomingLinks[0].sourceNode.getPosition();
                    renderedNode.setPosition(parentPos.x, parentPos.y);
                    renderedNode.updateRenderingPosition();
                    renderedNode.incomingLinks[0].getPropertNode().setPosition(parentPos.x, parentPos.y);
                    renderedNode.incomingLinks[0].getPropertNode().updateRenderingPosition();
                }
            }
        });
        return renderingItems;
    };

    addNewNodes = nodes => {
        // we need to create rendering primitives for the nodes;
        nodes.forEach(node => {
            this.createNodePrimitive(node);
        });
    };

    addNewLinks = links => {
        // we need to create rendering primitives for the nodes;
        links.forEach(link => {
            this.createLinkPrimitive(link);
        });
    };

    removeNodes = nodes => {
        nodes.forEach(node => {
            const index = this.nodes.indexOf(node);
            this.nodes.splice(index, 1);
            this.nodeMap[node.id()] = null;
            delete this.nodeMap[node.id()];
        });
    };
    removeLinks = links => {
        links.forEach(link => {
            const index = this.links.indexOf(link);
            link.sourceNode.removeIncomingLink(link);
            link.targetNode.removeOutgoingLink(link);
            this.links.splice(index, 1);
            this.linkMap[link.id] = null;
            delete this.linkMap[link.id()];
        });
    };

    applyNotationChanges = async () => {
        this.nodes.forEach(item => {
            item.applyNewVisualization();
        });
        this.links.forEach(item => {
            item.applyNewVisualization();
        });

        const nodesToMorph = this.nodes.filter(item => item.renderingShape);
        const lengthOfNodes = nodesToMorph.length;
        const lengthOfLinks = this.links.length;
        const lastItem = lengthOfNodes - 1;

        // create a propmise
        const that = this;

        const nodeMorphing = new Promise((resolve, reject) => {
            that.nodes.forEach((item, id) => {
                that.animationsHandler.morphNode(null, item, id === lastItem, () => {
                    console.log('           CALLING THE REDRAW AND INTERACTION CALL BACK ');
                    that.nodes.forEach(renderingItem => {
                        renderingItem.redraw();
                        that.interactionHandler.nodeInteractions.reapplyNodeInteractions(renderingItem);
                        resolve();
                    });
                });
            });
        });
        await nodeMorphing;
        const lastLinkItem = lengthOfLinks - 1;
        const linkMorphing = new Promise((resolve, reject) => {
            that.links.forEach((item, id) => {
                this.animationsHandler.morphLink(item, lastLinkItem === id, () => {
                    console.log('ANIMATION HAS FINISHED!!!!!!!! WE NEED TO RERENDER THE LINKS OO ');
                    // that.links.forEach(renderingItem => {
                    //     renderingItem.redraw();
                    //
                    //     // TODO: check with links
                    //     // this.interactionHandler.linkInteractions.reapplyLinkInteractions(renderingItem);
                    // });
                    resolve();
                });
            });
        });
        await linkMorphing;
    };

    getNodePrimitiveDefinition = node => {
        const nodePrimitive = new NodePrimitive();
        nodePrimitive.id(node.__nodeLinkIdentifier);
        nodePrimitive.displayName(node.__displayName);
        nodePrimitive.renderingConfig(this.renderingConfig.getNodeConfigFromType(node.__nodeType[0]));
        nodePrimitive.refereceResource = node;
        nodePrimitive.drawTools(this.drawTools);
        return nodePrimitive;
    };

    getLinkPrimitiveDefinition = link => {
        const linkPrimitive = new LinkPrimitive();
        linkPrimitive.id(link.__nodeLinkIdentifier);
        linkPrimitive.displayName(link.__displayName);
        console.log(link);
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
        return linkPrimitive;
    };

    drawForceNodes = nodes => {
        function createForceRenderingPrimitives(container, data, typeClass) {
            console.log('WHATS IS MY CONTAINER? ', container);
            return container
                .selectAll('.' + typeClass)
                .data(data)
                .enter()
                .append('g')
                .classed(typeClass, true)
                .attr('id', function(d) {
                    return d.id();
                });
        }

        console.log('wants to draw the force nodes ', nodes);
        console.log();
        const f_nodeContainer = d3.select('#' + this.divRoot + '_forceNodes');
        f_nodeContainer.selectAll('g').remove();
        this.f_renderedNodes = createForceRenderingPrimitives(f_nodeContainer, nodes, 'FORCE_NODES');

        console.log(this.f_renderedNodes);
        // execute the rendering function of the nodes;
        const radius = 15;
        this.f_renderedNodes.each(function(item) {
            d3.select(this)
                .append('circle')
                .attr('r', radius)
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('transform', 'translate(' + item.x + ',' + item.y + ')')
                .style('opacity', 0.5);
        });
    };

    selectItem = item => {
        console.log('SELECTING ITEM ', item);
        if (this.itemOfInterest === null) {
            item.isSelected(true);
            this.itemOfInterest = item;
        } else {
            if (item === this.itemOfInterest) {
                item.isSelected(!item.isSelected());
                if (!item.isSelected()) {
                    this.itemOfInterest = null;
                }
            } else {
                this.itemOfInterest.isSelected(false);
                item.isSelected(true);
                this.itemOfInterest = item;
            }
        }
        this.emitItemSelection(this.itemOfInterest);
    };

    bruteForceRedrawGraph = () => {
        this.nodeMap = {};
        this.linkMap = {};

        this.nodes.forEach(item => {
            item.resetRenderingData();
            this.nodeMap[item.id()] = item;
        });
        console.log(this.nodeMap);
        this.links.forEach(item => {
            item.resetRenderingData();
            this.linkMap[item.id()] = item;
            const srcId = item.sourceNode.__id;
            const tarId = item.targetNode.__id;
            item.setSourceNode(this.nodeMap[srcId]);
            item.setTargetNode(this.nodeMap[tarId]);
        });
        // redraw
        this.fullRedrawGraph();
        // reinitialize the force directed layout
        this.layoutHandler.createForceElements();
    };
}
