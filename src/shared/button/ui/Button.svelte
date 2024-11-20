<script lang="ts">
	import {
		buttonShapeStyles,
		buttonSizeStyles,
		buttonVariants
	} from '$shared/button/config/styles'
	import type {
		ButtonRounded,
		ButtonSize,
		ButtonVariant
	} from '$shared/button/types'
	import { cn } from '$shared/lib'

	export let isActive: Boolean | undefined = undefined
	export let rounded: ButtonRounded = 'md'
	export let variant: ButtonVariant
	export let size: ButtonSize = 'md'
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

	// common attributes
	$: dataActive = isActive === undefined ? {} : { 'data-active': isActive }
	$: commonAttributes = {
		class: cn(
			'gap-[0.2em] leading-none',
			!$$restProps.disabled && 'button-hover',
			'text-balance break-keep disabled:text-gray-11 disabled:opacity-70',
			isActive === true && 'border-2 opacity-100 ',
			isActive === false && 'opacity-40 hover:opacity-100',
			buttonShapeStyles[rounded],
			buttonSizeStyles[size],
			buttonVariants[variant],
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
