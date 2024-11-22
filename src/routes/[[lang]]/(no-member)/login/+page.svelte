<script lang="ts">
	import { user } from '$entities/user'
	import { GoogleLoginButton } from '$features/control-session'
	import { checkNoMember } from '$shared/lib'
	import { lang } from '$shared/model'
	import { Inner } from '$shared/section'
	import Section from '$shared/section/ui/Section.svelte'
	import { TextByLang } from '$shared/text'
	import { Title } from '$shared/text'
	import { onMount } from 'svelte'

	$: $user && history.back()

	onMount(() => {
		checkNoMember($lang)
	})
</script>

<section class="flex-center flex-1">
	<Inner size="content-middle" class="flex-col-center gap-10">
		<div class="flex-col-center gap-2 text-center">
			<Title size="lg">로그인</Title>
			<p class="text-balance break-keep text-gray-9">
				<TextByLang
					text="로그인 후 보유한 씰을 등록하고 구매 효율이 높은 씰을 한눈에 확인해보세요!"
					engText="Log in, add your seals, and discover the most efficient seal purchases at a glance!"
				/>
			</p>
		</div>
		<div class="flex-center w-full rounded-md bg-gray-3 py-8">
			<div class="h-[38px]">
				<GoogleLoginButton id="mainLogin" size="large" text="signin_with" />
			</div>
		</div>
	</Inner>
</section>
