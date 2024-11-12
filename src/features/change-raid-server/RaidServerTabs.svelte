<script lang="ts">
	import { crrServerType, GAME_SERVERS, type ServerType } from '$entities/raid'
	import { _objKeys } from '$shared/lib'
	import { Tab, Tabs, type TabDirection } from '$shared/tabs'

	export let afterSelectServer: (() => void) | undefined = undefined
	export let dir: TabDirection = 'hor'

	const onClickTab = (serverType: ServerType) => {
		crrServerType.set(serverType)
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
