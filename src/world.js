import Globe from "globe.gl"
import GlobeTexture from "./assets/globe/earth-day.jpg"
import countries from "./assets/globe/countries.json"
import { getGiniColor } from "./utils/gini"

const globeContainer = document.querySelector("#globe-container")

export class World {
	constructor(typeSelected = "gini", yearSelected = 1980) {
		this.yearSelected = yearSelected
		this.typeSelected = typeSelected
		this.colors = {
			gini: getGiniColor,
		}

		this.globe = Globe()(globeContainer)
			.backgroundColor("#0000")
			.globeImageUrl(GlobeTexture)
			.polygonsData(countries.features)
			.polygonStrokeColor(() => "#fff")
			.polygonSideColor(() => "#fff")

		this.updateYear(yearSelected)
	}

	updateYear(year) {
		this.yearSelected = year
		this.globe.polygonCapColor((country) =>
			this.colors[this.typeSelected](country, this.yearSelected)
		)
	}
}
