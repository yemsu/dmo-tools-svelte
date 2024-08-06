<script lang="ts">
	import { mySeals } from '$entities/seals'
	import { isShowMySealPopup } from '$entities/seals'
	import { cn } from '$shared/lib'
	import { Inner } from '$shared/section'
</script>

<header>
	<Inner size="full" class="flex h-header-h items-center justify-between">
		<h1 class="relative font-tiny text-3xl font-bold tracking-[0.05em]">
			<span class="text-logo">DMO tools</span>
		</h1>
		<div class="flex-center gap-4">
			<div class="relative">
				<button class="peer text-xs text-point underline underline-offset-4">
					가격은 어떻게 설정되나요?
				</button>
				<div
					class={cn(
						'absolute -bottom-2 left-1/2 w-[330px] -translate-x-1/2 translate-y-full break-keep rounded-md bg-black/80 p-4 text-xs backdrop-blur-sm',
						'hidden peer-hover:block'
					)}
				>
					<p>
						각 씰의 위탁 거래소 1페이지 매물 가격의 <br />가중 평균으로
						책정됩니다. <br />
						가격 간 편차, 오류 등으로 인해 부정확한 가격이 책정될 가능성이 있으니
						구매 전 확인이 필요합니다.
					</p>
				</div>
			</div>
			<button
				class="rounded-md bg-primary-30 px-2 py-1 text-sm font-bold"
				on:click={() => isShowMySealPopup.set(true)}
				title="자세히 보기"
			>
				보유 씰 ({$mySeals.length})
			</button>
		</div>
	</Inner>
</header>
