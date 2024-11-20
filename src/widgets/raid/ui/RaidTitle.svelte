<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { cn } from '$shared/lib'

	export let title: RaidData['name']
</script>

<span class={cn('max-w-full truncate leading-none', $$restProps.class)}>
	{title}
</span>
