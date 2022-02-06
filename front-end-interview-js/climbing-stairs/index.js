function climbStairs (n) {
	if (n === 0) {
		return 1;
	}

	return climbStairs(n - 1) + climbStairs(n - 2);
}