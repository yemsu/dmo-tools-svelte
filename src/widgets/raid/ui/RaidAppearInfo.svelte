<script lang="ts">
	import type { RaidTimeData } from '$entities/raid'
	import Timer from '$shared/time/ui/Timer.svelte'
	import RaidItemChannel from '$widgets/raid-bar/ui/RaidItemChannel.svelte'

	export let time: RaidTimeData
</script>

<RaidItemChannel channel={time.channel} />
<Timer {time} />
