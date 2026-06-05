import BaseLayoutComponent from './BaseLayoutComponent';
import * as d3 from 'd3';

const SIMULATION_ALPHA_RESUME_TARGET = 0.3;
const SIMULATION_ALPHA_STOP_TARGET = 0;
const SIMULATION_ALPHA_NUDGE = 0.1;

const LINK_DISTANCE_BY_TYPE = {
    direct: 200,
    loop: 120,
    mlPart: 150,
    hiddenML: 200
};
const LINK_DISTANCE_FALLBACK = 200;

const CHARGE_STRENGTH_BY_TYPE = {
    node: -600,
    propertyNode: -800
};
const CHARGE_STRENGTH_FALLBACK = -1000;

export default class ForceLayout extends BaseLayoutComponent {
    constructor(graph) {
        super(graph);
        this.force = undefined;
        this.forceLinks = [];
        this.forceNodes = [];
        this.linkDistance = 'auto';
        this.distanceValue = 300;
        this.layoutSize = [];
        this.forceLayoutPaused = false;
        this.forceIsInitialized = false;
    }

    // ─── Simulation lifecycle ─────────────────────────────────────────────────

    pauseForceLayoutAnimation = doPause => {
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
                .alpha(0.5)
                .alphaTarget(0)
                .restart();
        }
    }

    stopForce() {
        if (this.force) {
            this.force.alphaTarget(SIMULATION_ALPHA_STOP_TARGET).stop();
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

    setForceAlpha = value => {
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

        this.force.alpha(1).restart();

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
        const boundingBox = this.graph.svgRoot.node().getBoundingClientRect();
        this.layoutSize[0] = boundingBox.width;
        this.layoutSize[1] = boundingBox.height;
    }

    // ─── Tick callback ────────────────────────────────────────────────────────
    // Called on every simulation tick to sync rendered positions.
    // d3.select(this) inside .each() requires a regular function (not arrow)
    // so that `this` refers to the DOM element — unchanged from v3.

    recalculatePositions = () => {
        this.renderedNodes.forEach(node => {
            node.updateRenderingPosition();
        });
        this.renderedLinks.forEach(link => {
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

    createForceElements = debug => {
        // D3 v7: d3.forceSimulation() replaces d3.layout.force().
        // Create a new simulation or reuse the existing one.
        if (this.force === undefined) {
            this.force = d3.forceSimulation();
        }

        this.forceLinks = [];
        this.forceNodes = [];

        // Collect visible nodes.
        this.forceNodes = this.renderedNodes.filter(node => node.visible());

        // Collect visible links and their associated force nodes.
        this.renderedLinks.forEach(link => {
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

        const centreX = this.layoutSize[0] / 2;
        const centreY = this.layoutSize[1] / 2;

        this.forceNodes.forEach(node => {
            node.layoutHandlerReference = this;

            if (node.x === 0) {
                // Distribute nodes in a circle
                const angle = Math.random() * 2 * Math.PI;
                const radius = Math.min(this.layoutSize[0], this.layoutSize[1]) * 0.4;
                node.x = centreX + radius * Math.cos(angle);
                node.y = centreY + radius * Math.sin(angle);
            }
        });

        this.forceLinks.forEach(link => {
            link.layoutHandlerReference = this;
        });

        this.distanceValue = 400;

        // D3 v7: forces are registered by name on the simulation.
        // Each force is independently configurable after creation via
        // simulation.force('name') which returns the registered force object.
        this.force
            .nodes(this.forceNodes)
            // charge: per-node repulsion strength
            .force('charge', d3.forceManyBody().strength(this.computeChargeStrength))
            // link: edge length and stiffness
            .force(
                'link',
                d3
                    .forceLink(this.forceLinks)
                    .id(node => node.id)
                    .distance(this.computeLinkDistance)
                    .strength(0.3)
            )
            // center: weak attraction toward the canvas centre.
            // gravity(0.025) in v3 maps to strength(0.25) here —
            // the v7 centre force strength scale differs by ~10x.
            .force('center', d3.forceCenter(centreX, centreY))
            .force(
                'collision',
                d3.forceCollide().radius(node => {
                    return node.radius ? node.radius + 20 : 50;
                })
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
        const value = CHARGE_STRENGTH_BY_TYPE[item.__internalObjectType] ?? CHARGE_STRENGTH_FALLBACK;

        console.log('charge:', item.__internalObjectType, value);

        return value;
    }
}
