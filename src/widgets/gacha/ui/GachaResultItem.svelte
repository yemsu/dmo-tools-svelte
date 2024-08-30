<script lang="ts">
	import type { GachaResultItem } from '$entities/gacha'

	export let item: GachaResultItem
</script>

<li class="flex justify-between gap-4">
	<span>희귀도: {item.rarity}</span>
	<h3>{item.name}</h3>
	<span>확률:{item.probability}</span>
</li>
