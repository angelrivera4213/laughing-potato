function decodeString(s) {
    return _decode(s, 0, s.length - 1);
}

function _decode (s, start, end) {
    let fullString = '';
    let digit = '';
    let i = start;
    while (i <= end) {
        const char = s[i];
        if (isFinite(parseInt(char))) {
            digit = digit + char;
        }
        else if (char === '[') {
            // deocde inner string
            const end = _getBalanceBracketString(s, i);
            const decodedString = _decode(s, i + 1, end - 1);
            fullString = fullString + _repeatString(decodedString, parseInt(digit));
            i = end;
            digit = '';
        } else {
            fullString = fullString + char;
        }

        i++;
    }

    return fullString;
}


// [abc[ja901[]]] []
// finds end bracket position assuming first char is [
// will return end of string if string is unbalanced
function _getBalanceBracketString(s, start) { 
    let i = start + 1;
    let counter = 1;
    
    while (counter > 0 && i < s.length) {
        const char = s[i];

        if (char === '[') {
            counter++;
        }

        if (char === ']') {
            counter--;
        }

        i++;
    }

    return i - 1;
}

function _repeatString (s, times) {
    let full = '';

    for (let i = 0; i < times; i++) {
        full = full + s;
    }

    return full;
}