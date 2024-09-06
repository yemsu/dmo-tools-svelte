<script lang="ts">
	import { gachaStore, type GachaDataType } from '$entities/gacha'
	import { BackBlur } from '$shared/backBlur'
	import { cn } from '$shared/lib'
	import {
		ItemTooltip,
		GachaButton,
		GachaStartButton,
		GachaTitle
	} from '$shared/gacha'
	import GachaResultItemImage from '$widgets/gacha/ui/GachaResultItemImage.svelte'
	import { createEventDispatcher } from 'svelte'

	export let activeGachaType: GachaDataType
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
	class="position-center flex-col-center h-full max-h-[500px] w-full bg-black/30 sm:px-content-side"
>
	<BackBlur />
	<div
		class="flex-col-center h-full w-full max-w-[300px] gap-10 md:max-w-[400px] md:gap-14"
	>
		<GachaTitle>획득 아이템</GachaTitle>
		<ul
			class={cn(
				'max-h-[160px] w-full flex-1 md:max-h-[220px]',
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
					{activeGachaType}
					count={resultLength}
					isRetry={true}
					on:start={onStart}
				/>
			{/if}
		</div>
	</div>
</section>
