<script lang="ts">
	import { page } from '$app/stores'
	import {
		GACHA_TYPES,
		gachaStore,
		type GachaTabContents
	} from '$entities/gacha'
	import { META } from '$shared/config'
	import { GachaBg } from '$shared/gacha'
	import { _objKeys, cn } from '$shared/lib'
	import { GachaTypeTabContent, GachaTypeTab } from '$widgets/gacha'
	import GachaTypeTabButton from '$widgets/gacha/ui/GachaTypeTabButton.svelte'
	import './gacha.css'

	let currentGachaType = _objKeys(GACHA_TYPES)[0]

	const gachaTabContents: GachaTabContents = {
		DATA_SUMMON: {
			title: '소환할 데이터를 선택하세요.',
			gachaList: $page.data.gachaSummons
		},
		DIGITAL_DRAW: {
			title: '디지털 드로우를 선택하세요.',
			gachaList: $page.data.gachaDraws
		}
	}
</script>

<svelte:head>
	<title>{META.GACHA_SIMULATOR.TITLE}</title>
	<meta name="description" content={META.GACHA_SIMULATOR.DESC} />
</svelte:head>

<section
	class="bg-gacha relative flex h-full flex-col justify-center font-ns text-gray-200 sm:px-content-side"
>
	<h2 class="ir">뽑기 시뮬레이터</h2>
	<section class="flex-col-center h-full flex-1">
		<GachaBg />
		<div
			class="relative flex h-full w-full flex-col md:h-[var(--gacha-select-view-h)]"
		>
			<div
				class={cn(
					'flex-center mb-3 bg-primary-20/40 md:mx-content-side sm:mx-auto sm:mt-4 sm:max-w-[300px]',
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
			<div class="-ml-content-side flex-1 sm:w-[100vw]">
				<GachaTypeTabContent
					{currentGachaType}
					gachaTabContent={gachaTabContents[currentGachaType]}
				/>
			</div>
		</div>
	</section>
</section>
