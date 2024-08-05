<script lang="ts">
	import { seals, mySeals, myStats } from '$entities/seals/model'
	import { Section } from '$shared/section'
	import { SealItem } from '$widgets/seal-list'
	import SealList from '$widgets/seal-list/ui/SealList.svelte'
	import { STATS } from '$widgets/select-seal-form/config'
	import { getMySealData } from '$widgets/select-seal-form/lib/helper'

	export let saveMySeals: () => void
</script>

<Section>
	<h2 class="mb-4 text-lg font-bold">보유중인 씰 ({$mySeals.length})</h2>
	<SealList seals={$mySeals} let:seal={mySeal}>
		<SealItem
			seal={getMySealData($seals, mySeal.sealId)}
			count={'count' in mySeal ? mySeal.count : undefined}
		/>
		<button
			class="absolute right-[1px] top-[1px]"
			on:click={() => {
				mySeals.remove(mySeal.sealId)
				saveMySeals()
			}}
			title="삭제"
		>
			<iconify-icon icon="mdi:close" width={14} height={14} />
		</button>
	</SealList>
	<!-- <div>
		<h2>능력치별 최강 효율</h2>
		<dl>
			<dt>공격력 AT -</dt>
			<dd>
				아구몬 10개 1400T 효율 수치 1000% <button
					class="variant-filled-tertiary btn">등록 완료</button
				>
			</dd>
			<dd>
				아구몬 10개 1400T 효율 수치 1000% <button
					class="variant-filled-tertiary btn">등록 완료</button
				>
			</dd>
			<dd>
				아구몬 10개 1400T 효율 수치 1000% <button
					class="variant-filled-tertiary btn">등록 완료</button
				>
			</dd>
			<dt>치명타 AT</dt>
			<dd>
				아구몬 10개 1400T 효율 수치 600% <button
					class="variant-filled-tertiary btn">등록 완료</button
				>
			</dd>
			<dt>적중도 AT</dt>
			<dd>
				아구몬 10개 1400T 효율 수치 200% <button
					class="variant-filled-tertiary btn">등록 완료</button
				>
			</dd>
		</dl>
	</div> -->
	<div class="flex items-center gap-4 border-t border-gray-700 pt-4">
		<h3 class="font-bold">능력치</h3>
		<dl class="flex gap-2">
			{#each STATS as stat (stat.type)}
				<div class="flex gap-2 rounded-full bg-gray-800 px-3 py-1">
					<dt>{stat.name}</dt>
					<dd>{$myStats[stat.type]}</dd>
				</div>
			{/each}
		</dl>
	</div>
</Section>
