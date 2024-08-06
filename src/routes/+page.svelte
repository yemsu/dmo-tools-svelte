<script lang="ts">
	import { getSealPrices, getSeals } from '$entities/seals'
	import {
		mySealPrices,
		mySeals,
		myStats,
		sealPrices,
		seals
	} from '$entities/seals/model'
	import type { Stats } from '$entities/seals/type'
	import { objectBy } from '$shared/lib'
	import { Inner } from '$shared/section'
	import { MySeals, TotalSeals, getMySealData } from '$widgets/select-seal-form'
	import { SealCalculator } from '$widgets/seal-calculator'
	import {
		SEAL_STAT_TABLE,
		STATS,
		type StatType
	} from '$widgets/select-seal-form/config'
	import { onMount } from 'svelte'

	const SEAL_PRICE_STORAGE = 'DMO_MYP'
	onMount(async () => {
		// seals
		const sealsFetched = await getSeals()
		seals.set(sealsFetched)
		// sealPrices
		const sealPricesFetched = await getSealPrices('modifiedAt')
		if ($mySealPrices.length === 0) {
			const savedData = localStorage.getItem(SEAL_PRICE_STORAGE)
			if (savedData) {
				mySealPrices.set(JSON.parse(savedData))
			}
		}
		const newSealPrices = sealPricesFetched.map((sealPrice) => {
			const mySealPrice = $mySealPrices.find(
				({ sealId }) => sealId === sealPrice.sealId
			)
			return mySealPrice || sealPrice
		})
		sealPrices.set(newSealPrices)
		// my seals
		if ($mySeals.length === 0) {
			mySeals.loadSavedData()
		}
	})
	const saveMySealPrices = () => {
		localStorage.setItem(SEAL_PRICE_STORAGE, JSON.stringify($mySealPrices))
	}
	$: statCalc = (statType: StatType) => {
		const mySealsByStatType = objectBy(
			$mySeals,
			({ id }) => getMySealData($seals, id).statType
		)
		if (!mySealsByStatType) return 0
		const sealsByStatType = mySealsByStatType[statType]
		if (!sealsByStatType || sealsByStatType.length === 0) {
			return 0
		}
		let resultValue = 0
		sealsByStatType.forEach(({ id, count }) => {
			let sealPercent = 0
			for (const statTable of SEAL_STAT_TABLE) {
				if (count >= statTable.sealCount) {
					sealPercent = statTable.percent
				} else {
					break
				}
			}
			const seal = getMySealData($seals, id)
			const maxIncrease = seal.maxIncrease
			resultValue += maxIncrease * (sealPercent / 100)
		})
		return resultValue
	}

	$: {
		const newStats = STATS.reduce((result, { type }) => {
			result[type] = statCalc(type)
			return result
		}, {} as Stats)
		myStats.set(newStats)
	}
</script>

<svelte:head>
	<title>디지몬 마스터즈 씰 효율 계산기 | DMO tools</title>
	<meta
		name="description"
		content="디지몬 마스터즈 온라인 씰 효율 계산기 DMO tools 입니다. 보유 중인 씰을 등록하고 목표 능력치를 위한 효율적인 씰 리스트를 편리하게 확인해보세요!"
	/>
</svelte:head>

<Inner class="grid gap-2 overflow-hidden md:h-content-fill-h md:grid-cols-2">
	<TotalSeals />
	<SealCalculator />
	<MySeals />
</Inner>
