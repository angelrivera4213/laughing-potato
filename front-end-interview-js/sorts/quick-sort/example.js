function _swap (arr, i, j) {
	const value = arr[i];
	arr[i] = arr[j];
	arr[j] = value;
	return arr;
}


function _partition (arr, start, end) {
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

function _quickSort (arr, start, end) {
	if (start >= end) {
		return;
	}

	const pivotIndex = _partition(arr, start, end);

	_quickSort(arr, start, pivotIndex - 1);
	_quickSort(arr, pivotIndex + 1, end);
}


function quickSort (arr) {
	if (!Array.isArray(arr)) {
		return arr;
	}

	_quickSort(arr, 0, arr.length);

	return arr;
}