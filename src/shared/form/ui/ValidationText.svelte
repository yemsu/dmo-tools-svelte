<script lang="ts">
	import { type FormSchema } from '$shared/form'
	import { _objKeys } from '$shared/lib'
	import { lang } from '$shared/model'
	import { _ } from 'svelte-i18n'

	export let value: string
	export let setIsValid: (isValue: boolean) => void
	export let schema: Record<string, FormSchema>
	let isOnInputTimer: NodeJS.Timeout | null
	let inValidTypes: string[] | undefined = undefined
	let prevValue = value

	const getInvalidTypes = async (
		validation: Record<string, FormSchema>,
		value: string
	): Promise<(keyof typeof validation)[]> => {
		const keys = _objKeys(validation)
		const newInvalidTypes: string[] = []
		return new Promise((resolve) => {
			keys.forEach(async (invalidType, i) => {
				const isInValid = await validation[invalidType].check(value)
				if (isInValid) {
					newInvalidTypes.push(invalidType)
				}
				if (i === keys.length - 1) {
					resolve(newInvalidTypes)
				}
			})
		})
	}

	$: setInValidTypes = async () => {
		const newInvalidTypes = await getInvalidTypes(schema, value)
		inValidTypes = newInvalidTypes
		setIsValid(newInvalidTypes.length === 0)
	}

	$: onChangeValue = () => {
		if (prevValue === value) return
		if (isOnInputTimer) clearTimeout(isOnInputTimer)

		isOnInputTimer = setTimeout(() => {
			isOnInputTimer = null
			setInValidTypes()
		}, 100)
		prevValue = value
	}

	$: value !== undefined && onChangeValue()
</script>

{#if inValidTypes}
	<div>
		{#if inValidTypes.length === 0}
			<p class="text-xs text-point">{$_('available_nickname')}</p>
		{:else}
			{#each inValidTypes as inValidType (inValidType)}
				<p class="text-xs text-warning">
					{schema[inValidType][$lang]}
				</p>
			{/each}
		{/if}
	</div>
{/if}
