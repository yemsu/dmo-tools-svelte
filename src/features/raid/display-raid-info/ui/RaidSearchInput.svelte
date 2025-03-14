<script lang="ts">
	import type { RaidData } from '$entities/raid'
	import { raids } from '$entities/raid'
	import { Input } from '$shared/form'
	import { choseongIncludes } from 'es-hangul'
	import { onMount } from 'svelte'

	export let value = ''
	export let setRaidList: (raids: RaidData[]) => void
	let inputElement: HTMLInputElement

	const removeSC = (text: string) => {
		return text.replace(/ |\/|\(|\)|\-/g, '')
	}

	$: onSearchInput = (e: CustomEvent) => {
		const inputText = e.detail.target.value
		if (!inputText) {
			setRaidList($raids)
			return
		}

		const results: RaidData[] = []
		const searchText = removeSC(inputText)
		$raids.forEach((raid) => {
			const raidNameText = removeSC(raid.name)
			if (
				raidNameText.includes(searchText) ||
				choseongIncludes(raidNameText, searchText)
			) {
				results.push(raid)
			}
		})
		setRaidList([...results])
	}

	onMount(() => {
		setTimeout(() => {
			inputElement.focus()
		}, 100)
	})
</script>

<Input
	bind:value
	bind:inputElement
	placeholder="레이드명"
	on:input={onSearchInput}
	class={$$restProps.class}
/>
