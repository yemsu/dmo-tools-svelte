<script lang="ts">
	import { page } from '$app/stores'
	import { mySealCounts, type MySealCount } from '$entities/seals'
	import { getMySealData, MySealGrade } from '$widgets/my-seals'
	import { getCurrentStep } from '$widgets/seal-calculator'
	import { SealItem, SealList } from '$widgets/seal-list'

	export let mySealsFiltered: MySealCount[]

	const onClickMySealDelete = (sealId: number) => {
		const isConfirmed = confirm(
			'해당 씰을 제거하시겠어요? 삭제된 데이터는 복구가 불가능 합니다.'
		)
		if (!isConfirmed) return
		mySealCounts.remove(sealId)
	}
</script>

<SealList seals={mySealsFiltered} let:seal={mySeal} class="h-full">
	{@const seal = getMySealData($page.data.seals, mySeal.id)}
	<SealItem {seal} myStep={getCurrentStep(seal, mySeal.count)}>
		<MySealGrade {mySeal} />
		<button
			class="absolute right-[1px] top-[1px]"
			on:click={() => onClickMySealDelete(mySeal.id)}
			title="삭제"
		>
			<iconify-icon icon="mdi:close" width={14} height={14} />
		</button>
	</SealItem>
</SealList>
