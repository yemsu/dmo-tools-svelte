<script lang="ts">
	import { raids } from '$entities/raid'
	import { cn } from '$shared/lib'
	import { RaidItem } from '$widgets/raid-bar'

	let selectedRaidId: number | null = null

	const onClickView = (raidId: number) => {
		selectedRaidId = raidId
	}

	const initSelectedRaidId = () => {
		if ($raids.length == 0 || selectedRaidId !== null) return
		selectedRaidId = $raids[0].id
	}

	$: $raids && initSelectedRaidId()
</script>

<div class="flex-1 gap-2 land:gap-4">
	<div class="inline-block w-[45%] max-w-[500px] land:w-[50%]">
		<ul
			class={cn('flex h-full flex-col rounded-md', 'gap-1 land:gap-2')}
			role="tablist"
			aria-label="레이드 채널별 시간 제보 자세히 보기 탭"
		>
			{#each $raids as raid (raid.id)}
				<li role="presentation">
					<button
						class={cn(
							'relative w-full overflow-hidden rounded-md bg-gray-3',
							selectedRaidId === raid.id
								? 'border border-gray-10 opacity-100'
								: 'border border-gray-4 opacity-40 land:hover:opacity-100'
						)}
						title="자세히 보기"
						on:click={() => onClickView(raid.id)}
						id="raid-tab-{raid.id}"
						aria-controls="raid-panel-{raid.id}"
						role="tab"
						aria-selected={selectedRaidId === raid.id}
					>
						<RaidItem {raid} />
					</button>
				</li>
			{/each}
		</ul>
	</div>
	{#each $raids as raid, i (raid.id)}
		<div
			id="raid-panel-{raid.id}"
			role="tabpanel"
			aria-labelledby="raid-tab-{raid.id}"
			hidden={selectedRaidId !== raid.id}
			class={cn(
				'sticky top-[calc(var(--header-h)+var(--raid-bar-h))] float-right inline-block w-[53%] shrink-0 land:top-0 land:w-[48%]',
				selectedRaidId !== raid.id && 'hidden'
			)}
		>
			<slot {raid}></slot>
		</div>
	{/each}
</div>
