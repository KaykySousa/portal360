import Globe from "globe.gl"
import countries from "./assets/globe/countries.json"
import GlobeTexture from "./assets/globe/earth-day.jpg"
import { gini } from "./utils/gini"
import { gdpPerCapita } from "./utils/gdp-per-capita"
import { hdi } from "./utils/hdi"
import { renderIndexChart } from "./utils/chart"

const globeContainer = document.querySelector("#globe-container")

export class World {
	constructor(indexTypeSelected = "gini", yearSelected = 1980) {
		this.indexTypes = {
			gini,
			"gdp-per-capita": gdpPerCapita,
			hdi,
		}

		this.yearSelected = yearSelected
		this.indexTypeSelected = indexTypeSelected
		this.indexType = this.indexTypes[indexTypeSelected]
		this.countriesSelectedProperties = new Set()
		this.compare = false

		this.globe = Globe()(globeContainer)
			.backgroundColor("#0000")
			.globeImageUrl(GlobeTexture)
			.polygonsData(countries.features)
			.polygonStrokeColor(() => "#fff")
			.polygonSideColor(() => "#fff")
			.polygonLabel(
				(country) =>
					`<div class="bg-secondary rounded-1 fw-semibold p-1">
						<img src="https://flagcdn.com/24x18/${country.properties.ISO_A2.toLowerCase()}.webp"/>
						${country.properties.ADMIN}
					</div>`
			)
			.onPolygonHover((polygon) => {
				if (!polygon) return this.globe.polygonAltitude(0.01)

				this.globe.polygonAltitude((country) =>
					country.properties.ISO_A3 === polygon.properties.ISO_A3
						? 0.03
						: 0.01
				)
			})
			.onPolygonClick((polygon, event, { lat, lng }) => {
				this.turnGlobe({ lat, lng })

				if (!this.compare) this.countriesSelectedProperties.clear()

				if (
					!this.indexType.data[polygon.properties.ISO_A3] ||
					Object.values(
						this.indexType.data[polygon.properties.ISO_A3]
					).every((value) => !value || !Number(value))
				)
					return alert("Não foram encontrados dados do país.")

				this.countriesSelectedProperties.add(polygon.properties)
				renderIndexChart()
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

	turnGlobe(coords) {
		this.globe.pointOfView(coords, 500)
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
