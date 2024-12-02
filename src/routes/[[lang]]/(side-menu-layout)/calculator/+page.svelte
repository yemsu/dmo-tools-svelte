<script lang="ts">
	import { MENUS } from '$entities/menus'
	import {
		mySealCounts,
		mySealPrices,
		myStats,
		STATS,
		STATS_PERCENT_TYPE,
		type MySealCount,
		type SealData,
		type StatType
	} from '$entities/seals'
	import { ALERT, META } from '$shared/config'
	import { cn, numberFormatter } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Tab, Tabs } from '$shared/tabs'
	import { Switch } from '$shared/ui/switch'
	import { getMyAndFinalPrice, statColorStyles } from '$widgets/my-seals'
	import {
		CalcReferText,
		CalcResult,
		CalcSearchForm,
		getNextSteps,
		ResultSealList,
		RetryCalc,
		sortByEffDataList,
		type CalcMode,
		type SealEfficiency
	} from '$widgets/seal-calculator'
	import {
		calculateEfficiencyTotals,
		getEfficiencyFilteredList,
		getMergedResult,
		getNextStepsEffData
	} from '$widgets/seal-calculator/lib/calculate'
	import { _ } from 'svelte-i18n'
	import type { PageData } from './$types'

	type ListViewMode = 'merged' | 'separated'

	export let data: PageData
	let statTypeSelected: StatType = STATS[0].type
	let goalStat: number | '' = ''
	let effDataListSorted: SealEfficiency[] = []
	let calcResultList: SealEfficiency[] = []
	let willGetStatTotal = 0
	let willNeedMoneyTotal = 0
	let goalStatInput: HTMLInputElement
	let isSealPriceChanged = false
	let listViewMode: ListViewMode = 'merged'
	let calcMode: CalcMode = 'closest'
	$: isPercentType = STATS_PERCENT_TYPE.includes(statTypeSelected)
	$: calcNum = isPercentType ? 100 : 1
	$: calcResultStatTotal =
		($myStats[statTypeSelected] * calcNum + willGetStatTotal) / calcNum
	$: isKr = $lang === 'kr'
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

	const resetPrevResult = () => {
		effDataListSorted = []
		calcResultList = []
		willGetStatTotal = 0
		willNeedMoneyTotal = 0
		isSealPriceChanged = false
	}

	const getCalcResultList = (_effDataListSorted: SealEfficiency[]) => {
		return listViewMode === 'merged'
			? getMergedResult(_effDataListSorted)
			: _effDataListSorted
	}

	$: onSubmit = (_goalStat: number | '') => {
		goalStat = _goalStat
		if (_goalStat === '') {
			alert(ALERT.INPUT_TARGET_VALUE[$lang])
			return
		}
		if (_goalStat <= $myStats[statTypeSelected]) {
			alert(ALERT.WRONG_TARGET_VALUE[$lang])
			return
		}
		resetPrevResult()
		const statSeals = data.seals.filter(
			({ statType }) => statType === statTypeSelected
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
			_goalStat * calcNum - $myStats[statTypeSelected] * calcNum

		const _effDataListSorted = getEfficiencyFilteredList(
			sortedEfficiencyData,
			needStatCount
		)
		effDataListSorted = _effDataListSorted
		calcResultList =
			listViewMode === 'merged'
				? getMergedResult(effDataListSorted)
				: effDataListSorted
		const totals = calculateEfficiencyTotals(_effDataListSorted)
		willGetStatTotal = totals.willGetStatTotal
		willNeedMoneyTotal = totals.willNeedMoneyTotal
	}

	const onClickStatType = (statType: StatType) => {
		statTypeSelected = statType
		resetPrevResult()
		setTimeout(() => {
			goalStat = ''
			goalStatInput.focus()
		}, 60)
	}

	const afterAddToMySeal = (effData: SealEfficiency) => {
		const updateEffDataListSorted = effDataListSorted.filter(
			(_effData) =>
				!(
					_effData.id === effData.id && _effData.needCount === effData.needCount
				)
		)
		effDataListSorted = updateEffDataListSorted
		calcResultList = getCalcResultList(updateEffDataListSorted)
		willGetStatTotal -= effData.willGetStat
		willNeedMoneyTotal -= effData.needPrice
	}

	const onChangedSealPrice = () => {
		if (effDataListSorted.length > 0) {
			isSealPriceChanged = true
		}
	}

	$: onMergeSwitchChange = (e: CustomEvent) => {
		const checked = e.detail
		listViewMode = checked ? 'merged' : 'separated'
	}

	$: onChangeListViewMode = () => {
		calcResultList = getCalcResultList(effDataListSorted)
	}

	$: $mySealPrices && onChangedSealPrice()
	$: listViewMode && onChangeListViewMode()
</script>

<svelte:head>
	<title>{META.CALCULATOR.TITLE[$lang]}</title>
	<meta name="description" content={META.CALCULATOR.DESC[$lang]} />
</svelte:head>

<h2 class="ir">{MENUS.calc.name}</h2>
<div class={cn('flex shrink-0 gap-1.5 port:flex-col')}>
	<Tabs class="w-full">
		{#each STATS as stat (stat.type)}
			<Tab
				class={statColorStyles[stat.type]}
				isActive={statTypeSelected === stat.type}
				on:click={() => onClickStatType(stat.type)}
				title={isKr ? stat.name : stat.engName}
			>
				{stat.type}
			</Tab>
		{/each}
	</Tabs>
	<CalcSearchForm {statTypeSelected} on:submit={(e) => onSubmit(e.detail)} />
</div>
<section
	class={cn(
		'relative flex flex-1 flex-col overflow-hidden',
		calcResultList.length > 0 &&
			'land:pb-[calc(var(--result-h)+var(--result-b))]'
	)}
>
	<div class="mb-2 flex items-center justify-between">
		<CalcReferText {statTypeSelected} {goalStat} {calcResultList} />
		<Switch text={$_('seal.merge_same_seal')} on:change={onMergeSwitchChange} />
	</div>
	<ResultSealList
		seals={data.seals}
		sealPrices={data.sealPrices}
		{calcResultList}
		{isPercentType}
		{afterAddToMySeal}
	/>
	{#if isSealPriceChanged}
		<RetryCalc on:click={() => onSubmit(goalStat)} />
	{/if}
</section>

{#if calcResultList.length > 0}
	<CalcResult
		crrMyStat={numberFormatter($myStats[statTypeSelected])}
		needGetStat={numberFormatter(willGetStatTotal / calcNum)}
		resultStat={numberFormatter(calcResultStatTotal, 5)}
		{willNeedMoneyTotal}
		{isPercentType}
	/>
{/if}
