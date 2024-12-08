<script lang="ts">
	import { currentCharacterId } from '$entities/characters'
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
	import Button from '$shared/button/ui/Button.svelte'
	import { ALERT, CONFIRM, META, TOAST } from '$shared/config'
	import { Input } from '$shared/form'
	import { Icon } from '$shared/icon'
	import { _remove, cn, numberFormatter } from '$shared/lib'
	import { ListReferText } from '$shared/list'
	import { lang } from '$shared/model'
	import { Tab, Tabs } from '$shared/tabs'
	import { TextByLang } from '$shared/text'
	import { toast } from '$shared/toast'
	import { getMyAndFinalPrice, statColorStyles } from '$widgets/my-seals'
	import {
		CalcResult,
		getCurrentStep,
		getNextSteps,
		RetryCalc,
		SealCalcData,
		sortByEffDataList,
		type SealEfficiency
	} from '$widgets/seal-calculator'
	import { SealItem, SealList } from '$widgets/seal-list'
	import { _ } from 'svelte-i18n'
	import type { PageData } from './$types'

	export let data: PageData
	let statTypeSelected: StatType = STATS[0].type
	let goalStat: number | '' = ''
	let effDataListSorted: SealEfficiency[] = []
	let willGetStatTotal = 0
	let willNeedMoneyTotal = 0
	let goalStatInput: HTMLInputElement
	let isSealPriceChanged = false
	$: isPercentType = STATS_PERCENT_TYPE.includes(statTypeSelected)
	$: calcNum = isPercentType ? 100 : 1
	$: calcResultStatTotal =
		($myStats[statTypeSelected] * calcNum + willGetStatTotal) / calcNum
	$: isKr = $lang === 'kr'
	const getMySealCount = (mySeal: MySealCount[], sealId: number) =>
		mySeal.find(({ id }) => id === sealId)?.count || 0

	$: getAllStepEffData = (seal: SealData): SealEfficiency[] => {
		const result: SealEfficiency[] = []
		const { final: price } = getMyAndFinalPrice(
			data.sealPrices,
			$mySealPrices,
			seal.id
		)
		if (!price) return result
		const mySealCount = getMySealCount($mySealCounts, seal.id)
		const crrMyStep =
			mySealCount !== 0 ? getCurrentStep(seal, mySealCount) : undefined
		const nextSteps = getNextSteps(seal, mySealCount)

		if (nextSteps.length === 0) return result
		for (const nextStep of nextSteps) {
			if (nextStep.sealCount === null) continue

			const willGetStat =
				seal.maxIncrease *
				((nextStep.percent - (crrMyStep?.percent || 0)) / 100)
			const needCount = nextStep.sealCount - mySealCount
			const needPrice = price ? needCount * price : 0
			const efficiency = +(willGetStat / needPrice) || 0

			result.push({
				id: seal.id,
				price,
				count: mySealCount,
				willGetStat: Math.round(willGetStat),
				needCount,
				needPrice,
				efficiency,
				myStep: crrMyStep
			})
		}
		return result
	}

	const resetPrevResult = () => {
		effDataListSorted = []
		willGetStatTotal = 0
		willNeedMoneyTotal = 0
		isSealPriceChanged = false
	}

	$: onSubmit = () => {
		if (goalStat === '') {
			alert(ALERT.INPUT_TARGET_VALUE[$lang])
			return
		}
		if (goalStat <= $myStats[statTypeSelected]) {
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
			goalStat * calcNum - $myStats[statTypeSelected] * calcNum
		let result: SealEfficiency[] = []
		for (const effData of sortedEfficiencyData) {
			if (willGetStatTotal >= needStatCount) break
			const prevResult = result.find(({ id }) => id === effData.id)
			if (prevResult) {
				if (
					prevResult.efficiency > effData.efficiency &&
					prevResult.willGetStat > effData.willGetStat
				)
					continue
				result = result.filter(({ id }) => id !== effData.id)
				willGetStatTotal -= prevResult.willGetStat
				willNeedMoneyTotal -= prevResult.needPrice
			}
			result.push(effData)
			willGetStatTotal += effData.willGetStat
			willNeedMoneyTotal += effData.needPrice
		}
		// 결과 리스트에 같은 씰이 여러개인 케이스 merge
		// effDataListSorted = resultMerged(result)
		effDataListSorted = result
	}

	const onClickStatType = (statType: StatType) => {
		statTypeSelected = statType
		resetPrevResult()
		setTimeout(() => {
			goalStat = ''
			goalStatInput.focus()
		}, 60)
	}

	const addToMySeal = (effData: SealEfficiency, seal: SealData) => {
		const mySealCount = getMySealCount($mySealCounts, seal.id)
		const isConfirmed = confirm(
			CONFIRM.ADD_MY_SEAL(seal, effData.needCount)[$lang]
		)
		if (!isConfirmed) return
		if (!$currentCharacterId) {
			alert('no currentCharacterId')
			return
		}
		mySealCounts.updateCount(
			$currentCharacterId,
			{
				id: effData.id,
				count: +mySealCount + effData.needCount
			},
			$lang
		)
		const updateEffDataListSorted = _remove(effDataListSorted, effData.id)
		effDataListSorted = updateEffDataListSorted
		willGetStatTotal -= effData.willGetStat
		willNeedMoneyTotal -= effData.needPrice
		toast.on(
			TOAST.SEAL_COUNT_UPDATE(seal, mySealCount + effData.needCount)[$lang]
		)
	}

	const onChangedSealPrice = () => {
		if (effDataListSorted.length > 0) {
			isSealPriceChanged = true
		}
	}

	$: $mySealPrices && onChangedSealPrice()
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
	<form
		on:submit|preventDefault={onSubmit}
		class="flex items-center gap-1.5 port:w-full land:w-[30%] land:shrink-0"
	>
		<Input
			bind:inputElement={goalStatInput}
			type="number"
			class="flex-1"
			placeholder={$_('seal.target_value') +
				(STATS_PERCENT_TYPE.includes(statTypeSelected) ? ` (%)` : '')}
			bind:value={goalStat}
		/>
		<Button variant="blue" size="lg" class="font-semibold">
			{$_('seal.view_result')}
		</Button>
	</form>
</div>
<section
	class={cn(
		'relative flex flex-1 flex-col overflow-hidden',
		effDataListSorted.length > 0 &&
			'land:pb-[calc(var(--result-h)+var(--result-b))]'
	)}
>
	<ListReferText tagName="h2" class="flex items-center">
		{statTypeSelected}
		{#if goalStat}
			<Icon icon="weui:arrow-filled" size="1.2em" class="text-gray-9" />
			{$_('seal.target_stat')}: {goalStat}
		{:else}
			<Icon icon="weui:arrow-filled" size="1.2em" class="text-gray-9" />
			<span class="text-gray-10">
				<TextByLang
					text="목표 수치를 입력해주세요"
					engText="Please enter target values"
				/>
			</span>
		{/if}
		{#if effDataListSorted.length}
			<Icon icon="weui:arrow-filled" size="1.2em" class="text-gray-9" />
			{$_('seal.result_count')}: {effDataListSorted.length}
		{/if}
	</ListReferText>
	<SealList
		seals={effDataListSorted}
		let:seal={effData}
		noDataText={$_('seal.no_data_text')}
	>
		{@const seal = data.seals.find(({ id }) => id === effData.id)}
		{#if seal}
			<SealItem {seal} isCountEditable={false} sealPrices={data.sealPrices}>
				<SealCalcData {effData} {isPercentType} />
				<Button
					type="button"
					variant="background"
					size="sm"
					class="w-full"
					on:click={() => addToMySeal(effData, seal)}
				>
					<iconify-icon icon="mdi:check" width={15} height={15} />
					{$_('seal.seal_registered')}
				</Button>
			</SealItem>
		{/if}
	</SealList>
	{#if isSealPriceChanged}
		<RetryCalc on:click={onSubmit} />
	{/if}
</section>

{#if effDataListSorted.length > 0}
	<CalcResult
		crrMyStat={numberFormatter($myStats[statTypeSelected])}
		needGetStat={numberFormatter(willGetStatTotal / calcNum)}
		resultStat={numberFormatter(calcResultStatTotal, 5)}
		{willNeedMoneyTotal}
		{isPercentType}
	/>
{/if}
