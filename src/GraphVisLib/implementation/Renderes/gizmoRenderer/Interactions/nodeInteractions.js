import * as d3 from 'd3';
import './nodeLoaderAnimation.css';
export default class NodeInteractions {
    constructor(graph) {
        this.graphObject = graph;
        this.dragBehaviour = null;
        this.hasNodeClick = false;
        this.hasNodeDobleClick = false;
        this.hasNodeHover = true;
        this.draggingChildren = [];
    }

    setHoverEnabled = val => {
        this.hasNodeHover = val;
    };
    setNodeClickEnabled = val => {
        this.hasNodeClick = val;
    };
    setNodeDoubleClickEnabled = val => {
        this.hasNodeDobleClick = val;
    };
    setDragEnabled = val => {
        this.hasNodeDragEnabeld = val;
    };

    applyNodeInteractions = () => {
        if (!this.graphObject) {
            console.error('NO GRAPH OBJECT FOUND');
            return;
        }

        // Node Interactions are:
        // Drag,
        this.dragBehaviour = d3.behavior
            .drag()
            .origin(function(d) {
                return d;
            })
            .on('dragstart', this.dragStart)
            .on('drag', this.drag)
            .on('dragend', this.dragEnd);

        /** DEFINING OWN INTERNAL HOVER BEHAVIOR -- DO NOT OVERWRITE **/
        const that = this;
        this.hoverBehaviour = function(d) {
            if (that.hasNodeHover) {
                d.on('mouseover', that.nodeHoverIn);
                d.on('mouseout', that.nodeHoverOut);
            }
        };

        /** DEFINING OWN INTERNAL CLICK BEHAVIOR -- DO NOT OVERWRITE **/
        this.clickBehaviour = function(d) {
            if (that.hasNodeClick) {
                d.on('click', that.nodeClick);
            }
        };
        this.doubleClickBehavoir = function(d) {
            if (that.hasNodeDobleClick) {
                d.on('click', that.nodeDoubleClick);
            }
        };

        // apply the node behavoir on the nodes;
        const nodes = this.graphObject.nodes;
        if (nodes.length > 0) {
            nodes.forEach(n => {
                if (n.groupRoot) {
                    n.groupRoot.call(this.dragBehaviour);
                    n.groupRoot.call(this.hoverBehaviour);
                    n.groupRoot.call(this.clickBehaviour);
                    n.groupRoot.call(this.doubleClickBehavoir);

                    this.addCollapseExpandButton(n);
                }
            });
        }
    };
    reapplyNodeInteractions = node => {
        // will redraw interaction control items
        if (node.groupRoot) {
            node.groupRoot.call(this.dragBehaviour);
            node.groupRoot.call(this.hoverBehaviour);
            node.groupRoot.call(this.clickBehaviour);
            node.groupRoot.call(this.doubleClickBehavoir);
            this.addCollapseExpandButton(node);
        }
    };

    collapseButton_mouseHoverIn = node => {
        node.singleCirc.classed('collapseExpandButtonHovered', true);
    };
    collapseButton_mouseHoverOut = node => {
        node.singleCirc.classed('collapseExpandButtonHovered', false);
    };

