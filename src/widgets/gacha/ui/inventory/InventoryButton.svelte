<script lang="ts">
	import type { GachaData, GachaDataType } from '$entities/gacha'
	import invenImage from '$lib/images/gacha/inven.jpg'
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
	class="absolute bottom-3 right-content-side z-10 ml-auto md:bottom-[calc(var(--tab-h)+20px)] md:right-5 sm:w-[30px]"
	title="인벤토리 열기"
	on:click={openPopup}
>
	<img src={invenImage} alt="" width="34" height="34" />
</button>
{#if isPopupShow}
	<InventoryPopup {currentGachaType} {gachaList} on:close={closePopup} />
{/if}
