<script lang="ts">
	import { selectedRaidTab, raids, type RaidData } from '$entities/raid'
	import { cn } from '$shared/lib'
	import RaidInfo from '$widgets/raid/ui/RaidInfo.svelte'

	const onClickView = (raid: RaidData) => {
		selectedRaidTab.set(raid)
	}
</script>

<div
	class={cn(
		'scroll-box h-full',
		'flex w-[50%] flex-col gap-1 pr-2 md:w-[430px] md:gap-1.5'
	)}
>
	{#each $raids as raid (raid.id)}
		<div
			class={cn(
				'relative rounded-md',
				'hover:bg-secondary-20/80 hover:opacity-100',
				$selectedRaidTab.id === raid.id
					? 'border border-secondary-40 bg-secondary-20/80 opacity-100'
					: 'bg-secondary-20/50 opacity-70'
			)}
		>
			<RaidInfo {raid} />
			<button
				class="absolute left-0 top-0 size-full"
				title="자세히 보기"
				on:click={() => onClickView(raid)}
			>
				<span class="ir">자세히 보기</span>
			</button>
		</div>
	{/each}
</div>
