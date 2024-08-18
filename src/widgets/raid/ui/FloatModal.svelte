<script lang="ts">
	import { crrServerType, GAME_SERVERS } from '$entities/raid'
	import Badge from '$shared/badge/Badge.svelte'
	import { _objKeys, cn } from '$shared/lib'
	import Section from '$shared/section/ui/Section.svelte'
	import Tab from '$shared/tabs/ui/Tab.svelte'
	import Tabs from '$shared/tabs/ui/Tabs.svelte'
	import { Title } from '$shared/text'
	import RaidTabList from '$widgets/raid/ui/RaidTabList.svelte'
	import RaidTimeView from '$widgets/raid/ui/RaidTimeView.svelte'
</script>

<Section
	class={cn(
		'size-full gap-3 p-2 md:p-4',
		'border border-gray-500 bg-secondary-10/90',
		'rounded-md backdrop-blur-sm'
	)}
>
	<div class="flex items-center gap-4">
		<Title class="leading-none">
			보스 출현 정보
			<Badge color="warning" shape="square" class="italic">Beta</Badge>
		</Title>
		<Tabs>
			{#each _objKeys(GAME_SERVERS) as serverType (serverType)}
				<Tab
					isActive={$crrServerType === serverType}
					on:click={() => crrServerType.set(serverType)}
					class="text-xs"
				>
					{GAME_SERVERS[serverType]}
				</Tab>
			{/each}
		</Tabs>
	</div>
	<RaidTabList let:raid>
		<RaidTimeView {raid} />
	</RaidTabList>
</Section>
