<script lang="ts">
	import { crrServerType, GAME_SERVERS } from '$entities/raid'
	import { _objKeys, cn } from '$shared/lib'
	import Section from '$shared/section/ui/Section.svelte'
	import Tab from '$shared/tabs/ui/Tab.svelte'
	import Tabs from '$shared/tabs/ui/Tabs.svelte'
	import { Title } from '$shared/text'
	import RaidDetailView from '$widgets/raid/ui/RaidDetailView.svelte'
	import RaidList from '$widgets/raid/ui/RaidList.svelte'
</script>

<Section
	class={cn(
		'size-full gap-3 p-2 md:p-4',
		'border border-point bg-secondary-10/80',
		'rounded-md backdrop-blur-sm'
	)}
>
	<div class="flex gap-4">
		<Title>보스 출현 정보</Title>
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
	<div class="flex flex-1 overflow-hidden">
		<RaidList></RaidList>
		<div class="flex-1">
			<RaidDetailView></RaidDetailView>
		</div>
	</div>
</Section>
