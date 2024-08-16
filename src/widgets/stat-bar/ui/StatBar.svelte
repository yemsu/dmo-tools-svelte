<script lang="ts">
	import type { Stats } from '$entities/seals'
	import {
		MyStatBox,
		StatBarSeparator,
		StatBarTotalPrice
	} from '$widgets/stat-bar'
	import StatBarWrap from '$widgets/stat-bar/ui/StatBarWrap.svelte'

	export let stats: Stats
	export let totalPrice: number
</script>

<StatBarWrap>
	<h3 class="ir">내 능력치</h3>
	<dl>
		<MyStatBox {stats} />
		<StatBarSeparator />
		<div
			class="flex items-center justify-center gap-2"
			title="보유 씰의 총 가격"
		>
			<dt class="ir">등록된 씰의 총 가격</dt>
			<dd>
				<StatBarTotalPrice {totalPrice} />
			</dd>
		</div>
	</dl>
</StatBarWrap>
