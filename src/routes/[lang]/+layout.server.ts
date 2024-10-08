import { getGachaList } from '$entities/gacha'
import { getSealPrices, getSeals } from '$entities/seals'
import type { ServerLoad } from '@sveltejs/kit'

export const prerender = true
export const load: ServerLoad = async ({ url }) => {
	const seals = await getSeals()
	const sealPrices = await getSealPrices('modifiedAt')
	const gachaList = await getGachaList()
	const gachaListSorted = gachaList.sort((a, b) => b.ticketCost - a.ticketCost)
	const path = url.pathname
	const lang = path.startsWith('/en') ? 'en' : 'kr'

	return {
		seals,
		sealPrices,
		gachaSummons: gachaListSorted.filter(({ type }) => type === 'DATA_SUMMON'),
		gachaDraws: gachaListSorted.filter(({ type }) => type === 'DIGITAL_DRAW'),
		lang
	}
}
