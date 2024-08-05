<script>
	import Header from './Header.svelte'
	import 'iconify-icon'
	import '../app/app.css'
</script>

<div class="app">
	<Header></Header>

	<main class="mx-auto max-w-[1400px] px-4 lg:px-8">
		<slot></slot>
	</main>
</div>

<style>
	.app {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}
</style>
