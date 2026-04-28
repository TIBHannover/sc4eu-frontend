// nodeInteractions.js
//
// Migrated from D3 v3 to D3 v7.
//
// Breaking changes addressed:
//
//   d3.behavior.drag()      → d3.drag()
//   .origin(fn)             → removed; datum x/y serve as drag origin via
//                             default subject resolution in D3 v4+
//   'dragstart'/'dragend'   → 'start'/'end' event names
//   d3.event                → event parameter in every handler
//   d3.event.sourceEvent    → dragEvent.sourceEvent
//   d3.event.x / .y        → dragEvent.x / dragEvent.y
//   handler(datum)          → handler(event, datum) in all D3 callbacks
//   that = this pattern     → removed; arrow functions capture class this
//
// Note: doubleClickBehaviour registers 'click' not 'dblclick' — this matches
// the original behaviour and is preserved intentionally.

import * as d3 from 'd3';
import './nodeLoaderAnimation.css';

export default class NodeInteractions {
  constructor(graph) {
    this.graphObject       = graph;
    this.dragBehaviour     = null;
    this.hasNodeClick      = true;
    this.hasNodeDobleClick = true;
    this.hasNodeHover      = true;
    this.hasNodeSelection  = false;
    this.draggingChildren  = [];
    this.nodeClick         = this.nodeClick.bind(this);
  }

  setHoverEnabled = (value) => {
    this.hasNodeHover = value;
  };

  setNodeClickEnabled = (value) => {
    this.hasNodeClick = value;
  };

  setHasNodeSelection = (value) => {
    this.hasNodeSelection = value;
  };

  setNodeDoubleClickEnabled = (value) => {
    this.hasNodeDobleClick = value;
  };

  setDragEnabled = (value) => {
    this.hasNodeDragEnabeld = value;
  };

  // ─── applyNodeInteractions ────────────────────────────────────────────────
  // Sets up drag, hover, click and double-click on all nodes.
  // D3 v7: d3.drag() replaces d3.behavior.drag().
  // .origin() removed — datum x/y properties are used automatically.

  applyNodeInteractions = () => {
    if (!this.graphObject) {
      console.error('NO GRAPH OBJECT FOUND');
      return;
    }

    this.dragBehaviour = d3
      .drag()
      .on('start', this.dragStart)
      .on('drag',  this.drag)
      .on('end',   this.dragEnd);

    // D3 v7: behaviour functions receive the selection directly.
    // Arrow functions replace the 'that = this' pattern.
    this.hoverBehaviour = (selection) => {
      if (this.hasNodeHover) {
        selection.on('mouseover', this.nodeHoverIn);
        selection.on('mouseout',  this.nodeHoverOut);
      }
    };

    this.clickBehaviour = (selection) => {
      selection.on('click', this.nodeClick);
    };

    // Note: registers 'click' not 'dblclick' — preserves original behaviour.
    this.doubleClickBehaviour = (selection) => {
      if (this.hasNodeDobleClick) {
        selection.on('click', this.nodeDoubleClick);
      }
    };

    this.graphObject.nodes.forEach((node) => {
      if (!node.groupRoot) {
        return;
      }

      node.groupRoot.call(this.dragBehaviour);
      node.groupRoot.call(this.hoverBehaviour);

      if (this.hasNodeSelection) {
        node.connectClickAction(this.nodeClick);
        node.connectDoubleClickAction(this.nodeDoubleClick);
      }

      this.addCollapseExpandButton(node);
      this.addHideNodeButton(node);
    });
  };

  reapplyNodeInteractions = (node) => {
    if (!node.groupRoot) {
      return;
    }

    node.groupRoot.call(this.dragBehaviour);
    node.groupRoot.call(this.hoverBehaviour);
    node.connectClickAction(this.nodeClick);
    node.connectDoubleClickAction(this.nodeDoubleClick);

    this.addCollapseExpandButton(node);
    this.addHideNodeButton(node);
  };

  // ─── Collapse / expand button hover ──────────────────────────────────────

  collapseButton_mouseHoverIn = (node) => {
    node.singleCirc.classed('collapseExpandButtonHovered', true);
  };

  collapseButton_mouseHoverOut = (node) => {
    node.singleCirc.classed('collapseExpandButtonHovered', false);
  };

  // ─── addHideNodeButton ────────────────────────────────────────────────────
  // Appends a hide-node button to the node's group.
  // No D3 event API used here — hover and click are plain .on() calls
  // which already receive (event, datum) in v7 but datum is not needed here
  // since the node reference is closed over directly.

