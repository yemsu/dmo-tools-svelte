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

<div class="flex flex-1 overflow-hidden">
	<ul
		class={cn(
			'scroll-box h-full',
			'flex w-[50%] flex-col gap-1 rounded-md bg-gray-3 p-1 pr-2 md:w-[430px] md:gap-1.5 md:p-1.5'
		)}
		role="tablist"
		aria-label="레이드 채널별 시간 제보 자세히 보기 탭"
	>
		{#each $raids as raid (raid.id)}
			<li
				class={cn(
					'relative rounded-md',
					'md:hover:bg-secondary-10 md:hover:opacity-100',
					selectedRaidId === raid.id
						? 'border border-secondary-40 bg-secondary-10 opacity-100'
						: 'bg-secondary-10 opacity-40'
				)}
				role="presentation"
			>
				<button
					class="text-sub-md w-full px-1.5 py-2 md:p-2"
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
	{#each $raids as raid, i (raid.id)}
		<div
			id="raid-panel-{raid.id}"
			role="tabpanel"
			aria-labelledby="raid-tab-{raid.id}"
			hidden={selectedRaidId !== raid.id}
			class={cn(
				'w-[60%] shrink-0 md:w-[50%]',
				selectedRaidId !== raid.id && 'hidden'
			)}
		>
			<slot {raid}></slot>
		</div>
	{/each}
</div>
