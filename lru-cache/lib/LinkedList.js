'use strict'

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

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.size = 0;
    }

    addFirst (value) {
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
    }

    addLast () {
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
    }

    removeFirst () {

    }

    removeLast () {

    }

    get first () {
        return this._head.value;
    }

    get last () {
        return this._tail.value;
    }
}
