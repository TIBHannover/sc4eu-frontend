import * as d3 from 'd3';
import { getGraphCoordinates, getSelectedElements } from '../utils/GraphUtils';
export default class GraphInteractions {
    constructor(graph) {
        this.graphObject = graph;
        this.zoom = undefined;
        this.graphTranslation = [0, 0];
        this.zoomFactor = 1.0;
        this.transformAnimation = false;

        this.zoomEnabled = true;
        this.ctrlZoomEnabled = true;
        this.dragEnabled = true;
        this.scrollValue = 0;
    }

    enableMouseZoom = val => {
        this.zoomEnabled = val;
    };
    enableCtrlMouseZoom = val => {
        this.ctrlZoomEnabled = val;
    };
    enableMouseDrag = val => {
        this.dragEnabled = val;
    };

    applyGraphInteractions = () => {
        if (!this.graphObject) {
            console.error('NO GRAPH OBJECT FOUND');
            return;
        }
        // graph interactions are zoom and drag operations
        const that = this;
        this.selectionBoxFeature(true);

        // Apply the zooming factor.
        this.zoom = d3.behavior
            .zoom()
            .duration(150)
            .scaleExtent([0.02, 5])
            .on('zoom', this.zoomed)
            .on('zoomstart', function() {
                if (that.zoomEnabled) {
                    if (d3.event.sourceEvent && d3.event.sourceEvent.buttons && d3.event.sourceEvent.buttons === 1) {
                        that.graphObject.svgRoot.style('cursor', 'all-scroll');
                    }
                }
                const container = d3.select('#resourceRendererContainer');
                if (container && container.node()) {
                    that.scrollValue = container.node().scrollTop;
                }
            })
            .on('zoomend', function() {
                if (that.zoomEnabled) {
                    that.graphObject.svgRoot.style('cursor', 'auto');
                    that.b_graphTranslation = that.graphTranslation;
                    that.b_zoomFactor = that.zoomFactor;
                }
            });

        this.graphObject.svgRoot.call(this.zoom);
        this.zoom = this.zoom.scaleExtent([0.02, 5]);
        if (this.graphObject.graphRoot) {
            this.zoom.event(this.graphObject.graphRoot);
        }
    };

    resetUserLayout = (translation, zoomfactor) => {
        const graph = this.graphObject;
        if (translation) {
            // todo could have some validation here
            this.graphTranslation[0] = translation[0];
            this.graphTranslation[1] = translation[1];
        }
        if (zoomfactor) {
            this.zoomFactor = zoomfactor;
        }

        const graphContainer = graph.graphRoot;
        graphContainer.attr('transform', 'translate(' + this.graphTranslation + ')scale(' + this.zoomFactor + ')');
        this.zoom.translate(this.graphTranslation);
        this.zoom.scale(this.zoomFactor);
    };

