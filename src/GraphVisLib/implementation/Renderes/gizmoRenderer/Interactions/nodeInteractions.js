import * as d3 from 'd3';
import './nodeLoaderAnimation.css';
export default class NodeInteractions {
    constructor(graph) {
        this.graphObject = graph;
        this.dragBehaviour = null;
        this.hasNodeClick = true;
        this.hasNodeDobleClick = true;
        this.hasNodeHover = true;
        this.draggingChildren = [];
        this.nodeClick = this.nodeClick.bind(this);
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
        console.log('APPLYING NODE INTERACTIONS !!!!!');
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
            // if (that.hasNodeClick) {
            d.on('click', that.nodeClick);

            // console.log('GIVING THAT CLICK BEHAVIOR', d);
            // }
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
                    n.connectClickAction(this.nodeClick);
                    n.connectDoubleClickAction(this.nodeDoubleClick);
                    this.addCollapseExpandButton(n);
                    this.addHideNodeButton(n);
                }
            });
        }
    };
    reapplyNodeInteractions = node => {
        // will redraw interaction control items
        if (node.groupRoot) {
            node.groupRoot.call(this.dragBehaviour);
            node.groupRoot.call(this.hoverBehaviour);
            node.connectClickAction(this.nodeClick);
            node.connectDoubleClickAction(this.nodeDoubleClick);

            this.addCollapseExpandButton(node);
            this.addHideNodeButton(node);
        }
    };

    collapseButton_mouseHoverIn = node => {
        node.singleCirc.classed('collapseExpandButtonHovered', true);
    };
    collapseButton_mouseHoverOut = node => {
        node.singleCirc.classed('collapseExpandButtonHovered', false);
    };

    addHideNodeButton = d => {
        const that = this;
        if (d.hideNodeGroup) {
            d.hideNodeGroup.remove();
        }
        // create the hover thing;
        const shapeWidth = parseInt(d.renderingShape.attr('width'));
        const shapeHeight = parseInt(d.renderingShape.attr('height'));
        let shapeOffset = 0;
        if (d.renderingConfig().style.renderingType === 'circle') {
            shapeOffset = 0;
        }
        let offsetX = -0.5 * shapeWidth - shapeOffset;
        let offsetY = -0.5 * shapeHeight - shapeOffset;
        // console.log(shapeWidth, ', ', shapeHeight);
        if (d.renderingConfig().style.renderingType === 'circle') {
            // 45 deg angle
            offsetX = 0.7071 * offsetX;
            offsetY = 0.7071 * offsetY;
        }

        d.hideNodeGroup = d.groupRoot.append('g');
        d.hideNodeGroup.attr('transform', `translate(${offsetX},${-offsetY})`);
        d.singleCirc = d.hideNodeGroup.append('circle');
        const radius = 15;
        d.singleCirc.attr('r', radius);
        d.singleCirc.attr('cx', 0);
        d.singleCirc.attr('cy', 0);
        d.singleCirc.classed('hideNodeButton', true);

        d.hideNodeGroup.on('mouseover', () => {
            that.collapseButton_mouseHoverIn(d);
        });
        d.hideNodeGroup.on('mouseout', () => {
            that.collapseButton_mouseHoverOut(d);
        });

        d.hideNodeGroup.append('title').text('Hide this node');
        const innerItem = d.hideNodeGroup.append('path');
        innerItem
            .attr(
                'd',
                'M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z'
            )
            .attr('transform', 'translate(-10,-7), scale(0.03,0.03)');

        innerItem.on('mouseover', () => {
            that.collapseButton_mouseHoverIn(d);
        });
        innerItem.on('mouseout', () => {
            that.collapseButton_mouseHoverOut(d);
        });

        d.hideNodeGroup.on('click', function() {
            that.graphObject.animationsHandler.hideNode(d);
        });
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
        const shapeWidth = parseInt(d.renderingShape.attr('width'));
        const shapeHeight = parseInt(d.renderingShape.attr('height'));
        let shapeOffset = 0;
        if (d.renderingConfig().style.renderingType === 'circle') {
            shapeOffset = 0;
        }
        let offsetX = 0.5 * shapeWidth - shapeOffset;
        let offsetY = 0.5 * shapeHeight - shapeOffset;
        // console.log(shapeWidth, ', ', shapeHeight);
        if (d.renderingConfig().style.renderingType === 'circle') {
            // 45 deg angle
            offsetX = 0.7071 * offsetX;
            offsetY = 0.7071 * offsetY;
        }

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
        this.graphObject.selectItem(d);
        const shapeWidth = parseInt(d.renderingShape.attr('width'));
        const shapeHeight = parseInt(d.renderingShape.attr('height'));

        const shapeOffset = 0;
        d3.selectAll('.itemSelectionGroup').remove();
        if (d.isSelected()) {
            d.itemSelectGroup = d.groupRoot.append('g');
            d.itemSelectGroup.classed('itemSelectionGroup', true);
            d.itemSelectGroupShape = d.itemSelectGroup.append('rect');
            if (d.renderingConfig().style.renderingType === 'circle') {
                d.itemSelectGroupShape.attr('x', -0.5 * shapeWidth - shapeOffset);
                d.itemSelectGroupShape.attr('y', -0.5 * shapeHeight - shapeOffset);
                d.itemSelectGroupShape.attr('width', shapeWidth + shapeOffset);
                d.itemSelectGroupShape.attr('height', shapeHeight + shapeOffset);
                d.itemSelectGroupShape.attr('rx', shapeWidth);
                d.itemSelectGroupShape.attr('ry', shapeHeight);
                d.itemSelectGroupShape.style('stroke', 'red');
                d.itemSelectGroupShape.style('stroke-width', '2px');
                d.itemSelectGroupShape.attr('fill', 'none');
            }
            if (d.renderingConfig().style.renderingType === 'rect') {
                d.itemSelectGroupShape.attr('x', -0.5 * shapeWidth - shapeOffset);
                d.itemSelectGroupShape.attr('y', -0.5 * shapeHeight - shapeOffset);
                d.itemSelectGroupShape.attr('width', shapeWidth + shapeOffset);
                d.itemSelectGroupShape.attr('height', shapeHeight + shapeOffset);
                d.itemSelectGroupShape.style('stroke', 'red');
                d.itemSelectGroupShape.style('stroke-width', '2px');
                d.itemSelectGroupShape.attr('fill', 'none');
            }
        }
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
        console.log('NODE DRAG INTERACTION ');
        if (this.hasNodeDragEnabeld) {
            d3.event.sourceEvent.stopPropagation(); // Prevent panning

            // const diffX = d3.event.x - d.x;
            // const diffY = d3.event.y - d.y;

            d.setPosition(d3.event.x, d3.event.y);
            d.px = d3.event.x;
            d.py = d3.event.y;
            d.updateRenderingPosition(true);
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
