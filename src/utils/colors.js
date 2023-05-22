export function getColor(percentage) {
	if (percentage === null) return "#d4d4d4"
	const rgb1 = hexToRgb("#ddd6fe")
	const rgb2 = hexToRgb("#5b21b6")

	const r = Math.round(rgb1.r + ((rgb2.r - rgb1.r) * percentage) / 100)
	const g = Math.round(rgb1.g + ((rgb2.g - rgb1.g) * percentage) / 100)
	const b = Math.round(rgb1.b + ((rgb2.b - rgb1.b) * percentage) / 100)

	const hex = rgbToHex(r, g, b)

	return hex
}

function hexToRgb(hex) {
	const r = parseInt(hex.substring(1, 3), 16)
	const g = parseInt(hex.substring(3, 5), 16)
	const b = parseInt(hex.substring(5, 7), 16)
	return { r, g, b }
}

function rgbToHex(r, g, b) {
	const componentToHex = function (c) {
		const hex = c.toString(16)
		return hex.length == 1 ? "0" + hex : hex
	}
	const hex = "#" + componentToHex(r) + componentToHex(g) + componentToHex(b)
	return hex
}
