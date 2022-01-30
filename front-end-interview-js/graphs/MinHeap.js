const MIN_HEAP = Symbol('MIN_HEAP');
const MAX_HEAP = Symbol('MAX_HEAP');

class HeapNode {
    constructor (value, key) {
        this._value = value;
        this._key = key;
    }

    get value () {
        return this._value;
    }

    get key () {
        return this._key;
    }

    set key (key) {
        this._key = key;
    }
}

const minComparator = (a, b) => a < b;
const maxComparator = (a, b) => b < a;

class Heap {
    constructor(comparator = minComparator) {
        this._tree = [];
        this._comparator = minComparator;
    }

    _getNode (i) {
        return this._tree[i];
    }

    _getParent (i) {
        this._tree[this._getParentIndex(i)];
    }

    _getParentIndex (i) {
        return Math.floor((i - 1) / 2);
    }

    _getLeftChild (i) {
        return this._tree[this._getLeftChildIndex(i)];
    }

    _getLeftChildIndex (i) {
        return (i * 2) + 1;
    }

    _getRightChild (i) {
        return this._tree[this._getRightChildIndex(i)];
    }

    _getRightChildIndex (i) {
        return (i * 2) + 2;
    }

    _getHeapSize () {
        return this._tree.length;
    }

    _swap (arr, i, j) {
        const iNode = arr[i];
        const jNode = arr[j];

        arr[i] = jNode;
        arr[j] = iNode;

        return arr;
    }

    // Only allows if new Key has higher priority than existing key
    _increasePriority (i , newKey, comparator) {
        comparator = comparator || this._comparator;

        const node = this._getNode(i);

        if (comparator(node.key, newKey)) {
            // new key does not have higher priority to existing key
            console.log('yoo');
            return;
        }

        console.log('hello');
        node.key = newKey;

        const priority = (i, j) => comparator(this._getNode(i).key, this._getNode(j).key);

        while (i > 0 && priority(i, this._getParentIndex(i))) {
            this._swap(this._tree, i, this._getParentIndex(i));
            i = this._getParentIndex(i);
        }
    }

    _heapify (parentIndex) {
        const heapSize = this._getHeapSize();
        const parentNode = this._getNode(parentIndex);
        const leftIndex = this._getLeftChildIndex(parentIndex);
        const leftNode = this._getLeftChild(parentIndex);
        const rightIndex = this._getRightChildIndex(parentIndex);
        const rightNode = this._getRightChild(parentIndex);
        const comparator = this._comparator;

        let higherPriorityIdx = parentIndex;
        let higherPriorityNode = parentNode;

        if (leftNode && comparator(leftNode.key, higherPriorityNode.key)) {
            higherPriorityIdx = leftIndex;
            higherPriorityNode = leftNode;
        }

        if (rightNode && comparator(rightNode.key, higherPriorityNode.key)) {
            higherPriorityIdx = rightIndex;
            higherPriorityNode = rightNode;
        }

        if (higherPriorityIdx !== parentIndex) {
            this._swap(this._tree, higherPriorityIdx, parentIndex);
            this._heapify(higherPriorityIdx);
        }
    }

    insert (value, key) {
        const node = new HeapNode(value, key);
        const comparator = this._comparator;
        this._tree.push(node);

        let i = this._getHeapSize() - 1;

        const priority = (i, j) => comparator(this._getNode(i).key, this._getNode(j).key);

        while (i > 0 && priority(i, this._getParentIndex(i))) {
            this._swap(this._tree, i, this._getParentIndex(i));
            i = this._getParentIndex(i);
        }
    }

    delete (i) {
        this._increasePriority(i, null, () => true);
        this.removeRoot();
    }

    getRoot () {
        return this._tree[0].value;
    }

    removeRoot () {
        const oldRoot = this.getRoot();
        const newRoot = this._tree.pop();

        this._tree[0] = newRoot;

        this._heapify(0);

        return oldRoot;
    }
}


var minHeap = new Heap();
minHeap.insert({name: 'angel'}, -Infinity);
minHeap.insert({name: 'Ambar'}, 100);
minHeap.insert({name: 'Erica'}, 5);
minHeap.insert({name: 'Dad'}, -20);
minHeap.insert({name: 'Mom'}, 10);
minHeap.insert({name: 'Lupe'}, 15);