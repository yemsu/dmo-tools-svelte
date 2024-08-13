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
	import { NoData, Title } from '$shared/text'
	import AddTime from '$widgets/raid/ui/AddTime.svelte'
	import RaidList from '$widgets/raid/ui/RaidList.svelte'
	import RaidTimeList from '$widgets/raid/ui/RaidTimeList.svelte'
</script>

<Section
	class={cn(
		'size-full gap-3 p-2 md:p-4',
		'border border-point bg-secondary-10/90',
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
		<RaidList />
		<div class="w-1/2 shrink-0">
			{#if $selectedRaidId}
				{@const raid = _pick($raids, $selectedRaidId)}
				<section
					class="size-full rounded-md bg-secondary-5/40 p-3 backdrop-blur-sm"
				>
					<Title class="mb-3">{raid.name}</Title>
					{#if raid.times.length > 0}
						<RaidTimeList {raid} />
					{:else}
						<NoData>아직 제보된 보스 출현 정보가 없습니다.</NoData>
					{/if}
					<AddTime {raid} />
				</section>
			{/if}
		</div>
	</div>
</Section>
