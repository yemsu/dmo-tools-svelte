<script lang="ts">
	import { gachaStore } from '$entities/gacha'
	import { cn } from '$shared/lib'
	import GachaTitle from '$widgets/gacha/ui/GachaTitle.svelte'
	import ItemTooltip from '$widgets/gacha/ui/ItemTooltip.svelte'
	import GachaButton from '$widgets/gacha/ui/start/GachaButton.svelte'
	import GachaResultItemImage from '$widgets/gacha/ui/start/GachaResultItemImage.svelte'
	import GachaStartButton from '$widgets/gacha/ui/start/GachaStartButton.svelte'
	import { createEventDispatcher } from 'svelte'

	$: resultLength = $gachaStore.results.length

	const dispatch = createEventDispatcher()

	const onConfirm = () => {
		dispatch('confirm')
	}

	const onStart = () => {
		dispatch('start')
	}
</script>

<section
	class="position-center flex-col-center h-full max-h-[500px] w-full bg-black/30 backdrop-blur-sm"
>
	<div class="flex-col-center h-full w-full max-w-[400px] gap-14">
		<GachaTitle>획득 아이템</GachaTitle>
		<ul
			class={cn(
				'max-h-[220px] w-full flex-1',
				$gachaStore.results.length === 1
					? 'flex-center'
					: 'grid grid-cols-4 justify-center gap-3'
			)}
		>
			{#each $gachaStore.results as resultItem, i}
				<li
					class={cn(
						'flex-center group relative',
						(i === 4 || i === 5) && 'col-span-2'
					)}
				>
					<GachaResultItemImage id={resultItem.item.id} />
					<ItemTooltip name={resultItem.item.name} />
				</li>
			{/each}
		</ul>
		<div class="flex-center w-[200px] gap-[10%]">
			{#if resultLength === 1 || resultLength === 10}
				<GachaButton bg="confirm" on:click={onConfirm}>확인</GachaButton>
				<GachaStartButton
					count={resultLength}
					isRetry={true}
					on:start={onStart}
				/>
			{/if}
		</div>
	</div>
</section>
