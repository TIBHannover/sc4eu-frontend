import BasePrimitive from './BasePrimitive';

export default class NodePrimitive extends BasePrimitive {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;

        this.incomingLinks = [];
        this.outgoingLinks = [];
        this.__numberOfLoops = 0;
        this.__internalObjectType = 'node';
        this.__hasDepictionForAnimation = null;
        this.__transition_animationDuration = 500; // default value;
    }

    addIncomingLink = link => {
        const found = this.incomingLinks.findIndex(item => item.__id === link.__id);
        if (found === -1) {
            this.incomingLinks.push(link);
        } else {
            this.incomingLinks[found] = link;
        }
    };
    addOutgoingLink = link => {
        const found = this.outgoingLinks.findIndex(item => item.__id === link.__id);
        if (found === -1) {
            this.outgoingLinks.push(link);
        } else {
            this.outgoingLinks[found] = link;
        }
    };

    setPosition = (x, y) => {
        this.x = x;
        this.y = y;
        this.updateRenderingPosition();
    };

    getPosition = () => {
        return { x: this.x, y: this.y };
    };

    numberOfLoops(val) {
        if (!arguments.length) {
            return this.__numberOfLoops;
        }
        this.__numberOfLoops = val;
    }

    updateRenderingPosition = () => {
        if (this.groupRoot) {
            this.groupRoot.attr('transform', 'translate(' + this.x + ',' + this.y + ')');
        }
        // update all related links; (using concat as temp object to merge the links)
        this.incomingLinks.concat(this.outgoingLinks).forEach(l => {
            l.updateRenderingPosition();
        });
    };

    removeAllRenderedElementsFromParent() {
        if (this.groupRoot) {
            // we have a parent;
            this.groupRoot.selectAll('rect').remove();
            this.groupRoot.selectAll('line').remove();
            this.groupRoot.selectAll('text').remove();
            this.groupRoot.selectAll('title').remove();
            this.groupRoot.selectAll('g').remove();
        }
    }

    removeNestedGroupItems() {
        if (this.groupRoot) {
            console.log('>>> REMOVING ALL GROUP ROUT ITEMS');
            this.groupRoot.selectAll('line').remove();
            this.groupRoot.selectAll('g').remove();
            // this.groupRoot
            //     .selectAll('g')
            //     .selectAll('nestedGroupItem')
            //     .remove();
        } else {
            console.log('>>> FAILED IN REMOVING ALL GROUP ROUT ITEMS');
        }
    }

    redraw() {
        this.removeAllRenderedElementsFromParent();
        if (this.groupRoot) {
            this.render(this.groupRoot);
        }
    }

    // this one will get the draw Functions replacement!
    render = groupRoot => {
        this.groupRoot = groupRoot;

        // handle rendering based on the config;
        const renderingElements = this.drawTools().renderNode(this.groupRoot, this.renderingConfig(), this);
        this.renderingShape = renderingElements.renderingShape;
        this.renderingText = renderingElements.renderingText;

        this.updateRenderingPosition();
    };
}
