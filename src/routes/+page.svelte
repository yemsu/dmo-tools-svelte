<script lang="ts">
	import { getSealPrices, getSeals } from '$entities/seals'
	import {
		mySealPrices,
		mySeals,
		myStats,
		sealPrices,
		seals,
		activeMenu
	} from '$entities/seals'
	import type { Menus } from '$entities/seals'
	import type { Stats } from '$entities/seals/type'
	import { cn, objectBy } from '$shared/lib'
	import { Inner } from '$shared/section'
	import { MySeals, TotalSeals, getMySealData } from '$widgets/select-seal-form'
	import { SealCalculator } from '$widgets/seal-calculator'
	import {
		SEAL_STAT_TABLE,
		STATS,
		type StatType
	} from '$widgets/select-seal-form/config'
	import { onMount } from 'svelte'

	onMount(async () => {
		// seals
		const sealsFetched = await getSeals()
		seals.set(sealsFetched)
		// sealPrices
		const sealPricesFetched = await getSealPrices('modifiedAt')
		const newSealPrices = sealPricesFetched.map((sealPrice) => {
			const mySealPrice = $mySealPrices.find(
				({ sealId }) => sealId === sealPrice.sealId
			)
			return mySealPrice || sealPrice
		})
		sealPrices.set(newSealPrices)
		// my seals
		if ($mySeals.length === 0) {
			mySeals.loadSavedData()
		}
	})
	$: statCalc = (statType: StatType) => {
		const mySealsByStatType = objectBy(
			$mySeals,
			({ id }) => getMySealData($seals, id).statType
		)
		if (!mySealsByStatType) return 0
		const sealsByStatType = mySealsByStatType[statType]
		if (!sealsByStatType || sealsByStatType.length === 0) {
			return 0
		}
		let resultValue = 0
		sealsByStatType.forEach(({ id, count }) => {
			let sealPercent = 0
			for (const statTable of SEAL_STAT_TABLE) {
				if (count >= statTable.sealCount) {
					sealPercent = statTable.percent
				} else {
					break
				}
			}
			const seal = getMySealData($seals, id)
			const maxIncrease = seal.maxIncrease
			resultValue += maxIncrease * (sealPercent / 100)
		})
		return resultValue
	}

	$: {
		const newStats = STATS.reduce((result, { type }) => {
			result[type] = statCalc(type)
			return result
		}, {} as Stats)
		myStats.set(newStats)
	}

	const menuDataList: {
		type: Menus
		name: string
		icon: { name: string; width: number; height: number; class?: string }
	}[] = [
		{
			type: 'EVERY',
			name: '모든 씰',
			icon: {
				name: 'streamline:cards',
				width: 20,
				height: 20,
				class: 'mb-[2px]'
			}
		},
		{
			type: 'CALC',
			name: '씰 계산기',
			icon: {
				name: 'circum:calculator-2',
				width: 25,
				height: 25,
				class: 'mb-[1px]'
			}
		},
		{
			type: 'MY',
			name: '보유 씰',
			icon: {
				name: 'ph:treasure-chest-light',
				width: 24,
				height: 24
			}
		}
	]
</script>

<svelte:head>
	<title>디지몬 마스터즈 씰 효율 계산기 | DMO tools</title>
	<meta
		name="description"
		content="디지몬 마스터즈 온라인 씰 효율 계산기 DMO tools 입니다. 보유 중인 씰을 등록하고 목표 능력치를 위한 효율적인 씰 리스트를 편리하게 확인해보세요!"
	/>
</svelte:head>

<Inner
	class={cn('grid h-content-fill-h gap-2 overflow-hidden', 'md:grid-cols-2')}
>
	{#if $activeMenu === 'EVERY'}
		<TotalSeals />
	{:else if $activeMenu === 'MY'}
		<MySeals />
	{:else}
		<SealCalculator />
	{/if}
	<Inner size="full" class="fixed bottom-0 left-0 h-[50px] w-full bg-gray-800">
		<nav>
			<h2 class="ir">글로벌 네비게이션</h2>
			<ul
				class="flex-center h-mobile-nav-h w-full gap-[10%] whitespace-nowrap pt-1 text-center text-[9px]"
			>
				{#each menuDataList as menuData (menuData.type)}
					<li>
						<button
							class={cn(
								'flex-col-center gap-[2px] px-[2vw]',
								$activeMenu === menuData.type
									? 'font-bold opacity-100'
									: 'opacity-50'
							)}
							on:click={() => activeMenu.set(menuData.type)}
						>
							<iconify-icon
								icon={menuData.icon.name}
								width={menuData.icon.width}
								height={menuData.icon.height}
								class={cn(menuData.icon.class)}
							/>
							<span>{menuData.name}</span>
						</button>
					</li>
				{/each}
			</ul>
		</nav>
	</Inner>
</Inner>
