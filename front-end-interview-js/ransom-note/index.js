//const development = 'development' === process.env.NODE_ENVIRONMENT 

export const DEFAULT_IGNORED_CHARS = [',', '*', '\'', '.'];
// can use uppercase letters for lowercase and vice versa
// ignore whitespace
// ignore punctuation
function canConstruct (ransomNote, magazine, options = {}) {
	if (typeof ransomNote !== 'string' || typeof magazine !== 'string') {

		// if (development) {
		// 	throw new Error('Expected arguments[0] to be string')
		// }
		return false;
	}


	ransomNote = ransomNote.replace('/\s/g', ''); // handles space,newline,tabs, .etc
	magazine = magazine.replace('/\s/g', '');

	const ignoreRegExp = new RegExp(`(${ignored.map(char => `\\${char}`).join('|')})`, 'g');
	ransomNote = ransomNote.replace(ignoreRegExp, '');
	magazine = ransomNote.replace(ignoreRegExp, '');

	const requiredLetters = {};

	for (const char of ransomNote) {
		const lowerCaseChar = char.toLowerCase()
		requiredLetters[lowerCaseChar] = (requiredLetters[lowerCaseChar] || 0) + 1;
	}

	for (const char of magazine) {
		const lowerCaseChar = char.toLowerCase()
		if (typeof requiredLetters[lowerCaseChar] === 'number') {
			requiredLetters[lowerCaseChar] = requiredLetters[lowerCaseChar] - 1;
		}
	}

	const fulfilled = Object.keys(requiredLetters).every(key => requiredLetters[key] <= 0);

	return fulfilled;
}