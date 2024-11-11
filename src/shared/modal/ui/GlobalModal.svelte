<script lang="ts">
	import type { LangType } from '$shared/types'
	import { globalModalText } from '../model'
	import ModalBody from '$shared/modal/ui/ModalBody.svelte'
	import { page } from '$app/stores'
	import { Title } from '$shared/text'

	$: lang = $page.data.lang as LangType
</script>

{#if $globalModalText}
	<ModalBody hideModal={() => globalModalText.set(null)} size="sm">
		<header class="mb-4"><Title>{$globalModalText.title}</Title></header>
		<main class="text-gray-200">
			<p>{$globalModalText.description[lang]}</p>
		</main>
	</ModalBody>
{/if}