    addCollapseExpandButton = d => {
        if (d.outgoingLinks.length === 0) {
            // leaf nodes dont get a collapse button
            return;
        }
        const that = this;
        if (d.collapseExapandGroup) {
            d.collapseExapandGroup.remove();
        }
        // create the hover thing;
        const shapeWidth = d.renderingShape.attr('width');
        const shapeHeight = d.renderingShape.attr('height');
        let shapeOffset = 0;
        if (d.renderingConfig().style.renderingType === 'circle') {
            shapeOffset = 15;
        }
        const offsetX = 0.5 * shapeWidth - shapeOffset;
        const offsetY = 0.5 * shapeHeight - shapeOffset;
        // console.log(shapeWidth, ', ', shapeHeight);

        d.collapseExapandGroup = d.groupRoot.append('g');
        d.collapseExapandGroup.attr('transform', `translate(${offsetX},${-offsetY})`);
        d.singleCirc = d.collapseExapandGroup.append('circle');
        const radius = 15;
        d.singleCirc.attr('r', radius);
        d.singleCirc.attr('cx', 0);
        d.singleCirc.attr('cy', 0);
        d.singleCirc.classed('collapseExpandButton', true);

        d.collapseExapandGroup.on('mouseover', () => {
            that.collapseButton_mouseHoverIn(d);
        });
        d.collapseExapandGroup.on('mouseout', () => {
            that.collapseButton_mouseHoverOut(d);
        });

        if (!d.status) {
            d.status = 'expanded';
            // TODO get the status based on visible friends;
        }
        // console.log("NODE STATUS", d.status);

        switch (d.status) {
            case 'collapsed':
                d.collapseExapandGroup.append('title').text('expand node');
                d.collapseExapandGroup
                    .append('polygon')
                    .attr('points', '15.5,5 11,5 16,12 11,19 15.5,19 20.5,12 ')
                    .attr('transform', 'translate(-12, -12)');
                d.collapseExapandGroup
                    .append('polygon')
                    .attr('points', '8.5,5 4,5 9,12 4,19 8.5,19 13.5,12 ')
                    .attr('transform', 'translate(-12, -12)');

                d.collapseExapandGroup.on('click', function(e) {
                    // that.graph.singleNodeExpansion(that);
                    that.graphObject.animationsHandler.expandNode(d);
                });
                break;
            case 'expanded':
                d.collapseExapandGroup.append('title').text('collapse node');

                d.collapseExapandGroup
                    .append('polygon')
                    .attr('points', '15.5,5 11,5 16,12 11,19 15.5,19 20.5,12 ')
                    .attr('transform', 'translate(12,-12), scale(-1,1)');
                d.collapseExapandGroup
                    .append('polygon')
                    .attr('points', '8.5,5 4,5 9,12 4,19 8.5,19 13.5,12 ')
                    .attr('transform', 'translate(12,-12), scale(-1,1)');

                d.collapseExapandGroup.on('click', function() {
                    that.graphObject.animationsHandler.collapseNode(d);
                });
                break;
            default:
                console.log('leaf node should not have hovers');
                d.collapseExapandGroup.classed('hidden', true);
        }
    };

    nodeHoverIn(d) {
        const shape = d.renderingShape;
        shape.style('fill', 'green');
    }

    nodeHoverOut(d) {
        const shape = d.renderingShape;
        shape.style('fill', d.renderingConfig().style.bgColor);
    }

    nodeDoubleClick(d) {
        // add Handlers
        d3.event.stopPropagation(); // Prevent panning
        d3.event.preventDefault();
    }
    nodeClick(d) {
        // add handers; >> this is where we want to overwrite something;
    }

    // split the dragger functions for better reuse;
    dragStart = d => {
        if (this.hasNodeDragEnabeld) {
            d3.event.sourceEvent.stopPropagation(); // Prevent panning
            d.fixed = true;
            this.draggingChildren = [...d.incomingLinks, ...d.outgoingLinks];
            d.groupRoot.style('cursor', 'pointer');
        }
    };

    drag = d => {
        if (this.hasNodeDragEnabeld) {
            d3.event.sourceEvent.stopPropagation(); // Prevent panning

            // const diffX = d3.event.x - d.x;
            // const diffY = d3.event.y - d.y;

            d.setPosition(d3.event.x, d3.event.y);
            d.px = d3.event.x;
            d.py = d3.event.y;
            d.updateRenderingPosition();
            // this.draggingChildren.forEach(child => {
            //     const currX = child.propertyNodePostion.x;
            //     const currY = child.propertyNodePostion.y;
            //     const propertyNode = child.renderingShape;
            //     const parentGroup = propertyNode.node().parentNode;
            //     d3.select(parentGroup)
            //         .data()[0]
            //         .setPosition(currX + diffX, currY + diffY);
            //     d3.select(parentGroup)
            //         .data()[0]
            //         .updateRenderingPosition();
            // });

            if (d.layoutHandlerReference && d.layoutHandlerReference.force) {
                if (d.layoutHandlerReference.forceLayoutPaused === false) {
                    d.layoutHandlerReference.resumeForce();
                }
            }
        }
    };

    dragEnd = d => {
        if (this.hasNodeDragEnabeld) {
            d.groupRoot.style('cursor', 'auto');
            this.draggingChildren = [];
            if (d.layoutHandlerReference && d.layoutHandlerReference.force) {
                if (d.layoutHandlerReference.forceLayoutPaused === false) {
                    d.layoutHandlerReference.resumeForce();
                    d.fixed = false;
                } else {
                    d.fixed = true;
                }
            }
        }
    };
}
