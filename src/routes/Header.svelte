<script lang="ts">
	import { cn } from '$shared/lib'
	import { Inner } from '$shared/section'
	import { Tooltip } from '$shared/tooltip'
</script>

<header>
	<Inner
		size="full"
		class="relative flex h-header-h items-center justify-between"
	>
		<h1 class="font-tiny text-xl font-bold leading-none md:text-3xl">
			<span class="text-logo">DMO tools</span>
		</h1>
		<div class="flex-center gap-4">
			<div class="relative">
				<button
					class={cn(
						'peer text-right text-[10px] text-point/90',
						'md:pb-2 md:text-left md:text-[11px] md:text-xs md:text-point md:underline md:underline-offset-4'
					)}
				>
					가격은 어떻게 <br class="md:hidden" /> 설정되나요?
				</button>
				<Tooltip class="-bottom-2 right-0 w-[310px] translate-y-full pr-2">
					<p>
						각 씰의 위탁 거래소 1페이지 매물 가격의 <br />가중 평균으로
						책정됩니다. <br />
						가격 간 편차, 오류 등으로 인해 부정확한 가격이 책정될 가능성이 있으니
						구매 전 확인이 필요합니다.
					</p>
				</Tooltip>
			</div>
		</div>
	</Inner>
</header>
