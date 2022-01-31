export function _merge (L, M) {
	const merged = [];
	let i = 0;
	let j = 0;

	while (i < L.length || j < M.length) {
		const mVal = M[j];
		const lVal = L[i];

		if (i >= L.length) {
			merged.push(mVal);
			j++;
		}
		else if (j >= M.length) {
			merged.push(lVal);
			i++;
		}
		else if (mVal < lVal) {
			merged.push(mVal);
			j++;
		} else {
			merged.push(lVal);
			i++;
		}
	}
	
	return merged;
}

export function _mergeSort (arr) {
	if (arr.length <= 1) {
		return arr;
	}

	const middle = Math.floor(arr.length / 2);

	const L = _mergeSort(arr.slice(0, middle));
	const M = _mergeSort(arr.slice(middle));

	return _merge(L, M);
}

export default function mergeSort (arr) {
	if (!Array.isArray(arr)) {
		return arr;
	}

	_mergeSort(arr, 0, arr.length);
}