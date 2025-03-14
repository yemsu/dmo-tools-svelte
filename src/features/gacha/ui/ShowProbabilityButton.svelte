<script lang="ts">
	import { lang } from '$shared/model'
	import { contentUrl } from '$shared/lib'
</script>

<button
	class="group ml-auto size-[25px] land:size-[30px]"
	on:click
	title={$lang === 'kr' ? '보상 자세히 보기' : 'Check Reward Items'}
>
	<img
		src={contentUrl('/gacha/view-items-hover.jpg')}
		alt=""
		width="25"
		height="25"
		class="size-full group-hover:hidden"
	/>
	<img
		src={contentUrl('/gacha/view-items.jpg')}
		alt=""
		width="25"
		height="25"
		class="hidden size-full group-hover:block"
	/>
</button>
