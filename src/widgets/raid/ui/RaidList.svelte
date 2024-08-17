<script lang="ts">
	import { selectedRaidId, raids, type RaidData } from '$entities/raid'
	import { cn } from '$shared/lib'
	import { RaidItem } from '$widgets/raid-bar'

	const onClickView = (raid: RaidData) => {
		selectedRaidId.set(raid.id)
	}
</script>

<ul
	class={cn(
		'scroll-box h-full',
		'flex w-[50%] flex-col gap-1 pr-1 md:w-[430px] md:gap-1.5'
	)}
>
	{#each $raids as raid (raid.id)}
		<li
			class={cn(
				'relative rounded-md',
				'p-1.5 pt-1 text-xs md:p-2 md:hover:bg-secondary-20 md:hover:opacity-100',
				$selectedRaidId === raid.id
					? 'border border-secondary-40 bg-secondary-20 opacity-100'
					: 'bg-secondary-20 opacity-40'
			)}
		>
			<button
				class="w-full"
				title="자세히 보기"
				on:click={() => onClickView(raid)}
			>
				<RaidItem {raid} compact />
			</button>
		</li>
	{/each}
</ul>
