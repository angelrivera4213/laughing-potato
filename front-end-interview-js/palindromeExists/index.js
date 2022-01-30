function palindromeExists (string) {
    const availableLetters = new Set();

    for (const char of string) {
        if (availableLetters.has(char)) {
            availableLetters.delete(char);
        } else {
            availableLetters.add(char);
        }
    }

    const remainingLetters = availableLetters.size;

    const even = string.length % 2 === 0;

    return even ? remainingLetters === 0 : remainingLetters === 1;
}
