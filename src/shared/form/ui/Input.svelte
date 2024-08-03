<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements'
	import { createEventDispatcher } from 'svelte'
	const dispatch = createEventDispatcher()

	interface $$Props extends HTMLInputAttributes {
		label: string
	}
	export let label: string

	const { name } = $$restProps

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
		placeholder="{label}를 입력하세요"
		on:input={handleInput}
	/>
</label>
