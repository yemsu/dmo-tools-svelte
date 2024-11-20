<script lang="ts">
	import { type SealData, type SealPrice } from '$entities/seals'
	import { cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import { statColorStyles } from '$widgets/my-seals'
	import type { SealEfficiency } from '$widgets/seal-calculator/types'
	import SealItemTooltip from '$widgets/seal-list/ui/SealItemTooltip.svelte'
	import SealItemCount from './SealItemCount.svelte'
	import SealItemPrice from './SealItemPrice.svelte'

	export let sealPrices: SealPrice[]
	export let seal: SealData
	export let myStep: SealEfficiency['myStep'] = undefined
	export let isCountEditable: boolean = true
	export let isPriceEditable: boolean = true
</script>

<article
	class={cn(
		'relative flex flex-col justify-center text-center text-sub-md md:text-sub-md'
	)}
>
	<div
		class={cn(
			'group relative flex items-center justify-center',
			'h-[3.2em] w-auto md:h-[3.6em]',
			'gradient-black-op border-b border-t border-b-white/30 border-t-white/30 px-1',
			'text-balance break-keep'
		)}
	>
		<h2
			class="{statColorStyles[
				seal.statType
			]} flex items-start font-semibold leading-4"
		>
			{$lang === 'kr' ? seal.name : seal.engName}
		</h2>
		<p class="absolute left-[3px] top-0 text-sub-sm text-gray-6">
			#{seal.id}
		</p>
		<SealItemTooltip {seal} {sealPrices} {myStep} />
	</div>
	<div class="flex flex-col items-center gap-1 p-1">
		<SealItemCount sealId={seal.id} isEditable={isCountEditable} />
		<SealItemPrice sealId={seal.id} isEditable={isPriceEditable} {sealPrices} />
		<slot></slot>
	</div>
</article>
