<script lang="ts">
	import { page } from '$app/stores'
	import {
		GACHA_TYPES,
		gachaStore,
		type GachaTabContents
	} from '$entities/gacha'
	import { MENUS } from '$entities/menus'
	import { META } from '$shared/config'
	import { GachaBg } from '$shared/gacha'
	import { _objKeys, cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'
	import { GachaTypeTabContent } from '$widgets/gacha'
	import GachaTypeTabButton from '$widgets/gacha/ui/GachaTypeTabButton.svelte'
	import './gacha.css'

	let currentGachaType = _objKeys(GACHA_TYPES)[0]

	$: gachaTabContents = {
		DATA_SUMMON: {
			title: {
				kr: '소환할 데이터를 선택하세요.',
				en: 'Select the data to summon.'
			},
			gachaList: $page.data.gachaSummons
		},
		DIGITAL_DRAW: {
			title: {
				kr: '디지털 드로우를 선택하세요.',
				en: 'Choose Digital Draw.'
			},
			gachaList: $page.data.gachaDraws
		}
	} as GachaTabContents
</script>

<svelte:head>
	<title>{META.GACHA_SIMULATOR.TITLE[$lang]}</title>
	<meta name="description" content={META.GACHA_SIMULATOR.DESC[$lang]} />
</svelte:head>

<section
	class="bg-gacha relative flex h-full flex-col justify-center font-ns text-gray-200"
>
	<h2 class="ir">
		<TextByLang data={MENUS.gacha} />
	</h2>
	<section class="flex-col-center h-full flex-1">
		<GachaBg />
		<div
			class="relative flex h-full w-full flex-col md:h-[var(--gacha-select-view-h)]"
		>
			<div
				class={cn(
					'flex-center mx-auto mb-3 w-full bg-primary-20/40 md:max-w-[500px] sm:mt-4 sm:max-w-[300px]',
					$gachaStore.isResultShow && 'opacity-0'
				)}
			>
				{#each _objKeys(GACHA_TYPES) as gachaType (gachaType)}
					<GachaTypeTabButton
						{gachaType}
						isActive={currentGachaType === gachaType}
						on:click={() => (currentGachaType = gachaType)}
					/>
				{/each}
			</div>
			<div class="flex-col-center flex-1">
				<GachaTypeTabContent
					{currentGachaType}
					gachaTabContent={gachaTabContents[currentGachaType]}
				/>
			</div>
		</div>
	</section>
</section>
