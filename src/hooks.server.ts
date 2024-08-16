import { getSealPrices, getSeals } from '$entities/seals'
import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ event, resolve }) => {
	const sealsFetched = await getSeals()
	const sealPricesFetched = await getSealPrices('modifiedAt')
	event.locals.sealsFetched = JSON.stringify(sealsFetched)
	event.locals.sealPricesFetched = JSON.stringify(sealPricesFetched)
	return await resolve(event)
}
