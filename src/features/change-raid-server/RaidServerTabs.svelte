<script lang="ts">
	import type { LangType } from '$shared/types'
	import { page } from '$app/stores'
	import { crrServerType, GAME_SERVERS, type ServerType } from '$entities/raid'
	import { _objKeys } from '$shared/lib'
	import { Tab, Tabs, type TabDirection } from '$shared/tabs'

	export let afterSelectServer: (() => void) | undefined = undefined
	export let dir: TabDirection = 'hor'
	$: lang = $page.data.lang as LangType

	const onClickTab = (serverType: ServerType) => {
		crrServerType.set(serverType, lang)
		afterSelectServer && afterSelectServer()
	}
</script>

<Tabs slot="contentSlot" {dir} class={$$restProps.class}>
	{#each _objKeys(GAME_SERVERS) as serverType (serverType)}
		<Tab
			isActive={serverType === $crrServerType}
			on:click={() => onClickTab(serverType)}
		>
			{GAME_SERVERS[serverType]}
		</Tab>
	{/each}
</Tabs>
