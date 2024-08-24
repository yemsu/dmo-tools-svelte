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
		'flex items-center gap-[0.1em]',
		!user?.nickname ? 'text-gray-500' : 'text-gray-300',
		sizeStyles[size],
		className
	)}
	title="제보자"
	{...restProps}
>
	<iconify-icon icon="mdi:user" width="1em" height="1em" />
	{user?.nickname || '비회원'}
</span>
