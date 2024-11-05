<script lang="ts">
	import { _ } from 'svelte-i18n'
	import type { LangType } from '$shared/types'
	import { page } from '$app/stores'
	import { user } from '$entities/user'
	import { mySealCounts } from '$entities/seals'
	import Input from '$shared/form/ui/Input.svelte'
	import { cn, numberFormatter } from '$shared/lib'
	import { toast } from '$shared/toast'
	import { goto } from '$app/navigation'
	import { ALERT, PATH, TOAST } from '$shared/config'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'
	import { currentCharacter } from '$entities/characters'

	export let sealId: number
	export let isEditable: boolean = true
	$: lang = $page.data.lang as LangType
	$: isKr = lang === 'kr'
	$: count = $mySealCounts.find((mySeal) => mySeal.id === sealId)?.count ?? 0
	let inputValue: number | null = null
	let inputElement: HTMLInputElement
	let isOnInput = false

	const onClickInputOn = () => {
		if (!$user) {
			goto(`/${$page.data.lang}${PATH.LOGIN}`)
			toast.on(TOAST.NEED_LOGIN[lang])
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
			alert(ALERT.INPUT_CHANGE_NUMBER[lang])
			setTimeout(() => {
				onClickInputOn()
			}, 100)
		} else {
			if (!$currentCharacter) {
				alert(ALERT.NO_CURRENT_CHARACTER[lang])
				return
			}
			if (inputValue === 0) {
				mySealCounts.remove($currentCharacter.id, sealId)
			} else {
				mySealCounts.updateCount(
					$currentCharacter.id,
					{ id: sealId, count: inputValue },
					lang
				)
			}
			isOnInput = false
			toast.on(TOAST.SEAL_COUNT_CHANGED[lang])
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
				class={cn('w-full rounded-sm bg-primary-20 px-1 py-[1px]')}
				placeholder={isKr ? '씰 개수' : 'Seal Count'}
				bind:value={inputValue}
				on:input={checkCountInputValue}
				on:blur|once={onBlurInput}
			/>
			<button
				type="submit"
				class="whitespace-nowrap rounded-sm bg-primary-50 px-2 font-semibold text-black md:px-1"
			>
				<TextByLang text="완료" engText="Done" />
			</button>
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
					title={isKr ? '보유 개수 수정하기' : 'Edit Seal Quantity'}
					on:click={onClickInputOn}
				>
					<iconify-icon
						icon="mdi:treasure-chest-outline"
						width={15}
						height={15}
					/>
					{numberFormatter(count)}
					{$_('seal_count')}
				</button>
			{:else}
				<p class={countStyle}>
					<iconify-icon
						icon="mdi:treasure-chest-outline"
						width={15}
						height={15}
					/>
					{numberFormatter(count)}{$_('seal_count')}
				</p>
			{/if}
		</div>
	{/if}
</div>
