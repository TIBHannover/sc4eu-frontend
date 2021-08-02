import { collapseNodeAnimationForDelete, collapseNodeAnimation, hideSingleNodeAnimation } from './collapseNodeAnimation';
import { smartExpandingLiterals, getParentNodesForExpanding } from './SmartExanding';
import { collapsePropertyNodesAnimations, expandPropertyNodesAnimations } from './collapseExpandLinkAnimations';
export default class Animations {
    constructor(graph) {
        this.graphObject = graph;
    }

    hideNode = node => {
        console.log('Wants to hide the node', node);
        if (node.outgoingLinks.length === 0) {
            console.log('cool', ' that should be easy');

            // select a parent;
            if (node.incomingLinks.length >= 1) {
                const parentNode = node.incomingLinks[0].sourceNode;
                console.log('has parent', parentNode);
                this.graphObject.pauseForceDirectedLayout(true);
                hideSingleNodeAnimation(node, parentNode, () => {
                    console.log('ANIMATION IS DONE');
                    const backupTranslation = this.graphObject.interactionHandler.graphInteractions.graphTranslation;
                    const backupZoom = this.graphObject.interactionHandler.graphInteractions.zoomFactor;

                    console.log(node.incomingLinks);
                    console.log('^^^^^^^^^^^^^^^^^^^^^');

                    this.graphObject.fullRedrawGraph();
                    this.graphObject.resetUserNavigation(backupTranslation, backupZoom);
                    this.graphObject.pauseForceDirectedLayout(true);
                });
            }
        }
    };

    collapseNodesAndLinksBeforeDelete = (nodes, callback) => {
        // we get the links for the node itself

        const last = nodes.length - 1;
        nodes.forEach((node, index) => {
            collapseNodeAnimationForDelete(node, index === last, callback);
        });
    };

    expandNodesAndLinks = (nodes, callback) => {
        const nodesToExpand = getParentNodesForExpanding(nodes);
        // console.log('Nodes to expand? ', nodesToExpand);
        const last = nodesToExpand.length - 1;
        nodesToExpand.forEach((node, index) => {
            smartExpandingLiterals(node, index === last, callback);
        });
    };

    expandNode = node => {
        const backupTranslation = this.graphObject.interactionHandler.graphInteractions.graphTranslation;
        const backupZoom = this.graphObject.interactionHandler.graphInteractions.zoomFactor;
        node.status = 'expanded';
        this.graphObject.interactionHandler.nodeInteractions.reapplyNodeInteractions(node);
        this.graphObject.pauseForceDirectedLayout(true);
        // collect the nodes we need to exapand in order to draw them first;
        const hiddenLinks = node.outgoingLinks.filter(
            item => item.visible() === false && !item.__isHiddenML && item.propertyLinkType === 'datatypePropertyType'
        );
        console.log('hiddenLinks', hiddenLinks);
        hiddenLinks.forEach(link => {
            link.setPosition(link.sourceNode.x, link.sourceNode.x);
            link.visible(true);
            link.targetNode.visible(true);
            link.targetNode.setPosition(link.sourceNode.x, link.sourceNode.x);
        });
        // redraw graph;
        this.graphObject.redrawRenderingPrimitives();
        this.graphObject.pauseForceDirectedLayout(true);

        smartExpandingLiterals(node, true, () => {
            this.graphObject.interactionHandler.applyInteractions(this.graphObject, true);
            this.graphObject.bruteForceRedrawGraph();
            this.graphObject.resetUserNavigation(backupTranslation, backupZoom);
        });
    };
    collapseNode = node => {
        const backupTranslation = this.graphObject.interactionHandler.graphInteractions.graphTranslation;
        const backupZoom = this.graphObject.interactionHandler.graphInteractions.zoomFactor;
        const datatypeLinks = node.outgoingLinks.filter(item => item.propertyLinkType === 'datatypePropertyType');
        const itemsToCollapse = [];
        datatypeLinks.forEach(link => {
            itemsToCollapse.push(link.targetNode);
        });
        const lengthOfItems = itemsToCollapse.length - 1;

        this.graphObject.pauseForceDirectedLayout(true);
        itemsToCollapse.forEach((item, id) => {
            collapseNodeAnimation(item, lengthOfItems === id, () => {
                node.status = 'collapsed';
                this.graphObject.bruteForceRedrawGraph();
                this.graphObject.resetUserNavigation(backupTranslation, backupZoom);
            });
        });
    };

