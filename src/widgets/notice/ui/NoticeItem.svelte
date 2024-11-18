<script lang="ts">
	import { Modal } from '$shared/modal'
	import { lang } from '$shared/model'
	import { Title } from '$shared/text'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'

	export let date: string
	export let time: string | undefined = undefined
	export let title: { kr: string; en: string }
</script>

<Modal>
	<button
		slot="buttonSlot"
		let:toggleModal
		on:click={toggleModal}
		class="text-body-sm group flex items-start justify-center gap-1 py-1 text-left"
	>
		<span class="text-sub-md rounded-full bg-gray-4 px-1 py-0.5">
			{date}
		</span>
		<span class="text-balance break-keep group-hover:underline">
			{title[$lang]}
		</span>
	</button>
	<article slot="popupContent">
		<div class="flex w-full flex-col gap-2">
			<Title size="sm">
				{title[$lang]}
			</Title>
			<time datetime="2024-11-07" class="font-semibold text-blue-8">
				{date}
				{#if time}
					{time}
					<TextByLang text=" " engText="KTC" />
				{/if}
			</time>
		</div>
		<div class="mt-6 flex flex-col gap-4 break-keep font-light">
			<slot />
		</div>
	</article>
</Modal>
