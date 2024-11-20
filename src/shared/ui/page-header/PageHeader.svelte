<script lang="ts">
	import { Title } from '$shared/text'

	export let title: string
</script>

<header class="mb-4 flex flex-wrap items-center justify-between gap-4">
	<div class="flex-center gap-4">
		<Title class="leading-none" weight="bold">{title}</Title>
		{#if $$slots.nextTitleSlot}
			<div class="flex items-center gap-2">
				<slot name="nextTitleSlot" />
			</div>
		{/if}
	</div>
	{#if $$slots.rightSlot}
		<div class="flex items-center gap-2">
			<slot name="rightSlot" />
		</div>
	{/if}
</header>
