<script lang="ts">
	import { gachaStore, type GachaData } from '$entities/gacha'
	import { cn } from '$shared/lib'

	export let gachaData: GachaData
	export let isActive: boolean

	$: isActive && gachaStore.selectGacha(gachaData)
</script>

<div>
	<div
		class={cn(
			'w-[152px] rounded-md border transition-all',
			isActive
				? 'bg-gacha-card-selected neon-gacha-gold scale-[1.1] border-gacha-gold text-[#E6E1CE]'
				: 'bg-gacha-card border-transparent md:hover:-translate-y-2'
		)}
	>
		<button
			class="w-full"
			title="데이터 소환하기"
			on:click={() => gachaStore.selectGacha(gachaData)}
		>
			<h2
				class="flex-col-center gap-2 whitespace-pre-line py-3 text-center text-xs2 md:text-xs"
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
	</div>
	{#if isActive}
		<slot name="startButtons"></slot>
	{/if}
</div>
