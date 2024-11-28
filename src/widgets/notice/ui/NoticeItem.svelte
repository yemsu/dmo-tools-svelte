<script lang="ts">
	import { NewBadge } from '$shared/badge'
	import { Modal } from '$shared/modal'
	import { lang } from '$shared/model'
	import { Title } from '$shared/text'
	import { TextByLang } from '$shared/text'

	export let date: string
	export let startDate: string | undefined = undefined
	export let time: string | undefined = undefined
	export let title: { kr: string; en: string }
	export let modalSize: 'sm' | 'md' | 'lg' = 'md'
</script>

<Modal size={modalSize}>
	<button
		slot="buttonSlot"
		let:toggleModal
		on:click={toggleModal}
		class="group flex items-start justify-center gap-1 py-1 text-left text-body-sm"
	>
		<span class="relative rounded-full bg-gray-4 px-1 py-0.5 text-sub-md">
			{#if startDate}
				<NewBadge {startDate} visibleDay={3} position="left" />
			{/if}
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
