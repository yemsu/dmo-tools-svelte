<script lang="ts">
	import imgGacha1 from '$lib/images/gacha/gacha-1.jpg'
	import imgGacha2 from '$lib/images/gacha/gacha-2.jpg'
	import imgViewItems from '$lib/images/gacha/view-items.jpg'
	import type { GachaData } from '$entities/gacha'
	import { GachaResultItem } from '$widgets/gacha'
	import GachaItemPopup from '$widgets/gacha/ui/GachaItemPopup.svelte'
	import { cn } from '$shared/lib'

	export let gachaData: GachaData
	export let selectedGachaId: GachaData['id'] | null
	export let onSelectGacha: (id: number | null) => void
	let isShowPopup = false

	const onClickShowItems = () => {
		isShowPopup = true
		onSelectGacha(null)
	}
	const onClickPopupClose = () => {
		isShowPopup = false
	}

	const getGachaImage = (id: number) => {
		switch (id) {
			case 1:
				return imgGacha1
			case 2:
				return imgGacha2
		}
	}

	$: getGachaType = (name: string) => {
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
			selectedGachaId === gachaData.id
				? 'bg-gacha-button-selected neon-gacha-gold scale-[1.1] border border-gacha-gold text-[#E6E1CE]'
				: 'bg-gacha-button'
		)}
	>
		<button
			class="w-[152px]"
			title="데이터 소환하기"
			on:click={() => onSelectGacha(gachaData.id)}
		>
			<h2
				class="flex-col-center gap-2 whitespace-pre-line py-3 text-center text-xs"
			>
				<span>{gachaType}</span>
				<span>{gachaData.name}</span>
			</h2>
			<div>
				<img
					src={getGachaImage(gachaData.id)}
					alt=""
					width="152"
					height="143"
				/>
			</div>
		</button>
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
	{#if selectedGachaId === gachaData.id}
		<div class="flex-center -ml-[5%] mt-10 w-[110%] gap-[10%] text-sm">
			<button class="bg-gacha-call-1 outline-gacha-call w-[45%] py-1 text-xs"
				>1회 소환</button
			>
			<button class="bg-gacha-call-10 outline-gacha-call w-[45%] py-1 text-xs"
				>10회 소환</button
			>
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
			{#each gachaData.items as item (item.id)}
				<GachaResultItem {item} />
			{/each}
		</ul>
	</GachaItemPopup>
{/if}
