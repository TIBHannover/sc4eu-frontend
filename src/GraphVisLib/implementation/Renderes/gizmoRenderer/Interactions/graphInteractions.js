// graphInteractions.js
//
// Migrated from D3 v3 to D3 v7.
//
// Breaking changes addressed:
//
//   d3.behavior.zoom()        → d3.zoom()
//   zoom.duration()           → removed; no equivalent in v4+
//   'zoomstart' / 'zoomend'   → 'start' / 'end' event names
//   zoom.event(selection)     → selection.call(zoom)
//   zoom.translate(arr)       → selection.call(zoom.transform, newTransform)
//   zoom.scale(k)             → selection.call(zoom.transform, newTransform)
//   d3.event                  → event parameter in every handler
//   d3.event.scale            → zoomEvent.transform.k
//   d3.event.translate        → [zoomEvent.transform.x, zoomEvent.transform.y]
//   d3.transform(str).scale   → parseScale(str) from d3Utils
//   d3.transform(str).translate → parseTranslate(str) from d3Utils
//   .tween('attr.*', fn)      → .attrTween('transform', fn)
//   .each('end', fn)          → .on('end', fn)
//   .ease('linear')           → .ease(d3.easeLinear)
//   d3.mouse(element)         → d3.pointer(event, element)
//   container[0].scrollTop    → container.node().scrollTop

