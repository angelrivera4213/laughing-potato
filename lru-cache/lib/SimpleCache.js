'use strict';

class SimpleLRUCache {
    constructor (capacity) {
        this._capacity = capacity;
        this._cache = new Map();
    }

    add (key, value) {
        if (this._cache.size === this._capacity) {
            const lruKey = this._getLeastRecentKey();
            this._cache.delete(lruKey);
        }

        this._capacity.set(key, value);
    }

    get (key) {
        const value = this._cache.get(key);
        if (this._cache.has(key)) {
            // remove and re-add to make most recent
            this._cache.delete(key);
            this._cache.set(key, value);
        }
        return value;
    }

    getMostRecent () {
        return this._cache.get(this._getMostRecentKey());
    }

    getLeastRecent () {
        return this._cache.get(this._getLeastRecentKey());
    }

    _getMostRecentKey () {
        return Array.from(this._cache.keys())[this._cache.size - 1];
    }

    _getLeastRecentKey () {
        return this._cache.keys().next().value;
    }
}

export default SimpleCache;
