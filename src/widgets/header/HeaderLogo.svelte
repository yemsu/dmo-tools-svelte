<script lang="ts">
	import { lang } from '$shared/model'
	import { cn } from '$shared/lib'
</script>

<h1
	class={cn(
		'font-tiny text-[26px] font-semibold leading-none',
		'land:mb-6 land:flex land:h-header-h land:items-center',
		$$restProps.class
	)}
>
	<a
		href="/{$lang}"
		class="land:px-2 block"
		title={$lang === 'kr' ? '메인으로' : 'Go to Main Page'}
	>
		DMO tools
	</a>
</h1>
