<script lang="ts">
	import { Title } from '$shared/text'

	export let title: string
</script>

<header class="mb-4 flex items-center gap-4">
	<Title class="leading-none" weight="bold">{title}</Title>
	{#if $$slots.nextTitleSlot}
		<div class="flex items-center gap-2">
			<slot name="nextTitleSlot" />
		</div>
	{/if}
	{#if $$slots.sideSlot}
		<div class="ml-auto flex items-center gap-2">
			<slot name="sideSlot" />
		</div>
	{/if}
</header>
