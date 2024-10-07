<script lang="ts">
	import { goto } from '$app/navigation'
	import { user } from '$entities/user'
	import { PATH, TOAST } from '$shared/config'
	import { page } from '$app/stores'
	import { toast } from '$shared/toast'

	$: onClickSaveData = () => {
		goto(`/${$page.data.lang}${PATH.SAVE_URL}`)
		if (!$user) {
			toast.on(TOAST.NEED_LOGIN)
		}
	}
</script>

<button
	class="min-h-[30px] min-w-[120px] rounded-md bg-primary-5 px-3 py-1.5 text-white"
	on:click={onClickSaveData}
>
	이전 url 데이터 <br class="md:hidden" /> 서버에 저장하기
</button>