    zoomed = () => {
        if (!this.zoomEnabled) {
            if (d3.event.sourceEvent) {
                const delta = d3.event.sourceEvent.deltaY;

                if (this.ctrlZoomEnabled && delta && d3.event.sourceEvent.ctrlKey) {
                    // continue;
                } else {
                    if (delta) {
                        // apply delta to rendererRoot;
                        // hardCoded stuff;
                        const container = d3.select('#resourceRendererContainer');
                        if (delta > 0) {
                            this.scrollValue += 50;
                            container[0].scrollTop = this.scrollValue;
                            container.node().scrollTop = this.scrollValue;
                            if (this.scrollValue > container.node().scrollTopMax) {
                                this.scrollValue = container.node().scrollTopMax;
                            }
                        } else {
                            this.scrollValue -= 50;
                            container[0].scrollTop = this.scrollValue - 10;
                            container.node().scrollTop = this.scrollValue;
                            if (this.scrollValue < 0) {
                                this.scrollValue = 0;
                            }
                        }
                        this.zoom.translate(this.graphTranslation);
                        this.zoom.scale(this.zoomFactor);
                        return;
                    }
                }
            }
        }

        if (this.disableGraphTranslation) {
            return;
        }
        if (d3.event.sourceEvent) {
            d3.event.sourceEvent.preventDefault();
            d3.event.sourceEvent.stopPropagation();
        }

        const that = this;
        const graph = this.graphObject;
        const graphContainer = graph.graphRoot;
        let zoomEventByMWheel = false;
        if (d3.event.sourceEvent) {
            if (d3.event.sourceEvent.deltaY) {
                zoomEventByMWheel = true;
            }
        }
        if (zoomEventByMWheel === false) {
            if (this.transformAnimation === true) {
                return;
            }
            this.zoomFactor = d3.event.scale;
            if (!that.disableGraphTranslation) {
                this.graphTranslation = d3.event.translate;
            }
            graphContainer.attr('transform', 'translate(' + this.graphTranslation + ')scale(' + this.zoomFactor + ')');
            return;
        }
        /** animate the transition **/
        this.zoomFactor = d3.event.scale;
        this.graphTranslation = d3.event.translate;
        graphContainer
            .transition()
            .tween('attr.translate', function() {
                return function() {
                    that.transformAnimation = true;
                    const tr = d3.transform(graphContainer.attr('transform'));
                    if (!that.disableGraphTranslation) {
                        that.graphTranslation[0] = tr.translate[0];
                        that.graphTranslation[1] = tr.translate[1];
                    }
                    that.zoomFactor = tr.scale[0];
                };
            })
            .each('end', function() {
                that.transformAnimation = false;
            })
            .attr('transform', 'translate(' + that.graphTranslation + ')scale(' + that.zoomFactor + ')')
            .ease('linear')
            .duration(250);
    };

    // add selection box feature
    selectionBoxFeature = (active = true) => {
        if (active) {
            function rect(x, y, w, h) {
                return 'M' + [x, y] + ' l' + [w, 0] + ' l' + [0, h] + ' l' + [-w, 0] + 'z';
            }

            // const layoutSize = this.graphObject.layoutHandler.layoutSize;
            // const width = layoutSize[0],
            //     height = layoutSize[1];

            const svg = this.graphObject.svgRoot;
            const that = this;

            const selection = svg.append('path').attr('visibility', 'hidden');
            selection.style('opacity', '0.5');
            selection.style('fill', '#ADD8E6');
            selection.style('stroke', '#ADD8E6');
            selection.style('fill-opacity', '0.3');
            selection.style('stroke-opacity', '0.7');
            selection.style('stroke-width', '2');
            selection.style('stroke-dasharray', '5, 5');

            const startSelection = function(start) {
                selection.attr('d', rect(start[0], start[0], 0, 0)).attr('visibility', 'visible');
                that.disableGraphTranslation = true;
            };

            const moveSelection = function(start, moved) {
                selection.attr('d', rect(start[0], start[1], moved[0] - start[0], moved[1] - start[1]));
            };

            const endSelection = function(start, end) {
                selection.attr('visibility', 'hidden');
                that.disableGraphTranslation = false;
                that.zoom.translate(that.graphTranslation);
                that.zoom.scale(that.zoomFactor);

                // start and end are in pixel space;
                const startInGraphSpace = getGraphCoordinates(start[0], start[1], that.graphTranslation, that.zoomFactor);
                const endInGraphSpace = getGraphCoordinates(end[0], end[1], that.graphTranslation, that.zoomFactor);

                // we need to transform them into graph space and then find the nodes that are falling into it;

                // find the nodes; under area
                // we only allow to drag items;
                const selectedElements = getSelectedElements(startInGraphSpace, endInGraphSpace, that.graphObject);
                // could also apply while moving

                selectedElements.forEach(item => {
                    console.log(item);
                    if (item.groupRoot.nodeHoverIn) {
                        item.nodeHoverIn(item);
                    }
                });

                // now highlight nodes for moving;
            };

            // add the event to the graph.svg element
            svg.on('mousedown', function() {
                if (d3.event.ctrlKey) {
                    const subject = d3.select(window),
                        parent = this.parentNode,
                        start = d3.mouse(parent);
                    startSelection(start);
                    subject
                        .on('mousemove.selection', function() {
                            moveSelection(start, d3.mouse(parent));
                        })
                        .on('mouseup.selection', function() {
                            endSelection(start, d3.mouse(parent));
                            subject.on('mousemove.selection', null).on('mouseup.selection', null);
                        });
                }
            });
        }
    };
}
