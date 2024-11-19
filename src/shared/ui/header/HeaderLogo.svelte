<script lang="ts">
	import { lang } from '$shared/model'
	import { cn } from '$shared/lib'
</script>

<h1
	class={cn(
		'font-tiny text-[26px] font-semibold leading-none',
		'landscape:mb-6 landscape:flex landscape:h-header-h landscape:items-center',
		$$restProps.class
	)}
>
	<a
		href="/{$lang}"
		class="block landscape:px-2"
		title={$lang === 'kr' ? '메인으로' : 'Go to Main Page'}
	>
		DMO tools
	</a>
</h1>
