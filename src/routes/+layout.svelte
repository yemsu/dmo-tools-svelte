<script>
	import 'iconify-icon'
	import '../app/app.css'
	import Header from './Header.svelte'
	import { cn } from '$shared/lib'
	import Gnb from './Gnb.svelte'
	import RaidFloat from '$widgets/raid/ui/RaidFloat.svelte'
	import { ToastPopup } from '$shared/toast'
</script>

<div
	class={cn(
		'relative flex min-h-[100svh] flex-col',
		'bg-secondary-5/70 md:mx-auto md:max-w-[800px]',
		'drop-shadow-white border border-white/10 border-y-transparent'
	)}
>
	<Header></Header>
	<RaidFloat />

	<main class="relative flex-1">
		<slot></slot>
	</main>
	<Gnb />
	<ToastPopup />
</div>
