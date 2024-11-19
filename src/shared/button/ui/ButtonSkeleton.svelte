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

	export let rounded: ButtonRounded = 'md'
	export let size: ButtonSize = 'md'
</script>

<div
	class={cn(
		'bg-skeleton',
		buttonShapeStyles[rounded],
		buttonSizeStyles[size],
		$$restProps.class
	)}
></div>