  addHideNodeButton = (nodeDatum) => {
    if (nodeDatum.hideNodeGroup) {
      nodeDatum.hideNodeGroup.remove();
    }

    const shapeWidth  = Number.parseInt(nodeDatum.renderingShape.attr('width'));
    const shapeHeight = Number.parseInt(nodeDatum.renderingShape.attr('height'));
    const isCircle    = nodeDatum.renderingConfig().style.renderingType === 'circle';

    let offsetX = -0.5 * shapeWidth;
    let offsetY = -0.5 * shapeHeight;

    if (isCircle) {
      offsetX *= 0.7071;
      offsetY *= 0.7071;
    }

    nodeDatum.hideNodeGroup = nodeDatum.groupRoot.append('g');
    nodeDatum.hideNodeGroup.attr('transform', `translate(${offsetX},${-offsetY})`);

    nodeDatum.singleCirc = nodeDatum.hideNodeGroup.append('circle');
    nodeDatum.singleCirc.attr('r',  15);
    nodeDatum.singleCirc.attr('cx', 0);
    nodeDatum.singleCirc.attr('cy', 0);
    nodeDatum.singleCirc.classed('hideNodeButton', true);

    nodeDatum.hideNodeGroup.on('mouseover', () => {
      this.collapseButton_mouseHoverIn(nodeDatum);
    });
    nodeDatum.hideNodeGroup.on('mouseout', () => {
      this.collapseButton_mouseHoverOut(nodeDatum);
    });

    nodeDatum.hideNodeGroup.append('title').text('Hide this node');

    const innerItem = nodeDatum.hideNodeGroup.append('path');
    innerItem
      .attr(
        'd',
        'M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z'
      )
      .attr('transform', 'translate(-10,-7), scale(0.03,0.03)');

    innerItem.on('mouseover', () => {
      this.collapseButton_mouseHoverIn(nodeDatum);
    });
    innerItem.on('mouseout', () => {
      this.collapseButton_mouseHoverOut(nodeDatum);
    });

    nodeDatum.hideNodeGroup.on('click', () => {
      this.graphObject.animationsHandler.hideNode(nodeDatum);
    });
  };

  // ─── addCollapseExpandButton ──────────────────────────────────────────────
  // Appends a collapse/expand button to non-leaf nodes.
  // D3 v7: click handlers receive (clickEvent) as first parameter.

  addCollapseExpandButton = (nodeDatum) => {
    if (nodeDatum.outgoingLinks.length === 0) {
      return;
    }

    if (nodeDatum.collapseExapandGroup) {
      nodeDatum.collapseExapandGroup.remove();
    }

    const shapeWidth  = Number.parseInt(nodeDatum.renderingShape.attr('width'));
    const shapeHeight = Number.parseInt(nodeDatum.renderingShape.attr('height'));
    const isCircle    = nodeDatum.renderingConfig().style.renderingType === 'circle';

    let offsetX = 0.5 * shapeWidth;
    let offsetY = 0.5 * shapeHeight;

    if (isCircle) {
      offsetX *= 0.7071;
      offsetY *= 0.7071;
    }

    nodeDatum.collapseExapandGroup = nodeDatum.groupRoot.append('g');
    nodeDatum.collapseExapandGroup.attr(
      'transform',
      `translate(${offsetX},${-offsetY})`
    );

    nodeDatum.singleCirc = nodeDatum.collapseExapandGroup.append('circle');
    nodeDatum.singleCirc.attr('r',  15);
    nodeDatum.singleCirc.attr('cx', 0);
    nodeDatum.singleCirc.attr('cy', 0);
    nodeDatum.singleCirc.classed('collapseExpandButton', true);

    nodeDatum.collapseExapandGroup.on('mouseover', () => {
      this.collapseButton_mouseHoverIn(nodeDatum);
    });
    nodeDatum.collapseExapandGroup.on('mouseout', () => {
      this.collapseButton_mouseHoverOut(nodeDatum);
    });

    if (!nodeDatum.status) {
      nodeDatum.status = 'expanded';
    }

    switch (nodeDatum.status) {
      case 'collapsed':
        nodeDatum.collapseExapandGroup
          .append('title')
          .text('expand node');
        nodeDatum.collapseExapandGroup
          .append('polygon')
          .attr('points', '15.5,5 11,5 16,12 11,19 15.5,19 20.5,12 ')
          .attr('transform', 'translate(-12, -12)');
        nodeDatum.collapseExapandGroup
          .append('polygon')
          .attr('points', '8.5,5 4,5 9,12 4,19 8.5,19 13.5,12 ')
          .attr('transform', 'translate(-12, -12)');
        nodeDatum.collapseExapandGroup.on('click', () => {
          this.graphObject.animationsHandler.expandNode(nodeDatum);
        });
        break;

      case 'expanded':
        nodeDatum.collapseExapandGroup
          .append('title')
          .text('collapse node');
        nodeDatum.collapseExapandGroup
          .append('polygon')
          .attr('points', '15.5,5 11,5 16,12 11,19 15.5,19 20.5,12 ')
          .attr('transform', 'translate(12,-12), scale(-1,1)');
        nodeDatum.collapseExapandGroup
          .append('polygon')
          .attr('points', '8.5,5 4,5 9,12 4,19 8.5,19 13.5,12 ')
          .attr('transform', 'translate(12,-12), scale(-1,1)');
        nodeDatum.collapseExapandGroup.on('click', () => {
          this.graphObject.animationsHandler.collapseNode(nodeDatum);
        });
        break;

      default:
        nodeDatum.collapseExapandGroup.classed('hidden', true);
    }
  };

