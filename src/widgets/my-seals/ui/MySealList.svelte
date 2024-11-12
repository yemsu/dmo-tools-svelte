<script lang="ts">
	import { currentCharacterId } from '$entities/characters'
	import { _ } from 'svelte-i18n'
	import type { LangType } from '$shared/types'
	import { page } from '$app/stores'
	import { mySealCounts, type MySealCount } from '$entities/seals'
	import { CONFIRM } from '$shared/config'
	import { getMySealData, MySealGrade } from '$widgets/my-seals'
	import { getCurrentStep } from '$widgets/seal-calculator'
	import { SealItem, SealList } from '$widgets/seal-list'

	export let mySealsFiltered: MySealCount[]
	$: lang = $page.data.lang as LangType

	const onClickMySealDelete = (sealId: number) => {
		const isConfirmed = confirm(CONFIRM.DELETE_SEAL[lang])
		if (!isConfirmed) return
		mySealCounts.remove($currentCharacterId, sealId)
	}
</script>

<SealList seals={mySealsFiltered} let:seal={mySeal} class="h-full">
	{@const seal = getMySealData($page.data.seals, mySeal.id)}
	<SealItem {seal} myStep={getCurrentStep(seal, mySeal.count)}>
		<MySealGrade {mySeal} />
		<button
			class="absolute right-[1px] top-[1px]"
			on:click={() => onClickMySealDelete(mySeal.id)}
			title={lang === 'kr' ? '삭제' : 'Delete'}
		>
			<iconify-icon icon="mdi:close" width={14} height={14} />
		</button>
	</SealItem>
</SealList>
