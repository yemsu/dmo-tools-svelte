<script lang="ts">
	import { mySeals } from '$entities/seals'
	import Input from '$shared/form/ui/Input.svelte'
	import { cn, numberFormatter } from '$shared/lib'

	export let sealId: number
	export let isEditable: boolean = true

	$: count = $mySeals.find((mySeal) => mySeal.id === sealId)?.count ?? 0
	let inputValue: number | null = null
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
		if (inputValue === null) {
			alert('변경할 개수를 입력해주세요.')
			setTimeout(() => {
				onClickInputOn()
			}, 100)
		} else {
			if (inputValue === 0) {
				mySeals.remove(sealId)
			} else {
				mySeals.updateCount(sealId, inputValue)
			}
			isOnInput = false
		}
	}

	const onBlurInput = () => {
		setTimeout(() => {
			inputValue = null
			isOnInput = false
		}, 100)
	}

	const countStyle = 'flex-center min-w-[60%] gap-1 px-1'
</script>

<div class="w-full min-w-[80%]">
	{#if isOnInput}
		<form on:submit|preventDefault={onSubmit} class="flex h-[24px] gap-1">
			<Input
				bind:inputElement
				size="xs"
				type="number"
				id={`count-${sealId}`}
				class={cn(
					'w-full rounded-sm bg-primary-20 px-1 py-[1px] text-xs text-white'
				)}
				placeholder="씰 개수"
				bind:value={inputValue}
				on:input={checkCountInputValue}
				on:blur|once={onBlurInput}
			/>
			<button
				type="submit"
				class="whitespace-nowrap rounded-sm bg-primary-50 px-2 font-semibold text-black md:px-1"
				>완료</button
			>
		</form>
	{:else}
		<div class="flex-center">
			<!-- {myStep ? myStep.percent * sealId.max : 0} -->
			{#if isEditable}
				<button
					type="button"
					class={cn(
						'w-full rounded-md bg-primary-20/50 py-1.5 md:py-1',
						countStyle
					)}
					title="보유 개수 수정하기"
					on:click={onClickInputOn}
				>
					<iconify-icon
						icon="mdi:treasure-chest-outline"
						width={15}
						height={15}
					/>
					{numberFormatter(count)}개
				</button>
			{:else}
				<p class={countStyle}>
					<iconify-icon
						icon="mdi:treasure-chest-outline"
						width={15}
						height={15}
					/>
					{numberFormatter(count)}개
				</p>
			{/if}
		</div>
	{/if}
</div>
