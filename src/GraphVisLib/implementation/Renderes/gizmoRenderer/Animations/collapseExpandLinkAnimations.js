import * as d3 from 'd3';

export const collapsePropertyNodesAnimations = (n1, n2, linksArray, callback) => {
    // compute the center position for the animation;

    const x = n1.x - 0.5 * (n1.x - n2.x);
    const y = n1.y - 0.5 * (n1.y - n2.y);

    const lastIndex = linksArray.length - 1;

    for (let i = 0; i < linksArray.length; i++) {
        collapsePropertyAnimation(linksArray[i], { x, y }, i === lastIndex, callback);
    }
};

export const expandPropertyNodeAnimation = (property, target, last, callback) => {
    const animationDuration = 500;
    // set node and propertyNode to parent position;
    const propertyNode = property.getPropertNode();
    if (!propertyNode) {
        if (last) {
            callback();
        }
        return;
    }
    propertyNode.groupRoot
        .transition()
        .tween('attr.translate', function() {
            return function(t) {
                const tr = d3.transform(propertyNode.groupRoot.attr('transform'));
                propertyNode.x = tr.translate[0];
                propertyNode.y = tr.translate[1];
                propertyNode.px = propertyNode.x;
                propertyNode.py = propertyNode.y;
                property.updateRenderingPosition();
            };
        })
        .duration(animationDuration)
        .attr('transform', 'translate(' + target.x + ',' + target.y + ')')
        .each('end', function() {
            if (last) {
                propertyNode.px = propertyNode.x;
                propertyNode.py = propertyNode.y;
                callback();
            }
        });
};

export const collapsePropertyAnimation = (property, targetPosition, last, callback) => {
    const animationDuration = 500;
    // set node and propertyNode to parent position;
    const propertyNode = property.getPropertNode();
    if (!propertyNode) {
        if (last) {
            callback();
        }
        return;
    }
    propertyNode.groupRoot
        .transition()
        .tween('attr.translate', function() {
            return function(t) {
                const tr = d3.transform(propertyNode.groupRoot.attr('transform'));
                propertyNode.x = tr.translate[0];
                propertyNode.y = tr.translate[1];
                propertyNode.px = propertyNode.x;
                propertyNode.py = propertyNode.y;
                property.updateRenderingPosition();
            };
        })
        .duration(animationDuration)
        .attr('transform', 'translate(' + targetPosition.x + ',' + targetPosition.y + ')')
        .each('end', function() {
            if (last) {
                callback();
            }
        });
};

export const expandPropertyNodesAnimations = (link, parentPos, callback) => {
    if (link.__linkGroup) {
        // we know its a ml link

        const cx = parentPos.x;
        const cy = parentPos.y;
        const numLinks = link.__linkGroup.length;

        const offset = 80;
        const dirX = link.sourceNode.x - link.targetNode.x;
        const dirY = link.sourceNode.y - link.targetNode.y;
        // norm and make orthogonal;
        const length = Math.sqrt(dirX * dirX + dirY * dirY);
        // orthogonal applied;
        const normedX = -dirY / length;
        const normedY = dirX / length;

        if (numLinks % 2 === 0) {
            for (let i = 0; i < numLinks; i++) {
                const targetA = { x: cx + normedX * offset, y: cy + normedY * offset };
                const targetB = { x: cx - normedX * offset, y: cy - normedY * offset };
                if (i % 2 === 0) {
                    expandPropertyNodeAnimation(link.__linkGroup[i], targetA, i === numLinks - 1, callback);
                } else {
                    expandPropertyNodeAnimation(link.__linkGroup[i], targetB, i === numLinks - 1, callback);
                }
            }
        } else {
            link.__linkGroup[0].x = cx;
            link.__linkGroup[0].y = cy;
            for (let i = 1; i < numLinks; i++) {
                const targetA = { x: cx + normedX * offset, y: cy + normedY * offset };
                const targetB = { x: cx - normedX * offset, y: cy - normedY * offset };
                if (i % 2 === 0) {
                    expandPropertyNodeAnimation(link.__linkGroup[i], targetA, i === numLinks - 1, callback);
                } else {
                    expandPropertyNodeAnimation(link.__linkGroup[i], targetB, i === numLinks - 1, callback);
                }
            }
        }
    }
};
