import BaseLayoutComponent from './BaseLayoutComponent';
import * as d3 from 'd3';

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

    pauseForceLayoutAnimation = doPause => {
        if (doPause) {
            this.stopForce();
        } else {
            this.resumeForce();
        }
        this.forceLayoutPaused = doPause;
    };

    setLinkDistance(value) {
        this.distanceValue = value;
        if (this.force) {
            this.force.linkDistance(value);
        }
    }

    setForceAlpha = val => {
        this.force.alpha(val);
    };
    resumeForce() {
        if (this.force) {
            this.force.resume();
        }
    }
    stopForce() {
        if (this.force) {
            this.force.stop();
        }
    }
    toggleForce() {
        if (this.force) {
            if (this.force.alpha() === 0) {
                this.force.resume();
            } else {
                this.force.stop();
            }
        }
    }

    initializeLayoutEngine(debug = false) {
        this.updateLayoutSize();
        this.renderedNodes = this.graph.nodes;
        this.renderedLinks = this.graph.links;

        if (this.force) {
            this.force.stop();
        }
        this.createForceElements(debug);
        this.force.start();
        this.force.stop();
        if (this.forceIsInitialized) {
            this.force.alpha(0.1);
        }
        this.forceIsInitialized = true;
    }

    setLayoutSize = (width, height) => {
        this.layoutSize[0] = width;
        this.layoutSize[1] = height;
    };

    updateLayoutSize() {
        const bb = this.graph.svgRoot.node().getBoundingClientRect();
        this.layoutSize[0] = bb.width;
        this.layoutSize[1] = bb.height;
    }

    recalculatePositions = (debug = false) => {
        this.renderedNodes.forEach(node => {
            node.updateRenderingPosition();
        });
        this.renderedLinks.forEach(link => {
            link.updateRenderingPosition();
        });

        // todo : make this flag based enabled
        if (this.graph.f_renderedNodes) {
            // if (debug) {
            this.graph.f_renderedNodes.each(function(item) {
                d3.select(this)
                    .selectAll('circle')
                    .attr('transform', 'translate(' + item.x + ',' + item.y + ')');
            });
            // }
        }
    };

    createForceElements = debug => {
        const that = this;
        if (this.force === undefined) {
            this.force = d3.layout.force();
        }

        this.forceLinks = [];
        this.forceNodes = [];
        let i;

        for (i = 0; i < this.renderedNodes.length; i++) {
            if (this.renderedNodes[i].visible()) {
                this.forceNodes.push(this.renderedNodes[i]);
            }
        }

        for (i = 0; i < this.renderedLinks.length; i++) {
            if (this.renderedLinks[i].visible()) {
                this.forceLinks = this.forceLinks.concat(this.renderedLinks[i].getForceLink());
                this.forceNodes = this.forceNodes.concat(this.renderedLinks[i].getForceNode());
            }
        }

        this.force.nodes([]);
        this.force.links([]);
        this.force.nodes(this.forceNodes);
        this.force.links(this.forceLinks);

        if (debug) {
            this.graph.drawForceNodes(this.forceNodes);
        }

        // todo: this is a hard-coded random init
        this.forceNodes.forEach(node => {
            node.layoutHandlerReference = this;
            //
            if (node.x === 0) {
                node.x = Math.random() * this.layoutSize[0];
            }
            if (node.y === 0) {
                node.y = Math.random() * this.layoutSize[1];
            }
        });

        this.forceLinks.forEach(link => {
            link.layoutHandlerReference = this;
        });

        this.distanceValue = 400;
        this.force
            .charge(function(/*element*/) {
                // element can have charge value
                // here constant
                return -400;
            })
            .linkDistance(this.computeLinkDistance) // just make sure that our links are not to long.
            .linkStrength(1.5)
            .size([that.layoutSize[0], that.layoutSize[1]])
            .gravity(0.025);

        this.recalculatePositions();
        this.force.on('tick', this.recalculatePositions);
    };

    computeLinkDistance(link) {
        if (link.type === 'direct') {
            return 400;
        }
        if (link.type === 'loop') {
            return 150;
        }
        if (link.type === 'mlPart') {
            return 200;
        }
    }
} // end of class definition
