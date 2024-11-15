<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { Button } from '$shared/button'
	import { EXTERNAL_LINK, META, TOAST } from '$shared/config'
	import { Icon } from '$shared/icon'
	import { globalModalText } from '$shared/modal'
	import Modal from '$shared/modal/ui/Modal.svelte'
	import { lang } from '$shared/model'
	import Inner from '$shared/section/ui/Inner.svelte'
	import { TextByLang } from '$shared/text'
	import { toast } from '$shared/toast'
	import ReportGuideModalContent from '$widgets/report-guide-modal/ui/ReportGuideModalContent.svelte'
	import { _ } from 'svelte-i18n'

	$: message = ($page.state as any).message

	$: copyToClipboard = () => {
		navigator.clipboard
			.writeText(message)
			.then(() => {
				toast.on(TOAST.ERROR_MASSAGE_COPIED[$lang])
			})
			.catch((err) => {
				globalModalText.set({
					title: 'Error',
					description: {
						kr: `에러 메세지 복사에 실패했습니다. - ${err}`,
						en: `Failed to copy error message. - ${err}`
					}
				})
			})
	}

	const goToMain = () => {
		if (import.meta.env.SSR) return
		goto(`/${$lang}`)
	}

	$: !message && goToMain()
</script>

<svelte:head>
	<title>{META.ERROR.TITLE[$lang]} {message}</title>
	<meta name="description" content={META.ERROR.DESC[$lang]} />
</svelte:head>

<!-- <div class="flex-center mx-auto h-full w-content-w">
	<div
		class="flex-center h-[500px] w-full flex-col gap-4 rounded-md pb-7 text-center text-lg"
	>
		<p>
			<span class="text-[80px]">🏸</span><br />
			<span class="text-[60px]">
				<TextByLang text="점검중" engText="Under Maintenance" />
			</span>
		</p>
		<p class="max-w-[500px] text-pretty text-gray-400">
			<TextByLang
				text="신규 기능 추가를 위한 서버 점검이 진행 중입니다. (약 5분 소요 예정)"
				engText="Server maintenance is currently underway to add new features. (Expected to take approximately 5 minutes)"
			/>
		</p>
	</div>
</div> -->
{#if message}
	<section class="flex-center min-h-full py-8">
		<Inner class="text-center">
			<div class="flex-col-center gap-5 md:gap-8">
				<div>
					<div class="mb-4 text-[40px] md:text-[60px]">💦</div>
					<h2 class="text-lg2 md:text-xl">
						<TextByLang
							text="예상치 못한 에러가 발생했어요"
							engText="An unexpected error occurred"
						/>
					</h2>
				</div>
				<div class="relative rounded-md border border-gray-5 p-4 md:p-6">
					<p class="text-md text-warning md:text-lg">
						Error Message : {message}
					</p>
					<Button
						size="icon"
						variant="ghost"
						rounded="md"
						title={$_('copy')}
						class="absolute right-0 top-0"
						on:click={copyToClipboard}
					>
						<Icon icon="mynaui:copy" />
					</Button>
				</div>
				<p class="text-pretty text-sm font-light opacity-60">
					<TextByLang
						text="사이트 이용에 불편을 드려 죄송합니다."
						engText="We apologize for the inconvenience you experienced on our site."
					/> <br />
					<TextByLang
						text="에러 상황을 화면 캡처와 함께 제보해주시면 최대한 빠른 시일 내에 해결하도록 하겠습니다."
						engText="If you could report the error with a screenshot, we will work to resolve it as quickly as possible."
					/>
				</p>
				<div class="grid-cols-max grid grid-cols-2 gap-2">
					{#if $lang === 'kr'}
						<Button
							href={EXTERNAL_LINK.SUPPORT}
							variant="submit-secondary"
							size="lg"
						>
							{$_('support')}
						</Button>
					{:else}
						<Modal>
							<Button
								slot="buttonSlot"
								variant="submit-secondary"
								size="lg"
								let:toggleModal
								on:click={toggleModal}
							>
								{$_('support')}
							</Button>
							<ReportGuideModalContent slot="popupContent" />
						</Modal>
					{/if}
					<Button variant="gray" size="lg" on:click={() => history.back()}>
						{$_('go_back')}
					</Button>
				</div>
			</div>
		</Inner>
	</section>
{/if}
