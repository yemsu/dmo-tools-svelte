<script lang="ts">
	import { type RaidData } from '$entities/raid'
	import { cn } from '$shared/lib'
	import { NoData } from '$shared/text'
	import RaidTabListItem from '$widgets/raid/ui/RaidTabListItem.svelte'

	export let raidList: RaidData[]
	export let searchValue: string

	$: selectedRaid = raidList[0]

	const onClickTab = (raid: RaidData) => {
		selectedRaid = raid
	}

	const initSelectedRaidId = () => {
		if (raidList.length == 0 || selectedRaid !== undefined) return
		selectedRaid = raidList[0]
	}

	$: raidList && initSelectedRaidId()
</script>

<div class="flex-1 gap-2 land:gap-4">
	<div class="inline-block w-[45%] max-w-[500px] land:w-[50%]">
		{#if raidList.length > 0 || !searchValue}
			<ul
				class={cn('flex h-full flex-col rounded-md', 'gap-1 land:gap-2')}
				role="tablist"
				aria-label="레이드 채널별 시간 제보 자세히 보기 탭"
			>
				{#each raidList as raid (raid.id)}
					<RaidTabListItem {raid} {selectedRaid} {onClickTab} />
				{/each}
			</ul>
		{:else}
			<NoData class="min-h-[300px]">검색 결과가 없습니다.</NoData>
		{/if}
	</div>
	{#each raidList as raid (raid.id)}
		<div
			id="raid-panel-{raid.id}"
			role="tabpanel"
			aria-labelledby="raid-tab-{raid.id}"
			hidden={selectedRaid.id !== raid.id}
			class={cn(
				'scroll-box sticky top-[calc(var(--header-h)+var(--raid-bar-h))] float-right inline-block h-[100dvh] w-[53%] shrink-0 land:top-0 land:w-[48%]',
				selectedRaid.id !== raid.id && 'hidden'
			)}
		>
			<slot {raid}></slot>
		</div>
	{/each}
</div>
