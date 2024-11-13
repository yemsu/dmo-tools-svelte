<script lang="ts">
	import { lang } from '$shared/model'
	import { Modal } from '$shared/modal'
	import { Title } from '$shared/text'
	import TextByLang from '$shared/text/ui/TextByLang.svelte'
	import { NewBadge } from '$shared/badge'
	import { Button } from '$shared/button'

	const date = '2024.11.12'
	const title = {
		kr: '사이트 도메인이 변경되었습니다.',
		en: 'The site domain has been changed.'
	}
</script>

<Modal size="lg">
	<button
		slot="buttonSlot"
		let:toggleModal
		on:click={toggleModal}
		class="group flex items-start justify-center gap-1 py-1 text-left text-xs"
	>
		<span class="relative rounded-full bg-gray-700 px-1 py-0.5 text-xs3">
			<NewBadge
				startDate="Tue Nov 12 2024 17:00:00 GMT+0900"
				visibleDay={3}
				position="left"
			/>
			{date}
		</span>
		<span class="group-hover:underline">
			<TextByLang
				text={title[$lang]}
				engText="Fixing Efficiency Calculator Seal Setting Error for New Users"
			/>
		</span>
	</button>
	<article slot="popupContent">
		<div
			class="flex-center mb-4 w-full flex-col gap-2 border-b border-b-gray-600 pb-4"
		>
			<time datetime="2024-11-07" class="text-sm text-warning">
				{date}
				<!-- 22:50 <TextByLang text=" " engText="KTC" /> -->
			</time>
			<Title>
				<TextByLang
					text={title[$lang]}
					engText="Fixing Efficiency Calculator Seal Setting Error for New Users"
				/>
			</Title>
		</div>
		<div class="flex flex-col gap-4 break-keep font-light text-gray-100">
			<p>
				<TextByLang
					text="더 안정적인 운영을 위해, DMO tools의 도메인이 변경되었습니다."
					engText="For more stable operation, the domain of DMO Tools has been changed."
				/> <br />
				<TextByLang
					text="구 도메인으로 접속 시 일부 기능에 제한이 있을 수 있으니, 새 도메인으로 접속해 주세요!"
					engText="If you access through the old domain, some features may be limited. Please visit the new domain instead!"
				/>
			</p>
			<p>
				이전 도메인: https://dmo-tools.vercel.app <br />
				신규 도메인:
				<Button
					href="https://dmo.greuta.org/{$lang}"
					size="text"
					variant="link"
				>
					https://dmo.greuta.org
				</Button>
			</p>
			<p>🏄‍♂️</p>
		</div>
	</article>
</Modal>
