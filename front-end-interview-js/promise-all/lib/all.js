'use strict';

export default function all (promises) {
    return new Promise ((resolve, reject) => {
        let result = new Map();
        let pending = 0;
        for (const promise of promises) {
            pending++;
            result.set(promise);

            promise.then(value => {
                result.set(promise, value);
                pending--;

                if (pending === 0) {
                    resolve(Array.from(result.values()));
                }
            }).catch(err => {
                reject(err);
            })
        }
    });
}
