function isPalindrome (num) {
	if (!Number.isInteger(num) || num < 0) {
		return false
	}

	const digitArr = []
	let remainder = num;

	while (remainder > 0) {
		const digit = remainder % 10;

		digitArr.push(digit)

		remainder = Math.floor(remainder / 10);
	}

	let i = 0;
	let j = digitArr.length - 1;

	while (i <= j) {
		const leftDigit = digitArr[i];
		const rightDigit = digitArr[j];

		if (leftDigit !== rightDigit) {
			return false;
		}

		i++;
		j--;
	}

	return true;
}