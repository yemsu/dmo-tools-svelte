<script lang="ts">
	import { gachaStore } from '$entities/gacha'
	import { cn } from '$shared/lib'
	import { Section } from '$shared/section'
	import GachaItemImage from '$widgets/gacha/ui/GachaItemImage.svelte'
	import GachaTitle from '$widgets/gacha/ui/GachaTitle.svelte'
	import GachaButton from '$widgets/gacha/ui/start/GachaButton.svelte'
	import GachaStartButton from '$widgets/gacha/ui/start/GachaStartButton.svelte'
	import { createEventDispatcher } from 'svelte'

	$: resultLength = $gachaStore.gachaResults.length
	$: bestItemId = $gachaStore.currentGacha?.gachaItems[0].id

	const dispatch = createEventDispatcher()

	const onConfirm = () => {
		dispatch('confirm')
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
				$gachaStore.gachaResults.length === 1
					? 'flex-center'
					: 'grid grid-cols-4 justify-center gap-3'
			)}
		>
			{#each $gachaStore.gachaResults as resultItem, i}
				<li
					class={cn(
						'flex-center group relative',
						bestItemId === resultItem.id && 'border-2 border-[magenta]',
						(i === 4 || i === 5) && 'col-span-2'
					)}
				>
					<GachaItemImage id={resultItem.item.id}></GachaItemImage>
					<span
						class="absolute bottom-0 left-1/2 z-10 hidden translate-y-1/2 whitespace-nowrap bg-[#1c1b36dd] p-3 text-xs group-hover:block"
					>
						{resultItem.item.name}
					</span>
				</li>
			{/each}
		</ul>
		<div class="flex-center w-[200px] gap-[10%]">
			{#if resultLength === 1 || resultLength === 10}
				<GachaButton bg="confirm" on:click={onConfirm}>확인</GachaButton>
				<GachaStartButton count={resultLength} isRetry={true} />
			{/if}
		</div>
	</div>
</section>
