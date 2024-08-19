<script lang="ts">
	import { goto } from '$app/navigation'

	export let path: string

	$: onClickMenu = () => {
		const params = new URLSearchParams(window.location.search)
		goto(`${path}${params ? `?${params}` : ''}`)
	}
</script>

<button on:click={() => onClickMenu()} {...$$restProps}>
	<slot></slot>
</button>
