<script lang="ts">
	import { lang } from '$shared/model'
	import { Title } from '$shared/text'

	export let title: {
		kr: string
		en: string
	}
</script>

<header
	class="mb-4 flex flex-wrap items-center justify-between gap-4 port:gap-2"
>
	<div class="flex items-center gap-4 overflow-hidden port:gap-2">
		<Title class="shrink-0" weight="bold">{title[$lang]}</Title>
		<slot name="nextTitleSlot" />
	</div>
	<slot></slot>
</header>
