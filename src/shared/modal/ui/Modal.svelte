<script lang="ts">
	import ModalBody from './ModalBody.svelte'

	export let size: 'sm' | 'md' | 'lg' = 'md'
	let isPopupVisible = false

	const toggleModal = () => {
		isPopupVisible = !isPopupVisible
	}
</script>

<slot name="buttonSlot" {toggleModal}></slot>
{#if isPopupVisible}
	<ModalBody hideModal={() => (isPopupVisible = false)} {size}>
		<slot name="popupContent" />
	</ModalBody>
{/if}
