import hdiData from "../assets/data/hdi.json"
import { getColor } from "./colors"
import { percentageScale } from "./scale"

export const hdi = {
	data: hdiData,
	getColor(country, yearSelected) {
		const index = this.data[country.properties.ISO_A3]
		const sortededCountries = Object.values(this.data)
			.filter((country) => country[yearSelected])
			.sort((a, b) =>
				Number(a[yearSelected]) > Number(b[yearSelected]) ? 1 : -1
			)
		return getColor(
			index
				? percentageScale(
						sortededCountries[0][yearSelected],
						sortededCountries.at(-1)[yearSelected],
						index[yearSelected]
				  )
				: null
		)
	},
}
