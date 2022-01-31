function _findRotationIndex (words, start, end) {
	const firstWord = words[start];
	const lastWord = words[end];

	if (start === end) {
		return start;
	}

	if (end - start === 1) {
		// only two in array so compare 
		return end;
	}

	const middle = Math.floor((start + end) / 2);
	const middleWord = words[middle];
	console.log('firstWord', firstWord);
	console.log('lastWord', lastWord);
	console.log('middleWord', middleWord);

	if (middleWord.localeCompare(firstWord) >= 0) {
		// first word has lexicographic priority ex (firstWord = people, middleWorld = banana)
		return _findRotationIndex(words, middle, end);

	} else {
		// the other side is in correct order so we need to search the other side
		return _findRotationIndex(words, start, middle);
	}
}


function findRotationIndex (words) {
	if (!Array.isArray(words) || words.length === 0) {
		return -1;
	}

	return _findRotationIndex(words, 0, words.length - 1);
}

findRotationIndex([
	'ptolemaic',
	'retrograde',
	'supplant',
	'undulate',
	'xenoepist',
	'asymptote',  // <-- rotates here!
	'babka',
	'banoffee',
	'engender',
	'karpatka',
	'othellolagkage',
]);

findRotationIndex([
	'asymptote',
	'babka',
	'banoffee',
	'engender',
	'karpatka',
	'othellolagkage'  // <-- rotates here!
]);

findRotationIndex([
	'babka',
	'banoffee',
	'engender',
	'karpatka',
	'othellolagkage',
	'asymptote',  // <-- rotates here!
]);

// duplicates
findRotationIndex([
	'ptolemaic',
	'retrograde',
	'retrograde',
	'supplant',
	'undulate',
	'xenoepist',
	'asymptote', // <-- rotates here! 
	'asymptote',
	'asymptote',
	'babka',
	'banoffee',
	'engender',
	'karpatka',
	'othellolagkage',
]);

findRotationIndex(['hello']);
findRotationIndex([]);
