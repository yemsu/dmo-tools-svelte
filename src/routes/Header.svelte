<script lang="ts">
	import { page } from '$app/stores'
	import {
		myPrices,
		mySeals,
		myStats,
		type Stats,
		STATS,
		STATS_PERCENT_TYPE,
		type StatType
	} from '$entities/seals'
	import { AuthButton } from '$shared/layout/ui'
	import { cn, objectBy } from '$shared/lib'
	import { Inner } from '$shared/section'
	import { Tooltip } from '$shared/tooltip'
	import { getMySealData } from '$widgets/my-seals'
	import { getCurrentStep } from '$widgets/seal-calculator'
	import { onMount } from 'svelte'
	onMount(async () => {
		if ($mySeals.length === 0) {
			mySeals.loadSavedData()
		}
		if ($myPrices.length === 0) {
			myPrices.loadSavedData()
		}
	})

	$: statCalc = (statType: StatType) => {
		const mySealsByStatType = objectBy(
			$mySeals,
			({ id }) => getMySealData($page.data.seals, id).statType
		)
		if (!mySealsByStatType) return 0
		const sealsByStatType = mySealsByStatType[statType]
		if (!sealsByStatType || sealsByStatType.length === 0) {
			return 0
		}
		let resultValue = 0
		sealsByStatType.forEach(({ id, count }) => {
			let sealPercent = 0
			const seal = getMySealData($page.data.seals, id)
			const crrStat = getCurrentStep(seal, count)
			sealPercent = crrStat.percent
			const maxIncrease = seal.maxIncrease
			resultValue += maxIncrease * (sealPercent / 100)
		})
		if (STATS_PERCENT_TYPE.includes(statType)) {
			resultValue = resultValue / 100
		}
		return resultValue
	}
	const setMyStats = () => {
		if ($mySeals.length === 0) return
		const newStats = STATS.reduce((result, { type }) => {
			result[type] = statCalc(type)
			return result
		}, {} as Stats)
		myStats.set(newStats)
	}

	$: $mySeals && setMyStats()
</script>

<header>
	<Inner
		size="full"
		class="relative flex h-header-h items-center justify-between"
	>
		<h1 class="font-tiny text-2xl font-semibold leading-none md:text-3xl">
			<span class="text-logo">DMO tools</span>
		</h1>
		<AuthButton />
	</Inner>
</header>
