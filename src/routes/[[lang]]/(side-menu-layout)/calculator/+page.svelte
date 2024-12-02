<script lang="ts">
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
		calcStore,
		CalcTargetForm,
		calculateEfficiencyTotals,
		getEfficiencyFilteredList,
		getNextSteps,
		getNextStepsEffData,
		sortByEffDataList,
		type SealEfficiency
	} from '$features/calculate-seal-efficiency'
	import { getMyAndFinalPrice } from '$features/update-my-seal'
	import { ALERT, META } from '$shared/config'
	import { cn, numberFormatter } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Switch } from '$shared/ui/switch'
	import {
		CalcReferText,
		CalcResult,
		ResultSealList,
		RetryCalc
	} from '$widgets/seal-calculator'
	import { _ } from 'svelte-i18n'
	import type { PageData } from './$types'

	export let data: PageData

	$: isPercentType = STATS_PERCENT_TYPE.includes($calcStore.statTypeSelected)
	$: calcNum = isPercentType ? 100 : 1
	$: calcResultStatTotal =
		($myStats[$calcStore.statTypeSelected] * calcNum +
			$calcStore.willGetStatTotal) /
		calcNum
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

	$: onSubmit = (_goalStat: number | '') => {
		calcStore.setGoalStat(_goalStat)
		if (_goalStat === '') {
			alert(ALERT.INPUT_TARGET_VALUE[$lang])
			return
		}
		if (_goalStat <= $myStats[$calcStore.statTypeSelected]) {
			alert(ALERT.WRONG_TARGET_VALUE[$lang])
			return
		}
		calcStore.reset()
		const statSeals = data.seals.filter(
			({ statType }) => statType === $calcStore.statTypeSelected
		)

		// 효율 리스트 뽑기
		const allSealsEffData: SealEfficiency[] = []
		for (const seal of statSeals) {
			// 각 씰의 다음 단계들의(내 보유 개수에 따라) 효율 데이터 계산하여 반환
			const calcDataStep2 = getAllStepEffData(seal)
			// 효율 데이터 리스트업
			if (calcDataStep2.length === 0) continue
			allSealsEffData.push(...calcDataStep2)
		}
		// 효율별로 소팅
		const sortedEfficiencyData = sortByEffDataList(allSealsEffData)
		// 입력한 목표 수치에 도달할때까지 결과 리스트업 + 총 비용/얻게될 총 스탯 계산
		const needStatCount =
			_goalStat * calcNum - $myStats[$calcStore.statTypeSelected] * calcNum

		const _effDataListSorted = getEfficiencyFilteredList(
			sortedEfficiencyData,
			needStatCount
		)
		calcStore.setEffDataListSorted(_effDataListSorted)
		calcStore.setCalcResultList(_effDataListSorted)
		const totals = calculateEfficiencyTotals(_effDataListSorted)
		calcStore.setTotal(totals)
	}

	const onChangedSealPrice = () => {
		if ($calcStore.effDataListSorted.length > 0) {
			calcStore.setIsSealPriceChanged(true)
		}
	}

	$: onMergeSwitchChange = (e: CustomEvent) => {
		calcStore.toggleListViewMode()
		calcStore.setCalcResultList($calcStore.effDataListSorted)
	}

	$: $mySealPrices && onChangedSealPrice()
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
		$calcStore.calcResultList.length > 0 &&
			'land:pb-[calc(var(--result-h)+var(--result-b))]'
	)}
>
	<div class="mb-2 flex items-center justify-between">
		<CalcReferText />
		<Switch text={$_('seal.merge_same_seal')} on:change={onMergeSwitchChange} />
	</div>
	<ResultSealList
		seals={data.seals}
		sealPrices={data.sealPrices}
		{isPercentType}
	/>
	{#if $calcStore.isSealPriceChanged}
		<RetryCalc on:click={() => onSubmit($calcStore.goalStat)} />
	{/if}
</section>

{#if $calcStore.calcResultList.length > 0}
	<CalcResult
		crrMyStat={numberFormatter($myStats[$calcStore.statTypeSelected])}
		needGetStat={numberFormatter($calcStore.willGetStatTotal / calcNum)}
		resultStat={numberFormatter(calcResultStatTotal, 5)}
		{isPercentType}
	/>
{/if}
