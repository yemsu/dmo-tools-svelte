<script lang="ts">
	import { mySeals } from '$entities/seals/model'
	import { SelectSealForm } from '$widgets/select-seal-form'
	import SelectedSeals from '$widgets/select-seal-form/ui/SelectedSeals.svelte'
	import { onMount } from 'svelte'

	const STORAGE_NAME = 'DMO_MYS'
	onMount(async () => {
		if ($mySeals.length > 0) return
		const savedData = localStorage.getItem(STORAGE_NAME)
		if (savedData) {
			mySeals.add(...JSON.parse(savedData))
		}
	})

	const saveMySeals = () => {
		localStorage.setItem(STORAGE_NAME, JSON.stringify($mySeals))
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="grid grid-cols-2 gap-4">
	<section class="rounded-md border border-gray-600 p-4">
		<h2 class="mb-4 text-lg font-bold">내 씰 설정</h2>
		<SelectSealForm {saveMySeals} />
	</section>
	<SelectedSeals {saveMySeals} />
</div>
