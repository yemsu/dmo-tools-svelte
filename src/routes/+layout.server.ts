import { getSealPrices, getSeals } from '$entities/seals'
import type { Load } from '@sveltejs/kit'

export const prerender = true
export const load: Load = async () => {
	const seals = await getSeals()
	const sealPrices = await getSealPrices('modifiedAt')
	return {
		seals,
		sealPrices
	}
}
