function mergeRanges (times) {
    times = [...times];

    times.sort((firstTime, secondTime) => {
        return firstTime.startTime - secondTime.startTime;
    });

    let { startTime, endTime } = times[0] || {};

    const mergedTimes = []

    times.forEach((time, index) => {
        if (time.startTime >= startTime && time.startTime <= endTime) {
            endTime = Math.max(endTime, time.endTime);

            if (index === times.length - 1) {
                mergedTimes.push({startTime, endTime});
            }

            return;
        }

        mergedTimes.push({startTime, endTime});
        startTime = time.startTime;
        endTime = time.endTime;

        if (index === times.length - 1) {
            mergedTimes.push({startTime, endTime});
        }
    });



    return mergedTimes;
}
