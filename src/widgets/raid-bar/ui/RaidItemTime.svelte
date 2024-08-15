<script lang="ts">
	import type { RaidTimeData } from '$entities/raid'
	import { timeRemainingString } from '$shared/lib'

	export let time: RaidTimeData
	$: timeString = time && timeRemainingString(time.startAt)
</script>

<span
	class="rounded-full bg-primary-30 px-1 py-0.5 text-[9px] md:px-2 md:text-[10px]"
>
	{time.channel} 채널
</span>
<span class="text-[11px] font-bold text-point md:text-xs">
	{timeString.includes('출현') ? timeString : `${timeString} 출현`}
</span>
