<script lang="ts">
	import { createSwitch, melt } from '@melt-ui/svelte'
	import { createEventDispatcher } from 'svelte'

	export let text: string
	export let defaultChecked: boolean = true
	export let id: string = 'switch'

	const dispatch = createEventDispatcher<{
		change: boolean // 이벤트 타입 정의
	}>()

	const {
		elements: { root, input },
		states: { checked }
	} = createSwitch({
		defaultChecked
	})

	$: $checked !== undefined && dispatch('change', $checked)
</script>

<form class="text-body-sm">
	<div class="flex items-center gap-[0.5em]">
		<label class="leading-none text-gray-10" for="{id}-button" id="{id}-label">
			{text}
		</label>
		<button
			use:melt={$root}
			class="relative rounded-full bg-gray-5 transition-colors data-[state=checked]:bg-orange-9"
			id="{id}-button"
			aria-labelledby="{id}-label"
		>
			<span class="thumb block rounded-full bg-white transition" />
		</button>
		<input use:melt={$input} />
	</div>
</form>

<style>
	button {
		--w: 2.2em;
		--h: 1.4em;
		--padding: 0.125em;
		width: var(--w);
		height: var(--h);
	}

	.thumb {
		--size: 1em;
		width: var(--size);
		height: var(--size);
		transform: translateX(var(--padding));
	}

	:global([data-state='checked']) .thumb {
		transform: translateX(calc(var(--w) - var(--size) - var(--padding)));
	}
</style>
