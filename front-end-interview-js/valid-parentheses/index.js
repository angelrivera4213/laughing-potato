function _isValid (s, bracketMap) {
	const stack = [];

	let i = 0;

	while (i < s.length) {
		const char = s[i];

		if (bracketMap.has(char)) {
			// closed bracket
			const openBracket = stack.pop();

			if (bracketMap.get(char) !== openBracket) {
				return false;
			}
		} else {
			// open bracket
			stack.push(char);
		}

		i++;
	}

	return stack.length === 0;
}

function isValid (s) {
	return _isValid(s, new Map([
		[')', '('],
		['}', '{'],
		[']', '[']
	]))
}