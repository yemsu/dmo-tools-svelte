<script lang="ts">
	import { page } from '$app/stores'
	import {
		currentCharacterId,
		currentCharacters,
		getCharacters
	} from '$entities/characters'
	import { MENUS } from '$entities/menus'
	import {
		mySealCounts,
		mySealPrices,
		myStats,
		STATS,
		STATS_PERCENT_TYPE,
		type Stats,
		type StatType
	} from '$entities/seals'
	import { user } from '$entities/user'
	import { PATH } from '$shared/config'
	import { cn, objectBy } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Section } from '$shared/section'
	import Tab from '$shared/tabs/ui/Tab.svelte'
	import Tabs from '$shared/tabs/ui/Tabs.svelte'
	import CharacterDropdown from '$widgets/character-dropdown/CharacterDropdown.svelte'
	import { getMySealData } from '$widgets/my-seals'
	import { getCurrentStep } from '$widgets/seal-calculator'
	import type { PageData } from './$types'

	export let data: PageData
	$: statCalc = (statType: StatType) => {
		if ($mySealCounts.length === 0) return
		const mySealsByStatType = objectBy(
			$mySealCounts,
			({ id }) => getMySealData(data.seals, id).statType
		)
		if (!mySealsByStatType) return 0
		const sealsByStatType = mySealsByStatType[statType]
		if (!sealsByStatType || sealsByStatType.length === 0) {
			return 0
		}
		let resultValue = 0
		sealsByStatType.forEach(({ id, count }) => {
			let sealPercent = 0
			const seal = getMySealData(data.seals, id)
			const crrStat = getCurrentStep(seal, count)
			sealPercent = crrStat.percent
			const maxIncrease = seal.maxIncrease
			resultValue += maxIncrease * (sealPercent / 100)
		})
		if (STATS_PERCENT_TYPE.includes(statType)) {
			resultValue = resultValue / 100
		}
		return resultValue
	}

	$: SUB_MENUS = [
		{
			menuName: {
				kr: MENUS.calc.name,
				en: MENUS.calc.engName
			},
			path: PATH.CALCULATOR
		},
		{
			menuName: {
				kr: '씰 세팅',
				en: 'Setting Seals'
			},
			path: PATH.SETTING_SEALS
		},
		{
			menuName: {
				kr: `보유 (${$mySealCounts.length})`,
				en: `My Seals (${$mySealCounts.length})`
			},
			path: PATH.MY_SEALS
		}
	]
	// my seals
	const getMySealPrices = async () => {
		mySealPrices.load()
	}
	const getMySealCounts = async () => {
		if (!$currentCharacterId) return
		await mySealCounts.load($currentCharacterId)
	}
	$: $user && getMySealPrices()
	$: $user && $currentCharacterId && getMySealCounts()

	const resetMyData = () => {
		mySealCounts.reset()
		mySealPrices.reset()
	}
	$: !$user && resetMyData()

	// my stats
	const setMyStats = () => {
		const newStats = STATS.reduce((result, { type }) => {
			const statTypeCalc = $mySealCounts.length === 0 ? 0 : statCalc(type)
			if (statTypeCalc === undefined) return result
			result[type] = statTypeCalc
			return result
		}, {} as Stats)
		myStats.set(newStats)
	}

	$: $mySealCounts && setMyStats()

	const setCharacters = async () => {
		if ($currentCharacters) return
		const characters = await getCharacters()
		currentCharacters.set(characters)
		currentCharacterId.set(characters[0].id)
	}

	const clearCharacters = () => {
		$currentCharacters = undefined
		$currentCharacterId = undefined
	}

	$: $user && setCharacters()
	$: !$user && clearCharacters()
</script>

<Section>
	<div class="flex items-center">
		{#if $user}
			<CharacterDropdown />
		{/if}

		<Tabs class={cn('flex-1', $user && 'rounded-l-none')}>
			{#each SUB_MENUS as subMenu ($lang + subMenu.path)}
				<Tab
					tagName="a"
					href="/{$lang}{subMenu.path}"
					isActive={new RegExp(`${subMenu.path}$`).test($page.url.pathname)}
				>
					{subMenu.menuName[$lang]}
				</Tab>
			{/each}
		</Tabs>
	</div>
	<slot></slot>
</Section>
