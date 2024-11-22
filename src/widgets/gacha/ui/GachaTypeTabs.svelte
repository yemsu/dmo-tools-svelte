<script lang="ts">
	import { gachaStore } from '$entities/gacha'
	import { GACHA_TYPES, type GachaDataType } from '$entities/gacha'
	import { NewBadge } from '$shared/badge'
	import { _objKeys, cn, contentUrl } from '$shared/lib'
	import { TextByLang } from '$shared/text'

	export let currentGachaType: GachaDataType
	export let onTabClick: (gachaType: GachaDataType) => void
</script>

<div
	class={cn(
		'flex-center mx-auto w-full bg-blue-3/40 text-sub-lg port:max-w-[300px] land:max-w-[500px] land:text-body-md',
		$gachaStore.isResultShow && 'opacity-0'
	)}
>
	{#each _objKeys(GACHA_TYPES) as gachaType (gachaType)}
		<button
			class={cn(
				'flex-center h-input-h flex-1 gap-2 py-1',
				'border transition-all land:border-2',
				'hover:border-blue-10 hover:bg-blue-10/20',
				currentGachaType === gachaType
					? 'border-blue-10 bg-blue-10/20 font-bold'
					: 'border-transparent'
			)}
			on:click={() => onTabClick(gachaType)}
		>
			<img
				src={contentUrl('/gacha/gacha-symbol.jpg')}
				alt=""
				width="22"
				height="23"
				class="w-[1.2em]"
			/>
			<span class="relative">
				<TextByLang data={GACHA_TYPES[gachaType]} />
				{#if gachaType === 'DATA_SUMMON'}
					<NewBadge startDate="Wed Nov 13 2024 17:37:25" />
				{/if}
			</span>
		</button>
	{/each}
</div>
