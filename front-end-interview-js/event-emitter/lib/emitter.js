'use strict';

class EventEmitter {
    constructor () {
        this._listeners = {};
    }

    addEventListener (type, listener) {
        if (typeof type !== 'string' || typeof listener !== 'function') {
            return;
        }

        const listeners = this._listeners[type] || new Set();

        listeners.add(listener);
    }

    removeEventListener (type, listener) {
        const listeners = this._listeners[type];

        if (!(listeners instanceof Set)) {
            return;
        }

        listeners.delete(listener);
    }

    dispatchEvent (type, data) {
        const listeners = this._listeners[type];

        if (!(listeners instanceof Set)) {
            return;
        }

        listeners.forEach((listener) => {
            if (typeof listener === 'function') {
                listener({
                    type,
                    data
                });
            }
        });
    }
}