import * as d3 from 'd3';
import { getGraphCoordinates, getSelectedElements, parseTranslate, parseScale, buildZoomTransform } from '../utils/GraphUtils';
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

    enableMouseZoom = value => {
        this.zoomEnabled = value;
    };

    enableCtrlMouseZoom = value => {
        this.ctrlZoomEnabled = value;
    };

    enableMouseDrag = value => {
        this.dragEnabled = value;
    };

    // ─── applyGraphInteractions ───────────────────────────────────────────────
    // Sets up zoom and drag on the SVG root.
    // D3 v7: d3.zoom() replaces d3.behavior.zoom().
    // Event names 'start' and 'end' replace 'zoomstart' and 'zoomend'.
    // Each handler receives the zoom event as its first parameter.

    applyGraphInteractions = () => {
        if (!this.graphObject) {
            console.error('NO GRAPH OBJECT FOUND');
            return;
        }

        this.selectionBoxFeature(true);

        this.zoom = d3
            .zoom()
            .scaleExtent([0.02, 5])
            // D3 v7: 'start' replaces 'zoomstart'
            .on('start', zoomEvent => {
                if (!this.zoomEnabled) {
                    return;
                }
                const hasLeftMouseButton = zoomEvent.sourceEvent?.buttons === 1;

                if (hasLeftMouseButton) {
                    this.graphObject.svgRoot.style('cursor', 'all-scroll');
                }

                const container = d3.select('#resourceRendererContainer');
                if (container && container.node()) {
                    this.scrollValue = container.node().scrollTop;
                }
            })
            // D3 v7: zoom handler receives zoomEvent as first parameter
            .on('zoom', zoomEvent => {
                this.zoomed(zoomEvent);
            })
            // D3 v7: 'end' replaces 'zoomend'
            .on('end', () => {
                if (!this.zoomEnabled) {
                    return;
                }
                this.graphObject.svgRoot.style('cursor', 'auto');
                this.b_graphTranslation = this.graphTranslation;
                this.b_zoomFactor = this.zoomFactor;
            });

        this.graphObject.svgRoot.call(this.zoom);
    };

    resetUserLayout = (translation, zoomFactor) => {
        const graph = this.graphObject;

        if (translation) {
            this.graphTranslation = [...translation];
        }

        if (zoomFactor) {
            this.zoomFactor = zoomFactor;
        }

        const transform = d3.zoomIdentity.translate(this.graphTranslation[0], this.graphTranslation[1]).scale(this.zoomFactor);

        // Apply to both the container and update zoom state
        graph.graphRoot.attr('transform', transform);
        this.graphObject.svgRoot.call(this.zoom.transform, transform);
    };

    zoomed = zoomEvent => {
        const graph = this.graphObject;
        const graphContainer = graph.graphRoot;

        if (!this.zoomEnabled) {
            // Handle scroll events without zoom
            if (zoomEvent.sourceEvent?.type === 'wheel') {
                const container = d3.select('#resourceRendererContainer');
                if (container.node()) {
                    container.node().scrollTop += zoomEvent.sourceEvent.deltaY;
                }
                // Prevent zoom but allow scroll
                return;
            }
        }

        if (this.disableGraphTranslation) return;

        zoomEvent.sourceEvent?.preventDefault();
        zoomEvent.sourceEvent?.stopPropagation();

        // Simply apply the transform from the zoom event
        graphContainer.attr('transform', zoomEvent.transform);
        this.graphTranslation = [zoomEvent.transform.x, zoomEvent.transform.y];
        this.zoomFactor = zoomEvent.transform.k;
    };

    selectionBoxFeature = (active = true) => {
        if (!active || !this.graphObject?.svgRoot) return;

        const svg = this.graphObject.svgRoot;
        const zoomBehavior = this.zoom;

        // Helper function to build the rectangle path
        const buildRectPath = (x, y, width, height) => {
            return `M${x},${y} l${width},0 l0,${height} l${-width},0 z`;
        };

        // Create and style the selection rectangle
        const selectionRect = svg
            .append('path')
            .attr('visibility', 'hidden')
            .style('opacity', '0.5')
            .style('fill', '#ADD8E6')
            .style('stroke', '#ADD8E6')
            .style('fill-opacity', '0.3')
            .style('stroke-opacity', '0.7')
            .style('stroke-width', '2')
            .style('stroke-dasharray', '5, 5');

        // Selection handlers
        const startSelection = startPoint => {
            selectionRect.attr('d', buildRectPath(startPoint[0], startPoint[1], 0, 0)).attr('visibility', 'visible');
            this.disableGraphTranslation = true;
        };

        const moveSelection = (startPoint, currentPoint) => {
            const width = currentPoint[0] - startPoint[0];
            const height = currentPoint[1] - startPoint[1];
            selectionRect.attr('d', buildRectPath(startPoint[0], startPoint[1], width, height));
        };

        const endSelection = (startPoint, endPoint) => {
            selectionRect.attr('visibility', 'hidden');
            this.disableGraphTranslation = false;

            // Reset zoom state to match current graph position
            const resetTransform = buildZoomTransform(this.graphTranslation, this.zoomFactor);
            this.graphObject.svgRoot.call(zoomBehavior.transform, resetTransform);

            // Convert screen coordinates to graph coordinates
            const startInGraphSpace = getGraphCoordinates(startPoint[0], startPoint[1], this.graphTranslation, this.zoomFactor);
            const endInGraphSpace = getGraphCoordinates(endPoint[0], endPoint[1], this.graphTranslation, this.zoomFactor);

            // Get and process selected elements
            const selectedElements = getSelectedElements(startInGraphSpace, endInGraphSpace, this.graphObject);

            selectedElements.forEach(item => {
                if (item.groupRoot?.nodeHoverIn) {
                    item.nodeHoverIn(item);
                }
            });
        };

        // Set up the mouse event handlers
        svg.on('mousedown', mouseEvent => {
            if (!mouseEvent.ctrlKey) return;

            // Temporarily disable zoom to prevent interference
            svg.on('.zoom', null);

            const parent = svg.node().parentNode;
            const startPoint = d3.pointer(mouseEvent, parent);

            startSelection(startPoint);

            const windowSelection = d3.select(window);
            windowSelection
                .on('mousemove.selection', moveEvent => {
                    moveSelection(startPoint, d3.pointer(moveEvent, parent));
                })
                .on('mouseup.selection', upEvent => {
                    endSelection(startPoint, d3.pointer(upEvent, parent));
                    // Re-enable zoom
                    svg.call(zoomBehavior);
                    windowSelection.on('mousemove.selection', null).on('mouseup.selection', null);
                });
        });
    };
}
