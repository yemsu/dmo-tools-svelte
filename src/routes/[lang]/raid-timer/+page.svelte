<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { crrServerType, GAME_SERVERS } from '$entities/raid'
	import { META, PATH } from '$shared/config'
	import { _objKeys } from '$shared/lib'
	import { Section } from '$shared/section'
	import { Tab, Tabs } from '$shared/tabs'
	import { Title } from '$shared/text'
	import { RaidTabList, RaidTimeView } from '$widgets/raid'
	import type { LangType } from '$shared/types'
	import { onMount } from 'svelte'

	$: lang = $page.data.lang as LangType

	$: {
		if (lang !== 'kr') {
			// 클라이언트에서만 실행되도록 onMount 내에서 goto 호출
			onMount(() => {
				goto(`/${lang}${PATH.MAIN}`)
			})
		}
	}
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
