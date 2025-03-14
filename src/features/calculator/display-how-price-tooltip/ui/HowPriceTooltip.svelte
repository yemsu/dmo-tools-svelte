<script lang="ts">
	import { cn } from '$shared/lib'
	import { TextByLang } from '$shared/text'
	import { Tooltip } from '$shared/tooltip'
	import { lang } from '$shared/model'

	$: isKr = $lang === 'kr'
</script>

<div class="flex-center relative gap-4">
	<button
		class={cn(
			'flex-center peer/tooltip gap-0.5 text-right',
			'text-sub-lg text-gray-11 land:text-left'
		)}
		aria-describedby="price-tooltip"
	>
		<iconify-icon icon="ic:outline-info" width={14} height={14} />
		<TextByLang
			text="가격은 어떻게 설정되나요?"
			engText="How are prices set?"
		/>
	</button>
	<Tooltip
		id="price-tooltip"
		class="-bottom-2 right-0 w-[200px] translate-y-full pr-2 text-left land:w-[310px]"
	>
		<p>
			{#if isKr}
				<span class="text-point">루체 서버</span>를 기준으로, 각 씰의
				<span class="text-point">위탁 거래소 1페이지 매물 가격</span>의 가중
				평균으로 책정됩니다. <br />
				가격 간 편차, 오류 등으로 인해 부정확한 가격이 책정될 가능성이 있으니
				<span class="text-point">구매 전 확인</span>이 필요합니다.
			{:else}
				Based on the <span class="text-point"
					>Omega server of the Steam version</span
				>, seal prices are set using the weighted average of listings
				<span class="text-point">on the first data of the marketplace</span>.
				However, due to potential price fluctuations or listing errors, there’s
				a chance that the prices may not be accurate. Please
				<span class="text-point"> verify the prices </span> before making any purchases.
			{/if}
		</p>
	</Tooltip>
</div>
