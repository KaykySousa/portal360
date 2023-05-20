import "./style.scss"

import { World } from "./world"

const yearSelect = document.getElementById("year-select")
const indexTypeSelect = document.getElementById("index-type-select")

export const world = new World()

yearSelect.addEventListener("input", (e) => world.updateYear(e.target.value))
indexTypeSelect.addEventListener("input", (e) => world.updateIndexType(e.target.value))
