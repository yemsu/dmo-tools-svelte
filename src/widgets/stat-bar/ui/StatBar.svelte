<script lang="ts">
	import { _ } from 'svelte-i18n'
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
	<h3 class="ir">보유 씰에 따른 총 능력치와 자산</h3>
	<dl>
		<MyStatBox {stats} />
		<StatBarSeparator />
		<div
			class="flex items-center justify-center gap-2"
			title={$_('seal.myTotalAssets')}
		>
			<dt class="ir">{$_('seal.myTotalAssets')}</dt>
			<dd>
				<StatBarTotalPrice {totalPrice} />
			</dd>
		</div>
	</dl>
</StatBarWrap>
