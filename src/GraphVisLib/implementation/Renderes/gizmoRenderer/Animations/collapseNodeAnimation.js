import * as d3 from 'd3';
import { parseTranslate } from '../utils/GraphUtils';



export const hideSingleNodeAnimation = (node, parent, callback) => {
    const animationDuration = 400;
    if (node.incomingLinks.length > 0) {
        // pick one;

        node.groupRoot
            .transition()
            .attrTween('transform', function() {
                return function() {
                    const currentPosition = parseTranslate(node.groupRoot.attr('transform'));
                    node.x = currentPosition.x;
                    node.y = currentPosition.y;
                    node.px = node.x;
                    node.py = node.y;
                    node.updateRenderingPosition();
                    node.incomingLinks.forEach(link => {
                        link.updateRenderingPosition();
                    });
                    // Returning null lets the .attr() call below control the value.
                    return null;
                };
            })
            .duration(animationDuration)
            .attr('transform', 'translate(' + parent.x + ',' + parent.y + ')')
            .each('end', function() {
                node.visible(false);
                node.incomingLinks.forEach(link => {
                    link.visible(false);
                });
                callback();
            });
    }
};

export const collapseNodeAnimationForDelete = (node, last, callback) => {
    const animationDuration = 400;
    if (!node.groupRoot) {
        node.visible(false);
        node.removeAllRenderedElementsFromParent();
        if (last) {
            callback();
        }
        return;
    }

    if (node.incomingLinks.length > 0) {
        // pick one;
        const parentPosition = node.incomingLinks[0].sourceNode.getPosition();
        // if ware are leaf node, that easy, just move your save

        if (node.incomingLinks.length === 1) {
            // no propblemo
            // get PropertyNode;
            // first node;
            const f_x = Number.parseFloat(parentPosition.x);
            const f_y = Number.parseFloat(parentPosition.y);

            // we only have one link at the moment;
            if (!node.groupRoot) {
                if (last) {
                    callback();
                }
            }
            node.groupRoot
                .transition()
                .attrTween('transform', function() {
                    return function() {
                        const currentPosition = parseTranslate(node.groupRoot.attr('transform'));
                        node.x = currentPosition.x;
                        node.y = currentPosition.y;
                        node.px = node.x;
                        node.py = node.y;
                        node.updateRenderingPosition();
                        return null;
                    };
                })
                .duration(animationDuration)
                .attr('transform', 'translate(' + f_x + ',' + f_y + ')')
                .each('end', function() {
                    node.visible(false);
                    // node.incomingLinks[0].visible(false);
                    if (last) {
                        callback();
                    }
                });
        }
    }
};
export const collapseNodeAnimation = (node, last, callback) => {
    const animationDuration = 400;

    if (!node.groupRoot) {
        node.visible(false);
        node.removeAllRenderedElementsFromParent();
        if (last) {
            callback();
        }
    }

    if (node.incomingLinks.length > 0) {
        // pick one;
        const parentPosition = node.incomingLinks[0].sourceNode.getPosition();
        // if ware are leaf node, that easy, just move your save

        if (node.incomingLinks.length === 1) {
            // no propblemo
            // get PropertyNode;
            // first node;
            const f_x = Number.parseFloat(parentPosition.x);
            const f_y = Number.parseFloat(parentPosition.y);

            // we only have one link at the moment;
            const propertyNode = node.incomingLinks[0].getPropertNode();

            propertyNode.groupRoot
                .transition()
                .attrTween('transform', function() {
                    return function() {
                        const currentPosition = parseTranslate(propertyNode.groupRoot.attr('transform'));
                        propertyNode.x = currentPosition.x;
                        propertyNode.y = currentPosition.y;
                        propertyNode.px = propertyNode.x;
                        propertyNode.py = propertyNode.y;
                        propertyNode.updateRenderingPosition();
                        return null;
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
                .attrTween('transform', function() {
                    return function() {
                        const currentPosition = parseTranslate(node.groupRoot.attr('transform'));
                        node.setPosition(currentPosition.x, currentPosition.y);
                        return null;
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
            const f_x = Number.parseFloat(targetPosition.x);
            const f_y = Number.parseFloat(targetPosition.y);

            // set node and propertyNode to parent position;
            node.setPosition(parentPosition.x, parentPosition.y);
            const propertyNode = node.incomingLinks[0].getPropertNode();
            propertyNode.setPosition(parentPosition.x, parentPosition.y);

            node.groupRoot
                .transition()
                .attrTween('transform', function() {
                    return function() {
                        const currentPosition = parseTranslate(node.groupRoot.attr('transform'));
                        node.x = currentPosition.x;
                        node.y = currentPosition.y;
                        node.px = node.x;
                        node.py = node.y;
                        node.updateRenderingPosition();
                        return null;
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
