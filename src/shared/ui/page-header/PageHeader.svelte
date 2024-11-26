<script lang="ts">
	import { cn } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Title } from '$shared/text'

	export let title: {
		kr: string
		en: string
	}
	export let mb: boolean = true
</script>

<header
	class={cn(
		'flex flex-wrap items-center justify-between gap-4 py-2 port:gap-2 ',
		mb && 'land:mb-2',
		$$restProps.class
	)}
>
	<div class="flex items-center gap-4 overflow-hidden port:gap-2">
		<Title class="shrink-0" weight="bold">{title[$lang]}</Title>
		<slot name="nextTitleSlot" />
	</div>
	<slot></slot>
</header>
