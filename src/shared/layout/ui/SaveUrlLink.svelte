<script lang="ts">
	import { goto } from '$app/navigation'
	import { user } from '$entities/user'

	$: onClickSaveData = () => {
		if (!$user) {
			alert(
				'로그인 후 이용할 수 있는 기능입니다. \n 우측 상단에 구글 로그인 버튼을 클릭하여 로그인 해주세요.'
			)
			return
		}
		goto('/save-url')
	}
</script>

<button
	class="min-h-[30px] min-w-[120px] rounded-md bg-primary-5 px-3 py-1.5 text-white"
	on:click={onClickSaveData}
>
	이전 url 데이터 <br class="md:hidden" /> 서버에 저장하기
</button>
