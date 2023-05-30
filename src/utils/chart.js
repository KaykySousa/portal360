import { Chart } from "chart.js/auto"
import { world } from "../main"

export function renderChart(chartData) {
	console.log(chartData)
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
