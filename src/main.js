import "./style.scss"

import { World } from "./world"

const yearSelect = document.getElementById("year-select")
const indexTypeSelect = document.getElementById("index-type-select")

export const world = new World()

const years = new Set()
Object.values(world.indexTypes[world.indexTypeSelected].data).forEach(
	(countryData) => {
		Object.keys(countryData).forEach((year) => {
			if (countryData[year] && Number(year)) years.add(Number(year))
		})
	}
)
Array.from(years)
	.sort()
	.forEach((year) => {
		yearSelect.innerHTML += `<option value="${year}">${year}</option>`
	})

yearSelect.addEventListener("input", (e) => world.updateYear(e.target.value))
indexTypeSelect.addEventListener("input", (e) =>
	world.updateIndexType(e.target.value)
)
