<script lang="ts">
	import {
		GACHA_TYPES,
		isLoadingVideoOn,
		type GachaDataType,
		type GachaTabContents
	} from '$entities/gacha'
	import { MENUS } from '$entities/menus'
	import { META } from '$shared/config'
	import { _objKeys } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Inner } from '$shared/section'
	import { TextByLang } from '$shared/text'
	import { DigitalBackground } from '$widgets/bg-space'
	import {
		GachaResultLoading,
		GachaTypeTabContent,
		GachaTypeTabs
	} from '$features/gacha'
	import type { PageData } from './$types'
	import './gacha.css'

	export let data: PageData
	let currentGachaType = _objKeys(GACHA_TYPES)[0]

	$: gachaTabContents = {
		DATA_SUMMON: {
			title: {
				kr: '소환할 데이터를 선택하세요.',
				en: 'Select the data to summon.'
			},
			gachaList: data.gachaSummons
		},
		DIGITAL_DRAW: {
			title: {
				kr: '디지털 드로우를 선택하세요.',
				en: 'Choose Digital Draw.'
			},
			gachaList: data.gachaDraws
		}
	} as GachaTabContents

	const setCurrentGachaType = (gachaType: GachaDataType) => {
		currentGachaType = gachaType
	}
</script>

<svelte:head>
	<title>{META.GACHA_SIMULATOR.TITLE[$lang]}</title>
	<meta name="description" content={META.GACHA_SIMULATOR.DESC[$lang]} />
</svelte:head>

<section
	class="dark relative flex flex-1 flex-col justify-center font-ns text-gray-12"
>
	<DigitalBackground />
	<h2 class="ir">
		<TextByLang data={MENUS.gacha} />
	</h2>
	<section class="flex-col-center relative h-full flex-1 port:h-[380px]">
		<Inner class="relative flex flex-col gap-6">
			<GachaTypeTabs {currentGachaType} onTabClick={setCurrentGachaType} />
			<div class="flex-col-center flex-1">
				<GachaTypeTabContent
					{currentGachaType}
					gachaTabContent={gachaTabContents[currentGachaType]}
				/>
			</div>
		</Inner>
	</section>
	{#if $isLoadingVideoOn}
		<GachaResultLoading />
	{/if}
</section>
