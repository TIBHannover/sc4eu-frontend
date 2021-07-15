import uniqBy from 'lodash/uniqBy';
import { expandNodeAnimation } from './collapseNodeAnimation';
export const getParentNodesForExpanding = nodes => {
    const parents = [];

    nodes.forEach(node => {
        if (node.isDatatypeNode) {
            parents.push(node.incomingLinks[0].sourceNode);
        }
    });

    // make unique and return ;
    return uniqBy(parents, '__id');
};

export const smartExpandingLiterals = (node, last, callback) => {
    const datatypeLinks = node.outgoingLinks.filter(item => item.propertyLinkType === 'datatypePropertyType');
    const otherOutgoingLinks = node.outgoingLinks.filter(item => item.propertyLinkType !== 'datatypePropertyType');
    const incommingLinks = node.incomingLinks;
    const allLinks = [].concat(otherOutgoingLinks, incommingLinks);
    let nAngle, nPos;

    const angularSpace = [];
    for (let i = 0; i < allLinks.length; i++) {
        const oX = allLinks[i].targetNode.x - node.x;
        const oY = allLinks[i].targetNode.y - node.y;
        angularSpace.push(angleFromVector(oX, oY));
    }
    const newItemPositions = [];
    const distOffset = 400;
    let sAngle = 0;
    let sOffset = 0;
    if (angularSpace.length === 0) {
        sAngle = angularSpace[0] + 180 - 45;
        sOffset = 90 / datatypeLinks.length;
    }

    if (angularSpace.length === 1) {
        // use a simple heuristic;
        sAngle = angularSpace[0] + 180 - 45;
        sOffset = 90 / datatypeLinks.length;
    }

    if (angularSpace.length > 1) {
        angularSpace.sort(function(a, b) {
            return a - b;
        });
        const angularDistances = [];
        for (let i = 0; i < angularSpace.length - 1; i++) {
            angularDistances.push(angularSpace[i + 1] - angularSpace[i]);
        }
        angularDistances.push(angularSpace[0] + 360 - angularSpace[angularSpace.length - 1]);
        let maxDistance = 0;
        let indexInSpace = 0;
        for (let i = 0; i < angularDistances.length; i++) {
            if (angularDistances[i] > maxDistance) {
                maxDistance = angularDistances[i];
                indexInSpace = i;
            }
        }

        sAngle = 0;
        sOffset = maxDistance / (allLinks.length + 1);
        if (indexInSpace === angularDistances.length - 1) {
            sAngle = angularSpace[angularSpace.length - 1];
        } else {
            sAngle = angularSpace[indexInSpace];
        }
    }

    datatypeLinks.forEach((link, index) => {
        nAngle = sAngle + (index + 1) * sOffset;
        if (nAngle > 360) {
            nAngle -= 360;
        }
        // console.log("Current angle=" + nAngle);
        nPos = angle2NormedVec(nAngle);
        newItemPositions.push({ x: node.x + nPos.x * distOffset, y: node.y + nPos.y * distOffset });
    });
    const lastIndex = datatypeLinks.length - 1;
    for (let i = 0; i < datatypeLinks.length; i++) {
        const targetPosition = newItemPositions[i];
        const itemToAnimate = datatypeLinks[i].targetNode;
        expandNodeAnimation(itemToAnimate, targetPosition, i === lastIndex, callback);
    }
};

const angleFromVector = (vx, vy) => {
    const len = Math.sqrt(vx * vx + vy * vy);
    const nx = vx / len;
    const ny = vy / len;
    let angle = (Math.atan2(-ny, nx) * 180) / Math.PI;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
};

const angle2NormedVec = angle => {
    const xn = Math.cos((angle * Math.PI) / 180);
    const yn = Math.sin((angle * Math.PI) / 180);
    return { x: xn, y: -yn };
};
