<script lang="ts">
	import { page } from '$app/stores'
	import {
		mySealCounts,
		mySealPrices,
		myStats,
		type Stats,
		STATS,
		STATS_PERCENT_TYPE,
		type StatType
	} from '$entities/seals'
	import { user } from '$entities/user'
	import { AuthButton } from '$shared/layout'
	import LangButton from '$shared/layout/ui/LangButton.svelte'
	import { objectBy } from '$shared/lib'
	import { Inner } from '$shared/section'
	import type { LangType } from '$shared/types'
	import { getMySealData } from '$widgets/my-seals'
	import { getCurrentStep } from '$widgets/seal-calculator'

	$: lang = $page.data.lang as LangType
	$: statCalc = (statType: StatType) => {
		if ($mySealCounts.length === 0) return
		const mySealsByStatType = objectBy(
			$mySealCounts,
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
	// my seals
	const setMyData = async () => {
		await mySealCounts.load()
		await mySealPrices.load()
	}
	$: $user && setMyData()

	const resetMyData = () => {
		mySealCounts.reset()
		mySealPrices.reset()
	}
	$: !$user && resetMyData()

	// my stats
	const setMyStats = () => {
		if ($mySealCounts.length === 0) return
		const newStats = STATS.reduce((result, { type }) => {
			const statTypeCalc = statCalc(type)
			if (statTypeCalc === undefined) return result
			result[type] = statTypeCalc
			return result
		}, {} as Stats)
		myStats.set(newStats)
	}

	$: $mySealCounts && setMyStats()
</script>

<header>
	<Inner
		size="full"
		class="relative flex h-header-h items-center justify-between"
	>
		<h1 class="font-tiny text-2xl font-semibold leading-none md:text-3xl">
			<a
				href="/{lang}"
				class="text-logo block"
				title={lang === 'kr' ? '메인으로' : 'Go to Main Page'}
			>
				DMO tools
			</a>
		</h1>
		<div class="flex-center gap-2">
			<AuthButton />
			<!-- <LangButton /> -->
		</div>
	</Inner>
</header>
