<script lang="ts">
	import type { RaidData } from '$entities/raid'

	export let title: RaidData['name']
</script>

<span class="overflow-hidden truncate text-sub-lg leading-none">
	{title}
</span>
