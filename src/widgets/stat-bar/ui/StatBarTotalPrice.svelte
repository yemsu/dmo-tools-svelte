<script lang="ts">
	import { cn } from '$shared/lib'

	export let totalPrice: number
	const CURRENCY_UNITS = ['T', 'M', 'B'] as const
	type CurrencyUnits = (typeof CURRENCY_UNITS)[number]
	const convertToTMB = (mPrice: number): Record<CurrencyUnits, number> => {
		const T = Math.floor(mPrice / 1000)
		const remainingM = mPrice % 1000
		const M = Math.floor(remainingM)
		const B = Math.round((remainingM - M) * 1000)

		return { T, M, B }
	}
	$: price = convertToTMB(totalPrice)

	const styles: Record<CurrencyUnits, string> = {
		T: 'border border-price-t-1 bg-price-t-2 text-price-t-1',
		M: 'border border-price-m-1 bg-price-m-2 text-price-m-1',
		B: 'border border-price-b-1 bg-price-b-2 text-price-b-1'
	}
</script>

<span class="flex items-center gap-4 font-semibold">
	{#each CURRENCY_UNITS as currencyUnit}
		<span class="flex items-center gap-1 text-xs2 md:text-sm">
			<span>{price[currencyUnit].toLocaleString()}</span>
			<span
				class={cn(
					' h-[12px] w-[12px] text-xs3 leading-none md:h-[16px] md:w-[16px] md:text-xs',
					styles[currencyUnit]
				)}>{currencyUnit}</span
			>
		</span>
	{/each}
</span>
