<script lang="ts">
	import { mySealCounts } from '$entities/seals'
	import { page } from '$app/stores'
	import Tab from '$shared/tabs/ui/Tab.svelte'
	import Tabs from '$shared/tabs/ui/Tabs.svelte'
	import { PATH } from '$shared/config'
	import { Section } from '$shared/section'

	$: SUB_MENUS = [
		{ menuName: '효율 계산기', path: PATH.CALCULATOR },
		{ menuName: '씰 세팅', path: PATH.SETTING_SEALS },
		{ menuName: '보유' + ` (${$mySealCounts.length})`, path: PATH.MY_SEALS }
	]
</script>

<Section>
	<Tabs>
		{#each SUB_MENUS as subMenu (subMenu.path)}
			<Tab
				tagName="a"
				href="/{$page.data.lang}{subMenu.path}"
				isActive={$page.url.pathname === subMenu.path}
			>
				{subMenu.menuName}
			</Tab>
		{/each}
	</Tabs>
	<slot></slot>
</Section>
