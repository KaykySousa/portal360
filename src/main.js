import "./style.scss"

import Globe from "globe.gl"
import GlobeTexture from "./assets/globe/earth-day.jpg"
import countries from "./assets/globe/countries.json"
import { getGiniColor } from "./utils/gini"

const globeContainer = document.querySelector("#globe-container")
const world = Globe()

let typeSelected = "gini"
export let yearSelected = 1980

const colors = {
	gini: getGiniColor,
}

world(globeContainer)
	.backgroundColor("#0000")
	.globeImageUrl(GlobeTexture)
	.polygonsData(countries.features)
	.polygonCapColor(colors[typeSelected])
	.polygonStrokeColor(() => "#fff")
	.polygonSideColor(() => "#fff")
