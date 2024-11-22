<script lang="ts">
	import type { GachaData, GachaDataType } from '$entities/gacha'
	import { cn, contentUrl } from '$shared/lib'
	import InventoryPopup from './InventoryPopup.svelte'

	export let currentGachaType: GachaDataType
	export let gachaList: GachaData[]
	let isPopupShow = false

	const openPopup = () => {
		isPopupShow = true
	}

	const closePopup = () => {
		isPopupShow = false
	}
</script>

<button
	class={cn(
		'button-hover absolute z-10 ml-auto',
		'bottom-3 right-content-side port:w-[30px] land:bottom-0 land:right-8',
		'border-blue-4 land:border land:bg-blue-1 land:p-1'
	)}
	title="인벤토리 열기"
	on:click={openPopup}
>
	<img
		src={contentUrl('/gacha/inven.jpg')}
		alt=""
		width="34"
		height="34"
		class="size-full"
	/>
</button>
{#if isPopupShow}
	<InventoryPopup {currentGachaType} {gachaList} on:close={closePopup} />
{/if}
