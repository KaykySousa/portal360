import { Chart } from "chart.js/auto"
import { world } from "../main"
import { Modal } from "bootstrap"

const modalTitle = document.getElementById("modal-title")
const dataModal = new Modal("#data-modal")

export function renderIndexChart() {
	const chartData = Object.entries(
		world.indexType.data[world.countrySelectedProperties.ISO_A3]
	)
		.filter(([year, value]) => Number(year) && value !== "")
		.map(([year, value]) => ({
			x: Number(year),
			y: parseFloat(value),
		}))
		.sort((a, b) => a.x - b.x)
	renderChart(chartData)
	modalTitle.innerText = world.countrySelectedProperties.ADMIN
	dataModal.show()
}

export function renderChart(chartData) {
	const ctx = document.getElementById("modal-chart")
	if (Chart.getChart(ctx)) Chart.getChart(ctx).destroy()
	new Chart(ctx, {
		type: "line",
		data: {
			datasets: [
				{
					label: `${world.indexTypeSelected.toLocaleUpperCase()} - ${
						world.countrySelectedProperties.ADMIN
					}`,
					data: chartData,
					tension: 0.1,
				},
			],
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
					min: chartData[0].x,
					max: chartData.at(-1).x,
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
