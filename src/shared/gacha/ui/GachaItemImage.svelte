<script lang="ts">
	import { type GachaItemData } from '$entities/gacha'
	import { cn } from '$shared/lib'

	export let id: GachaItemData['id']
	const { class: className, ...restProps } = $$restProps
</script>

{#await import(`$lib/images/gacha/items/item-${id}.jpg`) then { default: src }}
	<img
		{src}
		alt=""
		width="51"
		height="53"
		class={cn(className)}
		{...restProps}
	/>
{/await}
