<script lang="ts">
	import { Button } from '$shared/button'
	import { Icon } from '$shared/icon'
	import { theme } from '$shared/model'
</script>

<Button size="icon" variant="ghost" on:click={theme.toggle}>
	{#if $theme === 'dark'}
		<Icon icon="si:moon-line" size={18} />
	{:else}
		<Icon icon="si:sun-line" size={18} />
	{/if}
</Button>
