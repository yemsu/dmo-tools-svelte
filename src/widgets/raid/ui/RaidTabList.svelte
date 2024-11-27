<script lang="ts">
	import { type RaidData } from '$entities/raid'
	import { cn } from '$shared/lib'
	import { NoData } from '$shared/text'
	import { RaidItem } from '$widgets/raid-bar'

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

<div class="gap-2 land:gap-4">
	<div class="inline-block w-[45%] max-w-[500px] land:w-[50%]">
		{#if raidList.length > 0 || !searchValue}
			<ul
				class={cn('flex h-full flex-col rounded-md', 'gap-1 land:gap-2')}
				role="tablist"
				aria-label="레이드 채널별 시간 제보 자세히 보기 탭"
			>
				{#each raidList as raid (raid.id)}
					<li
						role="presentation"
						class={cn(
							'relative flex w-full rounded-md bg-gray-1',
							selectedRaid?.id === raid.id
								? 'border border-gray-10 opacity-100'
								: 'border border-gray-4 opacity-40 land:hover:opacity-100'
						)}
					>
						<button
							title="자세히 보기"
							on:click={() => onClickTab(raid)}
							id="raid-tab-{raid.id}"
							aria-controls="raid-panel-{raid.id}"
							role="tab"
							aria-selected={selectedRaid?.id === raid.id}
							class="button-hover flex-1"
						>
							<RaidItem {raid} />
						</button>
					</li>
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
				'scroll-box sticky top-[calc(var(--header-h)+var(--raid-bar-h))] float-right inline-block h-content-h w-[53%] shrink-0 land:top-0 land:w-[48%]',
				selectedRaid.id !== raid.id && 'hidden'
			)}
		>
			<slot {raid}></slot>
		</div>
	{/each}
</div>
