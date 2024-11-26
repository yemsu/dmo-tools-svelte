<script lang="ts">
	import type { UserData } from '$entities/user'
	import { _objKeys, cn } from '$shared/lib'
	import { GRADES } from '$entities/raid'

	export let user: UserData | null
	const { class: className, ...restProps } = $$restProps

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
		'flex items-center gap-[0.1em] whitespace-nowrap text-[0.9em]',
		!user?.nickname && 'text-gray-9',
		className
	)}
	title={user?.nickname ? `제보 달성: ${user?.timerCompleteCount || 0}회` : ''}
	{...restProps}
>
	{#if user}
		{#if user?.id === 20}
			<!-- 관리자 -->
			<span class="text-sub-md" title={`관리자`}>🦀</span>
		{:else}
			<span class="text-body-sm contrast-75">
				{getUserGrade(user?.timerCompleteCount || 0)}
			</span>
		{/if}
		{user?.nickname}
	{:else}
		<iconify-icon icon="mdi:user" width="1em" height="1em" />
		비회원
	{/if}
</span>
