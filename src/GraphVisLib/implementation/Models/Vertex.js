export default class Vertex {
    resourceReference = null;
    constructor() {
        this.__outgoingEdges = [];
        this.__incomingEdges = [];
    }

    addOutgoingEdge(edge) {
        this.__outgoingEdges.push(edge);
    }

    addIncomingEdge(edge) {
        this.__incomingEdges.push(edge);
    }
}
