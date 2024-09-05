<script lang="ts">
	import { gachaStore, type GachaData } from '$entities/gacha'
	import { cn } from '$shared/lib'

	export let gachaData: GachaData
	export let isActive: boolean
	export let isPrev: boolean
	export let isNext: boolean

	$: isActive && gachaStore.selectGacha(gachaData)
</script>

<div class="env-3d">
	<div
		class={cn(
			'relative w-[var(--card-w)] rounded-md border transition-all',
			$gachaStore.currentGacha?.id === gachaData.id
				? 'bg-gacha-card-selected neon-gacha-gold scale-[var(--current-card-scale)] border-gacha-gold text-[#E6E1CE]'
				: cn(
						`bg-gacha-card inactive-card border-transparent md:hover:-translate-y-2 sm:brightness-50`,
						isPrev && 'sm:prev-card',
						isNext && 'sm:next-card'
					)
		)}
	>
		<button
			class="w-full"
			title="데이터 소환하기"
			on:click={() => gachaStore.selectGacha(gachaData)}
		>
			<h2
				class="flex-col-center gap-[0.4em] whitespace-pre-line py-3 text-center text-xs2 md:text-xs"
			>
				<span>{gachaData.category}</span>
				<span>{gachaData.name}</span>
			</h2>
			<div>
				{#await import(`$lib/images/gacha/gacha-${gachaData.id}.jpg`) then { default: src }}
					<img
						{src}
						alt=""
						width="152"
						height="138"
						class="w-full"
						draggable="false"
					/>
				{/await}
			</div>
		</button>
		<div class="flex p-2">
			<slot name="probabilityButton"></slot>
		</div>
		{#if isNext || isPrev}
			<div
				class={cn(
					'absolute left-0 top-0 size-full md:hidden',
					isNext ? 'bg-gr-l' : 'bg-gr-r'
				)}
			></div>
		{/if}
	</div>
	{#if $gachaStore.currentGacha?.id === gachaData.id}
		<slot name="startButtons"></slot>
	{/if}
</div>
