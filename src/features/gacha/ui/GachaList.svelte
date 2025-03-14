<script lang="ts">
	import {
		gachaStore,
		type GachaData,
		type GachaDataType
	} from '$entities/gacha'
	import { Carousel } from '$shared/carousel'
	import {
		GachaCard,
		GachaTitle,
		ProbabilityPopup,
		GachaStartButton
	} from '$features/gacha'
	import ShowProbabilityButton from './ShowProbabilityButton.svelte'
	import { cn } from '$shared/lib'
	import { createEventDispatcher } from 'svelte'

	export let currentGachaType: GachaDataType
	export let gachaList: GachaData[]
	export let activeGacha: GachaData
	export let title: string
	let activeProbabilityGacha: GachaData | null = null
	const dispatch = createEventDispatcher()

	const selectGacha = (gachaData: GachaData) => {
		dispatch('select', gachaData)
	}

	const onSelectCard = (event: CustomEvent<GachaData>) => {
		selectGacha(event.detail)
	}

	const onCarouselReset = () => {
		selectGacha(gachaList[0])
	}

	const onClickShowProbability = (gachaData: GachaData) => {
		activeProbabilityGacha = gachaData
		selectGacha(gachaData)
	}

	const onClickPopupClose = () => {
		activeProbabilityGacha = null
	}
</script>

<div
	class={cn(
		'flex-col-center gap-6 land:gap-10 land:pt-[calc(var(--input-h)/2)]',
		$gachaStore.isResultShow && 'opacity-0'
	)}
>
	<GachaTitle class="max-w-[var(--gacha-title-max-w)]">{title}</GachaTitle>
	<section class="flex w-full gap-5 overflow-hidden land:gap-10">
		<Carousel
			{currentGachaType}
			{activeGacha}
			{gachaList}
			on:reset={onCarouselReset}
			let:data
			let:isSelected
			let:isPrev
			let:isNext
		>
			<GachaCard
				gachaData={data}
				isActive={isSelected}
				{activeGacha}
				{isPrev}
				{isNext}
				on:select={onSelectCard}
			>
				<ShowProbabilityButton
					slot="probabilityButton"
					on:click={() => onClickShowProbability(data)}
				/>
				<div
					slot="startButtons"
					class="flex-center -ml-[5%] mt-6 w-[110%] gap-2 land:mt-12"
				>
					{#if currentGachaType === 'DATA_SUMMON'}
						<GachaStartButton
							{currentGachaType}
							{activeGacha}
							count={1}
							on:start={() => dispatch('start')}
						/>
						<GachaStartButton
							{currentGachaType}
							{activeGacha}
							count={10}
							on:start={() => dispatch('start')}
						/>
					{:else}
						<GachaStartButton
							{currentGachaType}
							{activeGacha}
							count={11}
							on:start={() => dispatch('start')}
						/>
					{/if}
				</div>
			</GachaCard>
		</Carousel>
	</section>
</div>
{#if activeProbabilityGacha !== null}
	<ProbabilityPopup
		on:close={onClickPopupClose}
		gachaData={activeProbabilityGacha}
	/>
{/if}
