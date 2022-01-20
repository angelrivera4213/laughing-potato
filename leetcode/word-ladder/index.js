export default function _ladderLength (beginWord, endWord, wordList) {
    const newWordList = [];
    const similarWords = [];

    let containsEndWord = false;
    let hasEndWord = false;

    wordList.forEach((word) => {
        if (word === endWord) {
            containsEndWord = true;
        }

        let count = 0;
        for (let i = 0; i < word.length; i++) {
            if (beginWord[i] === word[i]) {
                count++;
            }
        }

        if (count === word.length - 1) {
            similarWords.push(word);

            if (word === endWord) {
                hasEndWord = true;
            }
        } else {
            newWordList.push(word)
        }
    });

    if (!containsEndWord) {
        return Infinity;
    }

    if (hasEndWord) {
        return 1;
    }

    let shortestLength = Infinity;
    similarWords.forEach((similarWord) => {
        const length = 1 + _ladderLength(similarWord, endWord, newWordList);

        if (length < shortestLength) {
            shortestLength = length;
        }
    });

    return shortestLength;
}

function ladderLength(beginWord, endWord, wordList) {
    const pathLength = 1 + _ladderLength(beginWord, endWord, wordList);
    return isFinite(pathLength) ? pathLength : 0;
}
