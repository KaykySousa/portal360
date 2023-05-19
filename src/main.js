import "./style.scss"

import { World } from "./world"

const yearSelect = document.getElementById("year-select")

const world = new World()

yearSelect.addEventListener("input", (e) => world.updateYear(e.target.value))
