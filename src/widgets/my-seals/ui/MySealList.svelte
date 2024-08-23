<script lang="ts">
	import { user } from '$entities/user'
	import { page } from '$app/stores'
	import { MENUS } from '$entities/menus'
	import {
		mySealCounts,
		mySealPrices,
		myStats,
		STAT_TYPE_OPTIONS,
		STATS,
		type MySealCount,
		type StatTypeOption
	} from '$entities/seals'
	import { META } from '$shared/config'
	import ListReferText from '$shared/list/ui/ListReferText.svelte'
	import { Section } from '$shared/section'
	import { Tab, Tabs } from '$shared/tabs'
	import {
		getMyAndFinalPrice,
		getMySealCount,
		MySealGrade,
		statTypeOptionStyles
	} from '$widgets/my-seals'
	import { SealItem, SealList } from '$widgets/seal-list'
	import { StatBar } from '$widgets/stat-bar'

	export let mySealsFiltered: MySealCount[]

	const onClickMySealDelete = (sealId: number) => {
		const isConfirmed = confirm(
			'해당 씰을 제거하시겠어요? 삭제된 데이터는 복구가 불가능 합니다.'
		)
		if (!isConfirmed) return
		mySealCounts.remove(sealId)
	}
</script>

<SealList seals={mySealsFiltered || []} let:seal={mySeal} class="h-full">
	<SealItem seal={getMySealCount($page.data.seals, mySeal.id)}>
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
