<script lang="ts">
	import type { LangType } from '$shared/types'
	import { page } from '$app/stores'
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
	import { _remove, cn, numberFormatter } from '$shared/lib'
	import { Tab, Tabs } from '$shared/tabs'
	import { toast } from '$shared/toast'
	import { getMyAndFinalPrice, statColorStyles } from '$widgets/my-seals'
	import {
		getCurrentStep,
		getNextSteps,
		sortByEffDataList,
		type SealEfficiency
	} from '$widgets/seal-calculator'
	import SealCalcData from '$widgets/seal-calculator/ui/SealCalcData.svelte'
	import { SealItem, SealList } from '$widgets/seal-list'
	import {
		MyStatBox,
		StatBarSeparator,
		StatBarTotalPrice,
		StatBarWrap
	} from '$widgets/stat-bar'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'
	let statTypeSelected: StatType = STATS[0].type
	let goalStat: number | '' = ''
	let effDataListSorted: SealEfficiency[] = []
	let willGetStatTotal = 0
	let willNeedMoneyTotal = 0
	let goalStatInput: HTMLInputElement
	let isSealPriceChanged = false
	$: isPercentType = STATS_PERCENT_TYPE.includes(statTypeSelected)
	$: calcNum = isPercentType ? 100 : 1
	$: resultUnit = isPercentType ? '%' : ''
	$: calcResultStatTotal =
		($myStats[statTypeSelected] * calcNum + willGetStatTotal) / calcNum
	$: lang = $page.data.lang as LangType
	$: isKr = lang === 'kr'
	const getMySealCount = (mySeal: MySealCount[], sealId: number) =>
		mySeal.find(({ id }) => id === sealId)?.count || 0

	$: getAllStepEffData = (seal: SealData): SealEfficiency[] => {
		const result: SealEfficiency[] = []
		const { final: price } = getMyAndFinalPrice(
			$page.data.sealPrices,
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
			alert(ALERT.INPUT_TARGET_VALUE[lang])
			return
		}
		if (goalStat <= $myStats[statTypeSelected]) {
			alert(ALERT.WRONG_TARGET_VALUE[lang])
			return
		}
		resetPrevResult()
		const statSeals = $page.data.seals.filter(
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
			CONFIRM.ADD_MY_SEAL(seal, effData.needCount)[lang]
		)
		if (!isConfirmed) return
		mySealCounts.updateCount(
			{
				id: effData.id,
				count: +mySealCount + effData.needCount
			},
			lang
		)
		const updateEffDataListSorted = _remove(effDataListSorted, effData.id)
		effDataListSorted = updateEffDataListSorted
		willGetStatTotal -= effData.willGetStat
		willNeedMoneyTotal -= effData.needPrice
		toast.on(
			TOAST.SEAL_COUNT_UPDATE(seal, mySealCount + effData.needCount)[lang]
		)
	}

	const onChangedSealPrice = () => {
		if (effDataListSorted.length > 0) {
			isSealPriceChanged = true
		}
	}

	$: $mySealPrices && onChangedSealPrice()

	const TEXTS = {
		TARGET_VALUES: {
			kr: '목표 수치 입력',
			en: 'Target Value'
		},
		PERCENT_VALUE: {
			kr: '퍼센트 값',
			en: 'Percentage'
		},
		VIEW_RESULT: {
			kr: '결과보기',
			en: 'View Results'
		},
		SELECTED_STAT: {
			kr: '선택된 능력치',
			en: 'Selected Stat'
		},
		TARGET_STAT: {
			kr: '목표 스탯',
			en: 'Target Stat'
		},
		RESULT_COUNT: {
			kr: '결과 씰 개수',
			en: 'Resulting Seal Count'
		},
		NO_DATA_TEXT: {
			kr: '목표 수치를 입력하여 가장 효율적인 씰 구성을 확인해보세요!',
			en: 'Input the target value to find the most efficient seal configuration!'
		},
		SEAL_REGISTERED: {
			kr: '씰 등록 완료',
			en: 'Registration completed'
		}
	}
</script>

<svelte:head>
	<title>{META.CALCULATOR.TITLE[lang]}</title>
	<meta name="description" content={META.CALCULATOR.DESC[lang]} />
</svelte:head>

