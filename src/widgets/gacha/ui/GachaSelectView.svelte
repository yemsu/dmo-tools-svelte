<script lang="ts">
	import { page } from '$app/stores'
	import { GachaCard, GachaTitle } from '$shared/gacha'
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()
</script>

<div
	class="flex-col-center absolute top-1/2 z-20 w-full -translate-y-1/2 gap-10"
>
	<GachaTitle class="max-w-[500px]">소환할 데이터를 선택하세요.</GachaTitle>
	<section class="flex gap-5 md:gap-10">
		{#each $page.data.gachaList as gachaData (gachaData.id)}
			<GachaCard {gachaData} on:start={() => dispatch('start')} />
		{/each}
	</section>
</div>
