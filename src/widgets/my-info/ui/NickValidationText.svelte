<script lang="ts">
	import { getNickCheck } from '$entities/user'

	export let value: string | null
	export let setIsValid: (isValue: boolean) => void
	let prevValue = value
	const VALIDATIONS = {
		noValue: '닉네임을 입력해 주세요.',
		specialCharacter: '특수문자/공백은 사용할 수 없어요.',
		min: '2자 이상 작성해 주세요.',
		max: '최대 10자까지 작성할 수 있어요.',
		duplicated: '이미 사용중인 닉네임 이예요.'
	} as const

	type ValidationTypes = keyof typeof VALIDATIONS

	let isOnInputTimer: NodeJS.Timeout | null
	let inValidTypes: ValidationTypes[] = []

	const setInValidTypes = async (value: string | null) => {
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
		setIsValid(newInvalidTypes.length === 0)
	}

	$: onChangeValue = () => {
		if (prevValue === value) return
		if (isOnInputTimer) clearTimeout(isOnInputTimer)

		isOnInputTimer = setTimeout(() => {
			isOnInputTimer = null
			setInValidTypes(value)
		}, 100)
		prevValue = value
	}

	$: value !== undefined && onChangeValue()
</script>

<div>
	{#if inValidTypes.length > 0}
		{#each inValidTypes as inValidType (inValidType)}
			<p class="text-xs text-warning">{VALIDATIONS[inValidType]}</p>
		{/each}
	{:else if value !== null}
		<p class="text-xs text-point">사용 가능한 닉네임 입니다.</p>
	{/if}
</div>