<h2 class="ir">{MENUS.calc.name}</h2>
<div class="flex shrink-0 flex-col gap-1.5">
	<div class="flex w-full flex-col gap-1.5">
		<dl>
			<StatBarWrap class="flex-center">
				<MyStatBox stats={$myStats} />
			</StatBarWrap>
		</dl>
		<Tabs>
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
	</div>
	<form
		on:submit|preventDefault={onSubmit}
		class="flex w-full flex-1 items-center gap-1 md:w-auto"
	>
		<Input
			bind:inputElement={goalStatInput}
			type="number"
			class="flex-1"
			placeholder={TEXTS.TARGET_VALUES[lang] +
				(STATS_PERCENT_TYPE.includes(statTypeSelected)
					? ` (${TEXTS.PERCENT_VALUE[lang]})`
					: '')}
			bind:value={goalStat}
		/>
		<Button rounded="md" size="lg" class="point-neon h-input-h font-semibold">
			{TEXTS.VIEW_RESULT[lang]}
		</Button>
	</form>
</div>
<section class="relative flex flex-1 flex-col overflow-hidden">
	<h2 class="ir">
		{TEXTS.SELECTED_STAT[lang]}: {statTypeSelected}
		&gt; {TEXTS.TARGET_STAT[lang]}: {goalStat || 0}
		&gt; {TEXTS.RESULT_COUNT[lang]}: {effDataListSorted.length}
	</h2>
	<SealList
		seals={effDataListSorted}
		let:seal={effData}
		noDataText={TEXTS.NO_DATA_TEXT[lang]}
	>
		{@const seal = $page.data.seals.find(({ id }) => id === effData.id)}
		{#if seal}
			<SealItem {seal} myStep={effData.myStep} isCountEditable={false}>
				<SealCalcData {effData} {isPercentType} />
				<Button
					type="button"
					size="sm"
					class="bg-primary-30"
					on:click={() => addToMySeal(effData, seal)}
				>
					<iconify-icon icon="mdi:check" width={15} height={15} />
					{TEXTS.SEAL_REGISTERED[lang]}
				</Button>
			</SealItem>
		{/if}
	</SealList>
	{#if isSealPriceChanged}
		<div
			class={cn(
				'absolute left-0 top-0',
				'flex-col-center size-full gap-4 bg-primary-5/60 backdrop-blur-sm'
			)}
		>
			<p class="whitespace-preline text-center">
				<TextByLang
					text="효율 계산 이후에 씰 가격이 업데이트 되었습니다. 
				아래 버튼을 클릭하여 다시 계산해주세요!"
					engText="The seal prices have been updated after the efficiency calculation. Please click the button below to recalculate!"
				/>
			</p>
			<Button rounded="md" size="lg" class="point-neon" on:click={onSubmit}>
				<TextByLang text="계산 다시하기" engText="Recalculate the values." />
			</Button>
		</div>
	{/if}
</section>
{#if effDataListSorted.length > 0}
	<section>
		<h2 class="ir">
			<TextByLang
				text="계산 결과 - 총 능력치, 총 비용"
				engText="Calculation Results - Total Stats, Total Cost "
			/>
		</h2>
		<StatBarWrap>
			<div>
				<p class="flex-center gap-2 text-md leading-none md:text-lg2">
					<span class="flex flex-col sm:gap-[2px]">
						<span class="text-xs4 text-gray-300 md:text-xs">
							<TextByLang text="현재 내 능력치" engText="Current Stats" />
						</span>
						<span class="text-xs2 font-semibold text-point md:text-md">
							{numberFormatter($myStats[statTypeSelected])}{resultUnit}
						</span>
					</span>
					<span>+</span>
					<span class="flex flex-col sm:gap-[2px]">
						<span class="text-xs3 text-gray-300 md:text-xs">
							<TextByLang text="얻어야하는 능력치" engText="Required Stats" />
						</span>
						<span class="text-xs2 font-semibold text-point md:text-md"
							>{numberFormatter(willGetStatTotal / calcNum)}{resultUnit}</span
						>
					</span>
					<span>=</span>
					<span class="flex flex-col sm:gap-[2px]">
						<span class="text-xs3 text-gray-300 md:text-xs">
							<TextByLang text="최종 능력치" engText="Final Stats" />
						</span>
						<span class="text-xs2 font-semibold text-point md:text-md">
							{numberFormatter(calcResultStatTotal, 5)}{resultUnit}
						</span>
					</span>
				</p>
			</div>
			<StatBarSeparator />
			<p class="flex-center">
				<StatBarTotalPrice totalPrice={willNeedMoneyTotal} />
			</p>
		</StatBarWrap>
	</section>
{/if}
