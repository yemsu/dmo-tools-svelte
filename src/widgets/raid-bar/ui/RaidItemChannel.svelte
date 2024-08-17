<script lang="ts">
	import type { RaidTimeData } from '$entities/raid'

	export let channel: RaidTimeData['channel']
</script>

<span class="rounded-full bg-primary-30 px-2 py-0.5 text-[9px] md:text-[11px]">
	{channel} 채널
</span>
