<script lang="ts">
	import { TextByLang } from '$shared/text'
	import type { GachaItemData } from '$entities/gacha'

	export let item: GachaItemData
</script>

<span
	class="bg-blur-sm absolute bottom-0 left-1/2 z-10 hidden translate-y-1/2 whitespace-nowrap border border-gray-3 bg-background/80 p-3 text-sub-md group-hover:block"
>
	<TextByLang data={item} />
</span>
