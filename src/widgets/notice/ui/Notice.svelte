<script lang="ts">
	import { lang } from '$shared/model'
	import { Title } from '$shared/text'
	import Notice1112 from '$widgets/notice/ui/Notice1112.svelte'
	import Notice1128 from '$widgets/notice/ui/Notice1128.svelte'
	import Notice1217 from '$widgets/notice/ui/Notice1217.svelte'
	import Notice250219 from '$widgets/notice/ui/Notice250219.svelte'
	import { _ } from 'svelte-i18n'

	$: isKr = $lang === 'kr'
</script>

<section
	class="flex w-full max-w-[500px] overflow-hidden rounded-md bg-gray-2 land:max-w-[400px] land:flex-col"
>
	<Title size="xxs" class="flex-center gap-2 bg-gray-3 px-2 py-1.5"
		>{$_('notice')}</Title
	>
	<div class="flex-center flex-1 px-2 py-1">
		<div>
			<Notice250219 />
			<Notice1217 />
			{#if isKr}
				<Notice1128 />
			{/if}
			<Notice1112 />
			<!-- <Notice1107 /> -->
		</div>
	</div>
</section>
