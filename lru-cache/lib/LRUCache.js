'use strict';

export class Node {
    constructor(value, next = null, previous = null) {
        this._value = value;
        this._next = next;
        this._previous = previous;
    }

    get value () {
        return this._value;
    }

    get next () {
        return this._next;
    }

    get previous () {
        return this._previous;
    }

    set value (value = null) {
        this._value = value;
    }

    set next (next = null) {
        this._next = next;
    }

    set previous (previous = null) {
        return this._previous = previous;
    }
}

export class LRUCache {
    constructor (capacity) {
        this._head = null;
        this._tail = null;
        this._cache = new Map();
        this._capacity = capacity;
        this._size = 0;
    }

    get size () {
        return this._size;
    }

    cache (key, value) {
        if (this._cache._size === this._capacity) {
            // Delete the least recently used
            const last = this._removeLast();
            last.value.delete();
        }

        // Add key and new node
        const n = this._addFirst({
            value: value,
            delete: () => {
                // removes itself from the cache
                this._cache.delete(key)
            }
        });
        this._cache.set(key, n);
    }

    get (key) {
        const cache = this._cache;

        if (!cache.has(key)) {
            return;
        }

        const node = cache.get(key);
        this._removeNode(node);
        node.value.delete();

        const n = this._addFirst(node.value.value);
        this._cache.set(key, n);


        return node.value.value;
    }

    getMostRecent () {
        return this._head.value.value;
    }

    getLeastRecent () {
        return this._tail.value.value;
    }

    _removeNode (node) {
         if (!node) {
             return;
         }

         const previous = node.previous;
         const next = node.next;

         if (previous) {
             previous.next = next;
         }

         if (next) {
             next.previous = previous;
         }

         if (node === this._tail) {
             this._tail = previous;
         }

         if (node === this._head) {
             this._head = next;
         }
    }

    _addFirst (value) {
        const head = this._head;
        const n = new Node(value, head, null);
        this._head = n;
        this.size++;

        if (head !== null) {
            head.previous = n;
        }

        if (this._tail === null) {
            this._tail = n;
        }

        return n;
    }

    _addLast () {
        const tail = this._tail;
        const n = new Node(value, null, tail);
        this._tail = n;
        this.size++;

        if (tail !== null) {
            tail.next = n;
        }

        if (this._head === null) {
            this._head = n;
        }

        return n;
    }

    _removeLast () {
        /* TODO */
        const tail = this._last;
        const head = this._head;

        if (tail === head) {
            this._tail = null;
            this._head = null;

            return tail;
        }

        const previous = tail.previous;
        previous.next = null;

        return tail;
    }
}
