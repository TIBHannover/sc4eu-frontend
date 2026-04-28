// linkInteractions.js
//
// Migrated from D3 v3 to D3 v7.
//
// Breaking changes addressed:
//
//   d3.behavior.drag()       → d3.drag()
//   .origin(fn)              → removed; D3 v7 uses event.subject which defaults
//                              to the datum — equivalent behaviour for nodes
//                              that already carry x and y properties
//   'dragstart' / 'dragend'  → 'start' / 'end' event names
//   d3.event                 → event parameter in every handler
//   d3.event.x / .y          → dragEvent.x / dragEvent.y
//   d3.event.sourceEvent     → dragEvent.sourceEvent
//   d3.event.stopPropagation → clickEvent.stopPropagation() / dragEvent.sourceEvent.stopPropagation()
//   d3.event.preventDefault  → clickEvent.preventDefault()
//
// Handler signature change (affects all drag and click handlers):
//   D3 v3: handler(datum)
//   D3 v7: handler(event, datum)  — event is always the first parameter

import * as d3 from 'd3';

export default class LinkInteractions {
  constructor(graph) {
    this.graphObject        = graph;
    this.dragBehaviour      = null;
    this.hasNodeClick       = true;
    this.hasNodeDobleClick  = true;
    this.hasLinkHover       = true;
    this.hasPropertyHover   = true;
  }

  setHoverEnabled = (value) => {
    this.hasLinkHover       = value;
    this.hasPropertyHover   = value;
  };

  setNodeClickEnabled = (value) => {
    this.hasNodeClick = value;
  };

  setNodeDoubleClickEnabled = (value) => {
    this.hasNodeDobleClick = value;
  };

  setDragEnabled = (value) => {
    this.hasNodeDragEnabeld = value;
  };

  // ─── applyLinkInteractions ────────────────────────────────────────────────
  // Sets up drag, hover, click and double-click behaviours on all links.
  // D3 v7: d3.drag() replaces d3.behavior.drag().
  // .origin() is removed — the datum's x/y properties serve as the drag origin
  // automatically via the default subject resolution.

  applyLinkInteractions = () => {
    if (!this.graphObject) {
      console.error('NO GRAPH OBJECT FOUND');
      return;
    }

    // D3 v7: drag event names are 'start' and 'end' (not 'dragstart'/'dragend').
    // Handlers now receive (dragEvent, datum) instead of (datum).
    this.dragBehaviour = d3
      .drag()
      .on('start', this.dragStart)
      .on('drag',  this.drag)
      .on('end',   this.dragEnd);

    this.hoverBehaviour = (selection) => {
      if (this.hasLinkHover) {
        selection.on('mouseover', this.linkHoverIn);
        selection.on('mouseout',  this.linkHoverOut);
      }
    };

    this.propertyHoverBehaviour = (selection) => {
      if (this.hasPropertyHover) {
        selection.on('mouseover', this.propertyHoverIn);
        selection.on('mouseout',  this.propertyHoverOut);
      }
    };

    const links = this.graphObject.links;

    links.forEach((link) => {
      if (!link.groupRoot) {
        return;
      }

      link.groupRoot.call(this.hoverBehaviour);

      if (!link.renderingShape) {
        return;
      }

      const parentNode = link.renderingShape.node().parentNode;
      if (!parentNode) {
        return;
      }

      const shapeRoot = d3.select(parentNode);
      if (!shapeRoot) {
        return;
      }

      shapeRoot.call(this.propertyHoverBehaviour);

      if (this.hasNodeClick) {
        shapeRoot.call(this.propertyClick);
      }

      if (this.hasNodeDobleClick) {
        shapeRoot.call(this.propertyDoubleClick);
      }

      shapeRoot.call(this.dragBehaviour);
    });
  };

  // ─── Hover handlers ───────────────────────────────────────────────────────
  // D3 v7: mouseover/mouseout handlers receive (mouseEvent, datum).
  // The datum is the second parameter — renamed from d to linkDatum/propertyDatum
  // to make the type of object being received explicit.

  linkHoverIn = (mouseEvent, linkDatum) => {
    linkDatum.renderingLine.style('stroke', 'red');
  };

  linkHoverOut = (mouseEvent, linkDatum) => {
    linkDatum.renderingLine.style(
      'stroke',
      linkDatum.renderingConfig().style.link.lineColor
    );
  };

  propertyHoverIn = (mouseEvent, propertyDatum) => {
    propertyDatum.ref.renderingShape.style('fill', 'red');

    if (propertyDatum.mouseEntered === true) {
      return;
    }

    propertyDatum.mouseEntered  = true;
    propertyDatum.keepRendering = true;

    if (propertyDatum.unblockRendering) {
      propertyDatum.keepRendering    = false;
      propertyDatum.unblockRendering = false;
    }
  };

  propertyHoverOut = (mouseEvent, propertyDatum) => {
    propertyDatum.ref.renderingShape.style(
      'fill',
      propertyDatum.ref.renderingConfig().style.propertyNode.bgColor
    );

    if (propertyDatum.ref.__internalType === 'multiLink') {
      d3.selectAll('.MultiLinkHoverButton').remove();
    }

    propertyDatum.mouseEntered = false;
  };

  // ─── Click handlers ───────────────────────────────────────────────────────
  // D3 v7: click handlers inside .on() receive (clickEvent, datum).
  // d3.event no longer exists — use the clickEvent parameter directly.

  propertyDoubleClick = (selection) => {
    selection.on('dblclick', (clickEvent, propertyDatum) => {
      clickEvent.stopPropagation();
      clickEvent.preventDefault();
      this.graphObject.animationsHandler.collapseExpandMultiLinks(
        propertyDatum.ref
      );
    });
  };

  propertyClick = (selection) => {
    selection.on('click', (clickEvent) => {
      clickEvent.stopPropagation();
      clickEvent.preventDefault();
    });
  };

  // ─── Drag handlers ────────────────────────────────────────────────────────
  // D3 v7: drag handlers receive (dragEvent, datum) — event first, datum second.
  // dragEvent.x / dragEvent.y replace d3.event.x / d3.event.y.
  // dragEvent.sourceEvent replaces d3.event.sourceEvent.

  dragStart = (dragEvent, nodeDatum) => {
    if (!this.hasNodeDragEnabeld) {
      return;
    }

    dragEvent.sourceEvent.stopPropagation();
    nodeDatum.fixed = true;
    nodeDatum.groupRoot.style('cursor', 'pointer');
  };

  drag = (dragEvent, nodeDatum) => {
    dragEvent.sourceEvent.stopPropagation();

    nodeDatum.setPosition(dragEvent.x, dragEvent.y);
    nodeDatum.px = dragEvent.x;
    nodeDatum.py = dragEvent.y;
    nodeDatum.ref.updateRenderingPosition();

    const layoutHandler = nodeDatum.layoutHandlerReference;
    if (layoutHandler?.force && layoutHandler.forceLayoutPaused === false) {
      layoutHandler.resumeForce();
    }
  };

  dragEnd = (dragEvent, nodeDatum) => {
    nodeDatum.fixed = false;
    nodeDatum.groupRoot.style('cursor', 'auto');

    const layoutHandler = nodeDatum.layoutHandlerReference;
    if (layoutHandler?.force && layoutHandler.forceLayoutPaused === false) {
      layoutHandler.resumeForce();
    }
  };
}