<script lang="ts">
	import imgViewItemsHover from '$lib/images/gacha/view-items-hover.jpg'
	import imgViewItems from '$lib/images/gacha/view-items.jpg'
</script>

<button class="group ml-auto" on:click title="보상 자세히 보기">
	<img
		src={imgViewItems}
		alt=""
		width="25"
		height="25"
		class="group-hover:hidden"
	/>
	<img
		src={imgViewItemsHover}
		alt=""
		width="25"
		height="25"
		class="hidden group-hover:block"
	/>
</button>
