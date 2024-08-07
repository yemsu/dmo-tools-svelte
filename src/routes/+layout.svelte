<script>
	import 'iconify-icon'
	import '../app/app.css'
	import Header from './Header.svelte'
	import { cn } from '$shared/lib'
	import Gnb from './Gnb.svelte'
</script>

<div
	class={cn(
		'relative flex min-h-[100svh] flex-col',
		'bg-secondary-5/70 md:mx-auto md:max-w-[800px]',
		'drop-shadow-white border border-white/10 border-y-transparent'
	)}
>
	<Header></Header>

	<main class="flex-1">
		<slot></slot>
	</main>
	<Gnb />
</div>
