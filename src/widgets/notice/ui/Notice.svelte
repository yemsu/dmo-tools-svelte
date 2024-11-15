<script lang="ts">
	import { Title } from '$shared/text'
	import Notice1107 from '$widgets/notice/ui/Notice1107.svelte'
	import Notice1112 from '$widgets/notice/ui/Notice1112.svelte'
	import { _ } from 'svelte-i18n'
</script>

<section class="flex items-center rounded-md bg-gray-2">
	<Title size="xs" class="flex-center gap-2 px-2 py-1.5 text-center"
		>{$_('notice')}</Title
	>
	<div class="flex-center flex-1 text-pretty px-2">
		<div>
			<Notice1112 />
			<Notice1107 />
		</div>
	</div>
</section>
