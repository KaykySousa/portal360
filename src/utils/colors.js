function hslToHex(h, s, l) {
	l /= 100
	const a = (s * Math.min(l, 1 - l)) / 100
	const f = (n) => {
		const k = (n + h / 30) % 12
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, "0")
	}
	return `#${f(0)}${f(8)}${f(4)}`
}

export function getColor(percentage) {
	const MIN_LIGHTNESS = 20
	const MAX_LIGHTNESS = 80

	const lightness =
		100 -
		(percentage * ((MAX_LIGHTNESS - MIN_LIGHTNESS) / (100 - 0)) +
			MIN_LIGHTNESS)

	return hslToHex(325, 100, lightness)
}
