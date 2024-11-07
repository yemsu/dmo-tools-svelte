<script lang="ts">
	import { page } from '$app/stores'
	import { PATH } from '$shared/config'
</script>

<footer class="w-full p-2 text-center text-xs text-gray-500">
	<div>
		<a href="/{$page.data.lang}{PATH.PRIVACY_POLICY}" class="">
			개인정보처리방침
		</a>
	</div>
	<p class="mt-2">
		© 2024. DMO tools All rights reserved. <br />
		This site is not associated with Digimon Masters Online.
	</p>
</footer>
