'use strict';
function _flattenRecusrive (arr, depth) {
    if (!Array.isArray(arr) || depth === 0) {
        return arr;
    }

    return arr.reduce((acc, value) => acc.concat(_flattenRecusrive(value, depth - 1)), []);
}

function _flattenStack(arr, depth) {
    const flattened = [];
    const stack = [];
    let index = 0;

    while (stack.length !== 0 || arr.length !== index) {
        if (arr.length === index) {
            // pop previous state
            const state = stack.pop();
            arr = state.arr;
            index = state.index;
            depth = state.depth;
        }
        else if (!Array.isArray(arr[index]) || depth === 0) {
            flattened.push(arr[index]);
            index++;
        }
        else {
            // push previous state
            stack.push({
                arr: arr,
                index: index + 1, // we want to get to the next item after visiting nested array
                depth: depth
            });
            arr = arr[index];
            index = 0;
            depth--;
        }
    }

    return flattened;
}

function flatten (arr, depth = 1) {
    return _flattenStack(arr, depth);
}

