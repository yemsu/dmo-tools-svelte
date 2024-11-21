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

	export const statGradientStyle = {
		AT: 'dark:from-stat-at/10 from-stat-at/15 to-stat-at/5 border-stat-at/20',
		HT: 'dark:from-stat-ht/10 from-stat-ht/15 to-stat-ht/5 border-stat-ht/20',
		CT: 'dark:from-stat-ct/10 from-stat-ct/15 to-stat-ct/5 border-stat-ct/20',
		HP: 'dark:from-stat-hp/10 from-stat-hp/15 to-stat-hp/5 border-stat-hp/20',
		DS: 'dark:from-stat-ds/10 from-stat-ds/15 to-stat-ds/5 border-stat-ds/20',
		DE: 'dark:from-stat-de/10 from-stat-de/15 to-stat-de/5 border-stat-de/20',
		BL: 'dark:from-stat-bl/10 from-stat-bl/15 to-stat-bl/5 border-stat-bl/20',
		EV: 'dark:from-stat-ev/10 from-stat-ev/15 to-stat-ev/5 border-stat-ev/20'
	}
</script>

<article
	class={cn(
		'relative flex flex-col justify-center',
		'rounded-md bg-gray-3 text-center text-body-sm',
		'border-b border-t',
		'via-deep/15 bg-gradient-to-br',
		statGradientStyle[seal.statType]
	)}
>
	<div
		class={cn(
			'group relative flex items-center justify-center',
			'h-[3.2em] w-auto px-1 land:h-[3.6em]',
			'text-balance break-keep'
		)}
	>
		<h2 class={cn('flex items-start font-semibold leading-4')}>
			{$lang === 'kr' ? seal.name : seal.engName}
		</h2>
		<p class="absolute left-[3px] top-0 text-sub-sm">
			<span class={statColorStyles[seal.statType]}>{seal.statType}.</span>
			<span class="text-gray-6">#{seal.id}</span>
		</p>
		<SealItemTooltip {seal} {sealPrices} {myStep} />
	</div>
	<div
		class="flex flex-col items-center gap-1 p-1 pt-0 land:gap-1.5 land:p-1.5 land:pt-0"
	>
		<SealItemCount sealId={seal.id} isEditable={isCountEditable} />
		<SealItemPrice sealId={seal.id} isEditable={isPriceEditable} {sealPrices} />
		<slot></slot>
	</div>
</article>
