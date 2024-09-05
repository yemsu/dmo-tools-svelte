<script lang="ts">
	import type { GachaItemData } from '$entities/gacha'

	export let name: GachaItemData['name']
</script>

<span
	class="absolute bottom-0 left-1/2 z-10 hidden translate-y-1/2 whitespace-nowrap bg-[#1c1b36dd] p-3 text-xs group-hover:block"
>
	{name}
</span>
