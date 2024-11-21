<script lang="ts">
	import {
		gachaStore,
		type GachaData,
		type GachaDataType
	} from '$entities/gacha'
	import { BackBlur } from '$shared/backBlur'
	import { CONFIRM, TOAST } from '$shared/config'
	import { GachaItemImage, GachaPopup, ItemTooltip } from '$shared/gacha'
	import { cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import { TextByLang } from '$shared/text'
	import { toast } from '$shared/toast'
	import { createEventDispatcher } from 'svelte'

	export let currentGachaType: GachaDataType
	export let gachaList: GachaData[]
	const dispatch = createEventDispatcher()

	const cleanInventory = () => {
		const isConfirm = confirm(CONFIRM.CLEAR_GACHA_RESULT[$lang])
		if (!isConfirm) return
		gachaStore.cleanInventory(currentGachaType)
		toast.on(TOAST.GACHA.CLEAN_INVENTORY[$lang])
	}
	$: inventorySlots = new Array(99)
		.fill(null)
		.map((_, i) => $gachaStore.inventory[currentGachaType][i])

	const unitTexts: Record<GachaDataType, { kr: string; en: string }> = {
		DATA_SUMMON: {
			kr: '회',
			en: ''
		},
		DIGITAL_DRAW: {
			kr: '번',
			en: ''
		}
	}
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
		class="text-shadow bg-gr-b border-b border-primary-5 py-2 text-center text-sub-md leading-none shadow-[0px_-2px_1px_1px_hsl(var(--primary-50)/60%)] md:py-3 md:text-body-md"
	>
		<TextByLang text="가방" engText="Inventory" />
	</h2>
	<div
		class="leading-0 flex items-center justify-between border-b border-primary-5 bg-primary-10/20 p-1.5 sm:py-1"
	>
		<div
			class="flex items-center gap-[0.5em] text-body-sm text-gray-11 md:text-sub-md"
		>
			<h3 class="ir">
				<TextByLang text="뽑기 횟수" engText="Gacha Counts" />
			</h3>
			<dl class="flex flex-wrap gap-[0.2em] md:gap-[0.5em]">
				{#each gachaList as gacha (gacha.id)}
					{@const playCount =
						$gachaStore.myPlayCounts[currentGachaType][gacha.id] || 0}
					{@const playCountDivider =
						currentGachaType === 'DATA_SUMMON' ? 1 : 11}
					{@const playCountUnit = unitTexts[currentGachaType][$lang]}
					<div
						class="flex-center gap-1 rounded-full bg-black/30 px-[0.8em] pb-[0.35em] pt-[0.5em] leading-none"
					>
						<dt class="text-gray-9">
							{(gacha[$lang === 'kr' ? 'name' : 'engName'] || '').replace(
								' 디지털 드로우',
								''
							)}
						</dt>
						<dd class="flex-center">
							<span class={cn(playCount > 0 && 'font-semibold text-point')}>
								{playCount / playCountDivider}
							</span>{playCountUnit}
						</dd>
					</div>
				{/each}
			</dl>
		</div>
		<button
			type="button"
			class="ml-auto rounded-sm bg-primary-40/20 p-1 pb-0.5 leading-none"
			title={$lang === 'kr' ? '가방 비우기' : 'Clear Inventory'}
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
						class="bg-gacha-common group relative aspect-[51/53] border border-blue-6"
					>
						{#if invenSlot}
							<GachaItemImage id={invenSlot.item.id} />
							<ItemTooltip item={invenSlot.item} />
							<span
								class="text-shadow absolute bottom-0 right-1 text-sub-md shadow-sm"
								>{invenSlot.count}</span
							>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</div>
</GachaPopup>
