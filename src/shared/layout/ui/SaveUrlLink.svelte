<script lang="ts">
	import { goto } from '$app/navigation'
	import { user } from '$entities/user'
	import { TOAST } from '$shared/config'
	import { toast } from '$shared/toast'

	$: onClickSaveData = () => {
		goto('/save-url')
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
