function _merge (L, M) {
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

function _mergeSort (arr) {
	if (arr.length <= 1) {
		return arr;
	}

	const middle = Math.floor(arr.length / 2);

	const L = _mergeSort(arr.slice(0, middle));
	const M = _mergeSort(arr.slice(middle));

	return _merge(L, M);
}

function mergeSort (arr) {
	if (!Array.isArray(arr)) {
		return arr;
	}

	return _mergeSort(arr);
}

mergeSort([5, 2, 4, 1, 9, -1]);
mergeSort([]);
mergeSort([20, 30, 90, -20, -Infinity, -0, 0, NaN]);
mergeSort([-Infinity, 20, 30, 90, -20, 30]);