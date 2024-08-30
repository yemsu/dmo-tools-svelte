<script lang="ts">
	import type { GachaData } from '$entities/gacha'
	import { createEventDispatcher } from 'svelte'

	export let gachaType: string
	export let gachaName: GachaData['name']

	const dispatch = createEventDispatcher()

	const closePopup = () => {
		dispatch('close')
	}
</script>

<section class="position-center bg-gacha-popup w-full max-w-[500px] px-4 py-2">
	<div class="flex-col-center gap-3 text-center">
		<h2 class="font-ns-bold text-lg2 text-[yellow]">확률 정보</h2>
		<div>
			<p>{gachaType}</p>
			<p>{gachaName}</p>
		</div>
	</div>
	<div class="mt-3">
		<slot></slot>
	</div>
	<button class="absolute right-2 top-2" on:click={closePopup}>닫기</button>
</section>
