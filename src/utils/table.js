import { world } from "../main"
import { getCoordsByCountry, getCountryByISOA3 } from "./country"
const yearSelect = document.getElementById("year-select")

export function renderTable(sortMethod = "name", ascending = true) {
	const tableBody = document.getElementById("table-body")
	tableBody.innerHTML = ``
	const data = Object.values(world.indexType.data)
		.map((countryData) => {
			const lastYear = Object.keys(countryData).findLast(
				(key) => Number(key) && countryData[key]
			)
			return [
				countryData["Country Name"],
				lastYear,
				countryData[lastYear],
				countryData["Country Code"],
			]
		})
		.sort((a, b) => {
			const i = sortMethod === "name" ? 0 : sortMethod === "year" ? 1 : 2
			if (a[i] == null) return 1
			if (b[i] == null) return -1
			if (sortMethod != "name") {
				a[i] = Number(a[i])
				b[i] = Number(b[i])
			}
			const res = a[i] > b[i] ? 1 : a[i] < b[i] ? -1 : 0
			return ascending ? res : res * -1
		})

	data.forEach((rowData) => {
		const tableRow = document.createElement("tr")

		tableRow.addEventListener("click", () => {
			world.updateYear(rowData[1])
			yearSelect.value = rowData[1]

			const country = getCountryByISOA3(rowData[3])
			const coords = getCoordsByCountry(country)
			world.turnGlobe({
				...coords,
				altitude: 1.5,
			})
			document.body.scrollTop = 0
			document.documentElement.scrollTop = 0
		})

		const name = document.createElement("td")
		name.textContent = rowData[0]
		tableRow.appendChild(name)

		const year = document.createElement("td")
		year.textContent = rowData[1]
		tableRow.appendChild(year)

		const index = document.createElement("td")
		index.textContent = rowData[2]
		tableRow.appendChild(index)

		tableBody.appendChild(tableRow)
	})
}
