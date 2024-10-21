<script lang="ts">
	import type { LangType } from '$shared/types'
	import { mySealCounts } from '$entities/seals'
	import { page } from '$app/stores'
	import Tab from '$shared/tabs/ui/Tab.svelte'
	import Tabs from '$shared/tabs/ui/Tabs.svelte'
	import { PATH } from '$shared/config'
	import { Section } from '$shared/section'
	import { MENUS } from '$entities/menus'

	$: lang = $page.data.lang as LangType

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
