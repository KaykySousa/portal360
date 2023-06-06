import "./style.scss"
import { Modal } from "bootstrap"
import * as bootstrap from "bootstrap"

import { World } from "./world"

export const world = new World()
export const newsletterModal = new Modal("#newsletter-modal")
export const dataModal = new Modal("#data-modal")
