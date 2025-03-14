<script lang="ts">
	import { currentCharacterId } from '$entities/characters'
	import { MENUS } from '$entities/menus'
	import {
		mySealCounts,
		mySealPrices,
		myStats,
		STATS_PERCENT_TYPE,
		type MySealCount,
		type SealData
	} from '$entities/seals'
	import {
		calc,
		CalcTargetForm,
		createCostResultGetter,
		getEffDataListSorted,
		getEffListForNeedStat,
		getNextSteps,
		getNextStepsEffData,
		type SealEfficiency
	} from '$features/calculator/calculate-seal-efficiency'
	import {
		CalcResult,
		ResultListStatusBar,
		ResultSealList,
		RetryCalc
	} from '$features/calculator/display-seal-calculator'
	import { getMyAndFinalPrice } from '$features/calculator/update-my-seal'
	import { ERROR, META } from '$shared/config'
	import { cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'
	import { onDestroy } from 'svelte'
	import type { PageData } from './$types'

	export let data: PageData

	$: isPercentType = STATS_PERCENT_TYPE.includes($calc.statTypeSelected)
	$: percentNum = isPercentType ? 100 : 1

	$: crrCalcResults = $calc.calcResults[$calc.viewMode]

	const getMySealCount = (mySeal: MySealCount[], sealId: number) =>
		mySeal.find(({ id }) => id === sealId)?.count || 0

	$: getAllStepEffData = (seal: SealData): SealEfficiency[] => {
		const { final: price } = getMyAndFinalPrice(
			data.sealPrices,
			$mySealPrices,
			seal.id
		)
		if (!price) return []
		const mySealCount = getMySealCount($mySealCounts, seal.id)
		const nextSteps = getNextSteps(seal, mySealCount)

		return getNextStepsEffData(seal, price, mySealCount, nextSteps)
	}

	$: onSubmit = (newGoalStat: number) => {
		calc.setGoalStat(newGoalStat)
		calc.reset()
		// 효율별로 소팅
		const effDataListSorted = getEffDataListSorted(
			data.seals,
			$calc.statTypeSelected,
			getAllStepEffData
		)
		calc.setEffDataListSorted(effDataListSorted)
		// 입력한 목표 수치에 도달할때까지 결과 리스트업 + 총 비용/얻게될 총 스탯 계산
		const needStatCount =
			newGoalStat * percentNum - $myStats[$calc.statTypeSelected] * percentNum

		const effListForNeedStat = getEffListForNeedStat(
			effDataListSorted,
			needStatCount
		)

		calc.setCalcResultList(
			effListForNeedStat,
			percentNum,
			createCostResultGetter($myStats[$calc.statTypeSelected])
		)
	}

	const onChangedSealPrice = () => {
		if (crrCalcResults.length > 0) {
			calc.setIsSealPriceChanged(true)
		}
	}

	const onChangeCharacter = () => {
		if ($calc.calcResults.separated.length === 0) return
		calc.reset()
	}

	onDestroy(() => {
		calc.reset()
		calc.setGoalStat(null)
	})

	$: $mySealPrices && onChangedSealPrice()
	$: $currentCharacterId && onChangeCharacter()
</script>

<svelte:head>
	<title>{META.CALCULATOR.TITLE[$lang]}</title>
	<meta name="description" content={META.CALCULATOR.DESC[$lang]} />
</svelte:head>

<h2 class="ir">{MENUS.calc.name}</h2>
<CalcTargetForm on:submit={(e) => onSubmit(e.detail)} />

<section
	class={cn(
		'relative flex flex-1 flex-col overflow-hidden',
		crrCalcResults.length > 0 &&
			'land:pb-[calc(var(--result-h)+var(--result-b))]'
	)}
>
	<ResultListStatusBar />
	<ResultSealList
		seals={data.seals}
		sealPrices={data.sealPrices}
		{isPercentType}
		{percentNum}
	/>
	{#if $calc.isSealPriceChanged}
		<RetryCalc
			on:click={() => {
				if ($calc.goalStat === null) {
					toast.on(ERROR.NO_STAT_TARGET_VALUE[$lang])
					return
				}
				onSubmit($calc.goalStat)
			}}
		/>
	{/if}
</section>
{#if crrCalcResults.length > 0}
	<CalcResult {isPercentType} />
{/if}
