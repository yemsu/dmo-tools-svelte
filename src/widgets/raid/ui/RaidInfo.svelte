<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { cn, timeRemainingString } from '$shared/lib'

	export let raid: RaidData
	$: time = raid.times.length > 0 && raid.times[0]
	const { class: className, ...restProps } = $$restProps
</script>

<div
	class={cn(
		'grid grid-cols-2 gap-1 break-keep p-2 text-center land:grid-cols-6 land:gap-2',
		className
	)}
	{...restProps}
>
	<div class="col-span-2 text-left">
		<dt class="text-body-sm text-gray-9">레이드명</dt>
		<dd class="text-sub-md">{raid.name}</dd>
	</div>
	<div class="col-span-2 text-left">
		<dt class="text-body-sm text-gray-9">위치</dt>
		<dd class="text-sub-md">{raid.location}</dd>
	</div>
	<div class="col-span-1">
		<dt class="text-body-sm text-gray-9">채널</dt>
		<dd class="text-sub-md text-point">
			{time ? time.channel : '-'}
		</dd>
	</div>
	<div class="col-span-1">
		<dt class="text-body-sm text-gray-9">시간</dt>
		<dd class="text-sub-md text-point">
			{time ? timeRemainingString(time.startAt) : '-'}
		</dd>
	</div>
</div>
