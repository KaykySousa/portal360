import countries from "../assets/globe/countries.json"

export function getCoordsByCountry(country) {
	const { bbox } = country
	const [lng1, lat1, lng2, lat2] = bbox
	const latitude = (lat1 + lat2) / 2
	const longitude = (lng1 + lng2) / 2
	return { lat: latitude, lng: longitude }
}

export function getCountryByISOA3(isoa3) {
	return countries.features.find(
		(country) => country.properties.ISO_A3 === isoa3
	)
}
