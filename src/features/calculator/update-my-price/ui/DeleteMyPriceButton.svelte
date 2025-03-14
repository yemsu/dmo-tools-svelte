<script lang="ts">
	import { mySealPrices } from '$entities/seals'
	import { CONFIRM, TOAST } from '$shared/config'
	import { Icon } from '$shared/icon'
	import { lang } from '$shared/model'
	import { toast } from '$shared/toast'
	import { _ } from 'svelte-i18n'

	export let sealId: number

	const removeSavedPrice = () => {
		const isConfirmed = confirm(CONFIRM.REMOVE_SEAL_PRICE[$lang])
		if (!isConfirmed) return
		mySealPrices.remove(sealId)
		toast.on(TOAST.REMOVED_SEAL_PRICE[$lang])
	}
</script>

<button
	class="flex-center hover:button-hover w-[30%] shrink-0 bg-warning"
	on:click={() => removeSavedPrice()}
	title={$_('seal.delete_my_seal_price')}
>
	<Icon icon="clarity:lock-solid" size="1.2em" />
</button>
