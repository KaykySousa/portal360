import { world } from "./main"

const yearSelect = document.getElementById("year-select")

const indexTypeNav = document.querySelector("#nav-index")

const overlay = document.getElementById("overlay")
const modalTitle = document.getElementById("modal-title")
const modalCloseButton = document.getElementById("modal-close")

function getYears() {
	const years = new Set()
	Object.values(world.indexType.data).forEach((countryData) => {
		Object.keys(countryData).forEach((year) => {
			if (countryData[year] && Number(year)) years.add(Number(year))
		})
	})
	yearSelect.innerHTML = null

	const sortedYears = Array.from(years).sort()

	sortedYears.forEach((year) => {
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

world.globe.onPolygonClick((country) => {
	world.updateCountrySelected(country)
	modalTitle.innerText = world.countrySelectedProperties.ADMIN
	overlay.classList.replace("d-none", "d-flex")
})

modalCloseButton.addEventListener("click", () => {
	overlay.classList.replace("d-flex", "d-none")
})

overlay.addEventListener("click", (e) => {
	if (e.target === overlay) {
		overlay.classList.replace("d-flex", "d-none")
	}
})
