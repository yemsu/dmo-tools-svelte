<script lang="ts">
	import { mySeals, seals } from '$entities/seals/model'
	import { Section } from '$shared/section'
	import { Title } from '$shared/text'
	import { SealItem } from '$widgets/seal-list'
	import SealList from '$widgets/seal-list/ui/SealList.svelte'
	import { getMySealData } from '$widgets/select-seal-form/lib/helper'

	export let saveMySeals: () => void
</script>

<Section>
	<Title>보유중인 씰 ({$mySeals.length})</Title>
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
</Section>
