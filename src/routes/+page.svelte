<script lang="ts">
	import { getSealPrices, getSeals } from '$entities/seals'
	import {
		seals,
		mySeals,
		myStats,
		mySealPrices,
		sealPrices
	} from '$entities/seals/model'
	import type { MyStats } from '$entities/seals/type'
	import { objectBy } from '$shared/lib'
	import { Section } from '$shared/section'
	import {
		SelectSealForm,
		SealPriceForm,
		SealCalculator,
		SelectedSeals,
		getMySealData
	} from '$widgets/select-seal-form'
	import {
		SEAL_STAT_TABLE,
		STATS,
		type StatType
	} from '$widgets/select-seal-form/config'
	import { onMount } from 'svelte'

	const MY_SEALS_STORAGE = 'DMO_MYS'
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
			const savedData = localStorage.getItem(MY_SEALS_STORAGE)
			if (savedData) {
				console.log(
					'mySEalSVaed',
					JSON.parse(savedData).map(({ sealId }) => sealId)
				)
				mySeals.add(...JSON.parse(savedData))
			}
		}
	})

	const saveMySeals = () => {
		localStorage.setItem(MY_SEALS_STORAGE, JSON.stringify($mySeals))
	}
	const saveMySealPrices = () => {
		localStorage.setItem(SEAL_PRICE_STORAGE, JSON.stringify($mySealPrices))
	}
	$: statCalc = (statType: StatType) => {
		const mySealsByStatType = objectBy(
			$mySeals,
			({ sealId }) => getMySealData($seals, sealId).statType
		)
		if (!mySealsByStatType) return 0
		const sealsByStatType = mySealsByStatType[statType]
		if (!sealsByStatType || sealsByStatType.length === 0) {
			return 0
		}
		let resultValue = 0
		sealsByStatType.forEach(({ sealId, count }) => {
			let sealPercent = 0
			for (const statTable of SEAL_STAT_TABLE) {
				if (count >= statTable.sealCount) {
					sealPercent = statTable.percent
				} else {
					break
				}
			}
			const seal = getMySealData($seals, sealId)
			const maxIncrease = seal.maxIncrease
			resultValue += maxIncrease * (sealPercent / 100)
		})
		return resultValue
	}

	$: {
		const newMyStats = STATS.reduce((result, { type }) => {
			result[type] = statCalc(type)
			return result
		}, {} as MyStats)
		myStats.set(newMyStats)
	}
</script>

<svelte:head>
	<title>디지몬 마스터즈 도구 모음 | dom tools</title>
	<meta
		name="description"
		content="디지몬 마스터즈 도구 모음 사이트 dom tools 입니다. 보유 중인 씰을 등록하고 목표 능력치를 위한 효율적인 씰 구성을 편리하게 확인해보세요!"
	/>
</svelte:head>

<div class="grid gap-4 lg:grid-cols-2">
	<Section>
		<h2 class="mb-4 text-lg font-bold">내 씰 설정</h2>
		<SelectSealForm {saveMySeals} />
	</Section>
	<SelectedSeals {saveMySeals} />
	<Section>
		<h2 class="mb-4 text-lg font-bold">씰 가격표</h2>
		<SealPriceForm {saveMySealPrices} />
	</Section>
	<SealCalculator />
</div>
