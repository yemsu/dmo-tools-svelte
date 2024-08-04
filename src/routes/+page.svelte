<script lang="ts">
	import { mySeals, myStats } from '$entities/seals/model'
	import type { MyStats } from '$entities/seals/type'
	import { objectBy } from '$shared/lib'
	import {
		SelectSealForm,
		SealPriceForm,
		SealCalculator,
		SelectedSeals
	} from '$widgets/select-seal-form'
	import {
		SEAL_STAT_TABLE,
		STATS,
		type StatType
	} from '$widgets/select-seal-form/config'
	import { onMount } from 'svelte'

	const STORAGE_NAME = 'DMO_MYS'
	onMount(async () => {
		if ($mySeals.length > 0) return
		const savedData = localStorage.getItem(STORAGE_NAME)
		if (savedData) {
			mySeals.add(...JSON.parse(savedData))
		}
	})

	const saveMySeals = () => {
		localStorage.setItem(STORAGE_NAME, JSON.stringify($mySeals))
	}
	$: mySealsByStatType = objectBy($mySeals, (mySeal) => mySeal.statType)
	$: console.log('mySealsByStatType', mySealsByStatType)
	$: statCalc = (statType: StatType) => {
		if (!mySealsByStatType) return 0
		const sealsByStatType = mySealsByStatType[statType]
		if (!sealsByStatType || sealsByStatType.length === 0) {
			return 0
		}
		let resultValue = 0
		sealsByStatType.forEach(({ maxIncrease, count }) => {
			let sealPercent = 0
			for (const statTable of SEAL_STAT_TABLE) {
				if (count <= statTable.sealCount) {
					sealPercent = statTable.percent
					break
				}
			}
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
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="grid grid-cols-2 gap-4">
	<section class="rounded-md border border-gray-600 p-4">
		<h2 class="mb-4 text-lg font-bold">내 씰 설정</h2>
		<SelectSealForm {saveMySeals} />
	</section>
	<SelectedSeals {saveMySeals} />
	<section class="rounded-md border border-gray-600 p-4">
		<h2 class="mb-4 text-lg font-bold">씰 가격표</h2>
		<SealPriceForm {saveMySeals} />
	</section>
	<SealCalculator />
</div>
