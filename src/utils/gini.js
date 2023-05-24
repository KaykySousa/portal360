import giniData from "../assets/data/gini.json"
import { getColor } from "./colors"
import { percentageScale } from "./scale"

export const gini = {
	data: giniData,

	getColor(country, yearSelected) {
		const index = this.data[country.properties.ISO_A3]
		// Ordena os valores do ano selecionado do maior para o menor
		const sortededCountries = Object.values(this.data)
			.filter((country) => country[yearSelected])
			.sort((a, b) => (a[yearSelected] > b[yearSelected] ? 1 : -1))

		return getColor(
			index
				? percentageScale(
						sortededCountries[0][yearSelected],
						sortededCountries.at(-1)[
							yearSelected
						],
						index[yearSelected]
				  )
				: null
		)
	},
}
