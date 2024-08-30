<script lang="ts">
	import type { GachaItemData } from '$entities/gacha'

	export let id: GachaItemData['id']
</script>

{#await import(`$lib/images/gacha/items/item-${id}.jpg`) then { default: src }}
	<img {src} alt="" width="51" height="53" />
{/await}
