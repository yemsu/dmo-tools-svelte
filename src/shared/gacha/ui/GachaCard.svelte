<script lang="ts">
	import { type GachaData } from '$entities/gacha'
	import { NewBadge } from '$shared/badge'
	import { cn, contentUrl } from '$shared/lib'
	import { lang } from '$shared/model'
	import { TextByLang } from '$shared/text'
	import { createEventDispatcher } from 'svelte'

	export let gachaData: GachaData
	export let activeGacha: GachaData
	export let isActive: boolean
	export let isPrev: boolean
	export let isNext: boolean

	const dispatch = createEventDispatcher()
	const selectGacha = (gachaData: GachaData) => {
		dispatch('select', gachaData)
	}
	$: isActive && selectGacha(gachaData)
</script>

<div class="env-3d">
	<div
		class={cn(
			'relative w-[var(--card-w)] rounded-md border transition-all',
			activeGacha.id === gachaData.id
				? 'bg-gacha-card-selected neon-gacha-gold scale-[var(--current-card-scale)] border-gacha-gold text-[#E6E1CE]'
				: cn(
						`bg-gacha-card inactive-card border-transparent brightness-50 land:hover:-translate-y-2`,
						isPrev && 'port:prev-card',
						isNext && 'port:next-card'
					)
		)}
	>
		<button
			class="w-full"
			title={$lang === 'kr' ? '데이터 소환하기' : 'Summon Data'}
			on:click={() => selectGacha(gachaData)}
		>
			<h2
				class="flex-col-center gap-[0.4em] text-balance break-keep py-3 text-center text-sub-md land:py-4 land:text-body-md"
			>
				{#if gachaData.category}
					<span>
						<TextByLang
							data={gachaData}
							dataKey={['category', 'engCategory']}
						/>
					</span>
				{/if}
				<span class="relative whitespace-nowrap">
					<TextByLang data={gachaData} />
					{#if gachaData.id === 17}
						<NewBadge startDate="Wed Feb 19 2025 19:27:25" />
					{/if}
				</span>
			</h2>
			<div class="aspect-[1/0.9078] w-[var(--gacha-card-w)] bg-black/30">
				<img
					src={contentUrl(`/gacha/gacha-${gachaData.id}.jpg`)}
					alt=""
					width="152"
					height="138"
					class="w-full"
					draggable="false"
				/>
			</div>
		</button>
		<div class="flex p-2">
			<slot name="probabilityButton"></slot>
		</div>
	</div>
	{#if activeGacha?.id === gachaData.id}
		<slot name="startButtons"></slot>
	{/if}
</div>
