export function _binarySearch (arr, searchValue, start, end) {
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

export default function binarySearch (arr, searchValue) {
	if (!Array.isArray(arr)) {
		return -1;
	}
	
	return _binarySearch(arr, searchValue, 0, arr.length - 1);
}