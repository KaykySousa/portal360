import { world } from "./main"

const yearSelect = document.getElementById("year-select")
const indexTypeSelect = document.getElementById("index-type-select")

function getYears() {
	const years = new Set()
	Object.values(world.indexType.data).forEach((countryData) => {
		Object.keys(countryData).forEach((year) => {
			if (countryData[year] && Number(year)) years.add(Number(year))
		})
	})
	yearSelect.innerHTML = null
	Array.from(years)
		.sort()
		.forEach((year) => {
			yearSelect.innerHTML += `<option value="${year}">${year}</option>`
		})
}

getYears()

yearSelect.addEventListener("input", (e) => world.updateYear(e.target.value))

indexTypeSelect.addEventListener("input", (e) => {
	world.updateIndexType(e.target.value)

	getYears()
})