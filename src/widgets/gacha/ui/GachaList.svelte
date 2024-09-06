<script lang="ts">
	import {
		gachaStore,
		type GachaData,
		type GachaDataType
	} from '$entities/gacha'
	import { Carousel } from '$shared/carousel'
	import { GachaCard, GachaTitle, ProbabilityPopup } from '$shared/gacha'
	import GachaStartButton from '$shared/gacha/ui/GachaStartButton.svelte'
	import ShowProbabilityButton from '$shared/gacha/ui/ShowProbabilityButton.svelte'
	import { cn } from '$shared/lib'
	import { createEventDispatcher, onMount } from 'svelte'

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

{#if gachaList.length > 0}
	<div
		class={cn(
			'flex-col-center gap-6 pt-2 md:gap-10 md:pt-[calc(var(--tab-h)/2)]',
			$gachaStore.isResultShow && 'opacity-0'
		)}
	>
		<GachaTitle class="max-w-[var(--gacha-title-max-w)]">{title}</GachaTitle>
		<section class="flex w-full gap-5 overflow-hidden md:gap-10">
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
						class="flex-center -ml-[5%] mt-6 w-[110%] gap-[10%] md:mt-8"
					>
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
{:else}
	<div class="flex-center size-full">
		<p class="w-full rounded-md bg-black/50 p-10 text-center text-lg">
			9월 6일 금요일 오후 8시 <br /> 업데이트 예정
		</p>
	</div>
{/if}
