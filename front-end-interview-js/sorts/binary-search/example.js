function _binarySearch (arr, searchValue, start, end) {
	if (start > end) {
		return -1;
	}

	const middle = Math.floor((start + end) / 2);
	const value = arr[middle];

	if (value === searchValue) {
		return middle;
	}

	if (searchValue < value) {
		return _binarySearch(arr, searchValue, start, middle - 1);
	}

	return _binarySearch(arr, searchValue, middle + 1, end);
}

function binarySearch (arr, searchValue) {
	if (!Array.isArray(arr)) {
		return -1;
	}
	
	return _binarySearch(arr, searchValue, 0, arr.length - 1);
}

var b1 = binarySearch([0, 1, 2, 3, 4, 5], 2);
var b2 = binarySearch([-5, 0, 1, 2, 3, 4, 5], 2);
var b3 = binarySearch([-5, 0, 1, 2, 3, 4, 5], 2);
var b4 = binarySearch([-5, 0, 1, 2, 3, 4, 5], 100);
var b5 = binarySearch([-5, 0, 1, 2, 3, 4, 5], -5);
var b5 = binarySearch([-5, 0, 1, 2, 3, 4, 5], 5);