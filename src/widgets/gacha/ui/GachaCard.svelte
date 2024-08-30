<script lang="ts">
	import type { GachaData } from '$entities/gacha'
	import { gachaStore } from '$entities/gacha'
	import imgViewItems from '$lib/images/gacha/view-items.jpg'
	import { cn } from '$shared/lib'
	import { GachaResultItem, GachaSelectButton } from '$widgets/gacha'
	import GachaItemPopup from '$widgets/gacha/ui/GachaItemPopup.svelte'
	import GachaStartButtons from '$widgets/gacha/ui/GachaStartButtons.svelte'

	export let gachaData: GachaData
	let isShowPopup = false

	const onClickShowItems = () => {
		isShowPopup = true
		gachaStore.selectGacha(null)
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
			$gachaStore.clickedGacha?.id === gachaData.id
				? 'bg-gacha-button-selected neon-gacha-gold scale-[1.1] border border-gacha-gold text-[#E6E1CE]'
				: 'bg-gacha-button'
		)}
	>
		<GachaSelectButton {gachaData} {gachaType} />
		<div class="flex p-2">
			<button
				class="ml-auto"
				on:click={onClickShowItems}
				title="보상 자세히 보기"
			>
				<img src={imgViewItems} alt="" />
			</button>
		</div>
	</div>
	{#if $gachaStore.clickedGacha?.id === gachaData.id}
		<div class="flex-center -ml-[5%] mt-10 w-[110%] gap-[10%] text-sm">
			<GachaStartButtons />
		</div>
	{/if}
</div>
{#if isShowPopup}
	<GachaItemPopup
		on:close={onClickPopupClose}
		gachaName={gachaData.name}
		{gachaType}
	>
		<ul class="flex flex-col gap-4">
			{#each gachaData.gachaItems as gachaItem (gachaItem.id)}
				<GachaResultItem {gachaItem} />
			{/each}
		</ul>
	</GachaItemPopup>
{/if}
