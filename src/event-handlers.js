import { world } from "./main"

const yearSelect = document.getElementById("year-select")

const indexTypeNav = document.querySelector("#nav-index")

function getYears() {
	const years = new Set()
	Object.values(world.indexType.data).forEach((countryData) => {
		Object.keys(countryData).forEach((year) => {
			if (countryData[year] && Number(year)) years.add(Number(year))
		})
	})
	yearSelect.innerHTML = null
	
	const sortedYears = Array.from(years)
		.sort()

	sortedYears
		.forEach((year) => {
			yearSelect.innerHTML += `<option value="${year}">${year}</option>`
		})
	
	world.updateYear(sortedYears[0])
}

world.globe.onGlobeReady(getYears)

yearSelect.addEventListener("input", (e) => world.updateYear(e.target.value))

indexTypeNav.addEventListener("input", (e) => {
	world.updateIndexType(e.target.id)
	getYears()
})