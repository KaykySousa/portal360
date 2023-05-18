import gini from "../assets/data/gini.json"
import { getColor } from "./colors"

export function getGiniColor(country) {
    const index = gini[country.properties.ISO_A3]
}