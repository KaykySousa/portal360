import giniData from "../assets/data/gini.json"
import { getColor } from "./colors"
import { percentageScale } from "./scale"

export const gini = {
	data: giniData,

	getColor(country, yearSelected) {
		const index = this.data[country.properties.ISO_A3]

		const sortededCountries = Object.values(this.data)
			.sort((a, b) => (a[yearSelected] > b[yearSelected] ? 1 : -1))
			.filter((country) => country[yearSelected])

		return getColor(
			index
				? percentageScale(
					sortededCountries[0][yearSelected],
					sortededCountries[sortededCountries.length - 1][
					yearSelected
					],
					index[yearSelected]
				)
				: null
		)
	},
}