<script lang="ts">
	import { cn } from '$shared/lib'

	export let tagName: 'h2' | 'p'
	const { class: className, ...restProps } = $$restProps
	const attrs = {
		class: cn('text-xs2 mb-2 text-point', className),
		...restProps
	}
</script>

{#if tagName === 'h2'}
	<h2 {...attrs}>
		<slot />
	</h2>
{:else if tagName === 'p'}
	<p {...attrs}>
		<slot />
	</p>
{/if}
