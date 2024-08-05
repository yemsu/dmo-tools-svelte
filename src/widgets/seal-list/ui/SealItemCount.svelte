<script lang="ts">
	import { mySeals } from '$entities/seals'

	export let sealId: number
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

	const sumCount = (changeNun: number) => {
		const newCount = count + changeNun
		if (newCount > 3000) {
			alert('최대 3000개까지 설정 가능합니다.')
			return
		} else if (newCount < 0) {
			alert('최저 0개까지 설정 가능합니다.')
			return
		}
		mySeals.updateCount(sealId, newCount)
	}

	const onBlurInput = () => {
		inputValue = undefined
		isOnInput = false
	}
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
	<menu class="flex items-center justify-between">
		<li>
			<button
				type="button"
				class="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-primary-20"
				title="보유 개수 -1"
				on:click={() => sumCount(-1)}
			>
				<iconify-icon icon="mdi:minus" width={12} height={12} />
			</button>
		</li>
		<li class="min-w-[60%]">
			<button
				type="button"
				class="flex w-full items-center justify-center gap-1 rounded-md bg-primary-20/50 px-1 py-0.5"
				title="보유 개수 직접 입력하기"
				on:click={onClickInputOn}
			>
				<iconify-icon
					icon="mdi:treasure-chest-outline"
					width={15}
					height={15}
				/>
				{count.toLocaleString()}개
			</button>
		</li>
		<li>
			<button
				type="button"
				class="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-primary-20"
				title="보유 개수 +1"
				on:click={() => sumCount(1)}
			>
				<iconify-icon icon="mdi:plus" width={12} height={12} /></button
			>
		</li>
	</menu>
{/if}
