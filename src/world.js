import Globe from "globe.gl"
import GlobeTexture from "./assets/globe/earth-day.jpg"
import countries from "./assets/globe/countries.json"
import { gini } from "./utils/gini"

const globeContainer = document.querySelector("#globe-container")

export class World {
	constructor(indexTypeSelected = "gini", yearSelected = 1980) {
		this.yearSelected = yearSelected
		this.indexTypeSelected = indexTypeSelected
		this.indexTypes = {
			gini,
		}

		this.globe = Globe()(globeContainer)
			.backgroundColor("#0000")
			.globeImageUrl(GlobeTexture)
			.polygonsData(countries.features)
			.polygonStrokeColor(() => "#fff")
			.polygonSideColor(() => "#fff")
			.polygonLabel((country) => `<span class="bg-secondary rounded-1 fw-semibold fs- p-1">${country.properties.ADMIN}</span>`)
			.height(Math.min(document.body.offsetWidth, 991))
			.width(Math.min(document.body.offsetWidth, 991))

		this.updateYear(yearSelected)
	}

	updateColors() {
		this.globe.polygonCapColor((country) =>
			this.indexTypes[this.indexTypeSelected].getColor(country, this.yearSelected)
		)
	}

	updateYear(year) {
		this.yearSelected = year
		this.updateColors()
	}

	updateIndexType(indexType) {
		this.indexTypeSelected = indexType
		this.updateColors()
	}
}
