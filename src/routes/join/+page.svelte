<script lang="ts">
	import { goto } from '$app/navigation'
	import {
		G_TOKEN_NAME,
		getNickCheck,
		getTokenCookie,
		postSignup,
		removeTokenCookie,
		TOKEN_NAME,
		user
	} from '$entities/user'
	import { Button } from '$shared/button'
	import { Input } from '$shared/form'
	import { Section } from '$shared/section'
	import { Title } from '$shared/text'
	import { toast } from '$shared/toast'
	import { error } from '@sveltejs/kit'
	import { onMount } from 'svelte'

	const VALIDATIONS = {
		noValue: '닉네임을 입력해 주세요.',
		specialCharacter: '특수문자/공백은 사용할 수 없어요.',
		min: '2자 이상 작성해 주세요.',
		max: '최대 10자까지 작성할 수 있어요.',
		duplicated: '이미 사용중인 닉네임 이예요.'
	} as const

	type ValidationTypes = keyof typeof VALIDATIONS

	let value: string | null = null
	let inValidTypes: ValidationTypes[] = []
	let isValid: boolean
	let inputElement: HTMLInputElement

	let isOnInputTimer: NodeJS.Timeout | null

	$: setInValidTypes = async () => {
		const newInvalidTypes: ValidationTypes[] = []
		if (!value) {
			newInvalidTypes.push('noValue')
			return
		}
		const regex = /^[가-힣a-zA-Z0-9]+$/
		if (!regex.test(value)) {
			newInvalidTypes.push('specialCharacter')
		}
		if (value.length > 10) {
			newInvalidTypes.push('max')
		} else if (value.length < 2) {
			newInvalidTypes.push('min')
		}
		if (newInvalidTypes.length === 0) {
			const isDuplicated = await getNickCheck(value)
			if (isDuplicated) {
				newInvalidTypes.push('duplicated')
			}
		}

		inValidTypes = newInvalidTypes
		isValid = newInvalidTypes.length === 0
	}

	$: onInput = () => {
		if (isOnInputTimer) clearTimeout(isOnInputTimer)

		isOnInputTimer = setTimeout(() => {
			isOnInputTimer = null
			setInValidTypes()
		}, 100)
	}

	$: onSubmit = async () => {
		if (inValidTypes.length > 0) {
			alert('닉네임이 올바른지 확인해 주세요.')
			return
		}
		if (!value) {
			alert('닉네임을 입력해주세요.')
			return
		}
		const googleToken = getTokenCookie(G_TOKEN_NAME)
		if (!googleToken) {
			error(
				550,
				'구글 로그인 정보가 만료되었습니다. 구글 로그인을 다시 진행해주세요.'
			)
		}
		const isConfirmed = confirm(
			`${value}: 이 닉네임으로 회원 가입을 진행하시겠어요?\n가입 후 닉네임은 변경할 수 없어요.`
		)
		if (!isConfirmed) return
		const res = await postSignup(googleToken, value)
		user.set(res)
		removeTokenCookie(G_TOKEN_NAME)
		sessionStorage.setItem(TOKEN_NAME, res.token)
		toast.on(`환영합니다 ${value}님!`)
		goto('/')
	}

	onMount(() => {
		setTimeout(() => {
			inputElement.focus()
		}, 100)
	})
</script>

<Section size="sm" class="gap-10">
	<Title class="text-center">사이트에서 사용할 닉네임을 입력해 주세요.</Title>
	<form
		on:submit|preventDefault={onSubmit}
		class="flex w-full items-start gap-2"
	>
		<div class="flex flex-1 flex-col gap-2">
			<Input
				placeholder="닉네임"
				bind:value
				bind:inputElement
				on:input={onInput}
			/>
			<div class="h-[4em]">
				{#if inValidTypes.length > 0}
					{#each inValidTypes as inValidType (inValidType)}
						<p class="text-xs text-warning">{VALIDATIONS[inValidType]}</p>
					{/each}
				{:else if value !== null}
					<p class="text-xs text-point">사용 가능한 닉네임 입니다.</p>
				{/if}
			</div>
		</div>
		<Button size="lg" rounded="md" class="bg-primary-30" disabled={!isValid}>
			결정했어요
		</Button>
	</form>
</Section>
