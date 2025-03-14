<script lang="ts">
	import { goto } from '$app/navigation'
	import { currentCharacterId } from '$entities/characters'
	import { mySealCounts } from '$entities/seals'
	import { user } from '$entities/user'
	import { Button } from '$shared/button'
	import { ALERT, PATH, TOAST } from '$shared/config'
	import Input from '$shared/form/ui/Input.svelte'
	import { cn, numberFormatter } from '$shared/lib'
	import { lang, langPath } from '$shared/model'
	import { toast } from '$shared/toast'
	import { _ } from 'svelte-i18n'

	export let sealId: number
	export let isEditable: boolean = true
	$: isKr = $lang === 'kr'
	$: count = $mySealCounts.find((mySeal) => mySeal.id === sealId)?.count ?? 0
	let inputValue: number | null = null
	let inputElement: HTMLInputElement
	let isOnInput = false

	const onClickInputOn = () => {
		if (!$user) {
			goto(`${$langPath}${PATH.LOGIN}`)
			toast.on(TOAST.NEED_LOGIN[$lang])
			return
		}
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

	$: onSubmit = () => {
		if (inputValue === null) {
			alert(ALERT.INPUT_CHANGE_NUMBER[$lang])
			setTimeout(() => {
				onClickInputOn()
			}, 100)
		} else {
			if (!$currentCharacterId) {
				alert(ALERT.NO_CURRENT_CHARACTER[$lang])
				return
			}
			if (inputValue === 0) {
				mySealCounts.remove($currentCharacterId, sealId)
			} else {
				mySealCounts.updateCount(
					$currentCharacterId,
					{ id: sealId, count: inputValue },
					$lang
				)
			}
			isOnInput = false
			toast.on(TOAST.SEAL_COUNT_CHANGED[$lang])
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
				placeholder={isKr ? '씰 개수' : 'Seal Count'}
				bind:value={inputValue}
				on:input={checkCountInputValue}
				on:blur|once={onBlurInput}
			/>
			<Button size="xs" variant="blue" type="submit">
				{$_('done')}
			</Button>
		</form>
	{:else}
		<div class="flex-center">
			<!-- {myStep ? myStep.percent * sealId.max : 0} -->
			<Button
				type="button"
				variant="background"
				size="xs"
				class={cn('w-full', countStyle)}
				title={isEditable
					? isKr
						? '보유 개수 수정하기'
						: 'Edit Seal Quantity'
					: ''}
				on:click={onClickInputOn}
				disabled={!isEditable}
			>
				<iconify-icon
					icon="mdi:treasure-chest-outline"
					width={15}
					height={15}
				/>
				{numberFormatter(count)}
				{$_('seal_count')}
			</Button>
		</div>
	{/if}
</div>
