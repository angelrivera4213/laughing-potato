function isFirstComeFirstServed (takeout, dinein, served) {
    takeout = takeout || [];
    dinein = dinein || [];
    served = served || [];

    let tIdx = 0;
    let dIdx = 0;
    let sIdx = 0;

    while (sIdx < served.length) {
        const takeoutId = takeout[tIdx];
        const dineinId = dinein[dIdx];
        const servedId = served[sIdx];


        if (takeoutId !== servedId && dineinId !== servedId) {
            return false;
        }

        if (takeoutId === servedId) {
            tIdx++;
        }

        if (dineinId === servedId) {
            dIdx++;
        }

        sIdx ++;
    }

    return true;
}
