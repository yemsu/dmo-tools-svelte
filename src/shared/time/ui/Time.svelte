<script lang="ts">
	import { TIME_UNIT } from '../config'
	import { type TimeData } from '../types'

	export let time: TimeData
</script>

<span class="inline-flex items-end">
	{#each TIME_UNIT as timeUnit (timeUnit)}
		<span class="text-sub-md font-semibold text-point">{time[timeUnit]}</span>
		<span class="text-sub-lg text-gray-11">{timeUnit}</span>
	{/each}
</span>
