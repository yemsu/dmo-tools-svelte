<script lang="ts">
	import type { UserData } from '$entities/user'
	import { _objKeys, cn } from '$shared/lib'
	import { GRADES } from '$widgets/raid/config'

	export let user: UserData | null
	export let size: 'sm' | 'md' = 'md'
	const { class: className, ...restProps } = $$restProps

	const sizeStyles = {
		sm: 'text-xs3 md:text-xs2',
		md: 'text-xs3 md:text-xs'
	}

	const getUserGrade = (timerCompleteCount: number) => {
		const gradeTypes = _objKeys(GRADES)
		const userGradeType =
			gradeTypes.find((_gradeType) => timerCompleteCount <= _gradeType) ||
			gradeTypes[gradeTypes.length - 1]
		return GRADES[userGradeType]
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
	{#if user}
		<span
			class="text-xs3 contrast-75"
			title={`제보: ${user?.timerCompleteCount}회`}
		>
			{getUserGrade(user?.timerCompleteCount)}
		</span>
		{user?.nickname}
	{:else}
		<iconify-icon icon="mdi:user" width="1em" height="1em" />
		비회원
	{/if}
</span>
