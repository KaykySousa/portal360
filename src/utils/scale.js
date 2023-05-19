export function percentageScale(min, max, value) {
	if (!min) {
		min = 0
	}
	if (!value) return null
	return ((value - min) / (max - min)) * 100
}
