<script lang="ts">
	import {
		gachaStore,
		type GachaData,
		type GachaDataType
	} from '$entities/gacha'
	import { BackBlur } from '$shared/backBlur'
	import { TOAST } from '$shared/config'
	import { GachaItemImage, GachaPopup, ItemTooltip } from '$shared/gacha'
	import { cn } from '$shared/lib'
	import { toast } from '$shared/toast'
	import { createEventDispatcher } from 'svelte'

	export let activeGachaType: GachaDataType
	export let gachaList: GachaData[]

	const dispatch = createEventDispatcher()

	const cleanInventory = () => {
		const isConfirm = confirm('뽑기 결과를 초기화 하시겠습니까?')
		if (!isConfirm) return
		gachaStore.cleanInventory(activeGachaType)
		toast.on(TOAST.GACHA.CLEAN_INVENTORY)
	}
	$: inventorySlots = new Array(63)
		.fill(null)
		.map((_, i) => $gachaStore.inventory[activeGachaType][i])
</script>

<GachaPopup
	class={cn(
		'z-40 flex flex-col',
		'bg-primary-20/60',
		'rounded-t-md border border-primary-5 shadow-[0px_0px_1px_1px_hsl(var(--primary-40)/50%)]'
	)}
	on:close={() => dispatch('close')}
>
	<BackBlur />
	<h2
		class="text-shadow bg-gr-b border-b border-primary-5 py-2 text-center text-xs leading-none shadow-[0px_-2px_1px_1px_hsl(var(--primary-50)/60%)] md:py-3 md:text-md"
	>
		가방
	</h2>
	<div
		class="leading-0 flex items-center justify-between border-b border-primary-5 bg-primary-10/20 p-1.5 sm:py-1"
	>
		<div
			class="flex items-center gap-[0.5em] text-xs3 text-gray-300 md:text-xs2"
			title="뽑기 횟수"
		>
			<h3 class="ir">뽑기 횟수</h3>
			<dl class="flex flex-wrap gap-x-[1em]">
				{#each gachaList as gacha (gacha.id)}
					<div class="flex gap-1">
						<dt>{gacha.name}</dt>
						<dd>
							{$gachaStore.myPlayCounts[activeGachaType][gacha.id] || 0}회
						</dd>
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
