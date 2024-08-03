<script lang="ts">
	import { SealItem } from '$widgets/seal-list'
	import { commonStatTable, seals, STATS } from '../config'
	import type { Seal, StatType } from '../config'
	import { Input } from '$shared/form'
	import { objectBy } from '$shared/lib'

	type SealInfo = {
		seal: Seal
		count: number
	}

	type Form = SealInfo | DefaultForm

	type DefaultForm = {
		seal: undefined
		count: 0
	}

	const defaultForm: Form = {
		seal: undefined,
		count: 0
	}

	let form: Form = defaultForm
	let mySeals: SealInfo[] = []
	$: mySealsByStatType = objectBy(mySeals, (mySeal) => mySeal.seal.stat)

	const selectSeal = (selectedSeal: Seal) => {
		form = { ...form, seal: selectedSeal }
	}

	const unSelectSeal = (sealName: Seal['name']) => {
		const newMySeals = mySeals.filter(({ seal }) => seal.name !== sealName)
		mySeals = [...newMySeals]
	}

	const onCountInput = (e: CustomEvent) => {
		const value = e.detail.data
		const prevCount = form.count === 0 ? '' : form.count
		const count = prevCount + value
		form = { ...form, count }
	}

	const onSubmit = () => {
		if (!form.seal) {
			alert('보유 중인 씰을 선택해주세요.')
			return
		}
		if (!form.count) {
			alert('보유 중인 씰의 개수를 설정해주세요.')
			return
		}
		if (form.count > 3000) {
			form = { ...form, count: 3000 }
		}
		mySeals = [...mySeals, form]
		form = { ...defaultForm }
	}

	$: statCalc = (statType: StatType) => {
		const sealsByStatType = mySealsByStatType[statType]
		if (!sealsByStatType || sealsByStatType.length === 0) {
			return 0
		}
		let resultValue = 0
		sealsByStatType.forEach(({ seal, count }) => {
			let sealPercent = 0
			for (const statTable of commonStatTable) {
				if (count <= statTable.sealCount) {
					sealPercent = statTable.percent
					break
				}
			}
			resultValue += seal.maxValue * (sealPercent / 100)
		})
		return resultValue
	}

	$: console.log('form', form)
</script>

<div class="grid grid-cols-2 gap-4">
	<section class="rounded-md border border-gray-600 p-4">
		<h2 class="mb-4 text-lg font-bold">보유중인 씰 선택</h2>
		<form on:submit={onSubmit} class="flex flex-col items-start gap-4">
			<menu class="flex flex-wrap gap-3">
				{#each seals as seal (seal.name)}
					<li>
						<button
							type="button"
							class=" btn {seal.name === form.seal?.name
								? 'variant-filled-secondary'
								: 'variant-outline-primary'}"
							on:click={() => selectSeal(seal)}
						>
							<SealItem {seal} />
						</button>
					</li>
				{/each}
			</menu>
			<Input
				pattern="\d*"
				label="개수"
				name="count"
				maxlength={4}
				on:input={onCountInput}
			/>
			<button type="submit" class="variant-filled-primary btn">추가</button>
		</form>
	</section>
	<section class="rounded-md border border-gray-600 p-4">
		<h2 class="mb-4 text-lg font-bold">보유중인 씰</h2>
		<ul>
			{#each mySeals as mySeal (mySeal.seal.name)}
				<li>
					<SealItem seal={mySeal.seal} count={mySeal.count} />
					<button class="btn" on:click={() => unSelectSeal(mySeal.seal.name)}
						>삭제</button
					>
				</li>
			{/each}
		</ul>
		<div class="flex items-center gap-4 border-t border-gray-700 pt-4">
			<h3 class="font-bold">능력치</h3>
			<dl class="flex gap-2">
				{#each STATS as stat (stat.type)}
					<div class="flex gap-2 rounded-full bg-gray-800 px-3 py-1">
						<dt>{stat.name}</dt>
						<dd>{statCalc(stat.type)}</dd>
					</div>
				{/each}
			</dl>
		</div>
	</section>
</div>
