// ['a', 'b', 'c', 'd'],
// ['a', 'b', '-B', '-B', 'a', 'b', 'c', '-B', 'c', 'd']
const BACKSPACE = '-B';
const SEPARATOR = ',';

function _computeString (keys) {
    const stack = [];

    keys.forEach(key => {
        if (key === BACKSPACE) {
            stack.pop();
            return;
        }

        if (key === SEPARATOR) {
            return;
        }

        stack.push(key);
    });

    return stack.join('');
}

function _equivalentKeyPress (orig, other) {
    return _computeString(orig) === _computeString(other);
}

function equivalentKeyPress(arrs) {
    const [orig, other] = arrs;
    return _equivalentKeyPress(orig.split(','), other.split(','));
}
