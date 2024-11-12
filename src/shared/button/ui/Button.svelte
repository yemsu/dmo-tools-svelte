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
		text: '',
		icon: 'p-2 flex-center',
		sm: 'px-2 py-1 text-xs',
		md: 'min-w-[3.5em] px-2 py-1 text-xs md:text-md',
		'md-lg': 'min-w-[3.5em] h-[30px] px-2 text-xs md:text-md',
		lg: 'px-[1em] py-[0.5em] text-xs md:text-md min-w-[5em] h-input-h'
	}
	const variants = {
		'submit-primary': 'point-neon',
		'submit-secondary': 'bg-primary-30',
		gray: 'bg-gray-600',
		ghost: 'hover:bg-gray-800',
		danger: 'bg-red',
		outline: 'border border-gray-600 hover:bg-gray-700',
		link: 'underline underline-offset-2 hover:text-point'
	}

	// common attributes
	$: dataActive = isActive === undefined ? {} : { 'data-active': isActive }
	$: commonAttributes = {
		class: cn(
			'inline-flex items-center justify-center gap-[0.2em] leading-none',
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
