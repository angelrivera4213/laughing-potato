export function _findRotationIndex (words, start, end) {
	const firstWord = words[start];
	const lastWord = words[end];

	if (start === end) {
		return start;
	}

	if (end - start === 1) {
		// only two in array so compare 
		return lastWord.localeCompare(firstWord) < 0 ? end : start;
	}

	const middle = Math.floor((start + end) / 2);
	const middleWord = words[middle];

	if (middleWord.localeCompare(firstWord) < 0) {
		// first word has lexicographic priority ex (firstWord = people, middleWorld = banana)
		return _findRotationIndex(words, start, middle);
	} else {
		// the other side is in correct order so we need to search the other side
		return _findRotationIndex(words, middle, end);
	}
}


export default function findRotationIndex (words) {
	if (!Array.isArray(words) || words.length === 0) {
		return -1;
	}

	return _findRotationIndex(words, 0, words.length - 1);
}