export function percentageScale(min, max, value) {
	if (value === "") return null
	if (min === max) return 100
	return ((value - min) / (max - min)) * 100
}
