<script lang="ts">
	import { cn } from '$shared/lib'
	import { onMount } from 'svelte'

	export let isActive: Boolean | undefined = undefined
	export let rounded: 'full' | 'md' = 'full'
	export let variant:
		| 'submit-primary'
		| 'submit-secondary'
		| 'ghost'
		| 'gray'
		| 'danger'
		| 'outline'
		| 'link'
		| undefined = undefined
	export let size: 'text' | 'icon' | 'sm' | 'md' | 'md-lg' | 'lg' = 'md'
	export let href: string | undefined = undefined

	// check props
	const checkProps = () => {
		if ('on:click' in $$props && href) {
			console.error('on:click 혹은 href 둘 중 하나의 값만 존재해야합니다.')
		}
		if (!('on:click' in $$props) && !href) {
			console.error('on:click 혹은 href 둘 중 하나의 값이 존재해야합니다.')
		}
	}
	$: $$props && href && checkProps()

	// styles
	const shapeStyles = {
		full: 'rounded-full',
		md: 'rounded-md'
	}
	const sizeStyles = {
		text: 'flex-inline-center',
		icon: 'flex-center p-2 flex-center',
		sm: 'flex-center px-2 py-1 text-sub-md',
		md: 'flex-center min-w-[3.5em] px-2 py-2 text-body-sm md:text-body-md',
		'md-lg':
			'flex-center min-w-[3.5em] h-[30px] px-2 text-body-sm md:text-body-md',
		lg: 'flex-center px-[1em] py-[0.5em] text-body-sm md:text-body-md min-w-[5em] h-input-h'
	}
	const variants = {
		'submit-primary': 'point-neon',
		'submit-secondary': 'bg-blue-6',
		gray: 'bg-gray-6',
		ghost: 'hover:bg-gray-3',
		danger: 'bg-red',
		outline: 'border border-gray-6',
		link: 'underline underline-offset-2 hover:text-point'
	}

	// common attributes
	$: dataActive = isActive === undefined ? {} : { 'data-active': isActive }
	$: commonAttributes = {
		class: cn(
			'gap-[0.2em] leading-none',
			!$$restProps.disabled && 'button-hover',
			'text-balance break-keep disabled:text-gray-300 disabled:opacity-70',
			isActive === true && 'border-2 opacity-100 ',
			isActive === false && 'opacity-40 hover:opacity-100',
			shapeStyles[rounded],
			sizeStyles[size],
			variant && variants[variant],
			$$restProps.class
		),
		...dataActive
	}
</script>

{#if href}
	<a {...$$restProps} {...commonAttributes} {href}>
		<slot />
	</a>
{:else}
	<button {...$$restProps} {...commonAttributes} on:click>
		<slot />
	</button>
{/if}
