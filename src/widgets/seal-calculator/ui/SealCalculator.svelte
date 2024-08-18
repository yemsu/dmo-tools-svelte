<script lang="ts">
	import { page } from '$app/stores'
	import type { MySeal, SealData } from '$entities/seals'
	import { myPrices, mySeals, myStats } from '$entities/seals'
	import Button from '$shared/button/ui/Button.svelte'
	import { Input } from '$shared/form'
	import { _remove, cn, numberFormatter } from '$shared/lib'
	import { Section } from '$shared/section'
	import { Tab, Tabs } from '$shared/tabs'
	import CrrMenuTitle from '$shared/text/ui/CrrMenuTitle.svelte'
	import SealCalcData from '$widgets/seal-calculator/ui/SealCalcData.svelte'
	import { SealItem, SealList } from '$widgets/seal-list'
	import {
		getMyAndFinalPrice,
		statColorStyles,
		STATS,
		type StatType
	} from '$widgets/select-seal-form'
	import {
		MyStatBox,
		StatBarSeparator,
		StatBarTotalPrice,
		StatBarWrap
	} from '$widgets/stat-bar'
	import {
		getCurrentStep,
		getNextSteps,
		sortByEffDataList
	} from '../lib/calculate'
	import type { SealEfficiency } from '../types'

	let statTypeSelected: StatType = STATS[0].type
	let goalStat: number | '' = ''
	let effDataListSorted: SealEfficiency[] = []
	let willGetStatTotal = 0
	let willNeedMoneyTotal = 0
	let goalStatInput: HTMLInputElement
	let isSealPriceChanged = false
	let searchInputPlaceholder = '목표 수치 입력'
	$: calcNum = statTypeSelected === 'CT' ? 100 : 1
	$: resultUnit = statTypeSelected === 'CT' ? '%' : ''
	$: calcResultStatTotal =
		($myStats[statTypeSelected] * calcNum + willGetStatTotal) / calcNum

	const getMySealCount = (mySeals: MySeal[], sealId: number) =>
		mySeals.find(({ id }) => id === sealId)?.count || 0

	$: getAllStepEffData = (seal: SealData): SealEfficiency[] => {
		const result: SealEfficiency[] = []
		const { final: price } = getMyAndFinalPrice(
			$page.data.sealPrices,
			$myPrices,
			seal.id
		)
		if (!price) return result
		const mySealCount = getMySealCount($mySeals, seal.id)
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
				willGetStat,
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
			alert('목표 수치를 입력해주세요.')
			return
		}
		if (goalStat <= $myStats[statTypeSelected]) {
			alert('현재 스탯과 동일하거나 더 작은 값입니다.')
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
		if (statType === 'CT') {
			searchInputPlaceholder = '목표 수치 입력 (퍼센트 값)'
		} else {
			searchInputPlaceholder = '목표 수치 입력'
		}
		resetPrevResult()
		setTimeout(() => {
			goalStat = ''
			goalStatInput.focus()
		}, 60)
	}

	const addToMySeal = (effData: SealEfficiency, sealId: number) => {
		const mySealCount = getMySealCount($mySeals, sealId)
		mySeals.updateCount(effData.id, mySealCount + effData.needCount)
		const updateEffDataListSorted = _remove(effDataListSorted, effData.id)
		effDataListSorted = updateEffDataListSorted
		willGetStatTotal -= effData.willGetStat
		willNeedMoneyTotal -= effData.needPrice
	}

	const onChangedSealPrice = () => {
		if (effDataListSorted.length > 0) {
			isSealPriceChanged = true
		}
	}

	$: $myPrices && onChangedSealPrice()
</script>

<Section>
	<CrrMenuTitle />
	<div class="flex flex-col gap-2">
		<div class="flex w-full gap-2">
			<Tabs class="flex-1">
				{#each STATS as stat (stat.type)}
					<Tab
						class={statColorStyles[stat.type]}
						isActive={statTypeSelected === stat.type}
						on:click={() => onClickStatType(stat.type)}
						title={stat.name}
					>
						{stat.type}
					</Tab>
				{/each}
			</Tabs>
			<StatBarWrap size="sm" class="flex-center">
				<MyStatBox stats={$myStats} size="sm" />
			</StatBarWrap>
		</div>
		<form
			on:submit|preventDefault={onSubmit}
			class="flex w-full flex-1 items-center gap-2 md:w-auto"
		>
			<Input
				bind:inputElement={goalStatInput}
				type="number"
				class="flex-1"
				placeholder={searchInputPlaceholder}
				bind:value={goalStat}
			/>
			<Button rounded="md" size="lg" class="point-neon font-semibold"
				>결과보기</Button
			>
		</form>
	</div>
	<section class="relative flex flex-1 flex-col overflow-hidden">
		<h2 class="ir">
			선택된 능력치: {statTypeSelected} &gt; 목표 스탯: {goalStat || 0} &gt; 결과
			씰 개수:
			{effDataListSorted.length}
		</h2>
		<SealList
			seals={effDataListSorted}
			let:seal={effData}
			noDataText="목표 수치를 입력하여 가장 효율적인 씰 구성을 확인해보세요!"
		>
			{@const seal = $page.data.seals.find(({ id }) => id === effData.id)}
			{#if seal}
				<SealItem {seal} myStep={effData.myStep} isCountEditable={false}>
					<SealCalcData {effData} />
					<Button
						type="button"
						size="sm"
						class="bg-primary-30"
						on:click={() => addToMySeal(effData, seal.id)}
					>
						<iconify-icon icon="mdi:check" width={15} height={15} />
						씰 등록 완료
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
				<p class="text-center">
					효율 계산 이후에 씰 가격이 업데이트 되었습니다. <br />
					아래 버튼을 클릭하여 다시 계산해주세요!
				</p>
				<Button rounded="md" size="lg" class="point-neon" on:click={onSubmit}>
					계산 다시하기
				</Button>
			</div>
		{/if}
	</section>
	{#if effDataListSorted.length > 0}
		<section>
			<h2 class="ir">계산 결과 - 총 능력치, 총 비용</h2>
			<StatBarWrap>
				<div>
					<p class="flex-center text-md md:text-lg2 gap-2 leading-none">
						<span class="flex flex-col">
							<span class="text-xs3 text-gray-300 md:text-xs"
								>현재 내 능력치</span
							>
							<span class="font-semibold text-point">
								{$myStats[statTypeSelected]}{resultUnit}</span
							>
						</span>
						<span>+</span>
						<span class="flex flex-col">
							<span class="text-xs3 text-gray-300 md:text-xs"
								>얻어야하는 능력치</span
							>
							<span class="font-semibold text-point"
								>{numberFormatter(willGetStatTotal / calcNum)}{resultUnit}</span
							>
						</span>
						<span>=</span>
						<span class="flex flex-col">
							<span class="text-xs3 text-gray-300 md:text-xs">최종 능력치</span>
							<span class="font-semibold text-point">
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
</Section>
