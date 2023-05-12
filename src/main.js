import "./style.scss"

import Globe from "globe.gl"
import GlobeTexture from "./assets/globe/earth-day.jpg"
import countries from "./assets/globe/countries.json"
import { getColor } from "./utils/colors"

const globeContainer = document.querySelector("#globe-container")
const world = Globe()

world(globeContainer)
	.globeImageUrl(GlobeTexture)
	.polygonsData(countries.features)
	.polygonCapColor(() => {
		return getColor(100)
	})
	.backgroundColor("#0000")
