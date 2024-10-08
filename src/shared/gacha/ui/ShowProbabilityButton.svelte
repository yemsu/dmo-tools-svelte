<script lang="ts">
	import { page } from '$app/stores'
	import { contentUrl } from '$shared/lib'
</script>

<button
	class="group ml-auto"
	on:click
	title={$page.data.lang === 'kr' ? '보상 자세히 보기' : 'Check Reward Items'}
>
	<img
		src={contentUrl('/gacha/view-items-hover.jpg')}
		alt=""
		width="25"
		height="25"
		class="group-hover:hidden"
	/>
	<img
		src={contentUrl('/gacha/view-items.jpg')}
		alt=""
		width="25"
		height="25"
		class="hidden group-hover:block"
	/>
</button>
