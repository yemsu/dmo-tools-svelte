<script lang="ts">
	import { Title } from '$shared/text'
	import Notice1107 from '$widgets/notice/ui/Notice1107.svelte'
	import Notice1112 from '$widgets/notice/ui/Notice1112.svelte'
	import { _ } from 'svelte-i18n'
</script>

<section
	class="lg:max-w-[400px] lg:flex-col flex w-full max-w-[500px] overflow-hidden rounded-md bg-gray-2"
>
	<Title size="xs" class="flex-center gap-2 bg-gray-3 px-2 py-1.5"
		>{$_('notice')}</Title
	>
	<div class="flex-center flex-1 py-1">
		<div>
			<Notice1112 />
			<Notice1107 />
		</div>
	</div>
</section>
