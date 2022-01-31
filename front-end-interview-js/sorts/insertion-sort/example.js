function insertionSort (arr) {
	if (!Array.isArray(arr)) {
		return arr;
	}

	for (let i = 1; i < arr.length; i++) {
		const key = arr[i];
		let j = i - 1;

		while (j >= 0 && arr[j] > key) {
			arr[j + 1] = arr[j];
			j--;
		}

		arr[j + 1] = key;
	}

	return arr;
}

insertionSort([5, 2, 4, 1, 9, -1]);
insertionSort([]);
insertionSort([20, 30, 90, -20, -Infinity, -0, 0, NaN]);
insertionSort([-Infinity, 20, 30, 90, -20, 30]);