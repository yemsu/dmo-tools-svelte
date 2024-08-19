<script lang="ts">
	import { crrServerType, GAME_SERVERS } from '$entities/raid'
	import { Badge } from '$shared/badge'
	import { _objKeys } from '$shared/lib'
	import { Section } from '$shared/section'
	import { Tabs, Tab } from '$shared/tabs'
	import { Title } from '$shared/text'
	import { RaidTabList, RaidTimeView } from '$widgets/raid'
</script>

<Section>
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
