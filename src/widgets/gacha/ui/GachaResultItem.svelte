<script lang="ts">
	import type { GachaResultData } from '$entities/gacha'

	export let gachaResult: GachaResultData
</script>

<li class="flex justify-between gap-4">
	<span>희귀도: {gachaResult.rarity}</span>
	<h3>{gachaResult.item.name}</h3>
	<span>확률:{gachaResult.probability}</span>
</li>
