<script lang="ts">
	import { activeMenuType, getActiveMenuName } from '$entities/menus'
</script>

<h2 class="ir">
	{getActiveMenuName($activeMenuType) === '보유'
		? '보유 씰'
		: getActiveMenuName($activeMenuType)}
</h2>
