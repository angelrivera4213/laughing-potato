export function _swap (arr, i, j) {
	const value = arr[i];
	arr[i] = arr[j];
	arr[j] = value;
	return arr;
}


export function _partition (arr, start, end) {
	const pivot = arr[end];
	let storeIndex = start;

	for (let i = start; i < end; i++) {
		if (arr[i] <= pivot) {
			_swap(arr, storeIndex, i);
			storeIndex++;
		}
	}

	_swap(arr, storeIndex, end);

	return storeIndex;
}

export function _quickSort (arr, start, end) {
	if (start >= end) {
		return;
	}

	const pivotIndex = _partition(arr, start, end);

	_quickSort(arr, start, pivotIndex - 1);
	_quickSort(arr, pivotIndex + 1, end);
}


export default function quickSort (arr) {
	if (!Array.isArray(arr)) {
		return arr;
	}

	_quickSort(arr, 0, arr.length);

	return arr;
}

mergeSort([5, 2, 4, 1, 9, -1]);
mergeSort([]);
mergeSort([20, 30, 90, -20, -Infinity, -0, 0, NaN]);
mergeSort([-Infinity, 20, 30, 90, -20, 30]);

