<script lang="ts">
	import { mySeals } from '$entities/seals'

	export let sealId: number
	export let isCountEditable: boolean = true
	$: count = $mySeals.find((mySeal) => mySeal.sealId === sealId)?.count ?? 0
	let inputValue: number | undefined = undefined
	let inputElement: HTMLInputElement
	let isOnInput = false

	const onClickInputOn = () => {
		isOnInput = true
		if (count) {
			inputValue = count
		}
		setTimeout(() => {
			inputElement.focus()
		}, 60)
	}

	const checkCountInputValue = () => {
		if (inputValue && inputValue > 3000) {
			inputValue = 3000
		}
	}

	const onSubmit = () => {
		if (inputValue === undefined) {
			inputValue = 0
		}
		mySeals.updateCount(sealId, inputValue)
		isOnInput = false
	}

	const onBlurInput = () => {
		inputValue = undefined
		isOnInput = false
	}

	const priceStyle = 'flex-center min-w-[60%] gap-1 px-1 py-0.5'
</script>

{#if isOnInput}
	<form on:submit|preventDefault={onSubmit} class="flex gap-1">
		<input
			bind:this={inputElement}
			type="number"
			id={`count-${sealId}`}
			class="w-full rounded-sm bg-primary-20 px-1 py-[1px] text-xs text-white"
			placeholder="씰 개수"
			bind:value={inputValue}
			on:input={checkCountInputValue}
			on:blur|once={onBlurInput}
		/>
		<button
			type="submit"
			class="whitespace-nowrap rounded-sm bg-primary-50 px-1 font-bold text-black"
			>완료</button
		>
	</form>
{:else}
	<div class="flex-center">
		{#if isCountEditable}
			<button
				type="button"
				class="{priceStyle} rounded-md bg-primary-20/50"
				title="보유 개수 수정하기"
				on:click={onClickInputOn}
			>
				<iconify-icon
					icon="mdi:treasure-chest-outline"
					width={15}
					height={15}
				/>
				{count.toLocaleString()}개
			</button>
		{:else}
			<p class={priceStyle}>
				<iconify-icon
					icon="mdi:treasure-chest-outline"
					width={15}
					height={15}
				/>
				{count.toLocaleString()}개
			</p>
		{/if}
	</div>
{/if}
