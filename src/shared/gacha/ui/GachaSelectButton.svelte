<script lang="ts">
	import { gachaStore, type GachaData } from '$entities/gacha'

	export let gachaData: GachaData
</script>

<button
	class="w-full"
	title="데이터 소환하기"
	on:click={() => gachaStore.selectGacha(gachaData)}
>
	<h2
		class="flex-col-center gap-2 whitespace-pre-line py-3 text-center text-xs2 md:text-xs"
	>
		<span>{gachaData.category}</span>
		<span>{gachaData.name}</span>
	</h2>
	<div>
		{#await import(`$lib/images/gacha/gacha-${gachaData.id}.jpg`) then { default: src }}
			<img
				{src}
				alt=""
				width="152"
				height="138"
				class="w-full"
				draggable="false"
			/>
		{/await}
	</div>
</button>