    morphNode = (index, n, last, callback) => {
        const morphParameters = n.drawTools().getMorphParameters(n.renderingConfig(), n);
        const morphDuration = 500;
        if (n.renderingShape) {
            n.removeNestedGroupItems();
            if (n.renderingText) {
                n.renderingText
                    .transition()
                    .duration(morphDuration)
                    // TODO : font size and style morphing
                    // .attr('style', morphParameters.textParameters['style'])
                    .attr('dx', morphParameters.textParameters['dx'])
                    .attr('dy', morphParameters.textParameters['dy']);
            }
            n.renderingShape
                .transition()
                .duration(morphDuration)
                .attr('x', morphParameters.baseShapeParameters['x'])
                .attr('y', morphParameters.baseShapeParameters['y'])
                .attr('width', morphParameters.baseShapeParameters['width'])
                .attr('height', morphParameters.baseShapeParameters['height'])
                .attr('rx', morphParameters.baseShapeParameters['rx'])
                .attr('ry', morphParameters.baseShapeParameters['ry'])
                .attr('fill', morphParameters.shapeStyleParameters['fill'])
                .attr('stroke', morphParameters.shapeStyleParameters['stroke'])
                .attr('stroke-width', morphParameters.shapeStyleParameters['stroke-width'])
                .attr('stroke-dasharray', morphParameters.shapeStyleParameters['stroke-dasharray'])
                .each('end', function() {
                    // current preparations to handle sequential graph animations
                    n.redraw();
                    if (last && callback) {
                        callback();
                    }
                });
        } else {
            // if (last && callback) {
            //     callback();
            // }
        }
    };

    morphLink = (link, last, callback) => {
        //TODO
        if (last) {
            callback();
        }

        //     const morphParameters = link.drawTools().getMorphParameters(link.renderingConfig(), link);
        //     const morphDuration = 500;
        //     if (n.renderingShape) {
        //         n.removeNestedGroupItems();
        //         if (n.renderingText) {
        //             n.renderingText
        //                 .transition()
        //                 .duration(morphDuration)
        //                 // TODO : font size and style morphing
        //                 // .attr('style', morphParameters.textParameters['style'])
        //                 .attr('dx', morphParameters.textParameters['dx'])
        //                 .attr('dy', morphParameters.textParameters['dy']);
        //         }
        //         n.renderingShape
        //             .transition()
        //             .duration(morphDuration)
        //             .attr('x', morphParameters.baseShapeParameters['x'])
        //             .attr('y', morphParameters.baseShapeParameters['y'])
        //             .attr('width', morphParameters.baseShapeParameters['width'])
        //             .attr('height', morphParameters.baseShapeParameters['height'])
        //             .attr('rx', morphParameters.baseShapeParameters['rx'])
        //             .attr('ry', morphParameters.baseShapeParameters['ry'])
        //             .attr('fill', morphParameters.shapeStyleParameters['fill'])
        //             .attr('stroke', morphParameters.shapeStyleParameters['stroke'])
        //             .attr('stroke-width', morphParameters.shapeStyleParameters['stroke-width'])
        //             .attr('stroke-dasharray', morphParameters.shapeStyleParameters['stroke-dasharray'])
        //             .each('end', function() {
        //                 n.redraw();
        //                 // current preparations to handle sequential graph animations
        //                 if (last && callback) {
        //                     callback();
        //                 }
        //             });
        //     }
    };

    collapseExpandMultiLinks = link => {
        const that = this;
        if (link.__internalType !== 'multiLink' && link.__linkGroup === undefined) {
            return;
        }
        this.graphObject.pauseForceDirectedLayout(true);
        const backupTranslation = this.graphObject.interactionHandler.graphInteractions.graphTranslation;
        const backupZoom = this.graphObject.interactionHandler.graphInteractions.zoomFactor;

        if (link.__internalType === 'singleLink' && link.__linkGroup) {
            const cx = link.sourceNode.x + 0.5 * (link.targetNode.x - link.sourceNode.x);
            const cy = link.sourceNode.y + 0.5 * (link.targetNode.y - link.sourceNode.y);
            const parentPos = { x: cx, y: cy };
            link.visible(false);
            link.__linkGroup.forEach(item => {
                item.setPosition({ x: cx, y: cy });
                item.propertyNodePostion = { x: cx, y: cy };
                item.visible(true);
            });
            that.graphObject.bruteForceRedrawGraph();
            that.graphObject.resetUserNavigation(backupTranslation, backupZoom);
            this.graphObject.pauseForceDirectedLayout(true);
            expandPropertyNodesAnimations(link, parentPos, function() {
                console.log('THIS SHOULD EXPAND IT ');
                that.graphObject.bruteForceRedrawGraph();
                that.graphObject.resetUserNavigation(backupTranslation, backupZoom);
            });
        } else {
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
            collapsePropertyNodesAnimations(n1, n2, links, () => {
                links.forEach(l => {
                    l.visible(false);
                });
                // and we create a multilink primitive;
                this.graphObject.showML_renderingPrimitive(link);
                this.graphObject.bruteForceRedrawGraph();
                this.graphObject.resetUserNavigation(backupTranslation, backupZoom);
            });
        }
    };
}
