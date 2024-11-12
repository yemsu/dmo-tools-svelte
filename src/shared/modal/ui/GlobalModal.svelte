<script lang="ts">
	import ModalBody from '$shared/modal/ui/ModalBody.svelte'
	import { lang } from '$shared/model'
	import { Title } from '$shared/text'
	import { globalModalText } from '../model'
</script>

{#if $globalModalText}
	<ModalBody hideModal={() => globalModalText.set(null)} size="sm">
		<header class="mb-4"><Title>{$globalModalText.title}</Title></header>
		<main class="text-gray-200">
			<p>{$globalModalText.description[$lang]}</p>
		</main>
	</ModalBody>
{/if}
