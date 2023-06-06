import { Chart } from "chart.js/auto"
import { dataModal, world } from "../main"

const modalTitle = document.getElementById("modal-title")

export function renderIndexChart() {
	const countriesSelectedProperties = Array.from(
		world.countriesSelectedProperties
	)

	const chartData = countriesSelectedProperties.map(
		(countrySelectedProperties) => {
			const chartCountryData = Object.entries(
				world.indexType.data[countrySelectedProperties.ISO_A3]
			)
				.filter(([year, value]) => Number(year) && value !== "")
				.map(([year, value]) => ({
					x: Number(year),
					y: parseFloat(value),
				}))
				.sort((a, b) => a.x - b.x)

			return {
				label: `${world.indexTypeSelected.toLocaleUpperCase()} - ${
					countrySelectedProperties.ADMIN
				}`,
				data: chartCountryData,
				tension: 0.1,
			}
		}
	)

	console.log(chartData)

	renderChart(chartData)
	modalTitle.innerText =
		countriesSelectedProperties.length === 1
			? countriesSelectedProperties[0].ADMIN
			: "Comparação"
	dataModal.show()
}

export function renderChart(chartData) {
	const ctx = document.getElementById("modal-chart")

	if (Chart.getChart(ctx)) Chart.getChart(ctx).destroy()

	let minX = Infinity
	let maxX = -Infinity

	chartData.forEach((data) => {
		data.data.forEach(({ x }) => {
			minX = Math.min(minX, x)
			maxX = Math.max(maxX, x)
		})
	})

	new Chart(ctx, {
		type: "line",
		data: {
			datasets: chartData,
		},
		options: {
			responsive: true,
			maintainAspectRatio: true,
			interaction: {
				intersect: false,
				mode: "index",
			},
			scales: {
				x: {
					type: "linear",
					min: minX,
					max: maxX,
					title: {
						text: "Ano",
						display: true,
					},
				},
				y: {
					type: "linear",
					title: {
						text: `${world.indexTypeSelected}`,
						display: true,
					},
				},
			},
			animation: false,
		},
	})
}
