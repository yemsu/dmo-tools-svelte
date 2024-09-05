<script lang="ts">
	import invenImage from '$lib/images/gacha/inven.jpg'
	import InventoryPopup from './InventoryPopup.svelte'
	let isPopupShow = false

	const openPopup = () => {
		isPopupShow = true
	}

	const closePopup = () => {
		isPopupShow = false
	}
</script>

<button
	class="absolute bottom-3 right-0 z-10 ml-auto md:bottom-5 md:right-5 sm:w-[30px]"
	title="인벤토리 열기"
	on:click={openPopup}
>
	<img src={invenImage} alt="" width="34" height="34" />
</button>
{#if isPopupShow}
	<InventoryPopup on:close={closePopup} />
{/if}
