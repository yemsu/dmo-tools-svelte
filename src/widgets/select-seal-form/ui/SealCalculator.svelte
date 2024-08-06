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

	const getNextSteps = (sealCount: number) => {
		if (sealCount === 0) return SEAL_STAT_TABLE
		let nextSteps: (typeof SEAL_STAT_TABLE)[number][] = []
		for (const statTable of SEAL_STAT_TABLE) {
			if (sealCount < statTable.sealCount) {
				nextSteps.push(statTable)
			} else {
				continue
			}
		}
		return nextSteps
	}

	const getPrevStep = (crrStepSealCount: number) => {
		let step: (typeof SEAL_STAT_TABLE)[number] | undefined
		for (const statTable of SEAL_STAT_TABLE) {
			if (crrStepSealCount > statTable.sealCount) {
				step = statTable
			} else {
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

	$: getAllStepEffData = (seal: SealData): SealEfficiency2[] => {
		const result: SealEfficiency2[] = []
		const price = getSealPrice(seal.id)
		if (!price) return result
		const mySealCount = getMySealCount(seal.id)
		const nextSteps = getNextSteps(mySealCount)
		if (nextSteps.length === 0) return result
		for (const nextStep of nextSteps) {
			const prevStepPercent = getPrevStep(nextStep.sealCount)?.percent || 0
			const willGetStat =
				seal.maxIncrease * ((nextStep.percent - prevStepPercent) / 100)
			const needCount = nextStep.sealCount - mySealCount
			const needPrice = price ? needCount * price : 0

			result.push({
				sealId: seal.id,
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

	const sortByEffDataList = (effDataList: SealEfficiency2[]) => {
		return effDataList.sort((a, b) => {
			const aEff = a.efficiency
			const bEff = b.efficiency
			return bEff - aEff
		})
	}

	const resultMerged = (effDataList: SealEfficiency2[]) => {
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
		return sortByEffDataList(result)
	}

	const resetPrevResult = () => {
		effDataListSorted = []
		willGetStatTotal = 0
		willNeedMoneyTotal = 0
	}

	$: onSubmit = () => {
		if (goalStat === '') {
			alert('목표 수치를 입력해주세요.')
			return
		}
		resetPrevResult()

		const statSeals = $seals.filter(
			({ statType }) => statType === selectedStatType
		)

		// 효율 리스트 뽑기
		const allSealsEffData: SealEfficiency2[] = []
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
		const needStatCount = goalStat - $myStats[selectedStatType]
		const result: SealEfficiency2[] = []
		for (const effData of sortedEfficiencyData) {
			if (willGetStatTotal >= needStatCount) break
			result.push(effData)
			willGetStatTotal += effData.willGetStat
			willNeedMoneyTotal += effData.needPrice
		}
		// 결과 리스트에 같은 씰이 여러개인 케이스 merge
		effDataListSorted = resultMerged(result)
	}

	const onStatTypeChange = (e: Event) => {
		const target = e.target as HTMLInputElement
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
					class="w-[200px]"
					placeholder="목표 수치 입력"
					bind:value={goalStat}
				/>
				<button class="variant-filled-primary"> 결과보기 </button>
			</div>
		</form>
		<SealList
			seals={effDataListSorted}
			let:seal={effData}
			noDataText="목표 수치를 입력하여 가장 효율적인 씰 구성을 확인해보세요!"
		>
			{@const seal = $seals.find(({ id }) => id === effData.sealId)}
			{#if seal}
				<li class="relative">
					<SealItem {seal} />
					필요개수 {effData.needCount} <br />
					필요금액 {effData.needPrice} <br />
					얻게될 능력치 {effData.willGetStat} <br />
					1M당 능력치 {effData.efficiency.toFixed(5)} <br />
				</li>
			{/if}
		</SealList>
		<p>{willGetStatTotal}</p>
		<p>{willNeedMoneyTotal}</p>
	</div>
</Section>
