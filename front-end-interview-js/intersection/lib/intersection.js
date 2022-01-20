'use strict';

function _binarySearch (arr, value, start, end) {
    const middle = ((start + end) / 2);

    if (start > end) {
        return false;
    }

    if (arr[middle] === value) {
        return true;
    }

    if (arr[middle] < value) {
        return _binarySearch(arr, value, middle + 1, end);
    }

    if (arr[middle] > value) {
        return _binarySearch(arr, value, start, middle - 1);
    }
}

function binarySearch (arr, value) {
    return _binarySearch(arr, value, 0, arr.length - 1);
}


function intersection (nums, list) {
    return nums.filter(num => binarySearch(list, num));
}


function intersectionWithSet (nums, list) {
    const numSet = new Set(nums);
    return list.filter(num => numSet.has(num));
}
