<script lang="ts">
	import type { GachaResultItem } from '$entities/gacha'

	export let gachaItem: GachaResultItem
</script>

<li class="flex justify-between gap-4">
	<span>희귀도: {gachaItem.rarity}</span>
	<h3>{gachaItem.item.name}</h3>
	<span>확률:{gachaItem.probability}</span>
</li>
