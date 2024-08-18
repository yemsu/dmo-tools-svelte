<script lang="ts">
	import { raids, type RaidData } from '$entities/raid'
	import { cn } from '$shared/lib'
	import { RaidItem } from '$widgets/raid-bar'

	let selectedTabIndex = 0

	const onClickView = (tabIndex: number) => {
		selectedTabIndex = tabIndex
	}
</script>

<div class="flex flex-1 overflow-hidden">
	<ul
		class={cn(
			'scroll-box h-full',
			'flex w-[50%] flex-col gap-1 pr-1 md:w-[430px] md:gap-1.5'
		)}
		role="tablist"
		aria-label="레이드 채널별 시간 제보 자세히 보기 탭"
	>
		{#each $raids as raid, i (raid.id)}
			<li
				class={cn(
					'relative rounded-md',
					'p-1.5 pt-1 text-xs md:p-2 md:hover:bg-secondary-20 md:hover:opacity-100',
					selectedTabIndex === i
						? 'border border-secondary-40 bg-secondary-20 opacity-100'
						: 'bg-secondary-20 opacity-40'
				)}
				role="presentation"
			>
				<button
					class="w-full"
					title="자세히 보기"
					on:click={() => onClickView(i)}
					id="raid-tab-{raid.id}"
					aria-controls="raid-panel-{raid.id}"
					role="tab"
					aria-selected={selectedTabIndex === i}
				>
					<RaidItem {raid} compact />
				</button>
			</li>
		{/each}
	</ul>
	{#each $raids as raid, i (raid.id)}
		<div
			id="raid-panel-{raid.id}"
			role="tabpanel"
			aria-labelledby="raid-tab-{raid.id}"
			hidden={selectedTabIndex !== i}
			class={cn(
				'w-[60%] shrink-0 md:w-[45%]',
				selectedTabIndex !== i && 'hidden'
			)}
		>
			<slot {raid}></slot>
		</div>
	{/each}
</div>
