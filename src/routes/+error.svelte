<script lang="ts">
	import { page } from '$app/stores'
	import Inner from '$shared/section/ui/Inner.svelte'
</script>

<section>
	<Inner>
		<h1>{$page.status}</h1>
		<p>{$page.error?.message}</p>
	</Inner>
</section>
