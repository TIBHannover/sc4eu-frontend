// ForceLayout.js
//
// Migrated from D3 v3 to D3 v7.
//
// The entire force layout API was restructured in D3 v4.
// D3 v3 used a single d3.layout.force() object with methods chained on it.
// D3 v7 uses d3.forceSimulation() with named forces added via .force(name, fn).
//
// API mapping:
//   d3.layout.force()          → d3.forceSimulation()
//   force.nodes(arr)           → simulation.nodes(arr)
//   force.links(arr)           → simulation.force('link', d3.forceLink(arr))
//   force.charge(fn)           → simulation.force('charge', d3.forceManyBody().strength(fn))
//   force.linkDistance(fn)     → simulation.force('link').distance(fn)
//   force.linkStrength(val)    → simulation.force('link').strength(val)
//   force.size([w,h])          → simulation.force('center', d3.forceCenter(w/2, h/2))
//   force.gravity(0.025)       → simulation.force('center').strength(0.25)
//   force.start()              → simulation.restart()
//   force.stop()               → simulation.stop()
//   force.resume()             → simulation.alphaTarget(0.3).restart()
//   force.alpha(val)           → simulation.alpha(val)  [unchanged]
//   force.alpha() === 0        → simulation.alpha() < simulation.alphaMin()
//   force.on('tick', fn)       → simulation.on('tick', fn)  [unchanged]

import BaseLayoutComponent from './BaseLayoutComponent';
import * as d3 from 'd3';

// Alpha values for simulation state management.
// alphaTarget above alphaMin keeps the simulation running (resume behaviour).
// alphaTarget of 0 lets the simulation cool naturally (stop behaviour).
const SIMULATION_ALPHA_RESUME_TARGET = 0.3;
const SIMULATION_ALPHA_STOP_TARGET   = 0;
const SIMULATION_ALPHA_NUDGE         = 0.1;  // small reheat after re-init

// Link distance by type — extracted from computeLinkDistance for readability.
const LINK_DISTANCE_BY_TYPE = {
  direct:   400,
  loop:     150,
  mlPart:   200,
  hiddenML: 400,
};
const LINK_DISTANCE_FALLBACK = 300;

// Charge strength by internal object type.
const CHARGE_STRENGTH_BY_TYPE = {
  node:         -400,
  propertyNode: -800,
};
const CHARGE_STRENGTH_FALLBACK = -1000;

export default class ForceLayout extends BaseLayoutComponent {
  constructor(graph) {
    super(graph);
    this.force             = undefined;
    this.forceLinks        = [];
    this.forceNodes        = [];
    this.linkDistance      = 'auto';
    this.distanceValue     = 300;
    this.layoutSize        = [];
    this.forceLayoutPaused = false;
    this.forceIsInitialized = false;
  }

  // ─── Simulation lifecycle ─────────────────────────────────────────────────

  pauseForceLayoutAnimation = (doPause) => {
    if (doPause) {
      this.stopForce();
    } else {
      this.resumeForce();
    }
    this.forceLayoutPaused = doPause;
  };

  // D3 v7: resume = set alphaTarget above alphaMin then restart.
  // alphaTarget > 0 prevents the simulation from cooling to a stop.
  resumeForce() {
    this.forceLayoutPaused = false;
    if (this.force) {
      this.force
        .alphaTarget(SIMULATION_ALPHA_RESUME_TARGET)
        .restart();
    }
  }

  stopForce() {
    if (this.force) {
      this.force
        .alphaTarget(SIMULATION_ALPHA_STOP_TARGET)
        .stop();
    }
  }

  // D3 v7: alpha() < alphaMin() means the simulation has cooled.
  // In v3 this was alpha() === 0.
  toggleForce() {
    if (!this.force) {
      return;
    }

    const isSettled = this.force.alpha() < this.force.alphaMin();
    if (isSettled) {
      this.resumeForce();
    } else {
      this.stopForce();
    }
  }

  // ─── Alpha control ────────────────────────────────────────────────────────

  setForceAlpha = (value) => {
    if (this.force) {
      this.force.alpha(value);
    }
  };

  // ─── Link distance ────────────────────────────────────────────────────────
  // D3 v7: link distance is set on the named link force, not on the simulation.

  setLinkDistance(value) {
    this.distanceValue = value;
    if (this.force) {
      this.force.force('link')?.distance(value);
    }
  }

  // ─── Layout initialisation ────────────────────────────────────────────────

