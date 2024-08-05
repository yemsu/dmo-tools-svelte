<script lang="ts">
	import type { SealData } from '$entities/seals'
	import { mySeals, myStats, sealPrices, seals } from '$entities/seals/model'
	import { objectBy } from '$shared/lib'
	import { Section } from '$shared/section'
	import { Title } from '$shared/text'
	import { SealItem, SealList } from '$widgets/seal-list'
	import {
		SEAL_STAT_TABLE,
		STATS,
		type StatType
	} from '$widgets/select-seal-form/config'

	type SealEfficiency2 = {
		sealId: number
		count: number
		price: number
		efficiency: number
		needCount: number
		needPrice: number
		willGetStat: number
		step: (typeof SEAL_STAT_TABLE)[number]
	}

	let selectedStatType: StatType = STATS[0].type
	let goalStat: number | '' = ''
	let effDataList: SealEfficiency2[] = []
	let effDataListSorted: SealEfficiency2[] = []
	let willGetStatTotal = 0
	let willNeedMoneyTotal = 0
	let goalStatInput: HTMLInputElement

	const getNextStep = (sealCount: number) => {
		let step: (typeof SEAL_STAT_TABLE)[number] | undefined
		for (const statTable of SEAL_STAT_TABLE) {
			if (sealCount < statTable.sealCount) {
				step = statTable
				break
			}
		}
		return step
	}

	const getCrrStep = (sealCount: number) => {
		let step: (typeof SEAL_STAT_TABLE)[number] | undefined
		for (const statTable of SEAL_STAT_TABLE) {
			if (sealCount > statTable.sealCount) {
				step = statTable
			} else {
				break
			}
		}
		return step
	}

	$: getSealPrice = (_sealId: number) => {
		return $sealPrices.find(({ sealId }) => sealId === _sealId)?.price
	}
	$: getMySealCount = (_sealId: number) => {
		return $mySeals.find(({ sealId }) => sealId === _sealId)?.count || 0
	}

	$: getNextEfficiencyData = (
		seal: SealData,
		price: number,
		nextStep: (typeof SEAL_STAT_TABLE)[number]
	): Omit<SealEfficiency2, 'sealId' | 'price'> | undefined => {
		const nextAfter = getNextStep(nextStep.sealCount + 1)
		if (!nextAfter) return
		const willGetStat =
			seal.maxIncrease * ((nextAfter.percent - nextStep.percent) / 100)
		const needCount = nextAfter.sealCount - nextStep.sealCount
		const needPrice = price ? needCount * price : 0

		return {
			count: nextStep.sealCount,
			willGetStat,
			needCount,
			needPrice,
			efficiency: +(willGetStat / needPrice) || 0,
			step: nextAfter
		}
	}

	$: getEfficiencyData = (seal: SealData): SealEfficiency2[] | undefined => {
		const price = getSealPrice(seal.id)
		if (!price) return
		const mySealCount = getMySealCount(seal.id)
		const nextStep = getNextStep(mySealCount)
		if (!nextStep) return
		const crrStepPercent = getCrrStep(mySealCount)?.percent || 0
		const willGetStat =
			seal.maxIncrease * ((nextStep.percent - crrStepPercent) / 100)
		const needCount = nextStep.sealCount - mySealCount
		const needPrice = price ? needCount * price : 0
		const nextEff = getNextEfficiencyData(seal, price, nextStep)
		const nextEffData = nextEff
			? [
					{
						sealId: seal.id,
						price,
						...nextEff
					}
				]
			: []
		const nextEff2 = nextEff?.step
			? getNextEfficiencyData(seal, price, nextEff?.step)
			: undefined
		const nextEff2Data = nextEff2
			? [
					{
						sealId: seal.id,
						price,
						...nextEff2
					}
				]
			: []
		const nextEff3 = nextEff2?.step
			? getNextEfficiencyData(seal, price, nextEff2?.step)
			: undefined
		const nextEff3Data = nextEff3
			? [
					{
						sealId: seal.id,
						price,
						...nextEff3
					}
				]
			: []
		const nextEff4 = nextEff3?.step
			? getNextEfficiencyData(seal, price, nextEff3?.step)
			: undefined
		const nextEff4Data = nextEff4
			? [
					{
						sealId: seal.id,
						price,
						...nextEff4
					}
				]
			: []
		const nextEff5 = nextEff4?.step
			? getNextEfficiencyData(seal, price, nextEff4?.step)
			: undefined
		const nextEff5Data = nextEff5
			? [
					{
						sealId: seal.id,
						price,
						...nextEff5
					}
				]
			: []
		return [
			{
				sealId: seal.id,
				price,
				count: mySealCount,
				willGetStat,
				needCount,
				needPrice,
				efficiency: +(willGetStat / needPrice).toFixed(5) || 0,
				step: nextStep
			},
			...nextEffData,
			...nextEff2Data,
			...nextEff3Data,
			...nextEff4Data,
			...nextEff5Data
		]
	}

	$: onSubmit = () => {
		if (goalStat === '') {
			alert('목표 수치를 입력해주세요.')
			return
		}

		effDataList = []
		effDataListSorted = []
		willGetStatTotal = 0
		willNeedMoneyTotal = 0

		const statSeals = $seals.filter(
			({ statType }) => statType === selectedStatType
		)

		const efficiencyData: SealEfficiency2[] = []
		for (const seal of statSeals) {
			const calcDataStep2 = getEfficiencyData(seal)
			if (calcDataStep2) efficiencyData.push(...calcDataStep2)
		}
		const sortedEfficiencyData = efficiencyData.sort((a, b) => {
			const aEff = a.efficiency
			const bEff = b.efficiency
			return bEff - aEff
		})

		const needStatCount = goalStat - $myStats[selectedStatType]
		const result: SealEfficiency2[] = []
		for (const effData of sortedEfficiencyData) {
			if (willGetStatTotal < needStatCount) {
				result.push(effData)
				willGetStatTotal += effData.willGetStat
				willNeedMoneyTotal += effData.needPrice
			} else {
				break
			}
		}

		effDataList = [...result]
		setEffDataListSorted(effDataList)
	}

	function setEffDataListSorted(effDataList: SealEfficiency2[]) {
		const result: SealEfficiency2[] = []
		const effDataListBySealId = objectBy(
			effDataList,
			(data) => data.sealId + ''
		)
		for (const sealId in effDataListBySealId) {
			const effDataListSealId = effDataListBySealId[sealId]
			const totalNeedCount = {
				needCount: 0,
				needPrice: 0,
				willGetStat: 0,
				efficiency: 0
			}
			effDataListSealId.forEach((effDataSealId, i) => {
				totalNeedCount.needCount += effDataSealId.needCount
				totalNeedCount.needPrice += effDataSealId.needPrice
				totalNeedCount.willGetStat += effDataSealId.willGetStat
				totalNeedCount.efficiency =
					(totalNeedCount.efficiency + effDataSealId.efficiency) / (i + 1)
			})
			result.push({ ...effDataListSealId[0], ...totalNeedCount })
		}
		const resultSorted = result.sort((a, b) => {
			const aEff = a.efficiency
			const bEff = b.efficiency
			return bEff - aEff
		})
		effDataListSorted = [...resultSorted]
	}

	const onStatTypeChange = (e: Event) => {
		const target = e.target as HTMLInputElement
		console.log('stat change', target.value)
		setTimeout(() => {
			goalStat = ''
			goalStatInput.focus()
		}, 60)
	}
