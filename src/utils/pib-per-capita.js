import pibPerCapitaData from "../assets/data/per-capita.json"
import { getColor } from "./colors"
import { percentageScale } from "./scale"

export const pibPerCapita = {
	data: pibPerCapitaData,

	getColor(country, yearSelected) {
		const index = this.data[country.properties.ISO_A3]
		// Ordena os valores do ano selecionado do maior para o menor
		const sortededCountries = Object.values(this.data)
			.filter((country) => country[yearSelected])
			.sort((a, b) => (Number(a[yearSelected]) > Number(b[yearSelected]) ? 1 : -1))

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
