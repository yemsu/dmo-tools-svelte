<script lang="ts">
	import { _ } from 'svelte-i18n'
	import {
		gachaStore,
		type GachaData,
		type GachaDataType
	} from '$entities/gacha'
	import { BackBlur } from '$shared/backBlur'
	import { cn } from '$shared/lib'
	import {
		ItemTooltip,
		GachaButton,
		GachaStartButton,
		GachaTitle
	} from '$shared/gacha'
	import GachaResultItemImage from '$widgets/gacha/ui/GachaResultItemImage.svelte'
	import { createEventDispatcher } from 'svelte'

	export let currentGachaType: GachaDataType
	export let activeGacha: GachaData
	$: resultLength = $gachaStore.results.length

	const colStyleByLengthByIndex: Record<
		number,
		Record<number | 'default', string>
	> = {
		10: {
			default: '',
			4: 'col-span-2',
			5: 'col-span-2'
		},
		11: {
			default: 'col-span-3',
			4: 'col-span-2 col-start-3',
			5: 'col-span-2 col-start-6',
			6: 'col-span-2 col-start-9'
		}
	}

	const getColStyle = (i: number) => {
		const colStyleObj = colStyleByLengthByIndex[$gachaStore.results.length]
		const colStyle = colStyleObj && (colStyleObj[i] || colStyleObj.default)

		return colStyle
	}

	const dispatch = createEventDispatcher()

	const onConfirm = () => {
		dispatch('confirm')
	}

	const onStart = () => {
		dispatch('start')
	}
</script>

<section
	class="position-center flex-col-center h-[calc(100vh-var(--bottom-ad-h))] w-full"
>
	<div
		class="flex-col-center w-full max-w-[300px] gap-10 land:max-w-[600px] land:gap-14"
	>
		<GachaTitle>{$_('gacha.resultItems')}</GachaTitle>
		<ul
			class={cn(
				'min-h-[160px] w-full flex-1 land:min-h-[250px]',
				$gachaStore.results.length === 1
					? 'flex-center'
					: $gachaStore.results.length === 10
						? 'grid grid-cols-4 justify-center'
						: 'grid grid-cols-12 justify-center'
			)}
		>
			{#each $gachaStore.results as resultItem, i}
				<li class={cn('flex-center group relative', getColStyle(i))}>
					<GachaResultItemImage
						id={resultItem.item.id}
						{activeGacha}
						{currentGachaType}
					/>
					<ItemTooltip item={resultItem.item} />
				</li>
			{/each}
		</ul>
		<div class="flex-center w-[200px] gap-[10%]">
			{#if resultLength === 1 || resultLength === 10 || resultLength === 11}
				<GachaButton bg="confirm" on:click={onConfirm}
					>{$_('confirm')}</GachaButton
				>
				<GachaStartButton
					{currentGachaType}
					{activeGacha}
					count={resultLength}
					isRetry={true}
					on:start={onStart}
				/>
			{/if}
		</div>
	</div>
</section>
