<script lang="ts">
	import { currentCharacterId } from '$entities/characters'
	import {
		mySealCounts,
		type MySealCount,
		type SealData,
		type SealPrice
	} from '$entities/seals'
	import { CONFIRM } from '$shared/config'
	import { lang } from '$shared/model'
	import { MySealGrade } from '$features/calculator/display-my-seal'
	import { getMySealData } from '$features/calculator/update-my-seal'
	import { SealItem, SealList } from '$features/calculator/display-seal-list'

	export let seals: SealData[]
	export let sealPrices: SealPrice[]
	export let mySealsFiltered: MySealCount[]

	const onClickMySealDelete = (sealId: number) => {
		const isConfirmed = confirm(CONFIRM.DELETE_SEAL[$lang])
		if (!isConfirmed || !$currentCharacterId) return
		mySealCounts.remove($currentCharacterId, sealId)
	}
</script>

<SealList seals={mySealsFiltered} let:seal={mySeal} class="h-full">
	{@const seal = getMySealData(seals, mySeal.id)}
	<SealItem {seal} {sealPrices}>
		<MySealGrade {mySeal} {seals} />
		<button
			class="button-hover absolute right-[1px] top-[1px]"
			on:click={() => onClickMySealDelete(mySeal.id)}
			title={$lang === 'kr' ? '삭제' : 'Delete'}
		>
			<iconify-icon icon="mdi:close" width={14} height={14} />
		</button>
	</SealItem>
</SealList>
