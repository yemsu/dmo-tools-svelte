<script lang="ts">
	import { type GachaItemData } from '$entities/gacha'
	import { cn } from '$shared/lib'

	export let id: GachaItemData['id']
	export let skeletonWidth: string | null = null
	const CONTENT_URL = import.meta.env.VITE_CONTENT_URL
	const { class: className, ...restProps } = $$restProps
</script>

<div
	class={cn('aspect-[51/53]', skeletonWidth && `${skeletonWidth} bg-black/20`)}
>
	<img
		src={`${CONTENT_URL}/item-${id}.jpg`}
		alt=""
		width="51"
		height="53"
		class={cn(className)}
		{...restProps}
	/>
</div>
