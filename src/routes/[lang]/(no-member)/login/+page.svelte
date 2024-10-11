<script lang="ts">
	import { page } from '$app/stores'
	import { user } from '$entities/user'
	import { GoogleLoginButton } from '$shared/layout'
	import { checkNoMember } from '$shared/lib'
	import Section from '$shared/section/ui/Section.svelte'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'
	import Title from '$shared/text/ui/Title.svelte'
	import { onMount } from 'svelte'

	$: $user && history.back()

	onMount(() => {
		checkNoMember($page.data.lang)
	})
</script>

<Section size="sm" class="gap-10">
	<div class="flex-col-center gap-2 text-center">
		<Title size="lg">로그인</Title>
		<p class="text-balance break-keep text-gray-400">
			<TextByLang
				text="로그인 후 보유 씰을 설정하고 효율 계산기로 씰 구매 효율 리스트를 간편하게 확인해보세요"
				engText="After logging in, set up your owned seals and easily check the seal purchase efficiency list using the efficiency calculator."
			/>
		</p>
	</div>
	<div class="flex-center w-full rounded-md bg-gray-800 py-8">
		<div class="h-[38px]">
			<GoogleLoginButton id="mainLogin" size="large" text="signin_with" />
		</div>
	</div>
</Section>
