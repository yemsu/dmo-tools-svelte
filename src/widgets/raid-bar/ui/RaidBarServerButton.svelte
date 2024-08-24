<script lang="ts">
	import { crrServerType, GAME_SERVERS, type ServerType } from '$entities/raid'
	import { _objKeys } from '$shared/lib'
	import { Tab, Tabs } from '$shared/tabs'

	let isTabOpen = false
	const onClickTab = (serverType: ServerType) => {
		crrServerType.set(serverType)
		isTabOpen = false
	}
</script>

<button
	class="relative h-full w-[40px] rounded-bl-md rounded-tl-md bg-primary-50 text-center text-xs font-bold text-primary-5 md:w-[50px] md:px-2 md:text-sm"
	title="채널 변경하기"
	on:click={() => (isTabOpen = !isTabOpen)}
>
	{$crrServerType ? GAME_SERVERS[$crrServerType] : ''}
</button>
{#if isTabOpen}
	<Tabs
		dir="ver"
		class="border-primary-50-neon absolute bottom-0 w-[100px] translate-y-full"
	>
		{#each _objKeys(GAME_SERVERS) as serverType (serverType)}
			<Tab
				isActive={serverType === $crrServerType}
				on:click={() => onClickTab(serverType)}
			>
				{GAME_SERVERS[serverType]}
			</Tab>
		{/each}
	</Tabs>
{/if}
