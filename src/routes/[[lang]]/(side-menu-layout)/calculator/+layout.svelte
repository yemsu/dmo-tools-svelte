<script lang="ts">
	import { page } from '$app/stores'
	import {
		currentCharacterId,
		currentCharacters,
		getCharacters
	} from '$entities/characters'
	import { mySealCounts, mySealPrices, myStats } from '$entities/seals'
	import { user } from '$entities/user'
	import { getMyAllStats } from '$features/calculate-seal-efficiency'
	import { PATH } from '$shared/config'
	import { lang, langPath } from '$shared/model'
	import { Tabs, Tab } from '$shared/tabs'
	import { PageHeader } from '$shared/ui/page-header'
	import { CharacterTabs } from '$widgets/character-tabs'
	import type { PageData } from './$types'
	import './calculator.css'

	export let data: PageData

	$: SUB_MENUS = [
		{
			menuName: {
				kr: '계산기',
				en: 'Calculator'
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
		const newStats = getMyAllStats(data.seals, $mySealCounts)
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

<section class="flex flex-1 flex-col">
	<PageHeader title={{ kr: '씰 효율 계산기', en: 'Seal Calculator' }}>
		<div class="flex w-full flex-col gap-2">
			<CharacterTabs />
			<Tabs variant="underline">
				{#each SUB_MENUS as subMenu ($lang + subMenu.path)}
					<Tab
						variant="underline"
						tagName="a"
						href="{$langPath}{subMenu.path}"
						isActive={new RegExp(`${subMenu.path}$`).test($page.url.pathname)}
					>
						{subMenu.menuName[$lang]}
					</Tab>
				{/each}
			</Tabs>
		</div>
	</PageHeader>
	<section class="flex flex-1 flex-col gap-2">
		<slot></slot>
	</section>
</section>
