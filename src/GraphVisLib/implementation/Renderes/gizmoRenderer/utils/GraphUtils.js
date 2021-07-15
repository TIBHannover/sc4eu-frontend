export const getGraphCoordinates = (x, y, translation, scale) => {
    const xn = (x - translation[0]) / scale;
    const yn = (y - translation[1]) / scale;
    return { x: xn, y: yn };
};

export const getSelectedElements = (startPoint, endPoint, graphObject) => {
    // get the nodes and links in the from the graph;

    // but only the rendered ones;

    const elements = graphObject.getRenderedElements();
    const nodes = elements.nodes.filter(item => item.__visible === true);
    const links = elements.links.filter(item => item.__visible === true);
    console.log(links);
    // create bounding box;

    const xLeft = startPoint.x < endPoint.x ? startPoint.x : endPoint.x;
    const xRight = startPoint.x < endPoint.x ? endPoint.x : startPoint.x;

    const yTop = startPoint.y < endPoint.y ? startPoint.y : endPoint.y;
    const yBot = startPoint.y < endPoint.y ? endPoint.y : startPoint.y;

    // QUICK and DIRTY
    const selectedNodes = nodes.filter(item => item.x > xLeft && item.x < xRight && item.y > yTop && item.y < yBot);
    const selectedLinks = links.filter(
        item =>
            item.propertyNodePostion.x > xLeft &&
            item.propertyNodePostion.x < xRight &&
            item.propertyNodePostion.y > yTop &&
            item.propertyNodePostion.y < yBot
    );

    console.log('selected Nodes', selectedNodes);
    console.log('selected Links', selectedLinks);
    // seems okay;

    return [...selectedNodes, ...selectedLinks];
};
