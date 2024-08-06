<script lang="ts">
	import { cn } from '$shared/lib'

	export let isActive: boolean
	const { class: className, ...restProps } = $$restProps
</script>

<li>
	<button
		type="button"
		class={cn(
			'w-[50px] rounded-md py-1 font-bold transition-colors',
			isActive
				? 'bg-secondary-10'
				: 'opacity-30 hover:bg-secondary-10/60 hover:opacity-100',
			className
		)}
		on:click
		{...restProps}
	>
		<slot></slot>
	</button>
</li>