</script>

<Section>
	<Title>씰 계산기</Title>
	<div class="flex flex-1 flex-col gap-3">
		<form on:submit|preventDefault={onSubmit} class="flex flex-col gap-2">
			<ul class="flex items-center gap-2">
				{#each STATS as stat, i (stat.type)}
					<li>
						<label for="calc{stat.type}">
							<input
								id="calc{stat.type}"
								type="radio"
								class="radio"
								value={stat.type}
								checked={i === 0}
								bind:group={selectedStatType}
								on:change={onStatTypeChange}
							/>
							{stat.name}
						</label>
					</li>
				{/each}
			</ul>
			<div class="flex gap-2">
				<input
					bind:this={goalStatInput}
					type="number"
					class="input w-[200px]"
					placeholder="목표 수치 입력"
					bind:value={goalStat}
				/>
				<button class="variant-filled-primary btn"> 결과보기 </button>
			</div>
		</form>
		<SealList seals={effDataListSorted} let:seal={effData}>
			{@const seal = $seals.find(({ id }) => id === effData.sealId)}
			{#if seal}
				<li class="relative">
					<SealItem {seal} count={effData.count} price={effData.price} />
					필요개수 {effData.needCount} <br />
					필요금액 {effData.needPrice} <br />
					얻게될 능력치 {effData.willGetStat} <br />
					1M당 능력치 {effData.efficiency.toFixed(5)} <br />
				</li>
			{/if}
		</SealList>
	</div>
</Section>
