<script lang="ts">
	export let bg: 'call-11' | 'call-10' | 'call-1' | 'confirm' | 'retry'

	const bgStyles = {
		'call-10': 'bg-gacha-call-10',
		'call-11': 'bg-gacha-call-1',
		'call-1': 'bg-gacha-call-1',
		confirm: 'bg-gacha-confirm',
		retry: 'bg-gacha-retry'
	}
</script>

<button
	class="{bgStyles[
		bg
	]} text-shadow w-[50%] py-1 font-ns-bold text-sub-md land:py-2 land:text-body-md"
	on:click
>
	<slot></slot>
</button>
