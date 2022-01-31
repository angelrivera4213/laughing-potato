function _swap (arr, i, j) {
	const value = arr[i];
	arr[i] = arr[j];
	arr[j] = value;
	return arr;
}

function _bubbleSort (arr) {
	const n = arr.length;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n - i ; j++) {
			if (arr[j] > arr[j + 1]) {
				_swap(arr, j, j + 1);
			}
		}
	}
	return arr;
} 

function bubbleSort (arr) {
	if (!Array.isArray(arr)) {
		return arr;
	}

	return _bubbleSort(arr);
}

bubbleSort([5, 2, 4, 1, 9, -1]);
bubbleSort([]);
bubbleSort([20, 30, 90, -20, -Infinity, -0, 0, NaN]);
bubbleSort([-Infinity, 20, 30, 90, -20, 30]);