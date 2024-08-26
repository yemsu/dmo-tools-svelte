import { getSealPrices, getSeals } from '$entities/seals'
import type { ServerLoad } from '@sveltejs/kit'

export const prerender = true
export const load: ServerLoad = async () => {
	const seals = await getSeals()
	const sealPrices = await getSealPrices('modifiedAt')

	return {
		seals,
		sealPrices
	}
}
