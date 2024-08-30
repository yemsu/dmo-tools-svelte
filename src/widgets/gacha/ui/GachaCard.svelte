<script lang="ts">
	import type { GachaData } from '$entities/gacha'
	import { gachaStore } from '$entities/gacha'
	import imgViewItemsHover from '$lib/images/gacha/view-items-hover.jpg'
	import imgViewItems from '$lib/images/gacha/view-items.jpg'
	import { cn } from '$shared/lib'
	import { GachaResultItem, GachaSelectButton } from '$widgets/gacha'
	import GachaItemPopup from '$widgets/gacha/ui/GachaItemPopup.svelte'
	import GachaStartButton from '$widgets/gacha/ui/start/GachaStartButton.svelte'

	export let gachaData: GachaData
	let isShowPopup = false

	const onClickShowItems = () => {
		isShowPopup = true
	}
	const onClickPopupClose = () => {
		isShowPopup = false
	}

	const getGachaType = (name: string) => {
		switch (name) {
			case '궁극홍련기사':
				return '프리미엄 데이터 소환'
			case '[오메가몬 알파]':
				return '일반 데이터 소환'
			default:
				return 'unknown gacha'
		}
	}
	$: gachaType = getGachaType(gachaData.name)
</script>

<div>
	<div
		class={cn(
			'rounded-md transition-all hover:scale-[1.1]',
			$gachaStore.currentGacha?.id === gachaData.id
				? 'bg-gacha-card-selected neon-gacha-gold scale-[1.1] border border-gacha-gold text-[#E6E1CE]'
				: 'bg-gacha-card'
		)}
	>
		<GachaSelectButton {gachaData} {gachaType} />
		<div class="flex p-2">
			<button
				class="group ml-auto"
				on:click={onClickShowItems}
				title="보상 자세히 보기"
			>
				<img
					src={imgViewItems}
					alt=""
					width="25"
					height="25"
					class="group-hover:hidden"
				/>
				<img
					src={imgViewItemsHover}
					alt=""
					width="25"
					height="25"
					class="hidden group-hover:block"
				/>
			</button>
		</div>
	</div>
	<div class="flex-center -ml-[5%] mt-8 w-[110%] gap-[10%]">
		{#if $gachaStore.currentGacha?.id === gachaData.id}
			<GachaStartButton count={1} />
			<GachaStartButton count={10} />
		{/if}
	</div>
</div>
{#if isShowPopup}
	<GachaItemPopup
		on:close={onClickPopupClose}
		gachaName={gachaData.name}
		{gachaType}
	>
		<ul class="flex flex-col gap-4">
			{#each gachaData.gachaItems as gachaResult (gachaResult.id)}
				<GachaResultItem {gachaResult} />
			{/each}
		</ul>
	</GachaItemPopup>
{/if}
