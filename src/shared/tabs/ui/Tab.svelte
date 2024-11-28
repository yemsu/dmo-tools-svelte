<script lang="ts">
	import { cn } from '$shared/lib'
	import type { TabVariants } from '$shared/tabs/types'

	export let tagName: 'a' | 'button' = 'button'
	export let isActive: boolean | null = null
	export let variant: TabVariants = 'connected'

	const { class: className, ...restProps } = $$restProps

	$: variants = {
		connected: cn(
			'rounded-md px-2 land:py-1.5 hover:bg-gray-1',
			isActive === true && 'bg-gray-1',
			isActive === false && 'opacity-30'
		),
		separated: cn(
			'rounded-md px-4 hover:bg-gray-3',
			isActive === true && 'bg-gray-3',
			isActive === false && 'opacity-30'
		),
		underline: cn(
			'px-4 hover:border-b-2 hover:border-gray-10',
			isActive === true
				? 'border-b-2 border-gray-10'
				: 'border-gray-8 opacity-30 border-b'
		)
	}

	$: commonProps = {
		class: cn(
			'flex-center size-full whitespace-nowrap font-bold transition-colors land:min-w-[45px] h-full hover:opacity-100',
			variants[variant],
			className
		),
		...restProps
	}
</script>

<li>
	{#if tagName === 'a'}
		<a href={restProps.href} {...commonProps}><slot></slot></a>
	{:else}
		<button type="button" on:click {...commonProps}>
			<slot></slot>
		</button>
	{/if}
</li>
