<script lang="ts">
	import { mySeals } from '$entities/seals/model'
	import { SelectSealForm } from '$widgets/select-seal-form'
	import SelectedSeals from '$widgets/select-seal-form/ui/SelectedSeals.svelte'
	import { onMount } from 'svelte'

	const STORAGE_NAME = 'DMO_MYS'
	onMount(async () => {
		const savedData = localStorage.getItem(STORAGE_NAME)
		if (savedData) {
			mySeals.add(...JSON.parse(savedData))
		}
	})

	const saveData = () => {
		localStorage.setItem(STORAGE_NAME, JSON.stringify($mySeals))
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="grid grid-cols-2 gap-4">
	<section class="rounded-md border border-gray-600 p-4">
		<h2 class="mb-4 text-lg font-bold">보유중인 씰 선택</h2>
		<SelectSealForm {saveData} />
	</section>
	<SelectedSeals />
</div>
