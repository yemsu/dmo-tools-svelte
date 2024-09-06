<script lang="ts">
	import { GACHA_TYPES } from '$entities/gacha'
	import gachaSymbolImg from '$lib/images/gacha/gacha-symbol.jpg'
	import { _objKeys, cn } from '$shared/lib'

	let currentGachaType = _objKeys(GACHA_TYPES)[0]
</script>

<div
	class="flex-center mb-3 bg-primary-20/40 md:mx-content-side sm:mx-auto sm:mt-4 sm:max-w-[300px]"
>
	{#each _objKeys(GACHA_TYPES) as gachaType (gachaType)}
		<button
			class={cn(
				'flex-center h-tab-h flex-1 gap-2 py-1',
				'border text-xs2 transition-all md:border-2 md:text-xs',
				'hover:border-primary-50 hover:bg-primary-50/20',
				currentGachaType === gachaType
					? 'border-primary-50 bg-primary-50/20'
					: 'border-transparent'
			)}
			on:click={() => (currentGachaType = gachaType)}
		>
			<img
				src={gachaSymbolImg}
				alt=""
				width="22"
				height="23"
				class="w-[1.2em]"
			/>
			{GACHA_TYPES[gachaType]}
		</button>
	{/each}
</div>
<div class="relative h-[80%] sm:w-[100vw]">
	<slot {currentGachaType}></slot>
</div>
