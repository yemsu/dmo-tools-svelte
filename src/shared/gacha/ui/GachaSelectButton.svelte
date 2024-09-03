<script lang="ts">
	import { gachaStore, type GachaData } from '$entities/gacha'
	import imgGacha1 from '$lib/images/gacha/gacha-1.jpg'
	import imgGacha2 from '$lib/images/gacha/gacha-2.jpg'

	export let gachaData: GachaData
	export let gachaType: string

	const getGachaImage = (id: number) => {
		switch (id) {
			case 1:
				return imgGacha1
			case 2:
				return imgGacha2
		}
	}
</script>

<button
	class="w-[120px] md:w-[152px]"
	title="데이터 소환하기"
	on:click={() => gachaStore.selectGacha(gachaData)}
>
	<h2
		class="flex-col-center gap-2 whitespace-pre-line py-3 text-center text-xs2 md:text-xs"
	>
		<span>{gachaType}</span>
		<span>{gachaData.name}</span>
	</h2>
	<div>
		<img src={getGachaImage(gachaData.id)} alt="" width="152" height="138" />
	</div>
</button>
