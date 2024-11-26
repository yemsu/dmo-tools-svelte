<script lang="ts">
	import type { UserData } from '$entities/user'
	import { _objKeys, cn } from '$shared/lib'
	import { GRADES, type RaidTimeData } from '$entities/raid'
	import { Tooltip } from '$shared/tooltip'

	export let time: RaidTimeData
	$: userGrade = getUserGrade(time.user?.timerCompleteCount || 0)
	$: tooltipId = `tooltip-${time.id}`
	const { class: className, ...restProps } = $$restProps

	const getUserGrade = (timerCompleteCount: number) => {
		const gradeTypes = _objKeys(GRADES)
		const userGradeType =
			gradeTypes.find((_gradeType) => timerCompleteCount <= _gradeType) ||
			gradeTypes[gradeTypes.length - 1]
		return GRADES[userGradeType]
	}
</script>

<div
	class={cn(
		'relative flex items-center gap-[0.1em] whitespace-nowrap text-[0.9em]',
		!time.user?.nickname && 'text-gray-9',
		className
	)}
	{...restProps}
>
	{#if time.user}
		<button class="peer/tooltip" aria-describedby={tooltipId}>
			{#if time.user?.id === 20}
				<!-- 관리자 아이콘 -->
				<span class="text-sub-md" title={`관리자`}>🦀</span>
			{:else}
				<span class="text-body-sm contrast-75">
					{userGrade}
				</span>
			{/if}
			{time.user?.nickname}
		</button>
	{:else}
		<p>
			<iconify-icon icon="mdi:user" width="1em" height="1em" />
			비회원
		</p>
	{/if}
	{#if time.user?.nickname}
		<Tooltip
			id={tooltipId}
			as="p"
			size="custom"
			class="left-1/2 top-[calc(100%+0.5em)] -translate-x-1/2 text-center text-sub-lg land:text-body-md"
		>
			<span class="border-b border-gray-5 p-2">
				<span class="text-body-md land:text-title-md">{userGrade}</span>
				{time.user.nickname}
			</span>
			<span class="p-2">
				{`제보 달성: ${time.user.timerCompleteCount || 0}회`}
			</span>
		</Tooltip>
	{/if}
</div>
