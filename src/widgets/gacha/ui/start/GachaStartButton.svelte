<script lang="ts">
	import { gachaStore, type GachaItemData } from '$entities/gacha'
	import { ALERT } from '$shared/config'
	import GachaButton from '$widgets/gacha/ui/start/GachaButton.svelte'
	import { error } from '@sveltejs/kit'
	import { createEventDispatcher } from 'svelte'

	export let count: 1 | 10
	export let isRetry: boolean = false

	const PROBABILITY_MIN = 0.01
	const SETUP_ITEM_LENGTH = 100 / PROBABILITY_MIN
	let gachaItemIdList: GachaItemData['id'][] = []
	$: currentGachaItems = $gachaStore.currentGacha?.gachaItems

	const dispatch = createEventDispatcher()

	const createRandomNumber = (gachaItemIdList: GachaItemData['id'][]) => {
		const randomNum = Math.floor(Math.random() * (SETUP_ITEM_LENGTH - 1))

		if (gachaItemIdList.includes(randomNum)) {
			getRandomNumber(gachaItemIdList)
		} else {
			return randomNum
		}
	}

	const getRandomNumber = (gachaItemIdList: GachaItemData['id'][]) => {
		return new Promise<number>((resolve) => {
			const randomNumber = createRandomNumber(gachaItemIdList)
			if (randomNumber) {
				resolve(randomNumber)
			}
		})
	}

	$: startGacha = async () => {
		gachaItemIdList = []
		const resultIndexList: number[] = []
		if (!currentGachaItems) {
			alert(ALERT.NO_SELECTED_GACHA)
			return
		}

		currentGachaItems.forEach(({ id, probability }) => {
			const needSetupCount = probability / PROBABILITY_MIN
			gachaItemIdList.push(...new Array(needSetupCount).fill(id))
		})
		for (let i = 0; i < count; i++) {
			const resultIndex = await getRandomNumber(gachaItemIdList)!
			resultIndexList.push(resultIndex)
		}
		const newGachaResults = resultIndexList.map((resultIndex) => {
			const resultItem = currentGachaItems.find(
				({ id }) => gachaItemIdList[resultIndex] === id
			)
			if (!resultItem) {
				error(
					400,
					`ERROR: getGachaItem - 결과 index인 ${resultIndex}에 맞는 item을 찾을 수 없습니다.`
				)
			}
			return resultItem
		})
		gachaStore.setResults(newGachaResults)
		dispatch('start')
	}
</script>

<GachaButton
	bg={isRetry ? 'retry' : `call-${count}`}
	on:click={() => startGacha()}
>
	{isRetry ? '재소환' : `${count}회 소환`}
</GachaButton>
