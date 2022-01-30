import { Node } from '../lib/Graph';

const BFSMixin = (superclass) => class extends superclass {
    doBFS (node) {
        const root = this.getNode(value);

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

export default BFSMixin;
