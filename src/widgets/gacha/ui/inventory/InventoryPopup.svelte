<script lang="ts">
	import { gachaStore } from '$entities/gacha'
	import ItemTooltip from '$widgets/gacha/ui/ItemTooltip.svelte'
	import { cn } from '$shared/lib'
	import GachaItemImage from '$widgets/gacha/ui/GachaItemImage.svelte'
	import GachaPopup from '$widgets/gacha/ui/GachaPopup.svelte'
	import { createEventDispatcher } from 'svelte'
	import { toast } from '$shared/toast'
	import { TOAST } from '$shared/config'
	import { page } from '$app/stores'

	const dispatch = createEventDispatcher()

	const cleanInventory = () => {
		const isConfirm = confirm('뽑기 결과를 초기화 하시겠습니까?')
		if (!isConfirm) return
		gachaStore.cleanInventory()
		toast.on(TOAST.GACHA.CLEAN_INVENTORY)
	}

	$: inventorySlots = new Array(63)
		.fill(null)
		.map((_, i) => $gachaStore.inventory[i])
</script>

<GachaPopup
	class={cn(
		'z-10 flex flex-col',
		'bg-primary-20/60 backdrop-blur-sm',
		'rounded-t-md border border-primary-5 shadow-[0px_0px_1px_1px_hsl(var(--primary-40)/50%)]'
	)}
	on:close={() => dispatch('close')}
>
	<h2
		class="text-shadow bg-gr-b border-b border-primary-5 py-3 text-center leading-none shadow-[0px_-2px_1px_1px_hsl(var(--primary-50)/60%)]"
	>
		가방
	</h2>
	<div
		class="flex items-center justify-between border-b border-primary-5 bg-primary-10/20 p-1.5"
	>
		<div class="flex gap-2 text-xs2 text-gray-300">
			<h3>뽑기 횟수 :</h3>
			<dl class="flex gap-3">
				{#each $page.data.gachaList as gacha (gacha.id)}
					<div class="flex gap-1">
						<dt>{gacha.name}</dt>
						<dd>{$gachaStore.myPlayCounts[gacha.id]}회</dd>
					</div>
				{/each}
			</dl>
		</div>
		<button
			type="button"
			class="ml-auto rounded-sm bg-primary-40/20 p-1 pb-0.5 leading-none"
			title="가방 비우기"
			on:click={cleanInventory}
		>
			<iconify-icon icon="ph:trash" width={14} height={14} />
		</button>
	</div>
	<div class="flex-1 overflow-hidden bg-primary-20/20 p-1.5">
		<div class="h-full bg-primary-5/70 p-1.5">
			<div class="scroll-box grid h-full grid-cols-9 items-start gap-1">
				{#each inventorySlots as invenSlot}
					<div
						class="bg-gacha-common group relative aspect-[51/53] border border-primary-30"
					>
						{#if invenSlot}
							<GachaItemImage id={invenSlot.item.id} />
							<ItemTooltip name={invenSlot.item.name} />
							<span
								class="text-shadow absolute bottom-0 right-1 text-xs shadow-sm"
								>{invenSlot.count}</span
							>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</GachaPopup>
