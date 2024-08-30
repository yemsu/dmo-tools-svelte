<script lang="ts">
	import { gachaStore } from '$entities/gacha'
	import { cn } from '$shared/lib'
	import { Section } from '$shared/section'
	import GachaItemImage from '$widgets/gacha/ui/GachaItemImage.svelte'
	import GachaButton from '$widgets/gacha/ui/start/GachaButton.svelte'
	import GachaStartButton from '$widgets/gacha/ui/start/GachaStartButton.svelte'

	$: resultLength = $gachaStore.gachaResults.length
	$: bestItemId = $gachaStore.currentGacha?.gachaItems[0].id
</script>

<Section
	class="position-center bg-gacha-card flex-col-center  h-full max-h-[500px] w-full backdrop-blur-sm"
>
	<h2 class="ir">뽑기 결과</h2>
	<ul
		class={cn(
			'max-h-[250px] w-full max-w-[500px] flex-1',
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
					class="absolute bottom-0 left-1/2 z-10 hidden translate-y-[60%] whitespace-nowrap bg-gacha-40/70 p-3 group-hover:block"
					>{resultItem.item.name}</span
				>
			</li>
		{/each}
	</ul>
	<div class="flex-center mt-5 w-[200px] gap-[10%]">
		{#if resultLength === 1 || resultLength === 10}
			<GachaButton bg="confirm" on:click={() => gachaStore.setGachaResults([])}>
				확인
			</GachaButton>
			<GachaStartButton count={resultLength} isRetry={true} />
		{/if}
	</div>
</Section>
