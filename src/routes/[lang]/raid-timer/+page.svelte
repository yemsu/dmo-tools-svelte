<script lang="ts">
	import { page } from '$app/stores'
	import { crrServerType, GAME_SERVERS } from '$entities/raid'
	import { META } from '$shared/config'
	import { _objKeys } from '$shared/lib'
	import { Section } from '$shared/section'
	import { Tab, Tabs } from '$shared/tabs'
	import { Title } from '$shared/text'
	import type { LangType } from '$shared/types'
	import { RaidTabList, RaidTimeView } from '$widgets/raid'

	$: lang = $page.data.lang as LangType
</script>

<svelte:head>
	<title>{META.RAID_TIMER.TITLE[lang]}</title>
	<meta name="description" content={META.RAID_TIMER.DESC[lang]} />
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
