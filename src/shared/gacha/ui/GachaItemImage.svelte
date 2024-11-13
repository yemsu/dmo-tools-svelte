<script lang="ts">
	import { type GachaItemData } from '$entities/gacha'
	import { PUBLIC_CONTENT_URL } from '$env/static/public'
	import { cn } from '$shared/lib'

	export let id: GachaItemData['id']
	export let skeletonWidth: string | null = null
	const { class: className, ...restProps } = $$restProps
</script>

<div
	class={cn('aspect-[51/53]', skeletonWidth && `${skeletonWidth} bg-black/20`)}
>
	<img
		src={`${PUBLIC_CONTENT_URL}/items/item-${id}.jpg`}
		alt=""
		width="51"
		height="53"
		class={cn(className)}
		{...restProps}
	/>
</div>
