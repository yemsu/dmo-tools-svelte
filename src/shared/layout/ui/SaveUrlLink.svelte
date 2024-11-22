<script lang="ts">
	import { goto } from '$app/navigation'
	import { user } from '$entities/user'
	import { PATH, TOAST } from '$shared/config'
	import { lang, langPath } from '$shared/model'
	import { toast } from '$shared/toast'

	$: onClickSaveData = () => {
		goto(`${$langPath}${PATH.SAVE_URL}`)
		if (!$user) {
			toast.on(TOAST.NEED_LOGIN[$lang])
		}
	}
</script>

<button
	class="min-h-[30px] min-w-[120px] rounded-md bg-blue-6 px-3 py-1.5 text-white"
	on:click={onClickSaveData}
>
	이전 url 데이터 <br class="md:hidden" /> 서버에 저장하기
</button>
