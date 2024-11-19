<script lang="ts">
	import { TextByLang } from '$shared/text'
	import type { GachaItemData } from '$entities/gacha'

	export let item: GachaItemData
</script>

<span
	class="text-sub-md absolute bottom-0 left-1/2 z-10 hidden translate-y-1/2 whitespace-nowrap bg-[#1c1b36dd] p-3 group-hover:block"
>
	<TextByLang data={item} />
</span>
