class Node {
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

const UNDIRECTED = Symbol('UNDIRECTED'); // two-ways edges
const DIRECTED = Symbol('DIRECTED'); // one-way edges

class Graph {
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

class MixinBuilder {
    constructor (superclass) {
        this._superclass = superclass;
    }

    with (...mixins) {
        return mixins.reduce((c, mixin) => mixin(c), this._superclass);
    }
}

let mix = (superclass) => new MixinBuilder(superclass);

let BFSMixin = (superclass) => class extends superclass {
     doBFS (root) {
        if (!(root instanceof Node)) {
            return;
        }

        this._doBFS(root);
    }

    _doBFS (node) {
        const visited = new Set();
        const queue = [];
        visited.add(node);
        queue.push(node);

        while (queue.length > 0) {
            const dNode = queue.shift();
            console.log('node value', dNode.value);

            dNode.adjNodes.forEach(node => {
                if (!visited.has(node)) {
                    visited.add(node);
                    queue.push(node);
                }
            });
        }
    }
};

let DFSMixin = (superclass) => class extends superclass {
    doDFS (root) {
        if (!(root instanceof Node)) {
            return;
        }

        this._doDFS(root);
    }

    _doDFS (node) {
        const visited = new Set();
        const stack = [];
        queue.push(node);

        while (stack.length > 0) {
            const node = stack.pop();
            if (!visited.has(node)) {
                visited.add(node);
                console.log('node => value', value);
                node.adjNodes.forEach(node => stack.push(node))
            }
        }
    }
}

let ShortestPathMixin = (superclass) => class extends superclass {
    getShortestPath (root) {
        if (!(root instanceof Node)) {
            return;
        }

        this._getShortestPath(root, this._graph);
    }

    _getShortestPath (root, graph) {
        const sptSet = new Set();
        const distances = new Map();


        for (const v of graph.keys()) {
            let distance = Infinity;

            if (root.value === v) {
                distance = 0;
            }

            distances.set(v, distance);
        }

        while(sptSet.size !== graph.size) {

        }
    }
}

class BFSGraph extends mix(Graph).with(BFSMixin, DFSMixin) {
    bfs (value) {
        const root = this.getNode(value);
        this.doBFS(root);
    }

    dfs (value) {
        const root = this.getNode(value);
        this.doDFS(root);
    }
}


const myBFSGraph = new BFSGraph();

myBFSGraph.addManyEdges(0, [[1, 1], [2, 3]]);
myBFSGraph.addManyEdges(1, [[3, 5], [4, 1]]);
myBFSGraph.addManyEdges(2, [[5, 7], [6, 2]]);
myBFSGraph.addManyEdges(5, [[7, 10]]);








