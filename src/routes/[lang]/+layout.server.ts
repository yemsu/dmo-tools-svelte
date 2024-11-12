import { getGachaList } from '$entities/gacha'
import { getSealPrices, getSeals } from '$entities/seals'
import type { ServerLoad } from '@sveltejs/kit'
import { locale, waitLocale } from 'svelte-i18n'

export const load: ServerLoad = async ({ url }) => {
	const seals = await getSeals()
	const gachaList = await getGachaList()
	const gachaListSorted = gachaList.sort((a, b) => b.ticketCost - a.ticketCost)
	const path = url.pathname
	const lang = path.startsWith('/en') ? 'en' : 'kr'

	if (lang === 'en') {
		for (const seal of seals) {
			if (seal.engName !== 'Grand Prix Seal') continue
			seal.maxIncrease = 250
			break
		}
	}

	locale.set(lang)
	await waitLocale()
	const sealPrices = await getSealPrices('modifiedAt', lang)

	return {
		seals,
		sealPrices,
		gachaSummons: gachaListSorted.filter(({ type }) => type === 'DATA_SUMMON'),
		gachaDraws: gachaListSorted.filter(({ type }) => type === 'DIGITAL_DRAW'),
		lang
	}
}
