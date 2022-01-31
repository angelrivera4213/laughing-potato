export function _swap (arr, i, j) {
	const value = arr[i];
	arr[i] = arr[j];
	arr[j] = value;
	return arr;
}

export function _bubbleSort (arr) {
	const n = array.length;
	for (let i = 0; i < n; i++) {
		for (let j = 0; j < n - i ; j++) {
			if (arr[j] > arr[j + 1]) {
				_swap(arr, j, j + 1);
			}
		}
	}
	return arr;
} 

export default function bubbleSort (arr) {
	if (!Array.isArray(arr)) {
		return arr;
	}

	_bubbleSort(arr);
}