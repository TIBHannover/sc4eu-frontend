import * as d3 from 'd3';

export const collapseNodeAnimationForDelete = (node, last, callback) => {
    const animationDuration = 400;

    if (node.incomingLinks.length > 0) {
        // pick one;
        const parentPosition = node.incomingLinks[0].sourceNode.getPosition();
        // if ware are leaf node, that easy, just move your save

        if (node.incomingLinks.length === 1) {
            // no propblemo
            // get PropertyNode;
            // first node;
            const f_x = parseFloat(parentPosition.x);
            const f_y = parseFloat(parentPosition.y);

            // we only have one link at the moment;
            const propertyNode = node.incomingLinks[0].getPropertNode();

            propertyNode.groupRoot
                .transition()
                .tween('attr.translate', function() {
                    return function(t) {
                        const tr = d3.transform(propertyNode.groupRoot.attr('transform'));
                        propertyNode.x = tr.translate[0];
                        propertyNode.y = tr.translate[1];
                        propertyNode.px = propertyNode.x;
                        propertyNode.py = propertyNode.y;
                        propertyNode.updateRenderingPosition();
                    };
                })
                .duration(animationDuration)
                .attr('transform', 'translate(' + f_x + ',' + f_y + ')')
                .each('end', function() {
                    propertyNode.ref.deleteVisualPrimitives();
                });

            node.groupRoot
                .transition()
                .tween('attr.translate', function() {
                    return function(t) {
                        const tr = d3.transform(node.groupRoot.attr('transform'));
                        node.x = tr.translate[0];
                        node.y = tr.translate[1];
                        node.px = node.x;
                        node.py = node.y;
                        node.updateRenderingPosition();
                    };
                })
                .duration(animationDuration)
                .attr('transform', 'translate(' + f_x + ',' + f_y + ')')
                .each('end', function() {
                    node.groupRoot.remove();
                    if (last) {
                        callback();
                    }
                });
        }
    }
};
export const collapseNodeAnimation = (node, last, callback) => {
    const animationDuration = 400;

    if (node.incomingLinks.length > 0) {
        // pick one;
        const parentPosition = node.incomingLinks[0].sourceNode.getPosition();
        // if ware are leaf node, that easy, just move your save

        if (node.incomingLinks.length === 1) {
            // no propblemo
            // get PropertyNode;
            // first node;
            const f_x = parseFloat(parentPosition.x);
            const f_y = parseFloat(parentPosition.y);

            // we only have one link at the moment;
            const propertyNode = node.incomingLinks[0].getPropertNode();

            propertyNode.groupRoot
                .transition()
                .tween('attr.translate', function() {
                    return function(t) {
                        const tr = d3.transform(propertyNode.groupRoot.attr('transform'));
                        propertyNode.x = tr.translate[0];
                        propertyNode.y = tr.translate[1];
                        propertyNode.px = propertyNode.x;
                        propertyNode.py = propertyNode.y;
                        propertyNode.updateRenderingPosition();
                    };
                })
                .duration(animationDuration)
                .attr('transform', 'translate(' + f_x + ',' + f_y + ')')
                .each('end', function() {
                    node.incomingLinks[0].visible(false);
                    propertyNode.ref.removeAllRenderedElementsFromParent();
                });

            node.groupRoot
                .transition()
                .tween('attr.translate', function() {
                    return function(t) {
                        const tr = d3.transform(node.groupRoot.attr('transform'));
                        node.x = tr.translate[0];
                        node.y = tr.translate[1];
                        node.px = node.x;
                        node.py = node.y;
                        node.updateRenderingPosition();
                    };
                })
                .duration(animationDuration)
                .attr('transform', 'translate(' + f_x + ',' + f_y + ')')
                .each('end', function() {
                    node.visible(false);
                    node.removeAllRenderedElementsFromParent();
                    if (last) {
                        callback();
                    }
                });
        }
    }
};

export const expandNodeAnimation = (node, targetPosition, last, callback) => {
    const animationDuration = 500;
    if (node.incomingLinks.length > 0) {
        // pick one;
        const parentPosition = node.incomingLinks[0].sourceNode.getPosition();
        // if ware are leaf node, that easy, just move your save

        if (node.incomingLinks.length === 1) {
            // get PropertyNode;
            // first node;
            const f_x = parseFloat(targetPosition.x);
            const f_y = parseFloat(targetPosition.y);

            const h_x = node.x + 0.5 * (f_x - node.x);
            const h_y = node.y + 0.5 * (f_y - node.y);

            // set node and propertyNode to parent position;
            node.setPosition(parentPosition.x, parentPosition.y);
            const propertyNode = node.incomingLinks[0].getPropertNode();
            propertyNode.setPosition(parentPosition.x, parentPosition.y);

            // this has to be halfed
            propertyNode.groupRoot
                .transition()
                .tween('attr.translate', function() {
                    return function(t) {
                        const tr = d3.transform(propertyNode.groupRoot.attr('transform'));
                        propertyNode.x = tr.translate[0];
                        propertyNode.y = tr.translate[1];
                        propertyNode.px = propertyNode.x;
                        propertyNode.py = propertyNode.y;
                        propertyNode.updateRenderingPosition();
                    };
                })
                .duration(animationDuration)
                .attr('transform', 'translate(' + h_x + ',' + h_y + ')')
                .each('end', function() {});

            node.groupRoot
                .transition()
                .tween('attr.translate', function() {
                    return function(t) {
                        const tr = d3.transform(node.groupRoot.attr('transform'));
                        node.x = tr.translate[0];
                        node.y = tr.translate[1];
                        node.px = node.x;
                        node.py = node.y;
                        node.updateRenderingPosition();
                    };
                })
                .duration(animationDuration)
                .attr('transform', 'translate(' + f_x + ',' + f_y + ')')
                .each('end', function() {
                    if (last) {
                        callback();
                    }
                });
        }
    }
};
