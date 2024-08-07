<script lang="ts">
	import { activeMenuType, getActiveMenuName } from '$entities/menus'
</script>

<h2 class="ir">{getActiveMenuName($activeMenuType)}</h2>
