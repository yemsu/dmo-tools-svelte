<script lang="ts">
	import { page } from '$app/stores'
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
	import { objectBy } from '$shared/lib'
	import { Section } from '$shared/section'
	import Tab from '$shared/tabs/ui/Tab.svelte'
	import Tabs from '$shared/tabs/ui/Tabs.svelte'
	import type { LangType } from '$shared/types'
	import { getMySealData } from '$widgets/my-seals'
	import { getCurrentStep } from '$widgets/seal-calculator'

	$: lang = $page.data.lang as LangType
	$: statCalc = (statType: StatType) => {
		if ($mySealCounts.length === 0) return
		const mySealsByStatType = objectBy(
			$mySealCounts,
			({ id }) => getMySealData($page.data.seals, id).statType
		)
		if (!mySealsByStatType) return 0
		const sealsByStatType = mySealsByStatType[statType]
		if (!sealsByStatType || sealsByStatType.length === 0) {
			return 0
		}
		let resultValue = 0
		sealsByStatType.forEach(({ id, count }) => {
			let sealPercent = 0
			const seal = getMySealData($page.data.seals, id)
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
	const setMyData = async () => {
		await mySealCounts.load()
		await mySealPrices.load()
	}
	$: $user && setMyData()

	const resetMyData = () => {
		mySealCounts.reset()
		mySealPrices.reset()
	}
	$: !$user && resetMyData()

	// my stats
	const setMyStats = () => {
		if ($mySealCounts.length === 0) return
		const newStats = STATS.reduce((result, { type }) => {
			const statTypeCalc = statCalc(type)
			if (statTypeCalc === undefined) return result
			result[type] = statTypeCalc
			return result
		}, {} as Stats)
		myStats.set(newStats)
	}

	$: $mySealCounts && setMyStats()
</script>

<Section>
	<Tabs>
		{#each SUB_MENUS as subMenu (lang + subMenu.path)}
			<Tab
				tagName="a"
				href="/{lang}{subMenu.path}"
				isActive={new RegExp(`${subMenu.path}$`).test($page.url.pathname)}
			>
				{subMenu.menuName[lang]}
			</Tab>
		{/each}
	</Tabs>
	<slot></slot>
</Section>
