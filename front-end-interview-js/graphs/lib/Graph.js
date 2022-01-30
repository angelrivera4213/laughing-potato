export class Node {
    constructor (value) {
        this._value = value;
        this._adjNodes = new Map();
    }

    get value () {
        return this._value;
    }

    get adjNodes () {
        return this._adjNodes
    }

    addAdjNode (node, weight = 0) {
        if (!this._adjNodes.has(node)) {
            this._adjNodes.set(node, weight);
        }
    }
}

export const UNDIRECTED = Symbol('UNDIRECTED'); // two-ways edges
export const DIRECTED = Symbol('DIRECTED'); // one-way edges

export class Graph {
    constructor(graphType = UNDIRECTED) {
        this._graph = new Map();
        this._graphType = graphType;
    }

    get type () {
        return this._graphType;
    }

    addNode (value) {
        if (!this._graph.has(value)) {
            const newNode = new Node(value);
            this._graph.set(value, newNode);
        }
    }

    getNode (value) {
        return this._graph.get(value);
    }

    getAdjNodes (value) {
        return this._graph.get(value).adjNodes;
    }

    addEdge (value, adjValue, weight) {
        if (!this._graph.has(value)) {
            this.addNode(value);
        }

        if (!this._graph.has(adjValue)) {
            this.addNode(adjValue);
        }

        const node = this._graph.get(value);
        const adjNode = this._graph.get(adjValue);

        node.addAdjNode(adjNode, weight);

        if (this._graphType === UNDIRECTED) {
            adjNode.addAdjNode(node, weight);
        }
    }

    addManyEdges (value, adjValues = []) {
        adjValues.forEach(adjValue => {
            let weight = 0;
            let destValue = adjValue;

            if (Array.isArray(adjValue)) {
                [destValue, weight] =  adjValue;
            }

            this.addEdge(value, destValue, weight);
        });
    }


}


export default Graph;
