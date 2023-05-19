import gini from "../assets/data/gini.json"
import { yearSelected } from "../main"
import { getColor } from "./colors"
import { percentageScale } from "./scale"

export function getGiniColor(country) {
	const index = gini[country.properties.ISO_A3]

	const sortededCountries = Object.values(gini)
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
}
