import { getSealPrices, getSeals } from '$entities/seals'
import type { LangType } from '$shared/types'

export const load = async ({ parent }) => {
	const { lang } = await parent()
	const sealPrices = await getSealPrices('modifiedAt', lang as LangType)
	const seals = await getSeals()

	if (lang === 'en') {
		for (const seal of seals) {
			if (seal.engName !== 'Grand Prix Seal') continue
			seal.maxIncrease = 250
			break
		}
	}
	return {
		seals,
		sealPrices
	}
}
