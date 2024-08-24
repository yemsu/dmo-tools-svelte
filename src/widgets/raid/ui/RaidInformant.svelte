<script lang="ts">
	import type { UserData } from '$entities/user'
	import { cn } from '$shared/lib'

	export let user: UserData | null
	export let size: 'sm' | 'md' = 'md'
	const { class: className, ...restProps } = $$restProps

	const sizeStyles = {
		sm: 'text-xs3 md:text-xs2',
		md: 'text-xs3 md:text-xs'
	}
</script>

<span
	class={cn(
		'flex-center gap-[0.1em] text-gray-300',
		sizeStyles[size],
		className
	)}
	{...restProps}
>
	<iconify-icon icon="mdi:user" width="1em" height="1em" />
	{user?.nickname || '-'}
</span>
