import { getGachaList } from '$entities/gacha'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async () => {
	const gachaList = await getGachaList()
	const gachaListSorted = gachaList.sort((a, b) => b.ticketCost - a.ticketCost)

	return {
		gachaSummons: gachaListSorted.filter(({ type }) => type === 'DATA_SUMMON'),
		gachaDraws: gachaListSorted.filter(({ type }) => type === 'DIGITAL_DRAW')
	}
}
