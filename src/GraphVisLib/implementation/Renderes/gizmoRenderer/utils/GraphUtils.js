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

// Shared D3 migration utilities for the gizmoRenderer.
// Replaces d3.transform() from D3 v3 with pure string parsing
// that has no D3 dependency and works with any D3 version.

// Parses translate(x, y) from an SVG transform attribute string.
// Replaces d3.transform(str).translate[0] and .translate[1]
export function parseTranslate(transformString) {
  if (!transformString) {
    return { x: 0, y: 0 };
  }

  const translateMatch = transformString.match(
    /translate$\s*([+-]?[\d.]+)\s*,\s*([+-]?[\d.]+)\s*$/
  );

  if (!translateMatch) {
    return { x: 0, y: 0 };
  }

  return {
    x: Number.parseFloat(translateMatch[1]),
    y: Number.parseFloat(translateMatch[2]),
  };
}

// Parses scale(k) or the scale component of translate(x,y)scale(k)
// from an SVG transform attribute string.
// Replaces d3.transform(str).scale[0]
export function parseScale(transformString) {
  if (!transformString) {
    return 1;
  }

  const scaleMatch = transformString.match(
    /scale$\s*([+-]?[\d.]+)\s*$/
  );

  if (!scaleMatch) {
    return 1;
  }

  return Number.parseFloat(scaleMatch[1]);
}

// Builds a D3 v7 ZoomTransform from separate translation and scale values.
// Replaces the pattern of calling zoom.translate(arr) + zoom.scale(k)
// which no longer exists in D3 v4+.
// Usage: applyZoomTransform(selection, zoom, [x, y], k)
export function buildZoomTransform(translationArray, scaleFactor) {
  const d3 = require('d3');
  return d3.zoomIdentity
    .translate(translationArray[0], translationArray[1])
    .scale(scaleFactor);
}