  initializeLayoutEngine(debug = false) {
    this.updateLayoutSize();
    this.renderedNodes = this.graph.nodes;
    this.renderedLinks = this.graph.links;

    if (this.force) {
      this.force.stop();
    }

    this.createForceElements(debug);

    // D3 v7: restart() replaces start().
    this.force.restart();
    this.force.stop();

    // Nudge alpha slightly on re-initialisation so the layout settles.
    if (this.forceIsInitialized) {
      this.force.alpha(SIMULATION_ALPHA_NUDGE);
    }

    this.forceIsInitialized = true;
  }

  setLayoutSize = (width, height) => {
    this.layoutSize[0] = width;
    this.layoutSize[1] = height;
  };

  updateLayoutSize() {
    const boundingBox    = this.graph.svgRoot.node().getBoundingClientRect();
    this.layoutSize[0]   = boundingBox.width;
    this.layoutSize[1]   = boundingBox.height;
  }

  // ─── Tick callback ────────────────────────────────────────────────────────
  // Called on every simulation tick to sync rendered positions.
  // d3.select(this) inside .each() requires a regular function (not arrow)
  // so that `this` refers to the DOM element — unchanged from v3.

  recalculatePositions = () => {
    this.renderedNodes.forEach((node) => {
      node.updateRenderingPosition();
    });
    this.renderedLinks.forEach((link) => {
      link.updateRenderingPosition();
    });

    if (this.graph.f_renderedNodes) {
      this.graph.f_renderedNodes.each(function(item) {
        d3.select(this)
          .selectAll('circle')
          .attr('transform', `translate(${item.x},${item.y})`);
      });
    }
  };

  // ─── createForceElements ──────────────────────────────────────────────────
  // Builds the node and link arrays then constructs the force simulation.
  // D3 v7: simulation is constructed with named forces rather than
  // chained methods on a single layout object.

  createForceElements = (debug) => {
    // D3 v7: d3.forceSimulation() replaces d3.layout.force().
    // Create a new simulation or reuse the existing one.
    if (this.force === undefined) {
      this.force = d3.forceSimulation();
    }

    this.forceLinks = [];
    this.forceNodes = [];

    // Collect visible nodes.
    this.forceNodes = this.renderedNodes.filter(
      (node) => node.visible()
    );

    // Collect visible links and their associated force nodes.
    this.renderedLinks.forEach((link) => {
      if (link.visible()) {
        this.forceLinks = this.forceLinks.concat(link.getForceLink());
        this.forceNodes = this.forceNodes.concat(link.getForceNode());
      }

      // Hidden multi-links still contribute force links
      // so their source/target nodes are correctly positioned.
      if (link.__isHiddenML && !link.visible()) {
        this.forceLinks = this.forceLinks.concat(link.getForceLink());
      }
    });

    if (debug) {
      this.graph.drawForceNodes(this.forceNodes);
    }

    // Randomise positions for nodes that have not been placed yet.
    this.forceNodes.forEach((node) => {
      node.layoutHandlerReference = this;

      if (node.x === 0) {
        node.x = Math.random() * this.layoutSize[0];
      }
      if (node.y === 0) {
        node.y = Math.random() * this.layoutSize[1];
      }
    });

    this.forceLinks.forEach((link) => {
      link.layoutHandlerReference = this;
    });

    this.distanceValue = 400;

    const centreX = this.layoutSize[0] / 2;
    const centreY = this.layoutSize[1] / 2;

    // D3 v7: forces are registered by name on the simulation.
    // Each force is independently configurable after creation via
    // simulation.force('name') which returns the registered force object.
    this.force
      .nodes(this.forceNodes)
      // charge: per-node repulsion strength
      .force('charge',
        d3.forceManyBody()
          .strength(this.computeChargeStrength)
      )
      // link: edge length and stiffness
      .force('link',
        d3.forceLink(this.forceLinks)
          .id((node) => node.id)
          .distance(this.computeLinkDistance)
          .strength(1.5)
      )
      // center: weak attraction toward the canvas centre.
      // gravity(0.025) in v3 maps to strength(0.25) here —
      // the v7 centre force strength scale differs by ~10x.
      .force('center',
        d3.forceCenter(centreX, centreY)
          .strength(0.25)
      );

    this.recalculatePositions();
    this.force.on('tick', this.recalculatePositions);
  };

  // ─── Force calculation functions ──────────────────────────────────────────
  // These are passed as callbacks to the force constructors.
  // Named constants replace the magic numbers from the original.

  computeLinkDistance(link) {
    return LINK_DISTANCE_BY_TYPE[link.type] ?? LINK_DISTANCE_FALLBACK;
  }

  computeChargeStrength(item) {
    return CHARGE_STRENGTH_BY_TYPE[item.__internalObjectType]
      ?? CHARGE_STRENGTH_FALLBACK;
  }
}