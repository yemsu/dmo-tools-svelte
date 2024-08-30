<script lang="ts">
	export let bg: 'call-10' | 'call-1' | 'confirm' | 'retry'

	const bgStyles = {
		'call-10': 'bg-gacha-call-10',
		'call-1': 'bg-gacha-call-1',
		confirm: 'bg-gacha-confirm',
		retry: 'bg-gacha-retry'
	}
</script>

<button class="{bgStyles[bg]} outline-gacha-call w-[45%] py-1 text-xs" on:click>
	<slot></slot>
</button>
