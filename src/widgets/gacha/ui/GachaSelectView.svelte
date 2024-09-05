<script lang="ts">
	import { gachaStore, type GachaData } from '$entities/gacha'
	import { Carousel } from '$shared/carousel'
	import { GachaCard, GachaTitle, ProbabilityPopup } from '$shared/gacha'
	import GachaStartButton from '$shared/gacha/ui/GachaStartButton.svelte'
	import ShowProbabilityButton from '$shared/gacha/ui/ShowProbabilityButton.svelte'
	import { createEventDispatcher } from 'svelte'

	export let gachaList: GachaData[]
	export let title: string
	let activeProbabilityGacha: GachaData | null = null

	const dispatch = createEventDispatcher()

	const onClickShowProbability = (gachaData: GachaData) => {
		activeProbabilityGacha = gachaData
		gachaStore.selectGacha(gachaData)
	}

	const onClickPopupClose = () => {
		activeProbabilityGacha = null
	}
</script>

{#if gachaList.length > 0}
	<div class="flex-col-center gap-10">
		<GachaTitle class="max-w-[500px]">{title}</GachaTitle>
		<section class="flex w-full gap-5 overflow-hidden md:gap-10">
			<Carousel let:data let:isSelected dataList={gachaList}>
				<GachaCard gachaData={data} isActive={isSelected}>
					<ShowProbabilityButton
						slot="probabilityButton"
						on:click={() => onClickShowProbability(data)}
					/>
					<div
						slot="startButtons"
						class="flex-center -ml-[5%] mt-8 w-[110%] gap-[10%]"
					>
						<GachaStartButton count={1} on:start={() => dispatch('start')} />
						<GachaStartButton count={10} on:start={() => dispatch('start')} />
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
