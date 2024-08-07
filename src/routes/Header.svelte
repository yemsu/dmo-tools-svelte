<script lang="ts">
	import { cn } from '$shared/lib'
	import { Inner } from '$shared/section'
</script>

<header>
	<Inner size="full" class="flex h-header-h items-center justify-between">
		<h1
			class={cn(
				'relative font-tiny text-2xl font-bold tracking-[0.05em] md:text-3xl'
			)}
		>
			<span class="text-logo">DMO tools</span>
		</h1>
		<div class="flex-center gap-4">
			<div class="relative">
				<button
					class="peer pb-2 text-[11px] text-point underline underline-offset-4 md:text-xs"
				>
					가격은 어떻게 설정되나요?
				</button>
				<div
					class={cn(
						'absolute -bottom-2 right-0 w-[calc(100vw-30px)] translate-y-full break-keep rounded-md bg-black/80 p-4 text-xs backdrop-blur-sm md:left-1/2 md:w-[330px] md:-translate-x-1/2',
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
		</div>
	</Inner>
</header>
