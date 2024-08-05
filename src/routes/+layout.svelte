<script>
	import Header from './Header.svelte'
	import 'iconify-icon'
	import '../app/app.css'
	import { Inner } from '$shared/section'
</script>

<div class="app">
	<Header></Header>

	<main>
		<Inner>
			<slot></slot>
		</Inner>
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
