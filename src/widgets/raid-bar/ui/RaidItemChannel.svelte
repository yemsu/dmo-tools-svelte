<script lang="ts">
	import type { RaidTimeData } from '$entities/raid'
	import { Badge } from '$shared/badge'

	export let channel: RaidTimeData['channel']
</script>

<Badge size="sm" color="blue">
	{channel} 채널
</Badge>
