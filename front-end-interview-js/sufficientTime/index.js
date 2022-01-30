function sufficientTime (runTimes, availableTime, threshold) {
    if (!Array.isArray(runTimes)) {
        return false;
    }

    if (
        typeof availableTime !== 'number' ||
        isNaN(availableTime) ||
        availableTime <= 0
    ) {
        return false;
    }

    const seenRunTimes = new Set();

    for (let i; i < runTimes.length; i++) {
        const remainingTime = availableTime - runTimes[i];

        if (remainingTimes.has(remainingTime)) {
            return true;
        }

        seenRunTimes.add(runTimes[i]);
    }

    return false;
}

function sufficientTimeSorted (runTimes, availableTime, threshold) {
    if (!Array.isArray(runTimes)) {
        return false;
    }

    if (
        typeof availableTime !== 'number' ||
        isNaN(availableTime) ||
        availableTime <= 0
    ) {
        return false;
    }

    const seenRunTimes = new Set();

    for (let i; i < runTimes.length; i++) {
        const remainingTime = availableTime - runTimes[i];

        if (remainingTimes.has(remainingTime)) {
            return true;
        }

        seenRunTimes.add(runTimes[i]);
    }

    return false;
}