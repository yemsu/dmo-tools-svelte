import { getGachaList } from '$entities/gacha'
import { getSealPrices, getSeals } from '$entities/seals'
import type { ServerLoad } from '@sveltejs/kit'
import { locale, waitLocale } from 'svelte-i18n'

export const prerender = true
export const load: ServerLoad = async ({ url }) => {
	const lang = url.pathname.split('/')[1] || 'ko'
	const seals = await getSeals()
	const sealPrices = await getSealPrices('modifiedAt')
	const gachaList = await getGachaList()
	const gachaListSorted = gachaList.sort((a, b) => b.ticketCost - a.ticketCost)
	locale.set(lang)
	await waitLocale()

	return {
		seals,
		sealPrices,
		gachaSummons: gachaListSorted.filter(({ type }) => type === 'DATA_SUMMON'),
		gachaDraws: gachaListSorted.filter(({ type }) => type === 'DIGITAL_DRAW'),
		lang
	}
}
