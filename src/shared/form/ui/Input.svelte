<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	export let label: string
	export let value: string | number | undefined = undefined

	const { name, placeholder } = $$restProps
	const handleInput = (event: Event) => {
		dispatch('input', event)
	}
</script>

<label for={name} class="label">
	<span>{label}</span>
	<input
		class="input"
		{...$$restProps}
		id={name}
		placeholder={placeholder || `${label}를 입력하세요`}
		bind:value
		on:input={handleInput}
	/>
</label>
