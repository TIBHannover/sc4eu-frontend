import * as d3 from 'd3';

export default class LinkInteractions {
    constructor(graph) {
        this.graphObject = graph;
        this.dragBehaviour = null;
        this.hasNodeClick = true; //TODO
        this.hasNodeDobleClick = true; // TODO
        this.hasLinkHover = true;
        this.hasPropertyHover = true;
    }

    setHoverEnabled = val => {
        this.hasLinkHover = val;
        this.hasPropertyHover = val;
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

    applyLinkInteractions = () => {
        if (!this.graphObject) {
            console.error('NO GRAPH OBJECT FOUND');
            return;
        }

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
            if (that.hasLinkHover) {
                d.on('mouseover', that.linkHoverIn);
                d.on('mouseout', that.linkHoverOut);
            }
        };
        this.propertyHoverBehaviour = function(d) {
            if (that.hasPropertyHover) {
                d.on('mouseover', that.propertyHoverIn);
                d.on('mouseout', that.propertyHoverOut);
            }
        };

        this.doubleClickBehavoir = function(d) {
            d.fixed = !d.fixed;
        };
        const links = this.graphObject.links;
        if (links.length > 0) {
            links.forEach(l => {
                if (l.groupRoot) {
                    l.groupRoot.call(this.hoverBehaviour);
                    // try to get the parentOf shape;
                    if (l.renderingShape) {
                        const parentNode = l.renderingShape.node().parentNode;
                        if (parentNode) {
                            const shapeRoot = d3.select(parentNode);
                            if (shapeRoot) {
                                shapeRoot.call(this.propertyHoverBehaviour);
                                if (this.hasNodeClick) {
                                    shapeRoot.call(this.propertyClick);
                                }
                                if (this.hasNodeDobleClick) {
                                    shapeRoot.call(this.propertyDoubleClick);
                                }
                                shapeRoot.call(this.dragBehaviour);
                            }
                        }
                    }
                }
            });
        }
    };

    linkHoverIn(d) {
        const shape = d.renderingLine;
        shape.style('stroke', 'red');
    }

    linkHoverOut(d) {
        const shape = d.renderingLine;
        shape.style('stroke', d.renderingConfig().style.link.lineColor);
    }

    propertyHoverIn = d => {
        const shape = d.ref.renderingShape;
        shape.style('fill', 'red');
        // const that = this;
        if (d.mouseEntered === true) {
            return;
        }
        d.mouseEntered = true;
        d.keepRendering = true;

        if (d.unblockRendering) {
            d.keepRendering = false;
            d.unblockRendering = false;
        }
    };

    propertyHoverOut(d) {
        const shape = d.ref.renderingShape;
        shape.style('fill', d.ref.renderingConfig().style.propertyNode.bgColor);
        if (d.ref.__internalType === 'multiLink') {
            d3.selectAll('.MultiLinkHoverButton').remove();
        }
        d.mouseEntered = false;
    }

    propertyDoubleClick = d => {
        // add Handlers
        const that = this;
        d.on('dblclick', function(item) {
            d3.event.stopPropagation();
            d3.event.preventDefault();
            that.graphObject.animationsHandler.collapseExpandMultiLinks(item.ref);
        });
    };
    propertyClick(d) {
        d.on('click', function(item) {
            d3.event.stopPropagation();
            d3.event.preventDefault();
            console.log('SINGLE CLICK >> should be used for selecting an element ');
        });
    }

    // split the dragger functions for better reuse;
    dragStart = d => {
        if (this.hasNodeDragEnabeld) {
            d3.event.sourceEvent.stopPropagation(); // Prevent panning
            d.fixed = true;
            d.groupRoot.style('cursor', 'pointer');
            // console.log('[', d.x, ',', d.y, ']');
        }
    };

    drag = d => {
        // if (this.hasNodeDragEnabeld) {
        d3.event.sourceEvent.stopPropagation(); // Prevent panning
        d.setPosition(d3.event.x, d3.event.y);
        d.px = d3.event.x;
        d.py = d3.event.y;
        d.ref.updateRenderingPosition();
        if (d.layoutHandlerReference && d.layoutHandlerReference.force) {
            if (d.layoutHandlerReference.forceLayoutPaused === false) {
                d.layoutHandlerReference.resumeForce();
            }
        }
        // }
    };

    dragEnd = d => {
        // if (this.hasNodeDragEnabeld) {
        d.fixed = false;
        d.groupRoot.style('cursor', 'auto');
        if (d.layoutHandlerReference && d.layoutHandlerReference.force) {
            if (d.layoutHandlerReference.forceLayoutPaused === false) {
                d.layoutHandlerReference.resumeForce();
            }
        }
        // }
    };
}
