import { getGachaList } from '$entities/gacha'
import { getSealPrices, getSeals } from '$entities/seals'
import type { ServerLoad } from '@sveltejs/kit'

export const prerender = true
export const load: ServerLoad = async () => {
	const seals = await getSeals()
	const sealPrices = await getSealPrices('modifiedAt')
	const gachaList = await getGachaList()

	return {
		seals,
		sealPrices,
		gachaSummons: gachaList.filter(({ type }) => type === 'DATA_SUMMON'),
		gachaDraws: gachaList.filter(({ type }) => type === 'DIGITAL_DRAW')
	}
}
