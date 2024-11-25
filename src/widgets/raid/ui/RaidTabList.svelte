<script lang="ts">
	import { type RaidData } from '$entities/raid'
	import { cn } from '$shared/lib'
	import { NoData } from '$shared/text'
	import { RaidItem } from '$widgets/raid-bar'

	export let raidList: RaidData[]
	export let selectRaid: (raid: RaidData) => void
	export let selectedRaid: RaidData | undefined
	export let searchValue: string

	const onClickTab = (raid: RaidData) => {
		selectRaid(raid)
	}

	const initSelectedRaidId = () => {
		if (raidList.length == 0 || selectedRaid !== undefined) return
		selectRaid(raidList[0])
	}

	$: raidList && initSelectedRaidId()
</script>

<div>
	{#if raidList.length > 0 || !searchValue}
		<ul
			class={cn('flex h-full flex-col rounded-md', 'gap-1 land:gap-2')}
			role="tablist"
			aria-label="레이드 채널별 시간 제보 자세히 보기 탭"
		>
			{#each raidList as raid (raid.id)}
				<li role="presentation">
					<button
						class={cn(
							'relative w-full overflow-hidden rounded-md',
							selectedRaid?.id === raid.id
								? 'border border-gray-10 opacity-100'
								: 'border border-gray-4 opacity-40 land:hover:opacity-100'
						)}
						title="자세히 보기"
						on:click={() => onClickTab(raid)}
						id="raid-tab-{raid.id}"
						aria-controls="raid-panel-{raid.id}"
						role="tab"
						aria-selected={selectedRaid?.id === raid.id}
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
