<script lang="ts">
	import { cn } from '$shared/lib'
	import { lang, langPath } from '$shared/model'
</script>

<h1
	class={cn(
		'font-tiny text-[26px] font-semibold leading-none',
		'land:mb-6 land:flex land:h-header-h land:items-center',
		$$restProps.class
	)}
>
	<a
		href={$langPath || '/'}
		class="block land:px-2"
		title={$lang === 'kr' ? '메인으로' : 'Go to Main Page'}
	>
		DMO tools
		<!-- <span class="text-[0.75em]">🎄</span> -->
	</a>
</h1>
