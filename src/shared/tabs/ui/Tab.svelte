<script lang="ts">
	import { cn } from '$shared/lib'

	export let tagName: 'a' | 'button' = 'button'
	export let isActive: boolean | null = null
	const { class: className, ...restProps } = $$restProps
	$: commonProps = {
		class: cn(
			'flex-center size-full whitespace-nowrap rounded-md px-2 font-semibold transition-colors md:min-w-[45px] md:py-1.5 h-tab-h',
			isActive === true && 'bg-secondary-10',
			isActive === false &&
				'opacity-30 hover:bg-secondary-10/60 hover:opacity-100',
			isActive === null && 'hover:bg-secondary-10',
			className
		),
		...restProps
	}
</script>

<li class="flex-1">
	{#if tagName === 'a'}
		<a href={restProps.href} {...commonProps}><slot></slot></a>
	{:else}
		<button type="button" on:click {...commonProps}>
			<slot></slot>
		</button>
	{/if}
</li>
