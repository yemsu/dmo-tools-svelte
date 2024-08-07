<script lang="ts">
	import type { SealData } from '$entities/seals'
	import { mySeals, myStats, sealPrices, seals } from '$entities/seals'
	import Button from '$shared/button/ui/Button.svelte'
	import { cn, numberFormatter } from '$shared/lib'
	import { Section } from '$shared/section'
	import { Tab, Tabs } from '$shared/tabs'
	import CrrMenuTitle from '$shared/text/ui/CrrMenuTitle.svelte'
	import { SealItem, SealList } from '$widgets/seal-list'
	import { STATS, type StatType } from '$widgets/select-seal-form'
	import {
		StatBarSeparator,
		StatBarTotalPrice,
		StatBarWrap
	} from '$widgets/stat-bar'
	import {
		getNextSteps,
		getPrevStep,
		resultMerged,
		sortByEffDataList
	} from '../lib/calculate'
	import type { SealEfficiency } from '../types'

	let statTypeSelected: StatType = STATS[0].type
	let goalStat: number | '' = ''
	let effDataListSorted: SealEfficiency[] = []
	let willGetStatTotal = 0
	let willNeedMoneyTotal = 0
	let goalStatInput: HTMLInputElement
	let isMySealsChanged = false

	export const statColorStyles: Record<StatType, string> = {
		AT: 'text-stat-at',
		HT: 'text-stat-ht',
		CT: 'text-stat-ct'
	}

	$: getSealPrice = (_sealId: number) => {
		return $sealPrices.find(({ sealId }) => sealId === _sealId)?.price
	}

	$: getAllStepEffData = (seal: SealData): SealEfficiency[] => {
		const result: SealEfficiency[] = []
		const price = getSealPrice(seal.id)
		if (!price) return result
		const mySealCount = $mySeals.find(({ id }) => id === seal.id)?.count || 0

		const nextSteps = getNextSteps(seal, mySealCount)
		if (nextSteps.length === 0) return result
		for (const nextStep of nextSteps) {
			if (nextStep.sealCount === null) continue
			const prevStep = getPrevStep(nextStep.sealCount)
			const prevStepPercent = prevStep?.percent || 0
			const willGetStat =
				seal.maxIncrease * ((nextStep.percent - prevStepPercent) / 100)
			const sealCount = nextStep.sealCount - (prevStep?.sealCount || 0)
			const needCount = sealCount - mySealCount
			const needPrice = price ? needCount * price : 0

			result.push({
				id: seal.id,
				price,
				count: mySealCount,
				willGetStat,
				needCount,
				needPrice,
				efficiency: +(willGetStat / needPrice).toFixed(5) || 0,
				step: nextStep
			})
		}
		return result
	}

	const resetPrevResult = () => {
		effDataListSorted = []
		willGetStatTotal = 0
		willNeedMoneyTotal = 0
		isMySealsChanged = false
	}

	$: onSubmit = () => {
		if (goalStat === '') {
			alert('목표 수치를 입력해주세요.')
			return
		}
		resetPrevResult()
		const statSeals = $seals.filter(
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
		const needStatCount = goalStat - $myStats[statTypeSelected]
		const result: SealEfficiency[] = []
		for (const effData of sortedEfficiencyData) {
			if (willGetStatTotal >= needStatCount) break
			result.push(effData)
			willGetStatTotal += effData.willGetStat
			willNeedMoneyTotal += effData.needPrice
		}
		// 결과 리스트에 같은 씰이 여러개인 케이스 merge
		effDataListSorted = resultMerged(result)
	}

	const onClickStatType = (statType: StatType) => {
		statTypeSelected = statType
		setTimeout(() => {
			goalStat = ''
			goalStatInput.focus()
		}, 60)
	}

	const addToMySeal = (effData: SealEfficiency) => {
		mySeals.updateCount(effData.id, effData.needCount)
		const updateEffDataListSorted = effDataListSorted.filter(
			({ id }) => effData.id !== id
		)
		effDataListSorted = updateEffDataListSorted
		willGetStatTotal -= effData.willGetStat
		willNeedMoneyTotal -= effData.needPrice
	}
</script>

<Section class="flex flex-1 flex-col gap-3 overflow-hidden">
	<CrrMenuTitle />
	<div class="flex flex-col items-start gap-2 md:flex-row md:items-center">
		<Tabs>
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
		<form
			on:submit|preventDefault={onSubmit}
			class="flex w-full flex-1 items-center gap-2 md:w-auto"
		>
			<input
				bind:this={goalStatInput}
				type="number"
				class="flex-1"
				placeholder="목표 수치 입력"
				bind:value={goalStat}
			/>
			<Button rounded="md" size="lg" class="point-neon font-bold"
				>결과보기</Button
			>
		</form>
	</div>
	<div class="relative flex flex-1 flex-col overflow-hidden">
		<SealList
			seals={effDataListSorted}
			let:seal={effData}
			noDataText="목표 수치를 입력하여 가장 효율적인 씰 구성을 확인해보세요!"
		>
			{@const seal = $seals.find(({ id }) => id === effData.id)}
			{#if seal}
				<SealItem {seal} isCountEditable={false}>
					<div class="flex-col-center w-full rounded-sm bg-white/10 p-2">
						<dl class="flex flex-col gap-1 whitespace-nowrap leading-none">
							<div class="flex items-center gap-1">
								<dt class="text-[11px] text-gray-200">필요개수</dt>
								<dd class="text-point">{numberFormatter(effData.needCount)}</dd>
							</div>
							<div class="flex items-center gap-1">
								<dt class="text-[11px] text-gray-200">필요금액</dt>
								<dd class="text-point">
									{numberFormatter(effData.needPrice)}
								</dd>
							</div>
							<div class="flex items-center gap-1">
								<dt class="text-[11px] text-gray-200">획득능력치</dt>
								<dd class="text-point">
									{numberFormatter(effData.willGetStat)}
								</dd>
							</div>
							<div class="flex items-center gap-1">
								<dt
									class="text-[11px] text-gray-200"
									title="1M당 얻게되는 능력치"
								>
									효율
								</dt>
								<dd class="text-point">
									{numberFormatter(effData.efficiency, 5)}
								</dd>
							</div>
						</dl>
					</div>
					<Button
						type="button"
						size="sm"
						class="bg-primary-30"
						on:click={() => addToMySeal(effData)}
					>
						<iconify-icon icon="mdi:check" width={15} height={15} />
						씰등록 완료
					</Button>
				</SealItem>
			{/if}
		</SealList>
		{#if isMySealsChanged}
			<div
				class={cn(
					'absolute left-0 top-0',
					'flex-col-center size-full gap-4 bg-primary-5/60 backdrop-blur-sm'
				)}
			>
				<p class="text-center">
					효율 계산 이후에 보유 씰이 업데이트 되었습니다. <br />
					아래 버튼을 클릭하여 다시 계산해주세요!
				</p>
				<Button rounded="md" size="lg" class="point-neon" on:click={onSubmit}>
					계산 다시하기
				</Button>
			</div>
		{/if}
	</div>
	{#if effDataListSorted.length > 0}
		<StatBarWrap>
			<div>
				<p class="flex-center gap-2 text-lg leading-none">
					<span class="flex flex-col">
						<span class="text-xs text-gray-300">현재 내 능력치</span>
						<span class="font-bold text-point">
							{$myStats[statTypeSelected]}</span
						>
					</span>
					<span>+</span>
					<span class="flex flex-col gap-1">
						<span class="text-xs text-gray-300">얻어야하는 능력치</span>
						<span class="font-bold text-point">{willGetStatTotal}</span>
					</span>
					<span>=</span>
					<span class="flex flex-col gap-1">
						<span class="text-xs text-gray-300">최종 능력치</span>
						<span class="font-bold text-point">
							{$myStats[statTypeSelected] + willGetStatTotal}
						</span>
					</span>
				</p>
			</div>
			<StatBarSeparator />
			<p class="flex-center">
				<StatBarTotalPrice totalPrice={willNeedMoneyTotal} />
			</p>
		</StatBarWrap>
	{/if}
</Section>
