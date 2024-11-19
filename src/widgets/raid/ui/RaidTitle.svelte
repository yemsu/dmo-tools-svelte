<script lang="ts">
	import type { RaidData } from '$entities/raid'

	export let title: RaidData['name']
</script>

<span
	class="overflow-hiddenflex text-sub-md shrink-0 gap-1 break-keep leading-[1.2] md:text-sm"
>
	<iconify-icon
		icon="mdi:dinosaur-pixel"
		width={12}
		height={12}
		class="-mb-[1px]"
	/>
	{title}
</span>
