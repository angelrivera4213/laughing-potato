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

var UNDIRECTED = Symbol('UNDIRECTED'); // two-ways edges
var DIRECTED = Symbol('DIRECTED'); // one-way edges

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

        return this._getShortestPath(root, this._graph);
    }

    _getShortestPath (root, graph) {
        const spt = new Map();
        const distances = new Map();

        for (const v of graph.values()) {
            console.log('_getShortestPath.root', root);
            console.log('_getShortestPath.v', v);
            let distance = Infinity;

            if (root === v) {
                distance = 0;
            }

            distances.set(v, distance);
        }

        while(spt.size !== graph.size) {
            console.log('distances', distances);
            const u = this._getMinDistance(distances);
            console.log('u', u)
            spt.set(u, distances.get(u));
            this._updateAdjVerticesDistance(u, distances);
            distances.delete(u);
        }

        return spt;
    }

    _updateAdjVerticesDistance (u, distances) {
        const uDistance = distances.get(u);
        const adjNodes = u.adjNodes;

        for (const [v, d] of adjNodes.entries()) {
            const vDistance = distances.get(v);
            const newDistance = uDistance + d;

            console.log('vDistance', vDistance);
            console.log('newDistance', newDistance);

            if (newDistance < vDistance) {
                distances.set(v, newDistance);
            }
        }
    }

    _getMinDistance (distances) {
        console.log('_getMinDistance.distances', distances);
        let minDistance = Infinity;
        let u = null;
        for (const [v, d] of distances.entries()) {
            console.log('v', v);
            console.log('d', d);
            if (d < minDistance) {
                minDistance = d;
                u = v;
            }
        }

        return u;
    }
}

class BFSGraph extends mix(Graph).with(BFSMixin, DFSMixin, ShortestPathMixin) {
    bfs (value) {
        const root = this.getNode(value);
        this.doBFS(root);
    }

    dfs (value) {
        const root = this.getNode(value);
        this.doDFS(root);
    }

    shortestPath (value) {
        const root = this.getNode(value);
        return this.getShortestPath(root);
    }
}


var myBFSGraph = new BFSGraph();

myBFSGraph.addManyEdges(0, [[1, 1], [2, 3]]);
myBFSGraph.addManyEdges(1, [[3, 5], [4, 1]]);
myBFSGraph.addManyEdges(2, [[5, 7], [6, 2]]);
myBFSGraph.addManyEdges(5, [[7, 10]]);
myBFSGraph.addManyEdges(4, [[7, 5]]);






