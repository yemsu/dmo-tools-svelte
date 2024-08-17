<script lang="ts">
	import {
		crrServerType,
		GAME_SERVERS,
		raids,
		selectedRaidId
	} from '$entities/raid'
	import { _objKeys, _pick, cn } from '$shared/lib'
	import Section from '$shared/section/ui/Section.svelte'
	import Tab from '$shared/tabs/ui/Tab.svelte'
	import Tabs from '$shared/tabs/ui/Tabs.svelte'
	import { Title } from '$shared/text'
	import RaidList from '$widgets/raid/ui/RaidList.svelte'
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
		<Title class="leading-none">보스 출현 정보</Title>
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
		<RaidList />
		<div class="w-[65%] shrink-0 md:w-1/2">
			{#if $raids.length > 0 && $selectedRaidId}
				<RaidTimeView raid={_pick($raids, $selectedRaidId)} />
			{/if}
		</div>
	</div>
</Section>
