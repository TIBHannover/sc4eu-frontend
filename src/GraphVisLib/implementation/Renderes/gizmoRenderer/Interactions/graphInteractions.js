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
    this.graphObject       = graph;
    this.zoom              = undefined;
    this.graphTranslation  = [0, 0];
    this.zoomFactor        = 1.0;
    this.transformAnimation = false;

    this.zoomEnabled      = true;
    this.ctrlZoomEnabled  = true;
    this.dragEnabled      = true;
    this.scrollValue      = 0;
  }

  enableMouseZoom = (value) => {
    this.zoomEnabled = value;
  };

  enableCtrlMouseZoom = (value) => {
    this.ctrlZoomEnabled = value;
  };

  enableMouseDrag = (value) => {
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
      .on('start', (zoomEvent) => {
        if (!this.zoomEnabled) {
          return;
        }
        const hasLeftMouseButton =
          zoomEvent.sourceEvent?.buttons === 1;

        if (hasLeftMouseButton) {
          this.graphObject.svgRoot.style('cursor', 'all-scroll');
        }

        const container = d3.select('#resourceRendererContainer');
        if (container && container.node()) {
          this.scrollValue = container.node().scrollTop;
        }
      })
      // D3 v7: zoom handler receives zoomEvent as first parameter
      .on('zoom', (zoomEvent) => {
        this.zoomed(zoomEvent);
      })
      // D3 v7: 'end' replaces 'zoomend'
      .on('end', () => {
        if (!this.zoomEnabled) {
          return;
        }
        this.graphObject.svgRoot.style('cursor', 'auto');
        this.b_graphTranslation = this.graphTranslation;
        this.b_zoomFactor       = this.zoomFactor;
      });

    this.graphObject.svgRoot.call(this.zoom);

    // D3 v7: zoom.event(selection) → selection.call(zoom)
    if (this.graphObject.graphRoot) {
      this.graphObject.graphRoot.call(this.zoom);
    }
  };

  // ─── resetUserLayout ──────────────────────────────────────────────────────
  // Resets the graph to a given translation and zoom factor.
  // D3 v7: zoom state is set via selection.call(zoom.transform, transform)
  // using d3.zoomIdentity.translate(x,y).scale(k).
  // zoom.translate() and zoom.scale() no longer exist.

  resetUserLayout = (translation, zoomFactor) => {
    const graph = this.graphObject;

    if (translation) {
      this.graphTranslation[0] = translation[0];
      this.graphTranslation[1] = translation[1];
    }

    if (zoomFactor) {
      this.zoomFactor = zoomFactor;
    }

    const graphContainer  = graph.graphRoot;
    const newTransform    = buildZoomTransform(this.graphTranslation, this.zoomFactor);

    graphContainer.attr(
      'transform',
      `translate(${this.graphTranslation})scale(${this.zoomFactor})`
    );

    // D3 v7: set zoom state on the SVG root so internal zoom state
    // matches the manually applied transform.
    this.graphObject.svgRoot.call(this.zoom.transform, newTransform);
  };

  // ─── zoomed ───────────────────────────────────────────────────────────────
  // Called on every zoom event.
  // D3 v7: receives zoomEvent as parameter instead of reading d3.event.
  // zoomEvent.transform replaces d3.event.scale + d3.event.translate.

  zoomed = (zoomEvent) => {
    const graph          = this.graphObject;
    const graphContainer = graph.graphRoot;

    if (!this.zoomEnabled) {
      const sourceEvent = zoomEvent.sourceEvent;

      if (sourceEvent) {
        const scrollDelta       = sourceEvent.deltaY;
        const isCtrlZoom        = this.ctrlZoomEnabled && scrollDelta && sourceEvent.ctrlKey;

        if (!isCtrlZoom && scrollDelta) {
          const container = d3.select('#resourceRendererContainer');
          const containerNode = container.node();

          if (scrollDelta > 0) {
            this.scrollValue += 50;
            if (this.scrollValue > containerNode.scrollTopMax) {
              this.scrollValue = containerNode.scrollTopMax;
            }
          } else {
            this.scrollValue -= 50;
            if (this.scrollValue < 0) {
              this.scrollValue = 0;
            }
          }

          containerNode.scrollTop = this.scrollValue;

          // Reset zoom state so the graph does not pan while scrolling.
          const resetTransform = buildZoomTransform(this.graphTranslation, this.zoomFactor);
          this.graphObject.svgRoot.call(this.zoom.transform, resetTransform);
          return;
        }
      }
    }

    if (this.disableGraphTranslation) {
      return;
    }

    zoomEvent.sourceEvent?.preventDefault();
    zoomEvent.sourceEvent?.stopPropagation();

    // D3 v7: zoomEvent.transform = { x, y, k }
    // replaces d3.event.translate = [x, y] and d3.event.scale = k
    const isWheelZoom = Boolean(zoomEvent.sourceEvent?.deltaY);

    if (!isWheelZoom) {
      if (this.transformAnimation) {
        return;
      }

      this.zoomFactor = zoomEvent.transform.k;

      if (!this.disableGraphTranslation) {
        this.graphTranslation = [zoomEvent.transform.x, zoomEvent.transform.y];
      }

      graphContainer.attr(
        'transform',
        `translate(${this.graphTranslation})scale(${this.zoomFactor})`
      );
      return;
    }

    // Wheel zoom — animate the transition.
    this.zoomFactor       = zoomEvent.transform.k;
    this.graphTranslation = [zoomEvent.transform.x, zoomEvent.transform.y];

    graphContainer
      .transition()
      .duration(250)
      .ease(d3.easeLinear)           // .ease('linear') → .ease(d3.easeLinear)
      .attrTween('transform', () => {
        return () => {
          this.transformAnimation = true;

          const currentTranslate = parseTranslate(graphContainer.attr('transform'));
          const currentScale     = parseScale(graphContainer.attr('transform'));

          if (!this.disableGraphTranslation) {
            this.graphTranslation[0] = currentTranslate.x;
            this.graphTranslation[1] = currentTranslate.y;
          }

          this.zoomFactor = currentScale;
          return null;
        };
      })
      .attr(
        'transform',
        `translate(${this.graphTranslation})scale(${this.zoomFactor})`
      )
      .on('end', () => {
        this.transformAnimation = false;
      });
  };

  // ─── selectionBoxFeature ──────────────────────────────────────────────────
  // Draws a rubber-band selection rectangle when the user ctrl+drags.
  // D3 v7: d3.mouse(element) → d3.pointer(event, element)
  // D3 v7: d3.event → mouseEvent parameter in handler
  // D3 v7: zoom state reset via zoom.transform instead of zoom.translate/scale

  selectionBoxFeature = (active = true) => {
    if (!active) {
      return;
    }

    function buildRectPath(x, y, width, height) {
      return `M${x},${y} l${width},0 l0,${height} l${-width},0z`;
    }

    const svg  = this.graphObject.svgRoot;

    const selectionRect = svg.append('path').attr('visibility', 'hidden');
    selectionRect.style('opacity',          '0.5');
    selectionRect.style('fill',             '#ADD8E6');
    selectionRect.style('stroke',           '#ADD8E6');
    selectionRect.style('fill-opacity',     '0.3');
    selectionRect.style('stroke-opacity',   '0.7');
    selectionRect.style('stroke-width',     '2');
    selectionRect.style('stroke-dasharray', '5, 5');

    const startSelection = (startPoint) => {
      selectionRect
        .attr('d', buildRectPath(startPoint[0], startPoint[0], 0, 0))
        .attr('visibility', 'visible');
      this.disableGraphTranslation = true;
    };

    const moveSelection = (startPoint, currentPoint) => {
      selectionRect.attr(
        'd',
        buildRectPath(
          startPoint[0],
          startPoint[1],
          currentPoint[0] - startPoint[0],
          currentPoint[1] - startPoint[1]
        )
      );
    };

    const endSelection = (startPoint, endPoint) => {
      selectionRect.attr('visibility', 'hidden');
      this.disableGraphTranslation = false;

      // Reset zoom state to match current graph position.
      const resetTransform = buildZoomTransform(this.graphTranslation, this.zoomFactor);
      this.graphObject.svgRoot.call(this.zoom.transform, resetTransform);

      const startInGraphSpace = getGraphCoordinates(
        startPoint[0], startPoint[1],
        this.graphTranslation, this.zoomFactor
      );
      const endInGraphSpace = getGraphCoordinates(
        endPoint[0], endPoint[1],
        this.graphTranslation, this.zoomFactor
      );

      const selectedElements = getSelectedElements(
        startInGraphSpace,
        endInGraphSpace,
        this.graphObject
      );

      selectedElements.forEach((item) => {
        if (item.groupRoot.nodeHoverIn) {
          item.nodeHoverIn(item);
        }
      });
    };

    // D3 v7: mousedown handler receives the DOM event as first parameter.
    // d3.mouse(parent) → d3.pointer(mouseEvent, parent)
    svg.on('mousedown', (mouseEvent) => {
      if (!mouseEvent.ctrlKey) {
        return;
      }

      const parent     = svg.node().parentNode;
      const startPoint = d3.pointer(mouseEvent, parent);

      startSelection(startPoint);

      const windowSelection = d3.select(window);

      windowSelection
        .on('mousemove.selection', (moveEvent) => {
          moveSelection(startPoint, d3.pointer(moveEvent, parent));
        })
        .on('mouseup.selection', (upEvent) => {
          endSelection(startPoint, d3.pointer(upEvent, parent));
          windowSelection
            .on('mousemove.selection', null)
            .on('mouseup.selection',   null);
        });
    });
  };
}