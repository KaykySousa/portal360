import Globe from "globe.gl"
import countries from "./assets/globe/countries.json"
import GlobeTexture from "./assets/globe/earth-day.jpg"
import { gini } from "./utils/gini"
import { gdpPerCapita } from "./utils/gdp-per-capita"

const globeContainer = document.querySelector("#globe-container")

export class World {
	constructor(indexTypeSelected = "gini", yearSelected = 1980) {
		this.indexTypes = {
			gini,
			"gdp-per-capita": gdpPerCapita,
		}

		this.yearSelected = yearSelected
		this.indexTypeSelected = indexTypeSelected
		this.indexType = this.indexTypes[indexTypeSelected]

		this.globe = Globe()(globeContainer)
			.backgroundColor("#0000")
			.globeImageUrl(GlobeTexture)
			.polygonsData(countries.features)
			.polygonStrokeColor(() => "#fff")
			.polygonSideColor(() => "#fff")
			.polygonLabel(
				(country) =>
					`<span class="bg-secondary rounded-1 fw-semibold fs- p-1">${country.properties.ADMIN}</span>`
			)
			.onPolygonHover((polygon) => {
				if (!polygon) return this.globe.polygonAltitude(0.01)

				this.globe.polygonAltitude(country => country.properties.ISO_A3 === polygon.properties.ISO_A3 ? 0.03 : 0.01)
			})
			.height(Math.min(document.body.offsetWidth, 991))
			.width(Math.min(document.body.offsetWidth, 991))

		this._updateColors()
	}

	_updateColors() {
		this.globe.polygonCapColor((country) =>
			this.indexType.getColor(country, this.yearSelected)
		)
	}

	updateYear(year) {
		this.yearSelected = year
		this._updateColors()
	}

	updateIndexType(indexType) {
		this.indexTypeSelected = indexType
		this.indexType = this.indexTypes[this.indexTypeSelected]
		this._updateColors()
	}
}
