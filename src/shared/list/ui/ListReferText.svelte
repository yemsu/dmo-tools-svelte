<script lang="ts">
	import { cn } from '$shared/lib'

	export let tagName: 'h2' | 'p'
	export let mb: boolean = true
	const { class: className, ...restProps } = $$restProps
	const attrs = {
		class: cn('text-sub-md text-point', mb && 'mb-2', className),
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
