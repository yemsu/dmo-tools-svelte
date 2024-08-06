<script>
	import 'iconify-icon'
	import '../app/app.css'
	import Header from './Header.svelte'
	import { Inner } from '$shared/section'
</script>

<div class="flex min-h-[100vh] flex-col">
	<Header></Header>

	<main>
		<slot></slot>
	</main>
</div>