  // ─── Hover handlers ───────────────────────────────────────────────────────
  // D3 v7: mouseover/mouseout handlers receive (mouseEvent, datum).

  nodeHoverIn = (mouseEvent, nodeDatum) => {
    nodeDatum.renderingShape.style('fill', 'green');
  };

  nodeHoverOut = (mouseEvent, nodeDatum) => {
    nodeDatum.renderingShape.style(
      'fill',
      nodeDatum.renderingConfig().style.bgColor
    );
  };

  // ─── Click handlers ───────────────────────────────────────────────────────
  // D3 v7: click handlers receive (clickEvent, datum).
  // d3.event replaced with the clickEvent parameter.

  nodeDoubleClick = (clickEvent, nodeDatum) => {
    clickEvent.stopPropagation();
    clickEvent.preventDefault();
  };

  nodeClick(clickEvent, nodeDatum) {
    this.graphObject.selectItem(nodeDatum);

    const shapeWidth  = Number.parseInt(nodeDatum.renderingShape.attr('width'));
    const shapeHeight = Number.parseInt(nodeDatum.renderingShape.attr('height'));
    const shapeOffset = 0;

    d3.selectAll('.itemSelectionGroup').remove();

    if (!nodeDatum.isSelected()) {
      return;
    }

    nodeDatum.itemSelectGroup = nodeDatum.groupRoot.append('g');
    nodeDatum.itemSelectGroup.classed('itemSelectionGroup', true);

    nodeDatum.itemSelectGroupShape = nodeDatum.itemSelectGroup.append('rect');

    const isCircle = nodeDatum.renderingConfig().style.renderingType === 'circle';
    const isRect   = nodeDatum.renderingConfig().style.renderingType === 'rect';

    if (isCircle) {
      nodeDatum.itemSelectGroupShape
        .attr('x',      -0.5 * shapeWidth  - shapeOffset)
        .attr('y',      -0.5 * shapeHeight - shapeOffset)
        .attr('width',  shapeWidth  + shapeOffset)
        .attr('height', shapeHeight + shapeOffset)
        .attr('rx',     shapeWidth)
        .attr('ry',     shapeHeight)
        .style('stroke',       'red')
        .style('stroke-width', '2px')
        .attr('fill', 'none');
    }

    if (isRect) {
      nodeDatum.itemSelectGroupShape
        .attr('x',      -0.5 * shapeWidth  - shapeOffset)
        .attr('y',      -0.5 * shapeHeight - shapeOffset)
        .attr('width',  shapeWidth  + shapeOffset)
        .attr('height', shapeHeight + shapeOffset)
        .style('stroke',       'red')
        .style('stroke-width', '2px')
        .attr('fill', 'none');
    }
  }

  // ─── Drag handlers ────────────────────────────────────────────────────────
  // D3 v7: drag handlers receive (dragEvent, datum) — event first, datum second.

  dragStart = (dragEvent, nodeDatum) => {
    if (!this.hasNodeDragEnabeld) {
      return;
    }

    dragEvent.sourceEvent.stopPropagation();
    nodeDatum.fixed          = true;
    this.draggingChildren    = [
      ...nodeDatum.incomingLinks,
      ...nodeDatum.outgoingLinks,
    ];
    nodeDatum.groupRoot.style('cursor', 'pointer');
  };

  drag = (dragEvent, nodeDatum) => {
    if (!this.hasNodeDragEnabeld) {
      return;
    }

    dragEvent.sourceEvent.stopPropagation();

    nodeDatum.setPosition(dragEvent.x, dragEvent.y);
    nodeDatum.px = dragEvent.x;
    nodeDatum.py = dragEvent.y;

    const layoutHandler = nodeDatum.layoutHandlerReference;
    if (layoutHandler?.force && layoutHandler.forceLayoutPaused === false) {
      layoutHandler.resumeForce();
    }
  };

  dragEnd = (dragEvent, nodeDatum) => {
    if (!this.hasNodeDragEnabeld) {
      return;
    }

    nodeDatum.groupRoot.style('cursor', 'auto');
    this.draggingChildren = [];

    const layoutHandler = nodeDatum.layoutHandlerReference;
    if (layoutHandler?.force) {
      nodeDatum.fixed = false;
      if (layoutHandler.forceLayoutPaused === false) {
        layoutHandler.resumeForce();
      }
    }
  };
}