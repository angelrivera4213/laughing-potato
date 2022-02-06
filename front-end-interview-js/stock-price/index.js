function bestProfit (prices = []) {
	if (!Array.isArray(prices) || prices.length < 2) {
		// Can't trade so no profit
		return 0;
	}

	let maxProfit = -Infinity;
	let smallest = prices[0];

	for (let i = 1; i < prices.length; i++) {
		const profit = prices[i] - smallest;

		if (profit > maxProfit) {
			maxProfit = profit;
		}

		if (prices[i] < smallest) {
			smallest = prices[i];
		}
	}

	return maxProfit;
}