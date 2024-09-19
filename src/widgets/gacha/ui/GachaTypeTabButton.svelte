<script lang="ts">
	import { GACHA_TYPES, type GachaDataType } from '$entities/gacha'
	import { _objKeys, cn, contentUrl } from '$shared/lib'

	export let gachaType: GachaDataType
	export let isActive: boolean
</script>

<button
	class={cn(
		'flex-center h-tab-h flex-1 gap-2 py-1',
		'border text-xs2 transition-all md:border-2 md:text-xs',
		'hover:border-primary-50 hover:bg-primary-50/20',
		isActive ? 'border-primary-50 bg-primary-50/20' : 'border-transparent'
	)}
	on:click
>
	<img
		src={contentUrl('/gacha/gacha-symbol.jpg')}
		alt=""
		width="22"
		height="23"
		class="w-[1.2em]"
	/>
	<span class="relative">
		{GACHA_TYPES[gachaType]}
	</span>
</button>
