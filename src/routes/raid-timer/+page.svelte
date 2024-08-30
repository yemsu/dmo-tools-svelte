<script lang="ts">
	import { crrServerType, GAME_SERVERS } from '$entities/raid'
	import { Badge } from '$shared/badge'
	import { META } from '$shared/config'
	import { _objKeys } from '$shared/lib'
	import { Section } from '$shared/section'
	import { Tabs, Tab } from '$shared/tabs'
	import { Title } from '$shared/text'
	import { RaidTabList, RaidTimeView } from '$widgets/raid'
</script>

<svelte:head>
	<title>{META.RAID_TIMER.TITLE}</title>
	<meta name="description" content={META.RAID_TIMER.DESC} />
</svelte:head>

<Section>
	<div class="flex items-center gap-4">
		<Title class="leading-none">레이드 타이머</Title>
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
