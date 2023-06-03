import { world } from "./main"
import { Modal } from "bootstrap"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "./services/firebase"
import { renderTable } from "./utils/table"

const yearSelect = document.getElementById("year-select")
const indexTypeNav = document.getElementById("nav-index")
const newsletterForm = document.getElementById("newsletter-form")
const tableHeadItems = document.querySelectorAll("#table-head th")

const newsletterModal = new Modal("#newsletter-modal")

function getYears() {
	const years = new Set()
	Object.values(world.indexType.data).forEach((countryData) => {
		Object.keys(countryData).forEach((year) => {
			if (countryData[year] && Number(year)) years.add(Number(year))
		})
	})
	yearSelect.innerHTML = null

	const sortedYears = Array.from(years).sort()

	sortedYears.forEach((year) => {
		yearSelect.innerHTML += `<option value="${year}">${year}</option>`
	})

	world.updateYear(sortedYears[0])
}

world.globe.onGlobeReady(getYears)

yearSelect.addEventListener("input", (e) => world.updateYear(e.target.value))

indexTypeNav.addEventListener("input", (e) => {
	if (e.target.name !== "index") return

	world.updateIndexType(e.target.id)
	getYears()
	renderTable()
})

newsletterForm.addEventListener("submit", async (e) => {
	e.preventDefault()

	const formData = new FormData(newsletterForm)

	try {
		const name = formData.get("name")
		const email = formData.get("email")
		if (!name || !email) {
			throw new Error("Preencha todos os campos")
		}
		const userRef = await addDoc(collection(db, "users"), {
			name,
			email,
			created_at: serverTimestamp(),
		})
		alert("Cadastro na newsletter concluído!")
		newsletterModal.hide()
	} catch (error) {
		console.error(error)
		alert(
			"Erro ao se cadastrar na newsletter.\nTente novamente mais tarde."
		)
	}
})

tableHeadItems.forEach((headItem) => {
	headItem.addEventListener("click", (e) => {
		const { order, type } = headItem.dataset

		tableHeadItems.forEach((headItem) => {
			headItem.removeAttribute("data-order")
		})

		headItem.dataset.order = (order ?? "desc") === "asc" ? "desc" : "asc"
		return renderTable(type, (order ?? "desc") === "desc")
	})
})

renderTable()
