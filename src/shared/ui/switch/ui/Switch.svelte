<script lang="ts">
	import { cn } from '$shared/lib'
	import { createSwitch, melt } from '@melt-ui/svelte'
	import { createEventDispatcher } from 'svelte'

	export let width: string = '2em'
	export let leftText: string
	export let rightText: string
	export let defaultChecked: boolean = true
	export let id: string = 'switch'
	export let disabled: boolean = false

	const dispatch = createEventDispatcher<{
		change: boolean
	}>()

	const {
		elements: { root, input },
		states: { checked }
	} = createSwitch({
		defaultChecked: defaultChecked
	})

	const onChangeDefaultChecked = () => {
		if ($checked === defaultChecked) return
		checked.set(defaultChecked)
	}

	$: $checked !== undefined && dispatch('change', $checked)
	$: defaultChecked !== undefined && onChangeDefaultChecked()
</script>

<form
	class={cn('text-body-sm transition-opacity', disabled && 'opacity-50')}
	style="--w: {width}"
>
	<button
		use:melt={$root}
		class="relative overflow-hidden rounded-full bg-gray-4 transition-colors"
		id="{id}-button"
		{disabled}
	>
		<span
			class="thumb block rounded-full border border-white/30 bg-orange-5 drop-shadow-lg transition"
		/>
		<span class="relative flex items-center text-sub-lg">
			<span
				class={cn(
					'flex-1 transition-opacity',
					$checked ? 'opacity-50' : 'font-bold text-orange-12'
				)}
			>
				{leftText}
			</span>
			<span
				class={cn(
					'flex-1 transition-opacity',
					$checked ? 'font-bold text-orange-12' : 'opacity-50'
				)}
			>
				{rightText}
			</span>
		</span>
	</button>
	<input use:melt={$input} {disabled} />
</form>

<style>
	button {
		--h: 1.8em;
		--padding: 0px;
		width: calc(var(--w) * 2);
		height: var(--h);
	}

	.thumb {
		--thumb-w: var(--w);
		width: var(--thumb-w);
		height: var(--h);
		transform: translateX(var(--padding));
		position: absolute;
		top: var(--padding);
	}

	:global([data-state='checked']) .thumb {
		transform: translateX(calc(var(--w) * 2 - var(--thumb-w) - var(--padding)));
	}
</style>
